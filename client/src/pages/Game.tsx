/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProgressBar from '../components/share/ProgressBar';
import { RootState } from '../redux/store';
import UserList from '../components/game/UserList';
import Canvas from '../components/game/Canvas';

import './Game.css';
import Button from '../components/share/Button';
import TextField from '../components/share/TextField';
import { getSocket } from '../socket';

const Game: React.FC = () => {
  const game = useSelector((state: RootState) => state.game);
  const [answer, setAnswer] = useState<string>('');

  // typescript null escape
  // todo: 정말 안좋은 방법인 듯
  if (!game || game.turn === undefined || game.isSpy === undefined)
    return <></>;

  const { room, word, users, turn, isSpy, status } = game;

  const lastFabricObject = useSelector(
    (state: RootState) => state.game?.lastFabricObject,
  ) as fabric.Path;

  useEffect(() => {
    if (status === 'voting') toast.info('누가 스파이인지 투표해주세요!');
    else if (status === 'answering')
      toast.info('스파이가 제시어를 맞추는 중입니다.');
  }, [status]);

  useEffect(() => {
    toast.info(`${users[turn].name}님 차례!`);
  }, [turn]);

  const handleExit = () => {
    getSocket().emit('exitRoom', {});
  };

  const handleSelect = (name: string) => {
    getSocket().emit('voteSpy', { name });
  };

  const handleAnswer = () => {
    getSocket().emit('setSpyWord', { spyWord: answer });
  };

  const handleDraw = (object: fabric.Path) => {
    getSocket().emit('draw', { object });
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
          <div className="bottom">
            {isSpy && status === 'answering' && (
              <div className="spy-box">
                <TextField text={answer} setText={setAnswer} />
                <Button
                  color="highlight"
                  onClick={handleAnswer}
                  disabled={answer === ''}
                >
                  제시어 맞추기!
                </Button>
              </div>
            )}
            <Button color="secondary" onClick={handleExit}>
              나가기
            </Button>
          </div>
        </div>
        <Canvas onDraw={handleDraw} lastFabricObject={lastFabricObject} />
      </div>
    </div>
  );
};

export default Game;
