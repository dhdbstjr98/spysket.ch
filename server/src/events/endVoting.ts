import { Socket } from 'socket.io';
import { rooms, words } from '../store';
import emitError from '../emits/error';
import onEndWithVoting from './endWithVoting';
import onStartAnswering from './startAnswering';
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
      let votedUser = rooms[room].users.sort(
        (a, b) => (b.voted as number) - (a.voted as number),
      )[0];
      if (votedUser.voted === 0) votedUser = shuffle(rooms[room].users)[0];

      console.log(`[endVoting] ${votedUser.name} ${votedUser.voted}`);

      if (votedUser.isSpy) {
        onStartAnswering(socket)();
      } else {
        onEndWithVoting(socket)({ votedUser: votedUser });
      }
    }
  }
};
