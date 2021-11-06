import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import UserList from '../components/room/UserList';
import './Room.css';
import Button from '../components/share/Button';
import { User } from '../redux/slices/game';
import { getSocket } from '../socket';

const Game: React.FC = () => {
  const game = useSelector((state: RootState) => state.game);

  // typescript null escape
  if (game === null) return <></>;

  const { room, users, name } = game;

  const handleBack = () => {
    getSocket().emit('exitRoom', {});
  };

  const handleReady = () => {
    getSocket().emit('ready', {
      ready: !(users.filter((user) => user.name === name)[0] as User).ready,
    });
  };

  return (
    <div className="room">
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
