import { Socket } from 'socket.io';
import { Room } from '../store';

export default (socket: Socket, room: Room) => {
  const roomForEmit = {
    ...room,
    users: room.users.map((user) => ({ name: user.name, point: user.point })),
  };
  socket.emit('initializeRoom', {
    ...roomForEmit,
  });
};
