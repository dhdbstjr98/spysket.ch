import React from 'react';
import './UserListItem.css';
import { User } from '../../redux/slices/game';

type Props = User & {
  turn: number;
  active: boolean;
  isVoting: boolean;
  onSelect: () => void;
};

const UserListItem: React.FC<Props> = ({
  name,
  point,
  votedCount,
  turn,
  active,
  isVoting,
  onSelect,
}: Props) => {
  const handleClick = () => {
    if (isVoting) onSelect();
  };

  return (
    <li
      className={`user-list-item turn-${turn} ${active && 'active'}`}
      onClick={handleClick}
    >
      <div className="name">{name}</div>
      {isVoting ? (
        <div className="voted-count">
          {votedCount !== undefined &&
            [...Array(votedCount)].map(() => '●').join('')}
        </div>
      ) : (
        <div className="point">{point}</div>
      )}
    </li>
  );
};

export default UserListItem;
