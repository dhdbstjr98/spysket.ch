/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProgressBar from '../components/share/ProgressBar';
import { RootState, useAppDispatch } from '../redux/store';
import UserList from '../components/game/UserList';
import Canvas from '../components/game/Canvas';

import './Game.css';
import Button from '../components/share/Button';
import { clearGame, setVotedCount } from '../redux/slices/game';

const Game: React.FC = () => {
  const game = useSelector((state: RootState) => state.game);
  const dispatch = useAppDispatch();

  // typescript null escape
  // todo: 정말 안좋은 방법인 듯
  if (!game || game.turn === undefined || game.isSpy === undefined)
    return <></>;

  const { room, word, users, turn, isSpy, status } = game;

  useEffect(() => {
    if (status === 'voting') toast.info('누가 스파이인지 투표해주세요!');
  }, [status]);

  useEffect(() => {
    toast.info(`${users[turn].name}님 차례!`);
  }, [turn]);

  const handleExit = () => {
    dispatch(clearGame());
  };

  const handleSelect = (name: string) => {
    dispatch(setVotedCount({ name, votedCount: 1 }));
  };

  return (
    <div className="game">
      <ProgressBar time={20} uniqueKey={turn + status} />
      <h2>
        <span className="room-name">{room}</span>
        {!isSpy && <span className="word">(제시어 : {word})</span>}
      </h2>
      <div className="game-container">
        <div className="left">
          <UserList
            users={users}
            turn={turn}
            status={status}
            onSelect={handleSelect}
          />
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
