import { Socket } from 'socket.io';
import { rooms, User, words } from '../store';
import emitError from '../emits/error';
import emitEndWithVoting from '../emits/endWithVoting';
import onLoadGame from './loadGame';
import { socketToRoomInfo } from '../utils';

interface Props {
  votedUser: User;
}

export default (socket: Socket) =>
  ({ votedUser }: Props) => {
    const roomInfo = socketToRoomInfo(socket);
    if (!roomInfo) {
      emitError(socket, '서버에 접속중이지 않습니다.');
    } else {
      const { room } = roomInfo;
      if (rooms[room].status !== 'voting') {
        emitError(socket, '스파이 투표중이지 않습니다.');
      } else {
        rooms[room].status = 'ending';
        rooms[room].users = rooms[room].users.map((user) => ({
          ...user,
          point: user.isSpy ? user.point + 100 : user.point,
        }));
        emitEndWithVoting(socket, room, votedUser.name);
        console.log(`[endWithVoting] ${votedUser.name}`);
        setTimeout(onLoadGame(socket), 5000);
      }
    }
  };
