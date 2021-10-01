import { createSlice } from '@reduxjs/toolkit';
import { setGame } from './game';

interface LayoutState {
  size: {
    width: number;
    height: number;
  };
  page: 'lobby' | 'room' | 'game';
}

const initialState: LayoutState = {
  size: {
    width: 300,
    height: 300,
  },
  page: 'lobby',
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setGame, (state) => {
      state.size = {
        width: 500,
        height: 500,
      };
      state.page = 'room';
    });
  },
});

const { reducer } = layoutSlice;

export default reducer;
