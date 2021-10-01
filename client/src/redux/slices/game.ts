import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  id: string;
  room: string;
  name: string;
}

const gameSlice = createSlice({
  name: 'game',
  initialState: null as null | GameState,
  reducers: {
    setGame: (state, action: PayloadAction<GameState>) => {
      return action.payload;
    },
  },
});

const { actions, reducer } = gameSlice;

export const { setGame } = actions;
export default reducer;
