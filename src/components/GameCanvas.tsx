import React, { useRef, useEffect, useCallback } from 'react';

export interface Position {
  x: number;
  y: number;
}

export interface GameState {
  snake: Position[];
  food: Position;
  direction: Position;
  score: number;
  gameStarted: boolean;
  playerName: string;
}

interface GameCanvasProps {
  gameState: GameState;
  onGameOver: () => void;
  onScoreUpdate: (score: number) => void;
  onDirectionChange: (direction: Position) => void;
  onSnakeUpdate: (snake: Position[]) => void;
  onFoodUpdate: (food: Position) => void;
  GRID_SIZE: number;
  CANVAS_WIDTH: number;
  CANVAS_HEIGHT: number;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  gameState,
  onGameOver,
  onScoreUpdate,
  onDirectionChange,
  onSnakeUpdate,
  onFoodUpdate,
  GRID_SIZE,
  CANVAS_WIDTH,
  CANVAS_HEIGHT
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);

  // Generate random food position
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
  }, [CANVAS_WIDTH, CANVAS_HEIGHT, GRID_SIZE]);

  // Check collision with walls or self
  const checkCollision = useCallback((head: Position, snake: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= Math.floor(CANVAS_WIDTH / GRID_SIZE) || 
        head.y < 0 || head.y >= Math.floor(CANVAS_HEIGHT / GRID_SIZE)) {
      return true;
    }
    
    // Self collision (check against current snake body, excluding the head itself)
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
  }, [CANVAS_WIDTH, CANVAS_HEIGHT, GRID_SIZE]);

  // Drawing function
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.fillStyle = '#0f172a'; // slate-900
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw snake
    gameState.snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#06b6d4' : '#22d3ee'; // cyan-500 for head, cyan-400 for body
      ctx.fillRect(
        segment.x * GRID_SIZE + 1,
        segment.y * GRID_SIZE + 1,
        GRID_SIZE - 2,
        GRID_SIZE - 2
      );
    });
    
    // Draw food
    ctx.fillStyle = '#fb923c'; // orange-400
    ctx.fillRect(
      gameState.food.x * GRID_SIZE + 1,
      gameState.food.y * GRID_SIZE + 1,
      GRID_SIZE - 2,
      GRID_SIZE - 2
    );
  }, [gameState.snake, gameState.food, GRID_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT]);

  // Game loop
  const gameLoop = useCallback(() => {
    if (!gameState.gameStarted) return;

    const newSnake = [...gameState.snake];
    const head = { ...newSnake[0] };
    
    // Move head
    head.x += gameState.direction.x;
    head.y += gameState.direction.y;
    
    // Check collision
    if (checkCollision(head, newSnake)) {
      onGameOver();
      return;
    }
    
    newSnake.unshift(head);
    
    // Check food collision
    if (head.x === gameState.food.x && head.y === gameState.food.y) {
      const newScore = gameState.score + 10;
      onScoreUpdate(newScore);
      
      // Generate new food
      const newFood = generateFood(newSnake);
      onFoodUpdate(newFood);
    } else {
      newSnake.pop();
    }
    
    onSnakeUpdate(newSnake);
    draw();
  }, [gameState, onGameOver, onScoreUpdate, onFoodUpdate, onSnakeUpdate, generateFood, draw, checkCollision]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameState.gameStarted) return;
      
      const keyDirections: { [key: string]: Position } = {
        'ArrowUp': { x: 0, y: -1 },
        'ArrowDown': { x: 0, y: 1 },
        'ArrowLeft': { x: -1, y: 0 },
        'ArrowRight': { x: 1, y: 0 }
      };
      
      const newDirection = keyDirections[e.key];
      if (newDirection) {
        e.preventDefault();
        // Prevent reversing into self
        if (newDirection.x !== -gameState.direction.x || newDirection.y !== -gameState.direction.y) {
          onDirectionChange(newDirection);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.direction, gameState.gameStarted, onDirectionChange]);

  // Game loop effect
  useEffect(() => {
    if (gameState.gameStarted) {
      gameLoopRef.current = setInterval(gameLoop, 150);
      // Focus the canvas when game starts to ensure keyboard events work
      if (canvasRef.current) {
        canvasRef.current.focus();
      }
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState.gameStarted, gameLoop]);

  // Initial draw
  useEffect(() => {
    draw();
  }, [draw, gameState]);

  return (
    <div className="flex flex-col items-center justify-center p-5 bg-slate-800/70 border-2 border-cyan-400/30 rounded-xl flex-1 h-full">
      <div className="mb-4 text-center">
        <h2 className="text-cyan-400 text-2xl font-bold mb-2">
          🐍 Snake Game
        </h2>
        <div className="flex justify-center gap-8 text-lg">
          <div>
            <span className="text-orange-400 font-bold">Score: </span>
            <span className="text-white font-bold">{gameState.score}</span>
          </div>
          <div>
            <span className="text-cyan-400 font-bold">Player: </span>
            <span className="text-white font-bold">{gameState.playerName || 'Anonymous'}</span>
          </div>
        </div>
      </div>
      
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="border-2 border-cyan-400 rounded-lg bg-slate-900 max-w-full max-h-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
        tabIndex={0}
      />
      
      <div className="mt-4 text-center text-gray-400 text-sm">
        Use arrow keys to control the snake
      </div>
    </div>
  );
}; 