import { useCallback, useRef } from 'react';

export const useAudio = () => {
  const biteAudioRef = useRef<HTMLAudioElement | null>(null);
  const collisionAudioRef = useRef<HTMLAudioElement | null>(null);

  const playBiteSound = useCallback(() => {
    try {
      // Create audio element if it doesn't exist
      if (!biteAudioRef.current) {
        biteAudioRef.current = new Audio('/src/assets/sound/bite.mp3');
        biteAudioRef.current.volume = 0.5; // Set volume to 50%
        biteAudioRef.current.preload = 'auto';
      }

      // Reset audio to beginning and play
      biteAudioRef.current.currentTime = 0;
      biteAudioRef.current.play().catch((error) => {
        console.log('Bite audio play failed:', error);
      });
    } catch (error) {
      console.log('Bite audio not supported or file not found:', error);
    }
  }, []);

  const playCollisionSound = useCallback(() => {
    try {
      // Create audio element if it doesn't exist
      if (!collisionAudioRef.current) {
        collisionAudioRef.current = new Audio('/src/assets/sound/collision.wav');
        collisionAudioRef.current.volume = 0.7; // Set volume to 70% for more impact
        collisionAudioRef.current.preload = 'auto';
      }

      // Reset audio to beginning and play
      collisionAudioRef.current.currentTime = 0;
      collisionAudioRef.current.play().catch((error) => {
        console.log('Collision audio play failed:', error);
      });
    } catch (error) {
      console.log('Collision audio not supported or file not found:', error);
    }
  }, []);

  return {
    playBiteSound,
    playCollisionSound
  };
}; 