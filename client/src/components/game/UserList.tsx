import React from 'react';
import './UserList.css';
import UserListItem from './UserListItem';
import { Turn, User } from '../../redux/slices/game';

interface Props {
  users: User[];
  turn: Turn;
}

const UserList: React.FC<Props> = ({ users, turn }: Props) => {
  return (
    <ul className="user-list">
      {users.map((user, i) => (
        <UserListItem key={user.name} {...user} turn={i} active={turn === i} />
      ))}
    </ul>
  );
};

export default UserList;
