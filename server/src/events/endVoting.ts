import { Socket } from 'socket.io';
import { rooms, words } from '../store';
import emitError from '../emits/error';
import { shuffle, socketToRoomInfo } from '../utils';

export default (socket: Socket) => () => {
  const roomInfo = socketToRoomInfo(socket);
  if (!roomInfo) {
    emitError(socket, '서버에 접속중이지 않습니다.');
  } else {
    const { room } = roomInfo;
    if (rooms[room].status !== 'voting') {
      emitError(socket, '스파이 투표중이지 않습니다.');
    } else {
      let voted = rooms[room].users.sort(
        (a, b) => (b.voted as number) - (a.voted as number),
      )[0];
      if (voted.voted === 0) voted = shuffle(rooms[room].users)[0];

      console.log(`[endVoting] ${voted.name} ${voted.voted}`);

      if (voted.isSpy) {
        console.log('TODO: 제시어 맞추기');
      } else {
        console.log('TODO: 스파이 승리');
      }
    }
  }
};
