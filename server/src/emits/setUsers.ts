import { Socket } from 'socket.io';
import { User } from '../store';

export default (socket: Socket, room: string, users: User[]) => {
  const usersInfo = {
    users: users.map((user) => ({
      name: user.name,
      point: user.point,
      ready: user.ready,
    })),
  };
  socket.broadcast.to(room).emit('users', usersInfo);
  socket.emit('users', usersInfo);
};
