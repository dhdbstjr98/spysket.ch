import { Socket } from 'socket.io';
import { rooms, words } from '../store';
import emitError from '../emits/error';
import emitSetUsers from '../emits/setUsers';
import onStartTurn from './startTurn';
import { shuffle, socketToRoomInfo } from '../utils';

export default (socket: Socket) => () => {
  const roomInfo = socketToRoomInfo(socket);
  if (!roomInfo) {
    emitError(socket, '서버에 접속중이지 않습니다.');
  } else {
    const { room } = roomInfo;
    if (rooms[room].status !== 'loading') {
      emitError(socket, '게임 상태가 올바르지 않습니다.');
    } else {
      rooms[room].users = shuffle(rooms[room].users);
      rooms[room].status = 'drawing';
      emitSetUsers(socket, room, rooms[room].users);
      console.log(`[startGame] 게임 시작`);
      setTimeout(() => onStartTurn(socket)({ turn: 0 }), 3000);
    }
  }
};
