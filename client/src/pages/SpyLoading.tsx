import React from 'react';
import './SpyLoading.css';
import ProgressBar from '../components/share/ProgressBar';

const Game: React.FC = () => {
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
