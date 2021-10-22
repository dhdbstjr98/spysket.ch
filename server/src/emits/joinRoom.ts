import { Socket } from 'socket.io';
import { User } from '../store';

export default (socket: Socket, room: string, user: User) => {
  socket.broadcast
    .to(room)
    .emit('joinRoom', {
      name: user.name,
      point: user.point,
      ready: user.ready,
    });
};
