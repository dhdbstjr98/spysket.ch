import { Socket } from 'socket.io';

export interface User {
  socket: string;
  name: string;
  point: number;
  ready: boolean;
  isSpy?: boolean;
  votedWord?: boolean;
  votedSpy?: boolean;
  voted?: number;
}

export type Status =
  | 'waiting'
  | 'loading'
  | 'drawing'
  | 'voting'
  | 'answering'
  | 'ending';

export interface Room {
  room: string;
  users: User[];
  status: Status;
  words?: {
    name: string;
    count: number;
  }[];
  word?: string;
  voteWordTimer?: NodeJS.Timeout;
  voteSpyTimer?: NodeJS.Timeout;
  answeringTimer?: NodeJS.Timeout;
  turn?: 0 | 1 | 2 | 3 | 4;
}

export const rooms: {
  [key: string]: Room;
} = {};

export { words } from './words';
