import { Socket } from 'socket.io';

export default (socket: Socket, room: string, object: fabric.Object) => {
  socket.broadcast.to(room).emit('drawObject', { object });
};
