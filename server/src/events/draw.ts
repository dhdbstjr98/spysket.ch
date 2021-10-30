import { Socket } from 'socket.io';
import { rooms, words } from '../store';
import emitError from '../emits/error';
import emitDrawObject from '../emits/drawObject';
import { socketToRoomInfo } from '../utils';

interface Props {
  object: fabric.Object;
}

export default (socket: Socket) =>
  ({ object }: Props) => {
    const roomInfo = socketToRoomInfo(socket);
    if (!roomInfo) {
      emitError(socket, '서버에 접속중이지 않습니다.');
    } else {
      const { room, idx } = roomInfo;
      if (rooms[room].status !== 'drawing') {
        emitError(socket, '그리기가 진행중이지 않습니다.');
      } else if (idx !== rooms[room].turn) {
        emitError(socket, '나의 턴이 아닙니다.');
      } else if (object.type !== 'path') {
        emitError(socket, '올바르지 않은 그림입니다.');
      } else {
        emitDrawObject(socket, room, object);
        console.log(`[draw] ${socket.id}`);
      }
    }
  };
