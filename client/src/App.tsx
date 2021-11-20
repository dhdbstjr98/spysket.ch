import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './redux/store';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import Room from './pages/Room';
import SpyLoading from './pages/SpyLoading';
import GameLoading from './pages/GameLoading';
import WordResult from './pages/WordResult';
import VoteResult from './pages/VoteResult';
import Word from './pages/Word';
import { colors } from './components/game/Canvas';
import { getSocket, initializeSocket } from './socket';

const App: React.FC = () => {
  const {
    size: { width, height },
    page,
    showContent,
  } = useSelector((state: RootState) => state.layout);

  const dispatch = useAppDispatch();

  let Page;

  switch (page) {
    case 'lobby':
      Page = Lobby;
      break;
    case 'room':
      Page = Room;
      break;
    case 'game':
      Page = Game;
      break;
    case 'spy-loading':
      Page = SpyLoading;
      break;
    case 'word':
      Page = Word;
      break;
    case 'game-loading':
      Page = GameLoading;
      break;
    case 'word-result':
      Page = WordResult;
      break;
    case 'vote-result':
      Page = VoteResult;
      break;
    default:
      throw new Error('존재하지 않는 페이지');
  }

  const colorStyle = colors.reduce(
    (acc, color, turn) => ({
      ...acc,
      [`--turn-${turn}`]: color,
    }),
    {},
  );

  useEffect(() => {
    initializeSocket(dispatch, 'http://localhost:3100');
    getSocket().on('disconnect', () => console.log('disconnected'));
  }, []);

  return (
    <>
      <div className="container" style={colorStyle}>
        <div className="main-box" style={{ width, height }}>
          {showContent ? <Page /> : ''}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
