const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

// below is the express static middleware
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('adminMessage', generateMessage('Admin','Welcome to ChattyChat!'));

  socket.broadcast.emit('adminMessage', generateMessage('Admin','New user has joined ChattyChat.'));

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage',generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('User', coords.latitude,coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });
});

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
