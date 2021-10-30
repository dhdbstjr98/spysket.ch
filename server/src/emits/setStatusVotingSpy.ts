import { Socket } from 'socket.io';
import { User } from '../store';

export default (socket: Socket, room: string) => {
  socket.broadcast.to(room).emit('setStatus', 'voting');
  socket.emit('setStatus', 'voting');
};
