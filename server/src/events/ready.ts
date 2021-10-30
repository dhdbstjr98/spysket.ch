import { Socket } from 'socket.io';
import { rooms, words } from '../store';
import emitError from '../emits/error';
import emitReady from '../emits/ready';
import onLoadGame from './loadGame';
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
        onLoadGame(socket)();
      }
    }
  };
