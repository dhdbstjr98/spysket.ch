import React from 'react';
import './VoteItem.css';

interface Props {
  name: string;
  count: number;
  active: boolean;
  onSelect: () => void;
}

const Vote: React.FC<Props> = ({ name, count, active, onSelect }: Props) => {
  return (
    <li className={`vote-item ${active ? 'active' : ''}`} onClick={onSelect}>
      <div className="vote-item-name">{name}</div>
      <div className="vote-item-count">{count}</div>
    </li>
  );
};

export default Vote;
