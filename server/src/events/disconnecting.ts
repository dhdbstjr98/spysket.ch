import { Socket } from 'socket.io';
import { rooms } from '../store';
import emitLeaveRoom from '../emits/leaveRoom';
import { socketToRoomInfo } from '../utils';

export default (socket: Socket) => () => {
  const roomInfo = socketToRoomInfo(socket);
  if (roomInfo) {
    const { room, user, idx } = roomInfo;
    rooms[room].users = rooms[room].users.filter(
      (_, userIdx) => userIdx !== idx,
    );
    socket.leave(room);
    if (rooms[room].users.length > 0) {
      emitLeaveRoom(socket, room, user);
    } else {
      delete rooms[room];
    }
    console.log(`[disconnect] 방 ${room}에서 퇴장`);
  } else {
    console.log('[disconnect] 퇴장');
  }
};
