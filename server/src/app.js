import express from 'express';
import path from 'path';
import http from 'http';
import socketio from 'socket.io';

const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

let count = 0;

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('web socket connection');
  // socket.emit('countUpdated', count);
  socket.emit('message', 'Welcome!');
  socket.on('increment', () => {
    count += 1;
    io.emit('countUpdated', count);
  });
});

export default server;
