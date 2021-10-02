import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import Room from './pages/Room';

const App: React.FC = () => {
  const {
    size: { width, height },
    page,
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
    default:
      throw new Error('존재하지 않는 페이지');
  }

  return (
    <div className="container">
      <div className="main-box" style={{ width, height }}>
        <Page />
      </div>
    </div>
  );
};

export default App;
