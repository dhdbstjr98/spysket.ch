import { Socket } from 'socket.io';
import { Room } from '../store';

export default function initializeRoom(
  socket: Socket,
  room: Room,
  name: string,
) {
  const roomForEmit = {
    ...room,
    users: room.users.map((user) => ({
      name: user.name,
      point: user.point,
      ready: user.ready,
    })),
  };
  socket.emit('initializeRoom', {
    room: roomForEmit,
    name: name,
  });
}
