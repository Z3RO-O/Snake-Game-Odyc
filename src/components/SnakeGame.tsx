import React, { useState, useEffect, useCallback } from 'react';
import { GameCanvas, type Position, type GameState } from './GameCanvas';
import { ControlPanel } from './ControlPanel';
import { GameOverModal } from './GameOverModal';
import { useHighScores } from '../hooks/useHighScores';

const GRID_SIZE = 20;
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;

export const SnakeGame: React.FC = () => {
  const { highScores, addScore, isNewRecord } = useHighScores();
  
  const [gameState, setGameState] = useState<GameState>({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 10 },
    direction: { x: 1, y: 0 },
    score: 0,
    gameStarted: false,
    playerName: ''
  });

  const [gameRunning, setGameRunning] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [scoreAlreadySaved, setScoreAlreadySaved] = useState(false);

  // Generate initial food position
  const generateFood = useCallback((snake: Position[]): Position => {
    const maxX = Math.floor(CANVAS_WIDTH / GRID_SIZE) - 1;
    const maxY = Math.floor(CANVAS_HEIGHT / GRID_SIZE) - 1;
    
    let food: Position;
    do {
      food = {
        x: Math.floor(Math.random() * (maxX + 1)),
        y: Math.floor(Math.random() * (maxY + 1))
      };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
    
    return food;
  }, []);

  // Initialize game
  const initializeGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    const newFood = generateFood(initialSnake);
    setGameState({
      snake: initialSnake,
      food: newFood,
      direction: { x: 1, y: 0 },
      score: 0,
      gameStarted: false,
      playerName: '' // Clear the player name for new game
    });
    setGameRunning(false);
    setShowGameOver(false);
    setIsNewHighScore(false);
    setScoreAlreadySaved(false);
  }, [generateFood]);

  // Start game
  const startGame = useCallback(() => {
    if (!gameState.playerName.trim()) {
      alert('Please enter your name before starting the game!');
      return;
    }
    
    setGameState(prev => ({
      ...prev,
      gameStarted: true
    }));
    setGameRunning(true);
    setShowGameOver(false);
    setScoreAlreadySaved(false); // Reset for new game
  }, [gameState.playerName]);

  // New game
  const newGame = useCallback(() => {
    initializeGame();
  }, [initializeGame]);

  // Handle game over
  const handleGameOver = useCallback(() => {
    if (scoreAlreadySaved) return; // Prevent multiple saves
    
    setGameRunning(false);
    setGameState(prev => ({ ...prev, gameStarted: false }));
    
    // Check if it's a new record (highest score ever)
    const newRecord = isNewRecord(gameState.score);
    setIsNewHighScore(newRecord);
    
    // Add score to high scores (only once)
    if (gameState.score > 0) {
      addScore(gameState.playerName, gameState.score);
      setScoreAlreadySaved(true);
    }
    
    // Show game over modal after a brief delay
    setTimeout(() => {
      setShowGameOver(true);
    }, 100);
  }, [gameState.score, gameState.playerName, isNewRecord, addScore, scoreAlreadySaved]);

  // Handle score update
  const handleScoreUpdate = useCallback((newScore: number) => {
    setGameState(prev => ({ ...prev, score: newScore }));
  }, []);



  // Handle direction change
  const handleDirectionChange = useCallback((newDirection: Position) => {
    setGameState(prev => ({ ...prev, direction: newDirection }));
  }, []);

  // Handle snake update
  const handleSnakeUpdate = useCallback((newSnake: Position[]) => {
    setGameState(prev => ({ ...prev, snake: newSnake }));
  }, []);

  // Handle food update
  const handleFoodUpdate = useCallback((newFood: Position) => {
    setGameState(prev => ({ ...prev, food: newFood }));
  }, []);

  // Handle player name change
  const handlePlayerNameChange = useCallback((name: string) => {
    setGameState(prev => ({ ...prev, playerName: name }));
  }, []);

  // Handle keyboard input for game controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't handle keyboard shortcuts if user is typing in an input field
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (showGameOver) {
        // Game over screen - Enter or Space to start new game
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          newGame();
        }
      } else if (!gameRunning && !gameState.gameStarted) {
        // Welcome screen - Enter to start game
        if (e.key === 'Enter') {
          startGame();
        }
        // Space to start new game (clear name) - only if not typing in input
        if (e.key === ' ') {
          e.preventDefault();
          newGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameRunning, gameState.gameStarted, showGameOver, startGame, newGame]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
      {/* Control Panel */}
      <div className="p-5 flex flex-col justify-start">
        <ControlPanel
          playerName={gameState.playerName}
          onPlayerNameChange={handlePlayerNameChange}
          onStartGame={startGame}
          onNewGame={newGame}
          highScores={highScores}
        />
      </div>

      {/* Game Area */}
      <div className="flex-1 p-5 flex items-center justify-center min-w-0">
        <GameCanvas
          gameState={gameState}
          onGameOver={handleGameOver}
          onScoreUpdate={handleScoreUpdate}
          onDirectionChange={handleDirectionChange}
          onSnakeUpdate={handleSnakeUpdate}
          onFoodUpdate={handleFoodUpdate}
          GRID_SIZE={GRID_SIZE}
          CANVAS_WIDTH={CANVAS_WIDTH}
          CANVAS_HEIGHT={CANVAS_HEIGHT}
        />
      </div>

      {/* Game Over Modal */}
      <GameOverModal
        isVisible={showGameOver}
        score={gameState.score}
        isNewHighScore={isNewHighScore}
        onNewGame={newGame}
      />
    </div>
  );
}; 