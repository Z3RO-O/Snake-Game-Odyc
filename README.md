# 🐍 Classic Snake Game

A modern, responsive implementation of the classic Nokia Snake game built with React, TypeScript, and Tailwind CSS. Featuring automatic snake movement, high score tracking, and a beautiful split-screen UI design.

## ✨ Features

🎮 **Classic Gameplay**

- Automatic snake movement with directional control
- Collision detection with walls and self
- Food collection and score tracking
- Smooth 150ms game loop for authentic feel
- **⏸️ Pause/Resume**: Press Esc to pause and resume the game

🏆 **High Score System**

- **Persistent Storage**: Browser localStorage with JSON serialization
- **Unique ID System**: Timestamp + random number prevents data conflicts
- **Top 10 Leaderboard**: Automatically sorted highest to lowest scores
- **Date Tracking**: Each score includes achievement date (YYYY-MM-DD)
- **Smart Detection**: Identifies new records and qualifying scores
- **Player Tracking**: Multiple scores per player with individual best tracking
- **New Record Celebrations**: Animations for beating the #1 score

🎨 **Modern UI/UX**

- Split-screen layout (controls left, game right)
- Tailwind CSS styling with cyan/orange theme
- Custom scrollbars and hover effects
- Responsive design optimized for laptops
- Beautiful gradient backgrounds
- **🪨 Rock Wall Borders**: Textured stone walls with 3D shadows
- **🐍 Realistic Snake Animation**: Flowing serpent with wave motion, curved body, and directional eyes

🔊 **Audio Effects**

- **🍎 Bite Sound**: Audio feedback when eating food (`bite.mp3`)
- **💥 Collision Sound**: Impact sound when hitting walls or self (`collision.wav`)
- Volume-optimized audio with graceful fallback if files missing

⌨️ **Keyboard Controls**

- Arrow keys for snake direction
- **Esc** to pause/unpause game
- ENTER to start game
- SPACE to start new game (clears player name)
- Full keyboard navigation support

🔧 **Technical Features**

- React 19 with TypeScript
- Vite for fast development and builds
- HTML5 Canvas for smooth rendering
- Custom React hooks for state management
- Performance optimized with useCallback
- **60fps Animation**: Smooth wave motion using requestAnimationFrame
- **Path Aliases**: Clean `@/` imports for better code organization

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Z3RO-O/Snake-Game-Odyc
   cd "Snake-Game-Odyc"
   ```

2. **Install dependencies**

   ```bash
   npm i
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

### Build for Production

```bash
npm run build
npm run preview
```

## 🎮 How to Play

1. **Enter Your Name**: Type your player name in the input field (spaces allowed!)
2. **Start Game**: Click "🎮 Start Game" or press ENTER
3. **Control Snake**: Use arrow keys to change direction
   - ⬆️ Up Arrow
   - ⬇️ Down Arrow  
   - ⬅️ Left Arrow
   - ➡️ Right Arrow
4. **Collect Food**: Guide the snake to the red apples 🍎
5. **Avoid Collisions**: Don't hit the rock walls or the snake's own body
6. **Pause Anytime**: Press Esc to pause/resume the game
7. **Beat High Scores**: Try to achieve the highest score possible!

### Keyboard Shortcuts

- **ENTER**: Start game (when name is entered)
- **SPACE**: Start new game (clears player name)
- **Arrow Keys**: Control snake direction during gameplay
- **Esc**: Pause/unpause the game

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4.x
- **Build Tool**: Vite 6.x
- **Canvas**: HTML5 Canvas API
- **Storage**: Browser localStorage
- **Linting**: ESLint with TypeScript support

## 📁 Project Structure

```
src/
├── components/
│   ├── SnakeGame.tsx      # Main game component
│   ├── GameCanvas.tsx     # Game rendering and logic
│   ├── ControlPanel.tsx   # Player controls and high scores
│   └── GameOverModal.tsx  # Game over screen
├── hooks/
│   ├── useHighScores.ts   # High score management
│   └── useAudio.ts        # Audio effects management
├── App.tsx                # App wrapper
├── index.css             # Global styles & scrollbars
└── main.tsx              # Entry point
```

