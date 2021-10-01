import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './redux/store';
import { setGame } from './redux/slices/game';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import Room from './pages/Room';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    size: { width, height },
    page,
  } = useSelector((state: RootState) => state.layout);

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        setGame({
          name: 'a',
          id: 'b',
          room: 'c',
        }),
      );
    }, 3000);
  });

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
