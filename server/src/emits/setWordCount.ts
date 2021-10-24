import { BroadcastOperator, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { rooms } from '../store';

export default (socket: Socket, room: string, name: string, count: number) => {
  rooms[room].users.forEach((user) => {
    if (!user.isSpy) {
      const target: Socket | BroadcastOperator<DefaultEventsMap> =
        user.socket === socket.id ? socket : socket.to(user.socket);
      target.emit('setWordCount', {
        name,
        count,
      });
    }
  });
};
