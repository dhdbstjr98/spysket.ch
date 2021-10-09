import React, { useEffect } from 'react';
import './GameLoading.css';
import ProgressBar from '../components/share/ProgressBar';
import { useAppDispatch } from '../redux/store';
import { setUsers } from '../redux/slices/game';

const Game: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        setUsers([
          {
            name: '오윤석',
            ready: true,
            point: 0,
          },
          {
            name: '홍길동',
            ready: true,
            point: 100,
          },
          {
            name: '테스트',
            ready: true,
            point: 300,
          },
          {
            name: '이름이정말정말긴유저',
            ready: true,
            point: 0,
          },
          {
            name: '뷁',
            ready: true,
            point: 0,
          },
        ]),
      );
    }, 3000);
  }, []);

  return (
    <div className="loading">
      <ProgressBar time={3} />
      <div className="loading-message">게임을 불러오는 중입니다...</div>
    </div>
  );
};

export default Game;
