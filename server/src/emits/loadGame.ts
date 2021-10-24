import { Socket } from 'socket.io';

export default (socket: Socket, room: string) => {
  socket.broadcast.to(room).emit('loadGame');
  socket.emit('loadGame');
};
