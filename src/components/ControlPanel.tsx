import React from 'react';
import type { HighScore } from '@/hooks/useHighScores';

interface ControlPanelProps {
  playerName: string;
  onPlayerNameChange: (name: string) => void;
  onStartGame: () => void;
  onNewGame: () => void;
  highScores: HighScore[];
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  playerName,
  onPlayerNameChange,
  onStartGame,
  onNewGame,
  highScores
}) => {
  return (
    <div className="flex flex-col h-full p-5 bg-slate-800/70 border-2 border-cyan-400/30 rounded-xl w-80">
      <h3 className="text-cyan-400 text-xl font-bold text-center mb-5">Game Controls</h3>
      
      {/* Player Name Input */}
      <div className="flex flex-col gap-2 mb-5">
        <label className="text-cyan-400 font-bold text-sm">Player Name:</label>
        <input
          type="text"
          placeholder="Z3RO-O"
          value={playerName}
          onChange={(e) => onPlayerNameChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              onStartGame();
            }
          }}
          className="w-full px-3 py-2 text-white bg-gray-700 border-2 border-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      {/* Game Buttons */}
      <div className="flex flex-col gap-4 mb-5">
        <button
          onClick={onStartGame}
          className="w-full text-lg px-4 py-3 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition-all duration-200 shadow-lg hover:shadow-cyan-400/30"
        >
          🎮 Start Game
        </button>
        <button
          onClick={onNewGame}
          className="w-full text-lg px-4 py-3 bg-orange-400 text-black font-bold rounded-lg hover:bg-orange-300 transition-all duration-200 shadow-lg hover:shadow-orange-400/30"
        >
          🔄 New Game
        </button>
      </div>

      {/* High Scores */}
      <div className="flex flex-col flex-1 min-h-0">
        <h4 className="text-cyan-400 font-bold text-lg mb-3 text-center">🏆 High Scores</h4>
        <div className="flex-1 overflow-y-auto overflow-x-hidden border border-cyan-400/30 rounded-lg p-2 bg-slate-800/50 scrollbar-thin scrollbar-thumb-cyan-400/80 scrollbar-track-transparent hover:scrollbar-thumb-cyan-300/80">
          {highScores.length === 0 ? (
            <div className="text-center text-gray-400 py-5">
              No high scores yet!<br />
              Be the first to set a record!
            </div>
          ) : (
            <div className="space-y-2">
              {highScores.map((score, index) => (
                <div
                  key={score.id}
                  className="flex justify-between items-center p-2 bg-cyan-400/10 rounded border border-cyan-400/20"
                >
                  <span className="text-cyan-400 font-bold text-sm">{index + 1}.</span>
                  <span className="flex-1 mx-2 text-white text-sm truncate">{score.name}</span>
                  <span className="text-orange-400 font-bold text-sm">{score.score}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 