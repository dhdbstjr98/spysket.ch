import { Socket } from 'socket.io';
import { User } from '../store';

export default (socket: Socket, room: string, turn: 0 | 1 | 2 | 3 | 4) => {
  socket.broadcast.to(room).emit('setTurn', { turn });
  socket.emit('setTurn', { turn });
};
