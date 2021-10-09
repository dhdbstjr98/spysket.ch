import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import Room from './pages/Room';
import SpyLoading from './pages/SpyLoading';
import GameLoading from './pages/GameLoading';
import Word from './pages/Word';
import { colors } from './components/game/Canvas';

const App: React.FC = () => {
  const {
    size: { width, height },
    page,
    showContent,
  } = useSelector((state: RootState) => state.layout);

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

  return (
    <div className="container" style={colorStyle}>
      <div className="main-box" style={{ width, height }}>
        {showContent ? <Page /> : ''}
      </div>
    </div>
  );
};

export default App;
