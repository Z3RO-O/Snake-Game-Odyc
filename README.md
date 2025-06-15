# 🐍 Classic Snake Game

A modern, responsive implementation of the classic Nokia Snake game built with React, TypeScript, and Tailwind CSS. Featuring automatic snake movement, high score tracking, and a beautiful split-screen UI design.

## ✨ Features

🎮 **Classic Gameplay**

- Automatic snake movement with directional control
- Collision detection with walls and self
- Food collection and score tracking
- Smooth 150ms game loop for authentic feel

🏆 **High Score System**

- Persistent high score storage (localStorage)
- Unique player ID system to prevent conflicts
- Top 10 leaderboard with player names and dates
- New record celebrations with animations

🎨 **Modern UI/UX**

- Split-screen layout (controls left, game right)
- Tailwind CSS styling with cyan/orange theme
- Custom scrollbars and hover effects
- Responsive design optimized for laptops
- Beautiful gradient backgrounds

⌨️ **Keyboard Controls**

- Arrow keys for snake direction
- ENTER to start game
- SPACE to start new game (clears player name)
- Full keyboard navigation support

🔧 **Technical Features**

- React 19 with TypeScript
- Vite for fast development and builds
- HTML5 Canvas for smooth rendering
- Custom React hooks for state management
- Performance optimized with useCallback

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
4. **Collect Food**: Guide the snake to the orange food squares
5. **Avoid Collisions**: Don't hit walls or the snake's own body
6. **Beat High Scores**: Try to achieve the highest score possible!

### Keyboard Shortcuts

- **ENTER**: Start game (when name is entered)
- **SPACE**: Start new game (clears player name)
- **Arrow Keys**: Control snake direction during gameplay

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
│   └── useHighScores.ts   # High score management
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

### Visual Design

- **Snake**: Cyan-colored segments with distinct head
- **Food**: Orange squares randomly positioned
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

## 🎉 Enjoy the Game

Have fun playing this nostalgic Snake game! Try to beat your high scores and challenge your friends! 🏆🐍
