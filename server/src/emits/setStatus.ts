import { Socket } from 'socket.io';
import { Status, User } from '../store';

export default (socket: Socket, room: string, status: Status) => {
  socket.broadcast.to(room).emit('setStatus', status);
  socket.emit('setStatus', status);
};
