import { io, Socket } from 'socket.io-client';
import { AppDispatch } from '../redux/store';
import initializeRoom from './events/initializeRoom';
import leaveRoom from './events/leaveRoom';
import joinRoom from './events/joinRoom';

const socketManager = () => {
  let socket: Socket;

  const initializeSocket = (dispatch: AppDispatch, endpoint: string) => {
    socket = io(endpoint);

    socket.on('initializeRoom', initializeRoom(dispatch));
    socket.on('leaveRoom', leaveRoom(dispatch));
    socket.on('joinRoom', joinRoom(dispatch));
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
