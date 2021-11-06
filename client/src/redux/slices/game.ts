import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name: string;
  ready: boolean;
  point?: number;
  votedCount?: number;
}

export type Turn = 0 | 1 | 2 | 3 | 4;

export type Status =
  | 'waiting'
  | 'loading'
  | 'drawing'
  | 'voting'
  | 'answering'
  | 'ending';

interface GameState {
  room: string;
  name: string;
  users: User[];
  status: Status;
  words?: {
    name: string;
    count: number;
  }[];
  word?: string;
  isSpy?: boolean;
  turn?: Turn;
  votedUser?: string;
  spyWord?: string;
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
    removeUser: (state, action: PayloadAction<{ name: string }>) => {
      if (state) {
        state.users = state?.users.filter(
          (user) => user.name !== action.payload.name,
        );
      }
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
        state.status = 'drawing';
      }
    },
    setTurn: (state, action: PayloadAction<Turn>) => {
      if (state) {
        state.turn = action.payload;
      }
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      if (state) {
        if (action.payload === 'voting') {
          state.users = state.users.map((user) => ({ ...user, votedCount: 0 }));
        }
        state.status = action.payload;
      }
    },
    setVotedCount: (
      state,
      action: PayloadAction<{ name: string; votedCount: number }>,
    ) => {
      if (state) {
        state.users = state.users.map((user) =>
          user.name === action.payload.name
            ? { ...user, votedCount: action.payload.votedCount }
            : user,
        );
      }
    },
    setSpyWord: (
      state,
      action: PayloadAction<{ word: string; spyWord: string }>,
    ) => {
      if (state) {
        state.word = action.payload.word;
        state.spyWord = action.payload.spyWord;
      }
    },
    endWithVoting: (state, action: PayloadAction<string>) => {
      if (state) {
        state.votedUser = action.payload;
      }
    },
  },
});

const { actions, reducer } = gameSlice;

export const {
  setGame,
  clearGame,
  removeUser,
  setUser,
  loadGame,
  setWords,
  setWordCount,
  setWord,
  setUsers,
  setTurn,
  setStatus,
  setVotedCount,
  setSpyWord,
  endWithVoting,
} = actions;
export default reducer;
