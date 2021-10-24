import { Socket } from 'socket.io';
import { rooms, User } from '../store';

interface Returns {
  room: string;
  idx: number;
  user: User;
}

export const socketToRoomInfo = (socket: Socket): Returns | null => {
  const roomNames = Array.from(socket.rooms).filter(
    (room) => room !== socket.id,
  );

  if (roomNames.length === 0) return null;

  const room = roomNames[0];
  let user: User | undefined;
  let idx: number | undefined;

  for (let i = 0; i < rooms[room].users.length; i++) {
    if (rooms[room].users[i].socket === socket.id) {
      user = rooms[room].users[i];
      idx = i;
      break;
    }
  }

  if (user === undefined || idx === undefined) return null;

  return {
    room,
    user,
    idx,
  };
};

export const shuffle = <T>(arr: T[] | ReadonlyArray<T>): T[] => {
  return (arr as T[]).sort(() => Math.random() - 0.5);
};
