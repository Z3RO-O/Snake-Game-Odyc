import React from 'react';

interface GameOverModalProps {
  isVisible: boolean;
  score: number;
  isNewHighScore: boolean;
  onNewGame: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isVisible,
  score,
  isNewHighScore,
  onNewGame
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 border-4 border-red-500 rounded-2xl p-8 text-center max-w-md w-full mx-4 shadow-2xl animate-pulse">
        <div className="mb-6">
          <h2 className="text-6xl font-extrabold text-red-500 mb-4 drop-shadow-[0_0_20px_rgba(239,68,68,0.7)]">
            GAME OVER!
          </h2>
          <div className="text-2xl text-white mb-4">
            Final Score: <span className="text-orange-400 font-bold">{score}</span>
          </div>
          
          {isNewHighScore && (
            <div className="mb-4 p-4 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border-2 border-yellow-400 rounded-lg">
              <div className="text-3xl mb-2">🎉</div>
              <div className="text-yellow-400 font-bold text-xl animate-bounce">
                NEW HIGH SCORE!
              </div>
              <div className="text-yellow-300 text-sm mt-2">
                Congratulations! You've set a new record!
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <button
            onClick={onNewGame}
            className="w-full px-6 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold text-xl rounded-lg transition-all duration-200 shadow-lg hover:shadow-orange-500/30 transform hover:scale-105"
          >
            🔄 New Game
          </button>
          
          <div className="text-gray-400 text-sm">
            Press ENTER or SPACE to start a new game
          </div>
        </div>
      </div>
    </div>
  );
}; 