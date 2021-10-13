import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './VoteResult.css';
import ProgressBar from '../components/share/ProgressBar';
import { RootState, useAppDispatch } from '../redux/store';
import { loadGame } from '../redux/slices/game';

const VoteResult: React.FC = () => {
  const dispatch = useAppDispatch();
  const game = useSelector((state: RootState) => state.game);

  // typescript null escape
  // todo: 정말 안좋은 방법인 듯
  if (!game || !game.votedUser) return <></>;

  const { votedUser } = game;

  useEffect(() => {
    setTimeout(() => {
      dispatch(loadGame());
    }, 5000);
  }, []);

  return (
    <div className="vote-result">
      <ProgressBar time={5} />
      <div className="result-message">
        <div className="result">
          <strong>스파이 승리</strong>
        </div>
        <p>
          {votedUser}님은
          <br />
          스파이가 아니었습니다.
        </p>
      </div>
    </div>
  );
};

export default VoteResult;
