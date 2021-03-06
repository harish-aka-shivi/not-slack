import socketio from 'socket.io';
import { joinChannel, leaveChannel } from './controllers/userController';
import { saveMessage } from './controllers/messageController';

const initSocket = server => {
  const io = socketio(server);


  io.on('connection', socket => {
    console.log('web socket connection');

    socket.on('join', (options, callback) => {
      const { channel, username } = options;

      try {
        // don't block for data saving
        joinChannel(username, channel);
      } catch (error) {
        console.log(error);
      }

      socket.join(channel);
      callback();
    });

    socket.on('sendMessage', (options, callback) => {
      const { username, channel, content } = options;

      // save to db
      saveMessage({ username, channel, content });

      // broadcast to channel
      io.in(channel).emit('message', options);
      callback();
    });

    socket.on('leaveChannel', (options, callback) => {
      const { channel, username } = options;

      try {
        leaveChannel(username, channel);
      } catch (error) {
        console.log(error);
      }

      socket.leave(channel);
      callback();
    });
  });
};

export default initSocket;
