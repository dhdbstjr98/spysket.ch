import { Socket } from 'socket.io';
import { User } from '../store';

export default (socket: Socket, room: string, user: User) => {
  const votedCountInfo = { name: user.name, count: user.voted };
  socket.broadcast.to(room).emit('setVotedCount', votedCountInfo);
  socket.emit('setVotedCount', votedCountInfo);
};
