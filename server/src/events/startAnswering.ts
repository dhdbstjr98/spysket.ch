import { Socket } from 'socket.io';
import { rooms, User, words } from '../store';
import emitError from '../emits/error';
import emitSetStatus from '../emits/setStatus';
import onSetSpyWord from './setSpyWord';
import { socketToRoomInfo } from '../utils';

export default (socket: Socket) => () => {
  const roomInfo = socketToRoomInfo(socket);
  if (!roomInfo) {
    emitError(socket, '서버에 접속중이지 않습니다.');
  } else {
    const { room } = roomInfo;
    if (rooms[room].status !== 'voting') {
      emitError(socket, '스파이 투표중이지 않습니다.');
    } else {
      rooms[room].status = 'answering';
      emitSetStatus(socket, room, 'answering');
      console.log('[startAnswering]');
      rooms[room].answeringTimer = setTimeout(
        () => onSetSpyWord(socket)({ spyWord: null }),
        20000,
      );
    }
  }
};
