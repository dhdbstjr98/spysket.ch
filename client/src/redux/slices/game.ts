import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  name: string;
  ready: boolean;
}
interface GameState {
  id: string;
  room: string;
  name: string;
  users: User[];
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
  },
});

const { actions, reducer } = gameSlice;

export const { setGame, clearGame, setUser } = actions;
export default reducer;
