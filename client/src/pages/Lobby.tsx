import React, { useState } from 'react';
import TextField from '../components/share/TextField';
import Button from '../components/share/Button';
import { useAppDispatch } from '../redux/store';
import { setGame } from '../redux/slices/game';

const Lobby: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');

  const dispatch = useAppDispatch();
  const makeRoom = () => {
    dispatch(
      setGame({
        id: 'asdf',
        name: '오윤석',
        room: '테스트룸',
        users: [
          { name: '오윤석', ready: false },
          { name: '홍길동', ready: true },
          { name: '테스트', ready: false },
        ],
        status: 'waiting',
      }),
    );
  };

  return (
    <div className="lobby">
      <TextField
        text={name}
        setText={setName}
        label="닉네임 입력"
        required
        focus
      />
      <TextField text={room} setText={setRoom} label="서버명 입력" required />
      <Button
        onClick={makeRoom}
        color="highlight"
        disabled={name === '' || room === ''}
      >
        방 만들기
      </Button>
      <Button
        onClick={makeRoom}
        color="primary"
        disabled={name === '' || room === ''}
      >
        방 입장하기
      </Button>
    </div>
  );
};

export default Lobby;
