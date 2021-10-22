import { Socket } from 'socket.io';

export interface User {
  socket: string;
  name: string;
  point: number;
  isSpy?: boolean;
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
}

export const rooms: {
  [key: string]: Room;
} = {};
