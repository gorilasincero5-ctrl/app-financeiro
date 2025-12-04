import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  filled?: boolean;
  onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({ name, className = '', filled = false, onClick }) => {
  return (
    <span 
      onClick={onClick}
      className={`material-symbols-outlined ${filled ? 'fill-1' : ''} ${className}`}
    >
      {name}
    </span>
  );
};