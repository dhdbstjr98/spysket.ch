import React, { useState } from 'react';
import './UserList.css';
import UserListItem from './UserListItem';
import { Status, Turn, User } from '../../redux/slices/game';

interface Props {
  users: User[];
  turn: Turn;
  status: Status;
  onSelect: (name: string) => void;
}

const UserList: React.FC<Props> = ({
  users,
  turn,
  status,
  onSelect,
}: Props) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (name: string) => () => {
    if (!selected) {
      onSelect(name);
      setSelected(name);
    }
  };

  return (
    <ul
      className={`user-list ${
        (status === 'voting' || status === 'answering') && 'voting'
      } ${(selected || status === 'answering') && 'voted'}`}
    >
      {users.map((user, i) => (
        <UserListItem
          key={user.name}
          {...user}
          turn={i}
          active={
            (status === 'drawing' && turn === i) ||
            ((status === 'voting' || status === 'answering') &&
              selected === user.name)
          }
          isVoting={status === 'voting' || status === 'answering'}
          onSelect={handleSelect(user.name)}
        />
      ))}
    </ul>
  );
};

export default UserList;
