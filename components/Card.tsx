import React, { ReactNode } from 'react';

interface CardProps {
  isFlipped: boolean;
  frontContent: ReactNode;
  backContent: ReactNode;
}

const Card: React.FC<CardProps> = ({ isFlipped, frontContent, backContent }) => {
  return (
    <div className="w-full h-full perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-in-out transform-style-preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 rounded-2xl shadow-2xl overflow-hidden">
          {backContent}
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl shadow-2xl overflow-hidden">
          {frontContent}
        </div>
      </div>
    </div>
  );
};

export default Card;