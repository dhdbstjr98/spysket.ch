import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import onEnter from './events/enter';
import onDisconnecting from './events/disconnecting';

const port = 3100;
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: '*' },
});

io.on('connection', (socket: Socket) => {
  console.log(`[connection] ${socket.id}`);

  socket.on('enter', onEnter(socket));
  socket.on('disconnecting', onDisconnecting(socket));
});

httpServer.listen(port);
console.log(`server on ${port} port`);
