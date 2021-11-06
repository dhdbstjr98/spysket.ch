import React, { useState } from 'react';
import TextField from '../components/share/TextField';
import Button from '../components/share/Button';
import { getSocket } from '../socket';

const Lobby: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');

  const enterRoom = (isCreation: boolean) => {
    getSocket().emit('enter', {
      name,
      room,
      isCreation,
    });
  };
  const makeRoom = () => enterRoom(true);
  const joinRoom = () => enterRoom(false);

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
        onClick={joinRoom}
        color="primary"
        disabled={name === '' || room === ''}
      >
        방 입장하기
      </Button>
    </div>
  );
};

export default Lobby;
