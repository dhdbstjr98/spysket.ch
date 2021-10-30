import { Socket } from 'socket.io';
import { rooms, words } from '../store';
import emitError from '../emits/error';
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
      // TODO
    }
  }
};
