import { BroadcastOperator, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { rooms } from '../store';

export default (socket: Socket, room: string, word: string) => {
  rooms[room].users.forEach((user) => {
    const target: Socket | BroadcastOperator<DefaultEventsMap> =
      user.socket === socket.id ? socket : socket.to(user.socket);
    target.emit('setWord', {
      word: user.isSpy ? null : word,
    });
  });
};
