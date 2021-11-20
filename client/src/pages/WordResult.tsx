import React from 'react';
import { useSelector } from 'react-redux';
import './WordResult.css';
import ProgressBar from '../components/share/ProgressBar';
import { RootState } from '../redux/store';

const VoteResult: React.FC = () => {
  const game = useSelector((state: RootState) => state.game);

  // typescript null escape
  // todo: 정말 안좋은 방법인 듯
  if (!game || !game.word) return <></>;

  const { word, spyWord } = game;

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
