import { io, Socket } from 'socket.io-client';
import { AppDispatch } from '../redux/store';
import initializeRoom from './events/initializeRoom';
import leaveRoom from './events/leaveRoom';
import joinRoom from './events/joinRoom';
import ready from './events/ready';
import loadGame from './events/loadGame';
import setWords from './events/setWords';
import setWordCount from './events/setWordCount';
import setWord from './events/setWord';
import setUsers from './events/setUsers';

const socketManager = () => {
  let socket: Socket;

  const initializeSocket = (dispatch: AppDispatch, endpoint: string) => {
    socket = io(endpoint);

    socket.on('initializeRoom', initializeRoom(dispatch));
    socket.on('leaveRoom', leaveRoom(dispatch));
    socket.on('joinRoom', joinRoom(dispatch));
    socket.on('ready', ready(dispatch));
    socket.on('loadGame', loadGame(dispatch));
    socket.on('setWords', setWords(dispatch));
    socket.on('setWordCount', setWordCount(dispatch));
    socket.on('setWord', setWord(dispatch));
    socket.on('setUsers', setUsers(dispatch));
  };

  const getSocket = () => {
    if (!socket) throw new Error('초기화되지 않은 소켓');

    return socket;
  };

  return {
    initializeSocket,
    getSocket,
  };
};

export const { initializeSocket, getSocket } = socketManager();
