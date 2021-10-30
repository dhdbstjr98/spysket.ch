import { Socket } from 'socket.io';
import { rooms, User, words } from '../store';
import emitError from '../emits/error';
import emitSetSpyWord from '../emits/setSpyWord';
import onLoadGame from './loadGame';
import { socketToRoomInfo } from '../utils';

interface Props {
  spyWord: string | null;
}

export default (socket: Socket) =>
  ({ spyWord }: Props) => {
    const roomInfo = socketToRoomInfo(socket);
    if (!roomInfo) {
      emitError(socket, '서버에 접속중이지 않습니다.');
    } else {
      const { room, user } = roomInfo;
      if (rooms[room].status !== 'answering') {
        emitError(socket, '스파이 단어 입력중이 아닙니다.');
      } else if (spyWord !== null && !user.isSpy) {
        emitError(socket, '스파이가 아닙니다.');
      } else {
        clearInterval(rooms[room].answeringTimer as NodeJS.Timeout);
        rooms[room].status = 'ending';
        if (spyWord === rooms[room].word) {
          rooms[room].users = rooms[room].users.map((user) => ({
            ...user,
            point: user.isSpy ? user.point + 100 : user.point,
          }));
        } else {
          rooms[room].users = rooms[room].users.map((user) => ({
            ...user,
            point: !user.isSpy ? user.point + 100 : user.point,
          }));
        }
        emitSetSpyWord(socket, room, rooms[room].word as string, spyWord ?? '');
        console.log(`[endWithVoting] ${rooms[room].word} ${spyWord}`);
        setTimeout(onLoadGame(socket), 5000);
      }
    }
  };
