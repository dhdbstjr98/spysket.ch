import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import Room from './pages/Room';
import Loading from './pages/Loading';
import Word from './pages/Word';

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
    case 'loading':
      Page = Loading;
      break;
    case 'word':
      Page = Word;
      break;
    default:
      throw new Error('존재하지 않는 페이지');
  }
  return (
    <div className="container">
      <div className="main-box" style={{ width, height }}>
        {showContent ? <Page /> : ''}
      </div>
    </div>
  );
};

export default App;
