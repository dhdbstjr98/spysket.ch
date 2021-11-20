import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './WordResult.css';
import ProgressBar from '../components/share/ProgressBar';
import { RootState, useAppDispatch } from '../redux/store';
import { loadGame } from '../redux/slices/game';

const VoteResult: React.FC = () => {
  const dispatch = useAppDispatch();
  const game = useSelector((state: RootState) => state.game);

  // typescript null escape
  // todo: 정말 안좋은 방법인 듯
  if (!game || !game.word) return <></>;

  const { word, spyWord } = game;

  useEffect(() => {
    setTimeout(() => {
      dispatch(loadGame());
    }, 5000);
  }, []);

  return (
    <div className="word-result">
      <ProgressBar time={5} />
      <div className="result-message">
        <div className="result">
          {word === spyWord ? (
            <strong>스파이 승리</strong>
          ) : (
            <strong>시민 승리</strong>
          )}
        </div>
        <table>
          <tbody>
            <tr>
              <th>제시어</th>
              <td>{word}</td>
            </tr>
            <tr>
              <th>입력 단어</th>
              <td>{spyWord}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoteResult;
