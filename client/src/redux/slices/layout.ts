import { createSlice } from '@reduxjs/toolkit';
import {
  clearGame,
  setGame,
  loadGame,
  setWords,
  setWord,
  setUsers,
} from './game';

interface LayoutState {
  size: {
    width: number;
    height: number;
  };
  page: 'lobby' | 'room' | 'game' | 'spy-loading' | 'word' | 'game-loading';
  showContent: boolean;
}

const initialState: LayoutState = {
  size: {
    width: 300,
    height: 337,
  },
  page: 'lobby',
  // size: {
  //   width: 1000,
  //   height: 700,
  // },
  // page: 'game',
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
      state.page = 'spy-loading';
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
    builder.addCase(setWord, (state) => {
      state.page = 'game-loading';
      state.size = {
        width: 400,
        height: 200,
      };
    });
    builder.addCase(setUsers, (state) => {
      state.page = 'game';
      state.size = {
        width: 1000,
        height: 700,
      };
    });
  },
});

const { reducer } = layoutSlice;

export default reducer;
