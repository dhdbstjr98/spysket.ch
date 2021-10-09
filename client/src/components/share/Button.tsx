import React, { ReactNode } from 'react';
import './Button.css';

interface Props {
  onClick: () => void;
  color: 'primary' | 'secondary' | 'highlight';
  disabled?: boolean;
  children: ReactNode;
}

const Button: React.FC<Props> = ({
  onClick,
  color,
  disabled,
  children,
}: Props) => {
  return (
    <button className={`button ${color}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
