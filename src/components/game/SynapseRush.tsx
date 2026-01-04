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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl" />
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
