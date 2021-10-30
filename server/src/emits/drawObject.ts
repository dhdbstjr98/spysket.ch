import { Socket } from 'socket.io';
import { User } from '../store';

export default (socket: Socket, room: string, object: fabric.Object) => {
  socket.broadcast.to(room).emit('setTurn', { object });
};
