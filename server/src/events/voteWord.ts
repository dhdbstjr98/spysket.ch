import { Socket } from 'socket.io';
import { rooms, words } from '../store';
import emitError from '../emits/error';
import emitSetWordCount from '../emits/setWordCount';
import onSetWord from './setWord';
import { socketToRoomInfo } from '../utils';

interface Props {
  word: string;
}

export default (socket: Socket) =>
  ({ word }: Props) => {
    const roomInfo = socketToRoomInfo(socket);
    if (!roomInfo) {
      emitError(socket, '서버에 접속중이지 않습니다.');
    } else {
      const { room, user, idx } = roomInfo;
      if (rooms[room].status !== 'loading') {
        emitError(socket, '제시어 투표중이지 않습니다.');
      } else if (user.isSpy) {
        emitError(socket, '스파이는 제시어 투표를 할 수 없습니다.');
      } else if (
        rooms[room].words?.filter((wordInfo) => wordInfo.name === word)
          .length === 0
      ) {
        emitError(socket, '존재하지 않는 제시어입니다.');
      } else if (user.votedWord) {
        emitError(socket, '이미 제시어를 투표했습니다.');
      } else {
        rooms[room].words = rooms[room].words?.map((wordInfo) => ({
          ...wordInfo,
          count: wordInfo.name === word ? wordInfo.count + 1 : wordInfo.count,
        }));
        rooms[room].users[idx].votedWord = true;
        console.log(`[voteWord] ${socket.id} ${word} 투표`);
        // TODO: 전체적으로 여기 있는 word 로직을 map 등을 이용해 바꿔야할 듯
        emitSetWordCount(
          socket,
          room,
          word,
          rooms[room].words?.filter((wordInfo) => wordInfo.name === word)[0]
            .count as number,
        );

        if (
          rooms[room].users.reduce(
            (acc: number, cur) => acc + (cur.votedWord ? 1 : 0),
            0,
          ) ===
          rooms[room].users.length - 1
        ) {
          if (rooms[room].voteWordTimer)
            clearTimeout(rooms[room].voteWordTimer as NodeJS.Timeout);
          onSetWord(socket)();
        }
      }
    }
  };
