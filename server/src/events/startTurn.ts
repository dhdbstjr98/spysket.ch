import { Socket } from 'socket.io';
import { rooms, words } from '../store';
import emitError from '../emits/error';
import emitSetTurn from '../emits/setTurn';
import { socketToRoomInfo } from '../utils';

interface Props {
  turn: 0 | 1 | 2 | 3 | 4;
}

const onStartTurn =
  (socket: Socket) =>
  ({ turn }: Props) => {
    const roomInfo = socketToRoomInfo(socket);
    if (!roomInfo) {
      emitError(socket, '서버에 접속중이지 않습니다.');
    } else {
      const { room } = roomInfo;
      if (rooms[room].status !== 'drawing') {
        emitError(socket, '게임이 진행중이지 않습니다.');
      } else {
        rooms[room].turn = turn;
        emitSetTurn(socket, room, turn);
        console.log(`[startTurn] 턴 ${turn} 시작`);
        if (turn < 4) {
          setTimeout(
            () =>
              onStartTurn(socket)({ turn: (turn + 1) as 0 | 1 | 2 | 3 | 4 }),
            30000,
          );
        } else {
          setTimeout(() => console.log('TODO: 투표'), 30000);
        }
      }
    }
  };

export default onStartTurn;
