const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

// below is the express static middleware
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  let timeStamp = new Date().toLocaleString();

  socket.emit('newMessage', {
    from: "Emma",
    text: "Hello, and welcome to ChattyChat",
    createdAt: timeStamp
  });

  socket.on('createMessage', (newMessage) => {
    console.log('New Message: ', newMessage);
  })

  socket.on('disconnect', () => {
    console.log('User disconnected.');
  });
});

server.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
