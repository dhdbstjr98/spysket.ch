import React from 'react';
import './UserListItem.css';
import { User } from '../redux/slices/game';

type Props = User;

const UserListItem: React.FC<Props> = ({ name, ready }: Props) => {
  return <li className={`user-list-item ${ready ? 'ready' : ''}`}>{name}</li>;
};

export default UserListItem;
