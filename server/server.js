const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

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

  socket.on('createMessage', (newMessage) => {
    console.log('New Message: ', newMessage);
    io.emit('newMessage',generateMessage(newMessage.from, newMessage.text));
  });

  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });
});

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
