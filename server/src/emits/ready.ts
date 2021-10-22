import { Socket } from 'socket.io';
import { User } from '../store';

export default (socket: Socket, room: string, user: User) => {
  const readyInfo = {
    name: user.name,
    point: user.point,
    ready: user.ready,
  };
  socket.broadcast.to(room).emit('ready', readyInfo);
  socket.emit('ready', readyInfo);
};
