import { useState, useCallback } from 'react';
import { StartScreen } from './StartScreen';
import { GameScreen } from './GameScreen';
import { EndScreen } from './EndScreen';
import { SoundToggle } from './SoundToggle';

type GameState = 'start' | 'playing' | 'end';

export const SynapseRush = () => {
  const [gameState, setGameState] = useState<GameState>('start');
  const [finalScore, setFinalScore] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);

  const handleStart = useCallback(() => {
    setGameState('playing');
  }, []);

  const handleGameOver = useCallback((score: number, matched: number) => {
    setFinalScore(score);
    setMatchedCount(matched);
    setGameState('end');
  }, []);

  const handleRestart = useCallback(() => {
    setFinalScore(0);
    setMatchedCount(0);
    setGameState('start');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background decoration - playful light bubbles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-20 w-48 h-48 bg-gradient-to-br from-accent/20 to-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-gradient-to-br from-success/15 to-success/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <SoundToggle />

      <div className="relative z-10">
        {gameState === 'start' && <StartScreen onStart={handleStart} />}
        {gameState === 'playing' && <GameScreen onGameOver={handleGameOver} />}
        {gameState === 'end' && (
          <EndScreen
            score={finalScore}
            matched={matchedCount}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
};
