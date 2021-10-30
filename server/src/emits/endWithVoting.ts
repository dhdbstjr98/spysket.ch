import { Socket } from 'socket.io';
import { User } from '../store';

export default (socket: Socket, room: string, votedUser: string) => {
  socket.broadcast.to(room).emit('endWithVoting', { votedUser });
  socket.emit('endWithVoting', { votedUser });
};
