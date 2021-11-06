import { Socket } from 'socket.io';
import { User } from '../store';

export default (socket: Socket, room: string, user: User) => {
  socket.emit('leaveRoom', {});
  socket.broadcast.to(room).emit('leaveRoom', {
    name: user.name,
  });
};
