import { Socket } from 'socket.io';
import { rooms, words } from '../store';
import emitError from '../emits/error';
import emitSetStatus from '../emits/setStatus';
import onEndVoting from './endVoting';
import { socketToRoomInfo } from '../utils';

export default (socket: Socket) => () => {
  const roomInfo = socketToRoomInfo(socket);
  if (!roomInfo) {
    emitError(socket, '서버에 접속중이지 않습니다.');
  } else {
    const { room } = roomInfo;
    if (rooms[room].status !== 'drawing') {
      emitError(socket, '게임 상태가 올바르지 않습니다.');
    } else {
      rooms[room].status = 'voting';
      rooms[room].users = rooms[room].users.map((user) => ({
        ...user,
        votedSpy: false,
        voted: 0,
      }));
      emitSetStatus(socket, room, 'voting');
      console.log('[startVotingSpy]');
      rooms[room].voteSpyTimer = setTimeout(onEndVoting(socket), 20000);
    }
  }
};
