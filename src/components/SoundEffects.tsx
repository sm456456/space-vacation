import React, { useRef, useCallback } from 'react';

interface SoundEffectsProps {}

const SoundEffects: React.FC<SoundEffectsProps> = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playLightsaberSwing = useCallback(async () => {
    const audioContext = initAudioContext();
    
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    // Create a lightsaber swing sound using Web Audio API
    const duration = 0.8; // seconds
    const currentTime = audioContext.currentTime;

    // Main oscillator for the "whoosh" sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    // Configure oscillator for whoosh effect
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(300, currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(150, currentTime + duration * 0.3);
    oscillator.frequency.exponentialRampToValueAtTime(400, currentTime + duration * 0.7);
    oscillator.frequency.exponentialRampToValueAtTime(200, currentTime + duration);

    // Configure filter for sweeping effect
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, currentTime);
    filter.frequency.exponentialRampToValueAtTime(2000, currentTime + duration * 0.5);
    filter.frequency.exponentialRampToValueAtTime(800, currentTime + duration);
    filter.Q.setValueAtTime(10, currentTime);

    // Configure gain envelope
    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.3, currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.1, currentTime + duration * 0.8);
    gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + duration);

    // Add some high-frequency sparkle
    const sparkleOsc = audioContext.createOscillator();
    const sparkleGain = audioContext.createGain();
    const sparkleFilter = audioContext.createBiquadFilter();

    sparkleOsc.type = 'sine';
    sparkleOsc.frequency.setValueAtTime(2000, currentTime);
    sparkleOsc.frequency.exponentialRampToValueAtTime(4000, currentTime + duration * 0.2);
    sparkleOsc.frequency.exponentialRampToValueAtTime(1500, currentTime + duration);

    sparkleFilter.type = 'highpass';
    sparkleFilter.frequency.setValueAtTime(1500, currentTime);

    sparkleGain.gain.setValueAtTime(0, currentTime);
    sparkleGain.gain.exponentialRampToValueAtTime(0.1, currentTime + 0.02);
    sparkleGain.gain.exponentialRampToValueAtTime(0.001, currentTime + duration * 0.3);

    // Connect the audio graph
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    sparkleOsc.connect(sparkleFilter);
    sparkleFilter.connect(sparkleGain);
    sparkleGain.connect(audioContext.destination);

    // Start and stop
    oscillator.start(currentTime);
    sparkleOsc.start(currentTime);
    
    oscillator.stop(currentTime + duration);
    sparkleOsc.stop(currentTime + duration * 0.3);

  }, [initAudioContext]);

  const playButtonClick = useCallback(async () => {
    const audioContext = initAudioContext();
    
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    // Quick button click sound
    const duration = 0.1;
    const currentTime = audioContext.currentTime;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(800, currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, currentTime + duration);

    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.2, currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(currentTime);
    oscillator.stop(currentTime + duration);

  }, [initAudioContext]);

  // Expose the sound effects globally
  React.useEffect(() => {
    (window as any).spaceSounds = {
      playLightsaberSwing,
      playButtonClick
    };

    return () => {
      delete (window as any).spaceSounds;
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [playLightsaberSwing, playButtonClick]);

  return null; // This component doesn't render anything
};

export default SoundEffects;
