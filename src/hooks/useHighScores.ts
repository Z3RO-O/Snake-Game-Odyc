import { useState, useCallback } from 'react';

export interface HighScore {
  id: number;
  name: string;
  score: number;
  date: string;
}

const HIGH_SCORES_KEY = 'high-scores';
const MAX_HIGH_SCORES = 10;

// Default high scores
const defaultHighScores: HighScore[] = [];

export const useHighScores = () => {
  const [highScores, setHighScores] = useState<HighScore[]>(() => {
    try {
      const stored = localStorage.getItem(HIGH_SCORES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      return defaultHighScores;
    } catch (error) {
      console.error('Error loading high scores:', error);
      return defaultHighScores;
    }
  });

  const saveHighScores = useCallback((scores: HighScore[]) => {
    try {
      localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(scores));
      setHighScores(scores);
    } catch (error) {
      console.error('Error saving high scores:', error);
    }
  }, []);

  const addScore = useCallback((name: string, score: number): boolean => {
    const newScore: HighScore = {
      id: Date.now() + Math.random(), // Unique ID
      name: name.trim() || 'Anonymous',
      score,
      date: new Date().toISOString().split('T')[0]
    };

    const updatedScores = [...highScores, newScore];
    updatedScores.sort((a, b) => b.score - a.score);
    
    const topScores = updatedScores.slice(0, MAX_HIGH_SCORES);
    saveHighScores(topScores);

    return topScores.some(s => s.id === newScore.id);
  }, [highScores, saveHighScores]);

  const isHighScore = useCallback((score: number): boolean => {
    return highScores.length < MAX_HIGH_SCORES || score > highScores[highScores.length - 1].score;
  }, [highScores]);

  const isNewRecord = useCallback((score: number): boolean => {
    return highScores.length === 0 || score > highScores[0].score;
  }, [highScores]);

  const getPlayerBestScore = useCallback((playerName: string): number => {
    const playerScores = highScores.filter(s => s.name.toLowerCase() === playerName.toLowerCase());
    return playerScores.length > 0 ? Math.max(...playerScores.map(s => s.score)) : 0;
  }, [highScores]);

  const clearHighScores = useCallback(() => {
    localStorage.removeItem(HIGH_SCORES_KEY);
    setHighScores([]);
  }, []);

  return {
    highScores,
    addScore,
    isHighScore,
    isNewRecord,
    getPlayerBestScore,
    clearHighScores
  };
}; 