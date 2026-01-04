import { Play, Zap, Brain, Clock, Star } from 'lucide-react';
import { BrainMascot } from './BrainMascot';
import { Button } from '@/components/ui/button';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-8">
      {/* Title */}
      <div className="text-center animate-slide-up">
        <h1 className="text-5xl md:text-7xl font-black gradient-text mb-2">
          SYNAPSE RUSH
        </h1>
        <p className="text-xl text-muted-foreground font-semibold">
          Learn AI concepts at lightning speed! ⚡
        </p>
      </div>

      {/* Mascot */}
      <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
        <BrainMascot state="idle" size="lg" />
      </div>

      {/* How to Play */}
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full animate-slide-up"
        style={{ animationDelay: '0.4s' }}
      >
        <div className="bg-card rounded-2xl p-5 text-center border border-border">
          <Brain className="w-10 h-10 text-primary mx-auto mb-2" />
          <h3 className="font-bold text-foreground mb-1">Match Concepts</h3>
          <p className="text-sm text-muted-foreground">Connect AI terms to their meanings</p>
        </div>
        <div className="bg-card rounded-2xl p-5 text-center border border-border">
          <Clock className="w-10 h-10 text-accent mx-auto mb-2" />
          <h3 className="font-bold text-foreground mb-1">Beat the Clock</h3>
          <p className="text-sm text-muted-foreground">60 seconds to match them all!</p>
        </div>
        <div className="bg-card rounded-2xl p-5 text-center border border-border">
          <Star className="w-10 h-10 text-warning mx-auto mb-2" />
          <h3 className="font-bold text-foreground mb-1">Earn Stars</h3>
          <p className="text-sm text-muted-foreground">Build streaks for bonus points</p>
        </div>
      </div>

      {/* Start Button */}
      <Button
        onClick={onStart}
        size="lg"
        className="animate-scale-in text-xl font-bold px-12 py-8 rounded-2xl 
                   bg-gradient-to-r from-primary to-accent hover:scale-110 
                   transition-transform duration-300 text-primary-foreground"
        style={{ animationDelay: '0.6s' }}
      >
        <Play className="w-8 h-8 mr-2" />
        START GAME
        <Zap className="w-8 h-8 ml-2" />
      </Button>

      {/* Tips */}
      <div 
        className="text-center text-muted-foreground text-sm animate-slide-up max-w-md"
        style={{ animationDelay: '0.8s' }}
      >
        <p>💡 <strong>Tip:</strong> Wrong answers cost 50 points and 3 seconds!</p>
        <p className="mt-1">🔥 Build streaks for multiplied points!</p>
      </div>
    </div>
  );
};
