import { Socket } from 'socket.io';
import { rooms } from '../store';
import leaveRoom from '../emits/leaveRoom';

export default (socket: Socket) => () => {
  const roomNames = Array.from(socket.rooms).filter(
    (room) => room !== socket.id,
  );
  if (roomNames.length > 0) {
    const room = roomNames[0];
    const user = rooms[room].users.filter(
      (user) => user.socket === socket.id,
    )[0];
    rooms[room].users = rooms[room].users.filter(
      (user) => user.socket !== socket.id,
    );
    socket.leave(room);
    if (rooms[room].users.length > 0) {
      leaveRoom(socket, room, user);
    } else {
      delete rooms[room];
    }
    console.log(`[disconnect] 방 ${room}에서 퇴장`);
  } else {
    console.log('[disconnect] 퇴장');
  }
};
