import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import onEnter from './events/enter';
import onReady from './events/ready';
import onVoteWord from './events/voteWord';
import onDraw from './events/draw';
import onDisconnecting from './events/disconnecting';

const port = 3100;
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: '*' },
});

io.on('connection', (socket: Socket) => {
  console.log(`[connection] ${socket.id}`);

  socket.on('enter', onEnter(socket));
  socket.on('ready', onReady(socket));
  socket.on('voteWord', onVoteWord(socket));
  socket.on('draw', onDraw(socket));
  socket.on('disconnecting', onDisconnecting(socket));
});

httpServer.listen(port);
console.log(`server on ${port} port`);
