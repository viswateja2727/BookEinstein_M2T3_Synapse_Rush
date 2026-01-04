import { useState, useCallback } from 'react';
import { StartScreen } from './StartScreen';
import { GameScreen } from './GameScreen';
import { EndScreen } from './EndScreen';
import { SoundToggle } from './SoundToggle';

type GameState = 'start' | 'playing' | 'end';

const FLOATING_EMOJIS = ['🧠', '⚡', '🤖', '💡', '🎯', '✨', '🚀', '🔮', '💭', '🎮', '📚', '🌟'];

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
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Colorful animated background shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Soft colorful blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-200/40 to-orange-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-br from-cyan-200/40 to-blue-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-gradient-to-br from-pink-200/40 to-purple-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-green-200/40 to-teal-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Floating emojis */}
        {FLOATING_EMOJIS.map((emoji, index) => (
          <div
            key={index}
            className="absolute text-3xl md:text-4xl opacity-30 animate-bounce-slow select-none"
            style={{
              left: `${(index * 8) + 2}%`,
              top: `${(index % 4) * 25 + 5}%`,
              animationDelay: `${index * 0.3}s`,
              animationDuration: `${3 + (index % 3)}s`,
            }}
          >
            {emoji}
          </div>
        ))}
        
        {/* Additional floating elements on right side */}
        {['🎨', '🧩', '🎪', '🌈'].map((emoji, index) => (
          <div
            key={`right-${index}`}
            className="absolute text-2xl md:text-3xl opacity-25 floating select-none"
            style={{
              right: `${(index * 10) + 5}%`,
              bottom: `${(index * 20) + 10}%`,
              animationDelay: `${index * 0.5 + 1}s`,
            }}
          >
            {emoji}
          </div>
        ))}
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
