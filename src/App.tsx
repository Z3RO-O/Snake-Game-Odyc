import React from 'react';
import { SnakeGame } from '@/components/SnakeGame';

const App: React.FC = () => {
  return (
    <div className="min-h-screen pb-16">
      <SnakeGame />
    </div>
  );
};

export default App;