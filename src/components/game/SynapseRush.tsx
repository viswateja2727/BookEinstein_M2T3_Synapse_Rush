import { useState, useCallback } from 'react';
import { StartScreen } from './StartScreen';
import { GameScreen } from './GameScreen';
import { EndScreen } from './EndScreen';
import { SoundToggle } from './SoundToggle';

type GameState = 'start' | 'playing' | 'end';

const FLOATING_EMOJIS = ['🧠', '⚡', '🤖', '💡', '🎯', '✨', '🚀', '📚', '💭', '🎮', '⚛️', '🌟'];

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
    <div className="min-h-screen bg-gradient-to-b from-white via-cyan-50/30 to-white relative overflow-hidden">
      {/* Decorative background elements matching Book Einstein theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Soft cyan/teal gradient blobs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 bg-gradient-to-br from-secondary/15 to-secondary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        
        {/* Floating AI-themed emojis */}
        {FLOATING_EMOJIS.map((emoji, index) => (
          <div
            key={index}
            className="absolute text-2xl md:text-3xl opacity-20 floating select-none"
            style={{
              left: `${(index * 8) + 3}%`,
              top: `${(index % 5) * 20 + 5}%`,
              animationDelay: `${index * 0.4}s`,
              animationDuration: `${4 + (index % 3)}s`,
            }}
          >
            {emoji}
          </div>
        ))}
        
        {/* Decorative wave at bottom like Book Einstein */}
        <svg 
          className="absolute bottom-0 left-0 w-full h-24 text-primary/10"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,50 C360,100 720,0 1080,50 C1260,75 1380,50 1440,50 L1440,100 L0,100 Z"
          />
        </svg>
        <svg 
          className="absolute bottom-0 left-0 w-full h-16 text-primary/5"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,60 C480,20 960,80 1440,40 L1440,100 L0,100 Z"
          />
        </svg>
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
