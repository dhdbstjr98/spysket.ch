import { Socket } from 'socket.io';
import { rooms, User } from '../store';
import emitError from '../emits/error';
import emitJoinRoom from '../emits/joinRoom';
import emitInitializeRoom from '../emits/initializeRoom';

interface Props {
  name: string;
  room: string;
  isCreation: boolean;
}

export default (socket: Socket) =>
  ({ name, room, isCreation }: Props) => {
    const user: User = {
      socket: socket.id,
      name,
      point: 0,
      ready: false,
    };

    if (isCreation) {
      if (rooms[room]) {
        emitError(socket, '이미 존재하는 방입니다.');
      } else {
        rooms[room] = {
          room,
          users: [user],
          status: 'waiting',
        };
        emitJoinRoom(socket, room, user);
        emitInitializeRoom(socket, rooms[room]);
        socket.join(room);
        console.log(`[enter] ${socket.id} 새로운 방 ${room} 생성`);
      }
    } else {
      if (!rooms[room]) {
        emitError(socket, '존재하지 않는 방입니다.');
      } else if (rooms[room].users.length >= 5) {
        emitError(socket, '방이 꽉 찼습니다.');
      } else if (
        rooms[room].users.filter((user) => user.name === name).length > 0
      ) {
        emitError(socket, '이미 존재하는 닉네임입니다.');
      } else {
        rooms[room].users.push(user);
        emitJoinRoom(socket, room, user);
        emitInitializeRoom(socket, rooms[room]);
        socket.join(room);
        console.log(`[enter] ${socket.id} 방 ${room}에 접속`);
      }
    }
  };
