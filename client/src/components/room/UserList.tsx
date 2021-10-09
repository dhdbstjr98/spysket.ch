import React from 'react';
import './UserList.css';
import UserListItem from './UserListItem';
import UserListEmptyItem from './UserListEmptyItem';
import { User } from '../../redux/slices/game';

interface Props {
  users: User[];
}

const UserList: React.FC<Props> = ({ users }: Props) => {
  return (
    <ul className="user-list">
      {users.map((user) => (
        <UserListItem key={user.name} {...user} />
      ))}
      {[...Array(5 - users.length)].map((_, i) => (
        <UserListEmptyItem key={i} />
      ))}
    </ul>
  );
};

export default UserList;
