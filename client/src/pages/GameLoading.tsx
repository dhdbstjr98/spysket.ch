import React from 'react';
import './GameLoading.css';
import ProgressBar from '../components/share/ProgressBar';

const Game: React.FC = () => {
  return (
    <div className="loading">
      <ProgressBar time={3} />
      <div className="loading-message">게임을 불러오는 중입니다...</div>
    </div>
  );
};

export default Game;
