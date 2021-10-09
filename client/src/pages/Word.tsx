import React from 'react';
import { useSelector } from 'react-redux';
import './Word.css';
import ProgressBar from '../components/share/ProgressBar';
import Vote from '../components/word/Vote';
import { RootState, useAppDispatch } from '../redux/store';
import { setWordCount } from '../redux/slices/game';

const Game: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSelect = (name: string) => {
    console.log(name);
    dispatch(setWordCount({ name, count: 3 }));
  };

  const isSpy = useSelector((state: RootState) => state.game?.isSpy);
  const words = useSelector((state: RootState) => state.game?.words);

  if (isSpy === undefined || isSpy === null)
    return <div>존재할 수 없는 상태입니다.</div>;

  return (
    <div className="word">
      <ProgressBar time={15} />
      {isSpy ? (
        <p>
          당신은 <strong>스파이</strong>입니다.
          <br />
          <br />
          시민들에게 들키지 않고
          <br />
          시민들이 고른 단어를 맞추세요!
        </p>
      ) : (
        <>
          <p>
            당신은 <strong>시민</strong>입니다.
            <br />
            원하는 단어를 골라주세요!
          </p>
          <Vote
            items={words as { name: string; count: number }[]}
            onSelect={handleSelect}
          />
        </>
      )}
    </div>
  );
};

export default Game;
