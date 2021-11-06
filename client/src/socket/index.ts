import { io, Socket } from 'socket.io-client';
import { AppDispatch } from '../redux/store';
import initializeRoom from './events/initializeRoom';

const socketManager = () => {
  let socket: Socket;

  const initializeSocket = (dispatch: AppDispatch, endpoint: string) => {
    socket = io(endpoint);

    socket.on('initializeRoom', initializeRoom(dispatch));
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
