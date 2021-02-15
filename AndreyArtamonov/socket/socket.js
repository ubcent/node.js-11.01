const express = require('express');
const http = require('http');
const path = require('path');
const Socket = require('socket.io');

const app = express();
const server = http.Server(app);
const io = Socket(server);

app.get('/', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, 'index.html')
  );
});

io.on('connection', (socket) => {
  console.log('User has been connected!');

  socket.on('message', (message) => {
    message.timestamp = new Date();
    socket.broadcast.emit('message', message);
    socket.emit('message', message);
  });
});

server.listen(8888, () => {
  console.log('Server has been started!');
})