## 🎯 Game Features

### Score System

- **+10 points** per food item collected
- Persistent high score tracking
- Unique player identification system
- Date tracking for each score

### High Score Storage System

The game features a sophisticated high score management system:

**🏆 Storage Mechanism**

- **Browser localStorage**: Scores persist across browser sessions
- **JSON Serialization**: Efficient data storage and retrieval
- **Error Handling**: Graceful fallback if localStorage is unavailable

**🔢 Unique ID System**

- **Timestamp + Random**: Each score gets a unique ID (`Date.now() + Math.random()`)
- **Prevents Conflicts**: Multiple players can have same name without data loss
- **Duplicate Prevention**: Same player can have multiple scores tracked separately

**📊 Score Management**

- **Top 10 Leaderboard**: Only the highest 10 scores are kept
- **Automatic Sorting**: Scores sorted by highest to lowest
- **Date Tracking**: Each score includes the date it was achieved (YYYY-MM-DD format)
- **Player Names**: Supports any player name, defaults to "Anonymous" if empty

**🎯 Smart Features**

- **New Record Detection**: Identifies when a score beats the current #1
- **High Score Qualification**: Checks if score qualifies for top 10
- **Player Best Score**: Tracks individual player's highest achievement
- **Clear Function**: Option to reset all high scores (for development)

### Visual Design

- **Snake**: Realistic animated serpent with wave motion, curved body, gradient colors, and directional eyes
- **Food**: Red apples with highlights and green stems
- **Walls**: Textured rock borders with 3D shadows and realistic stone patterns
- **Background**: Dark slate with gradient borders
- **UI**: Semi-transparent panels with cyan accents

### Responsive Design

- **Canvas Size**: 1000x600px (automatically scales)
- **Split Layout**: 300px control panel + flexible game area
- **Modern Scrollbars**: Custom cyan-themed scrollbars
- **Mobile Friendly**: Touch-friendly button controls

## 🐛 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🆕 Recent Updates

### Version 2.0 - Enhanced Experience

**🎨 Visual Enhancements**

- **Realistic Snake Animation**: Replaced blocky pixels with flowing serpent featuring wave motion
- **Curved Body Rendering**: Smooth quadratic Bézier curves for natural snake movement
- **Directional Eyes**: Snake eyes that follow the direction of movement
- **Rock Wall Borders**: Textured stone walls with 3D shadows and realistic patterns
- **Apple Food Design**: Red apples with highlights and green stems instead of orange squares

**🔊 Audio System**

- **Bite Sound Effects**: Audio feedback when eating food
- **Collision Sound Effects**: Impact sounds when hitting walls or self
- **Volume-Optimized Audio**: Balanced sound levels for immersive experience

**⚡ Performance & Features**

- **60fps Animation**: Smooth wave motion using requestAnimationFrame
- **Pause Functionality**: Press Esc to pause/resume gameplay
- **Path Aliases**: Clean `@/` imports for better code organization
- **Optimized Rendering**: Consistent patterns prevent frame drops

## 🎉 Enjoy the Game

Have fun playing this nostalgic Snake game! Try to beat your high scores and challenge your friends! 🏆🐍

## 🔊 Audio Files

The game includes immersive audio effects that enhance the gameplay experience. Place these audio files in the `src/assets/sound/` directory:

### Required Audio Files

- **`bite.mp3`** - Sound played when the snake eats food (50% volume)
- **`collision.wav`** - Sound played when the snake collides with walls or itself (70% volume)

### Audio Sources

You can find suitable sound effects from free sources like:

- [Freesound.org](https://freesound.org/) - Free sound effects library
- [Zapsplat](https://www.zapsplat.com/) - Professional sound effects
- [BBC Sound Effects Library](https://sound-effects.bbcrewind.co.uk/) - BBC's archive

### Audio Features

- **Graceful Fallback**: Game continues working even if audio files are missing
- **Volume Optimization**: Bite sounds at 50%, collision sounds at 70% for balanced audio
- **Performance Optimized**: Audio elements are reused and preloaded for smooth playback
