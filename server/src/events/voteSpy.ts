import { Socket } from 'socket.io';
import { rooms, words } from '../store';
import emitError from '../emits/error';
import emitSetVotedCount from '../emits/setVotedCount';
import onEndVoting from './endVoting';
import { socketToRoomInfo } from '../utils';

interface Props {
  spy: 0 | 1 | 2 | 3 | 4;
}

export default (socket: Socket) =>
  ({ spy }: Props) => {
    const roomInfo = socketToRoomInfo(socket);
    if (!roomInfo) {
      emitError(socket, '서버에 접속중이지 않습니다.');
    } else {
      const { room, user, idx } = roomInfo;
      if (rooms[room].status !== 'voting') {
        emitError(socket, '스파이 투표중이지 않습니다.');
      } else if (user.votedSpy) {
        emitError(socket, '이미 스파이를 투표했습니다.');
      } else {
        rooms[room].users[spy].voted = rooms[room].users[spy].voted ?? 0 + 1;
        rooms[room].users[idx].votedSpy = true;
        console.log(`[voteWord] ${socket.id} ${spy} 투표`);
        emitSetVotedCount(socket, room, rooms[room].users[spy]);

        if (
          rooms[room].users.reduce(
            (acc: number, cur) => acc + (cur.votedSpy ? 1 : 0),
            0,
          ) === rooms[room].users.length
        ) {
          if (rooms[room].voteSpyTimer)
            clearInterval(rooms[room].voteSpyTimer as NodeJS.Timeout);
          onEndVoting(socket)();
        }
      }
    }
  };
