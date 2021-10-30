import { Socket } from 'socket.io';
import { rooms, words } from '../store';
import emitError from '../emits/error';
import emitSetWord from '../emits/setWord';
import onStartGame from './startGame';
import { socketToRoomInfo } from '../utils';

export default (socket: Socket) => () => {
  const roomInfo = socketToRoomInfo(socket);
  if (!roomInfo) {
    emitError(socket, '서버에 접속중이지 않습니다.');
  } else {
    const { room } = roomInfo;
    if (rooms[room].status !== 'loading') {
      emitError(socket, '제시어 투표중이지 않습니다.');
    } else {
      const word = (
        rooms[room].words as { name: string; count: number }[]
      ).sort((word1, word2) => word2.count - word1.count + Math.random())[0]
        .name;
      rooms[room].word = word;
      emitSetWord(socket, room, word);
      console.log(`[setWord] ${word} 선정`);
      setTimeout(onStartGame(socket), 3000);
    }
  }
};
