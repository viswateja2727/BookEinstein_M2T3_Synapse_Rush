import { useState } from 'react';

interface AnswerCardProps {
  definition: string;
  emoji: string;
  onClick: () => void;
  disabled: boolean;
  isCorrect?: boolean | null;
  delay?: number;
}

export const AnswerCard = ({
  definition,
  emoji,
  onClick,
  disabled,
  isCorrect,
  delay = 0,
}: AnswerCardProps) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setClicked(true);
    onClick();
    setTimeout(() => setClicked(false), 500);
  };

  const getStateClass = () => {
    if (isCorrect === true) return 'correct';
    if (isCorrect === false && clicked) return 'wrong';
    return '';
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`game-card w-full text-left animate-scale-in ${getStateClass()}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl">{emoji}</span>
        <p className="text-lg font-semibold text-card-foreground leading-tight">
          {definition}
        </p>
      </div>
    </button>
  );
};
