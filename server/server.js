const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

// below is the express static middleware
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('adminMessage', generateMessage('Admin',`Welcome to ChattyChat, ${params.name}!`));
    socket.broadcast.to(params.room).emit('adminMessage', generateMessage('Admin',`${params.name} has joined.`));
    callback();
  })

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage(coords.from, coords.latitude,coords.longitude));
  });

  socket.on('disconnect', () => {
    let user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('adminMessage', generateMessage('Admin', `${user.name} has left the room.`));
    }
  });
});

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

//socket.leave('The Office Fans');

//io.emit -> io.to('The Office Fans').emit
//socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
//socket.emit
