import React from 'react';
import './UserListItem.css';
import { User } from '../../redux/slices/game';

type Props = User & { turn: number; active: boolean };

const UserListItem: React.FC<Props> = ({
  name,
  point,
  turn,
  active,
}: Props) => {
  return (
    <li className={`user-list-item turn-${turn} ${active && 'active'}`}>
      <div className="name">{name}</div>
      <div className="point">{point}</div>
    </li>
  );
};

export default UserListItem;
