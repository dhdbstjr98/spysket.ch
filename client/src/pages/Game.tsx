/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { useSelector } from 'react-redux';
import ProgressBar from '../components/share/ProgressBar';
import { RootState, useAppDispatch } from '../redux/store';
import UserList from '../components/game/UserList';
import Canvas from '../components/game/Canvas';

import './Game.css';
import Button from '../components/share/Button';
import { clearGame } from '../redux/slices/game';

const Game: React.FC = () => {
  const game = useSelector((state: RootState) => state.game);
  const dispatch = useAppDispatch();

  // typescript null escape
  // todo: 정말 안좋은 방법인 듯
  if (!game || game.turn === undefined || game.isSpy === undefined)
    return <></>;

  const { room, word, users, turn, isSpy } = game;

  const handleExit = () => {
    dispatch(clearGame());
  };

  return (
    <div className="game">
      <ProgressBar time={20} uniqueKey={turn} />
      <h2>
        <span className="room-name">{room}</span>
        {!isSpy && <span className="word">(제시어 : {word})</span>}
      </h2>
      <div className="game-container">
        <div className="left">
          <UserList users={users} turn={turn} />
          <Button color="secondary" onClick={handleExit}>
            나가기
          </Button>
        </div>
        <Canvas />
      </div>
    </div>
  );
};

export default Game;
