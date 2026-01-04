import { Star } from 'lucide-react';
import { GAME_CONFIG } from './GameData';

interface StarRatingProps {
  score: number;
}

export const StarRating = ({ score }: StarRatingProps) => {
  const { starThresholds } = GAME_CONFIG;

  const getStarCount = (): number => {
    if (score >= starThresholds.threeStars) return 3;
    if (score >= starThresholds.twoStars) return 2;
    if (score >= starThresholds.oneStar) return 1;
    return 0;
  };

  const starCount = getStarCount();

  return (
    <div className="flex gap-3 justify-center">
      {[1, 2, 3].map((star) => (
        <Star
          key={star}
          className={`w-16 h-16 star-icon ${star <= starCount ? 'filled fill-warning' : 'text-muted'}`}
          style={{ animationDelay: `${star * 0.2}s` }}
        />
      ))}
    </div>
  );
};
