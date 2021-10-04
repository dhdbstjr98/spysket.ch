import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import UserList from '../components/UserList';

import './Room.css';
import Button from '../components/Button';
import { clearGame, loadGame } from '../redux/slices/game';

const Game: React.FC = () => {
  const game = useSelector((state: RootState) => state.game);
  const dispatch = useAppDispatch();

  const handleBack = () => {
    dispatch(clearGame());
  };

  const handleReady = () => {
    dispatch(loadGame());
  };

  // typescript null escape
  if (game === null) return <></>;

  const { room, users } = game;

  return (
    <div className="game">
      <h2>
        <span className="room-name">{room}</span>
        <span className="count">({users.length} / 5)</span>
      </h2>
      <UserList users={users} />
      <Button onClick={handleReady} color="highlight">
        준비
      </Button>
      <Button onClick={handleBack} color="secondary">
        돌아가기
      </Button>
    </div>
  );
};

export default Game;
