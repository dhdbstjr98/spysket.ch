import { createSlice } from '@reduxjs/toolkit';
import { clearGame, setGame, loadGame, setWords } from './game';

interface LayoutState {
  size: {
    width: number;
    height: number;
  };
  page: 'lobby' | 'room' | 'game' | 'loading' | 'word';
  showContent: boolean;
}

const initialState: LayoutState = {
  size: {
    width: 300,
    height: 337,
  },
  page: 'lobby',
  // size: {
  //   width: 400,
  //   height: 314,
  // },
  // page: 'word',
  showContent: true,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setGame, (state) => {
      state.size = {
        width: 500,
        height: 524,
      };
      state.page = 'room';
      state.showContent = true;
    });
    builder.addCase(clearGame, (state) => {
      state.size = {
        width: 300,
        height: 337,
      };
      state.page = 'lobby';
      state.showContent = true;
    });
    builder.addCase(loadGame, (state) => {
      state.page = 'loading';
      state.size = {
        width: 400,
        height: 200,
      };
    });
    builder.addCase(setWords, (state) => {
      state.page = 'word';
      state.size = {
        width: 400,
        height: 314,
      };
    });
  },
});

const { reducer } = layoutSlice;

export default reducer;
