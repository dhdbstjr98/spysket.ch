import React, { useState } from 'react';
import TextField from '../components/TextField';
import Button from '../components/Button';

const Lobby: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');

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
        onClick={() => {
          console.log('d');
        }}
        color="highlight"
        disabled={name === '' || room === ''}
      >
        방 만들기
      </Button>
      <Button
        onClick={() => {
          console.log('d');
        }}
        color="primary"
        disabled={name === '' || room === ''}
      >
        방 입장하기
      </Button>
    </div>
  );
};

export default Lobby;
