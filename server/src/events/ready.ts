import { Socket } from 'socket.io';
import { rooms, words } from '../store';
import emitError from '../emits/error';
import emitReady from '../emits/ready';
import emitLoadGame from '../emits/loadGame';
import emitSetWords from '../emits/setWords';
import { shuffle, socketToRoomInfo } from '../utils';

interface Props {
  ready: boolean;
}

export default (socket: Socket) =>
  ({ ready }: Props) => {
    const roomInfo = socketToRoomInfo(socket);
    if (!roomInfo) {
      emitError(socket, '서버에 접속중이지 않습니다.');
    } else {
      const { room, user, idx } = roomInfo;
      rooms[room].users[idx].ready = ready;
      emitReady(socket, room, user);
      console.log(`[ready] ${socket.id} ${ready}`);

      if (rooms[room].users.filter((user) => user.ready).length === 5) {
        rooms[room].status = 'loading';
        emitLoadGame(socket, room);

        setTimeout(() => {
          const wordsSelected = shuffle(words).slice(0, 3) as [
            string,
            string,
            string,
          ];
          const spy = shuffle(rooms[room].users)[0];
          rooms[room].users = rooms[room].users.map((user) => ({
            ...user,
            isSpy: user.name === spy.name,
          }));
          rooms[room].words = wordsSelected.map((word) => ({
            name: word,
            count: 0,
          }));
          emitSetWords(socket, room, wordsSelected);
        }, 3000);
      }
    }
  };
