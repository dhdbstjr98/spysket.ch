import { Socket } from 'socket.io';
import { rooms, words } from '../store';
import emitError from '../emits/error';
import emitSetWords from '../emits/setWords';
import emitLoadGame from '../emits/loadGame';
import onSetWord from './setWord';
import { shuffle, socketToRoomInfo } from '../utils';

export default (socket: Socket) => () => {
  const roomInfo = socketToRoomInfo(socket);
  if (!roomInfo) {
    emitError(socket, '서버에 접속중이지 않습니다.');
  } else {
    const { room } = roomInfo;
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
        votedWord: false,
      }));
      rooms[room].words = wordsSelected.map((word) => ({
        name: word,
        count: 0,
      }));

      rooms[room].voteWordTimer = setTimeout(onSetWord(socket), 30000);
      emitSetWords(socket, room, wordsSelected);
    }, 3000);
  }
};
