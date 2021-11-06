import { Socket } from 'socket.io';
import { rooms } from '../store';
import emitLeaveRoom from '../emits/leaveRoom';
import { socketToRoomInfo } from '../utils';

export default (socket: Socket) => () => {
  const roomInfo = socketToRoomInfo(socket);
  if (roomInfo) {
    const { room, user, idx } = roomInfo;

    emitLeaveRoom(socket, room, user);

    rooms[room].users = rooms[room].users.filter(
      (_, userIdx) => userIdx !== idx,
    );
    if (rooms[room].users.length === 0) {
      delete rooms[room];
    }
    socket.leave(room);
    console.log(`[exitRoom] ${socket.id} 방 ${room}에서 퇴장`);
  } else {
    console.log(`[exitRoom] ${socket.id} 퇴장`);
  }
};
