import React, { useEffect } from 'react';
import './Loading.css';
import ProgressBar from '../components/share/ProgressBar';
import { useAppDispatch } from '../redux/store';
import { setWords } from '../redux/slices/game';

const Game: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        setWords([
          {
            name: '칸쵸',
            count: 0,
          },
          {
            name: '노트북',
            count: 1,
          },
          {
            name: '경희대',
            count: 2,
          },
        ]),
      );
    }, 3000);
  }, []);

  return (
    <div className="loading">
      <ProgressBar time={3} />
      <div className="loading-message">
        <strong>스파이</strong>를 고르는 중입니다...
      </div>
    </div>
  );
};

export default Game;
