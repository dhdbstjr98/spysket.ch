import React, { useState } from 'react';
import './Vote.css';
import VoteItem from './VoteItem';

interface Item {
  name: string;
  count: number;
}

interface Props {
  items: Item[];
  onSelect: (name: string) => void;
}

const Vote: React.FC<Props> = ({ items, onSelect }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (name: string) => () => {
    if (!selected) {
      onSelect(name);
      setSelected(name);
    }
  };

  return (
    <ul className={`vote ${selected ? 'disabled' : ''}`}>
      {items.map((item) => (
        <VoteItem
          key={item.name}
          {...item}
          active={item.name === selected}
          onSelect={handleSelect(item.name)}
        />
      ))}
    </ul>
  );
};

export default Vote;
