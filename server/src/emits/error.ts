import { Socket } from 'socket.io';

export default (socket: Socket, message: string) => {
  console.log(`[error] ${message}`);
  socket.emit('error', {
    message,
  });
};
