import { BroadcastOperator, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { rooms } from '../store';

export default (
  socket: Socket,
  room: string,
  words: [string, string, string],
) => {
  rooms[room].users.forEach((user) => {
    const target: Socket | BroadcastOperator<DefaultEventsMap> =
      user.socket === socket.id ? socket : socket.to(user.socket);
    target.emit('setWords', {
      words: user.isSpy ? null : words,
    });
  });
};
