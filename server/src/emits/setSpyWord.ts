import { Socket } from 'socket.io';
import { User } from '../store';

export default (
  socket: Socket,
  room: string,
  word: string,
  spyWord: string,
) => {
  socket.broadcast.to(room).emit('setSpyWord', { word, spyWord });
  socket.emit('setSpyWord', { word, spyWord });
};
