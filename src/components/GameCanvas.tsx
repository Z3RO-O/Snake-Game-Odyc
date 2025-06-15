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
  const animationTimeRef = useRef<number>(0);

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

  // Convert grid position to pixel position with wave animation
  const getAnimatedPosition = useCallback((segment: Position, index: number, time: number) => {
    const baseX = segment.x * GRID_SIZE + GRID_SIZE / 2;
    const baseY = segment.y * GRID_SIZE + GRID_SIZE / 2;
    
    // Add wave motion based on segment index and time
    const waveAmplitude = 3; // How much the snake waves
    const waveFrequency = 0.3; // How fast the wave moves
    const segmentOffset = index * 0.5; // Offset between segments
    
    const waveX = Math.sin(time * waveFrequency + segmentOffset) * waveAmplitude;
    const waveY = Math.cos(time * waveFrequency + segmentOffset) * waveAmplitude * 0.5;
    
    return {
      x: baseX + waveX,
      y: baseY + waveY
    };
  }, [GRID_SIZE]);

  // Draw realistic snake with curves
  const drawRealisticSnake = useCallback((ctx: CanvasRenderingContext2D, time: number) => {
    if (gameState.snake.length === 0) return;
    
    // Get animated positions for all segments
    const animatedPositions = gameState.snake.map((segment, index) => 
      getAnimatedPosition(segment, index, time)
    );
    
    // Draw snake body as a curved path
    if (animatedPositions.length > 1) {
      ctx.strokeStyle = '#22d3ee'; // cyan-400
      ctx.lineWidth = GRID_SIZE * 0.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Create gradient for body
      const gradient = ctx.createLinearGradient(
        animatedPositions[0].x, animatedPositions[0].y,
        animatedPositions[animatedPositions.length - 1].x, animatedPositions[animatedPositions.length - 1].y
      );
      gradient.addColorStop(0, '#06b6d4'); // Head color
      gradient.addColorStop(0.3, '#22d3ee'); // Body color
      gradient.addColorStop(1, '#0891b2'); // Tail color
      ctx.strokeStyle = gradient;
      
      // Draw curved path through all segments
      ctx.beginPath();
      ctx.moveTo(animatedPositions[0].x, animatedPositions[0].y);
      
      for (let i = 1; i < animatedPositions.length; i++) {
        const current = animatedPositions[i];
        const previous = animatedPositions[i - 1];
        
        if (i === 1) {
          ctx.lineTo(current.x, current.y);
        } else {
          // Use quadratic curves for smooth snake body
          const controlX = (previous.x + current.x) / 2;
          const controlY = (previous.y + current.y) / 2;
          ctx.quadraticCurveTo(previous.x, previous.y, controlX, controlY);
        }
      }
      ctx.stroke();
      
      // Draw body segments as circles for thickness variation
      animatedPositions.forEach((pos, index) => {
        const segmentSize = index === 0 ? GRID_SIZE * 0.6 : GRID_SIZE * 0.5 * (1 - index / animatedPositions.length * 0.3);
        
        ctx.fillStyle = index === 0 ? '#06b6d4' : '#22d3ee';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, segmentSize / 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Add highlight for 3D effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(pos.x - segmentSize * 0.2, pos.y - segmentSize * 0.2, segmentSize * 0.2, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    
    // Draw snake head with eyes
    if (animatedPositions.length > 0) {
      const head = animatedPositions[0];
      const headSize = GRID_SIZE * 0.7;
      
      // Head shape
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(head.x, head.y, headSize / 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Head highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.beginPath();
      ctx.arc(head.x - headSize * 0.2, head.y - headSize * 0.2, headSize * 0.25, 0, Math.PI * 2);
      ctx.fill();
      
      // Eyes
      const eyeSize = headSize * 0.15;
      const eyeOffset = headSize * 0.25;
      
      // Determine eye position based on direction
      let eyeX1, eyeY1, eyeX2, eyeY2;
      if (gameState.direction.x !== 0) {
        // Moving horizontally
        eyeX1 = head.x + gameState.direction.x * eyeOffset;
        eyeY1 = head.y - eyeOffset;
        eyeX2 = head.x + gameState.direction.x * eyeOffset;
        eyeY2 = head.y + eyeOffset;
      } else {
        // Moving vertically
        eyeX1 = head.x - eyeOffset;
        eyeY1 = head.y + gameState.direction.y * eyeOffset;
        eyeX2 = head.x + eyeOffset;
        eyeY2 = head.y + gameState.direction.y * eyeOffset;
      }
      
      // Draw eyes
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(eyeX1, eyeY1, eyeSize, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(eyeX2, eyeY2, eyeSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Eye highlights
      ctx.fillStyle = '#22d3ee';
      ctx.beginPath();
      ctx.arc(eyeX1 + eyeSize * 0.3, eyeY1 - eyeSize * 0.3, eyeSize * 0.4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(eyeX2 + eyeSize * 0.3, eyeY2 - eyeSize * 0.3, eyeSize * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [gameState.snake, gameState.direction, GRID_SIZE, getAnimatedPosition]);

  // Drawing function
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Update animation time
    animationTimeRef.current += 0.1;
    
    // Clear canvas
    ctx.fillStyle = '#0f172a'; // slate-900
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw realistic snake
    drawRealisticSnake(ctx, animationTimeRef.current);
    
    // Draw food as an apple
    const foodX = gameState.food.x * GRID_SIZE + GRID_SIZE / 2;
    const foodY = gameState.food.y * GRID_SIZE + GRID_SIZE / 2;
    const appleSize = GRID_SIZE * 0.8;
    
    // Apple body
    ctx.fillStyle = '#dc2626'; // red-600
    ctx.beginPath();
    ctx.arc(foodX, foodY, appleSize / 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Apple highlight
    ctx.fillStyle = '#fca5a5'; // red-300 (lighter red for highlight)
    ctx.beginPath();
    ctx.arc(foodX - appleSize * 0.2, foodY - appleSize * 0.2, appleSize * 0.2, 0, Math.PI * 2);
    ctx.fill();
    
    // Apple stem
    ctx.strokeStyle = '#22c55e'; // green-500
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(foodX, foodY - appleSize / 2);
    ctx.lineTo(foodX + 2, foodY - appleSize / 2 - 4);
    ctx.stroke();
  }, [gameState.food, GRID_SIZE, CANVAS_WIDTH, CANVAS_HEIGHT, drawRealisticSnake]);

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

  // Animation loop for continuous wave motion
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };
    
    if (gameState.gameStarted) {
      animate();
    } else {
      draw(); // Draw once when not started
    }
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [draw, gameState.gameStarted]);

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
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="border-2 border-cyan-400 rounded-lg bg-slate-900 max-w-full max-h-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
          tabIndex={0}
        />
        
        {/* Game Cover Overlay */}
        {!gameState.gameStarted && (
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-sm border-2 border-cyan-400 rounded-lg flex flex-col items-center justify-center">
            <div className="text-center space-y-6">
              <div className="text-6xl animate-pulse">🐍</div>
              <h3 className="text-3xl font-bold text-cyan-400 mb-4">
                Ready to Play?
              </h3>
              <div className="space-y-3 text-gray-300">
                <p className="text-lg">Enter your name and click Start Game</p>
                <p className="text-sm">or press Enter to begin!</p>
              </div>
              <div className="mt-8 space-y-2 text-sm text-gray-400">
                <p>🎮 Use arrow keys to control the snake</p>
                <p>🍎 Eat food to grow and score points</p>
                <p>⚠️ Don't hit walls or yourself!</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-center text-gray-400 text-sm">
        Use arrow keys to control the snake
      </div>
    </div>
  );
}; 