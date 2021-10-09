import React, { ChangeEvent, useEffect, useRef } from 'react';
import './TextField.css';

interface Props {
  text: string;
  setText: (text: string) => void;
  label?: string;
  required?: boolean;
  focus?: boolean;
}

const TextField: React.FC<Props> = ({
  text,
  setText,
  label,
  required,
  focus,
}: Props) => {
  const input = useRef<HTMLInputElement>(null);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setText(evt.target.value);
  };

  useEffect(() => {
    if (focus && input.current) input.current.focus();
  }, [input]);

  return (
    <label className="text-field">
      {label ? (
        <div className={`label ${required ? 'required' : ''}`}>{label}</div>
      ) : (
        ''
      )}
      <input
        type="text"
        autoComplete="off"
        value={text}
        onChange={handleChange}
        required={required}
        ref={input}
      />
    </label>
  );
};

export default TextField;
