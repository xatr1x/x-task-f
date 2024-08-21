import React from 'react';

interface ButtonComponentProps {
  onClick: () => void;
  text: string;
  className: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({ onClick, text, className }) => (
  <button onClick={onClick} className={className}>
    {text}
  </button>
);

export default ButtonComponent;
