import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name: string;
  ready: boolean;
  point?: number;
}

export type Turn = 0 | 1 | 2 | 3 | 4;

interface GameState {
  id: string;
  room: string;
  name: string;
  users: User[];
  status: 'waiting' | 'loading' | 'drawing';
  words?: {
    name: string;
    count: number;
  }[];
  word?: string;
  isSpy?: boolean;
  turn?: Turn;
}

const gameSlice = createSlice({
  name: 'game',
  initialState: null as null | GameState,
  reducers: {
    setGame: (state, action: PayloadAction<GameState>) => {
      return action.payload;
    },
    clearGame: () => {
      return null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      if (state) {
        let found = false;

        state.users = state.users.map((user) => {
          if (user.name === action.payload.name) {
            found = true;
            return action.payload;
          } else {
            return user;
          }
        });

        if (!found) state.users.push(action.payload);
      }
    },
    loadGame: (state) => {
      if (state) state.status = 'loading';
    },
    setWords: (
      state,
      action: PayloadAction<{ name: string; count: number }[] | null>,
    ) => {
      if (state) {
        if (action.payload !== null) {
          state.isSpy = false;
          state.words = action.payload;
        } else {
          state.isSpy = true;
        }
      }
    },
    setWordCount: (
      state,
      action: PayloadAction<{ name: string; count: number }>,
    ) => {
      if (state && state.words) {
        state.words = state.words.map((word) =>
          word.name === action.payload.name ? action.payload : word,
        );
      }
    },
    setWord: (state, action: PayloadAction<string | undefined>) => {
      if (state) {
        state.word = action.payload;
      }
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      if (state) {
        state.users = action.payload;
        state.turn = 0;
      }
    },
    setTurn: (state, action: PayloadAction<Turn>) => {
      if (state) {
        state.turn = action.payload;
      }
    },
  },
});

const { actions, reducer } = gameSlice;

export const {
  setGame,
  clearGame,
  setUser,
  loadGame,
  setWords,
  setWordCount,
  setWord,
  setUsers,
  setTurn,
} = actions;
export default reducer;
