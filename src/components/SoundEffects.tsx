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

  const playSpaceshipTakeoff = useCallback(async () => {
    const audioContext = initAudioContext();
    
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    // Create a spaceship takeoff sound using Web Audio API
    const duration = 2.5; // seconds - longer for takeoff effect
    const currentTime = audioContext.currentTime;

    // Main engine rumble (low frequency oscillator)
    const engineOsc = audioContext.createOscillator();
    const engineGain = audioContext.createGain();
    const engineFilter = audioContext.createBiquadFilter();

    // Configure engine rumble
    engineOsc.type = 'sawtooth';
    engineOsc.frequency.setValueAtTime(80, currentTime);
    engineOsc.frequency.exponentialRampToValueAtTime(60, currentTime + duration * 0.3);
    engineOsc.frequency.exponentialRampToValueAtTime(120, currentTime + duration * 0.7);
    engineOsc.frequency.exponentialRampToValueAtTime(200, currentTime + duration);

    // Low-pass filter for engine rumble
    engineFilter.type = 'lowpass';
    engineFilter.frequency.setValueAtTime(400, currentTime);
    engineFilter.frequency.exponentialRampToValueAtTime(800, currentTime + duration);
    engineFilter.Q.setValueAtTime(2, currentTime);

    // Engine gain envelope (builds up then fades)
    engineGain.gain.setValueAtTime(0, currentTime);
    engineGain.gain.exponentialRampToValueAtTime(0.4, currentTime + 0.3);
    engineGain.gain.setValueAtTime(0.4, currentTime + duration * 0.6);
    engineGain.gain.exponentialRampToValueAtTime(0.001, currentTime + duration);

    // High frequency jet exhaust
    const jetOsc = audioContext.createOscillator();
    const jetGain = audioContext.createGain();
    const jetFilter = audioContext.createBiquadFilter();

    jetOsc.type = 'sawtooth'; // Use sawtooth for noise-like effect
    jetOsc.frequency.setValueAtTime(800, currentTime);
    jetOsc.frequency.exponentialRampToValueAtTime(1200, currentTime + duration * 0.5);
    jetOsc.frequency.exponentialRampToValueAtTime(2000, currentTime + duration);

    jetFilter.type = 'bandpass';
    jetFilter.frequency.setValueAtTime(1000, currentTime);
    jetFilter.frequency.exponentialRampToValueAtTime(2500, currentTime + duration);
    jetFilter.Q.setValueAtTime(3, currentTime);

    jetGain.gain.setValueAtTime(0, currentTime);
    jetGain.gain.exponentialRampToValueAtTime(0.2, currentTime + 0.1);
    jetGain.gain.setValueAtTime(0.2, currentTime + duration * 0.7);
    jetGain.gain.exponentialRampToValueAtTime(0.001, currentTime + duration);

    // Whoosh effect for air displacement
    const whooshOsc = audioContext.createOscillator();
    const whooshGain = audioContext.createGain();
    const whooshFilter = audioContext.createBiquadFilter();

    whooshOsc.type = 'sine';
    whooshOsc.frequency.setValueAtTime(300, currentTime + duration * 0.6);
    whooshOsc.frequency.exponentialRampToValueAtTime(150, currentTime + duration * 0.8);
    whooshOsc.frequency.exponentialRampToValueAtTime(80, currentTime + duration);

    whooshFilter.type = 'lowpass';
    whooshFilter.frequency.setValueAtTime(800, currentTime + duration * 0.6);
    whooshFilter.frequency.exponentialRampToValueAtTime(400, currentTime + duration);

    whooshGain.gain.setValueAtTime(0, currentTime);
    whooshGain.gain.setValueAtTime(0, currentTime + duration * 0.6);
    whooshGain.gain.exponentialRampToValueAtTime(0.15, currentTime + duration * 0.65);
    whooshGain.gain.exponentialRampToValueAtTime(0.001, currentTime + duration);

    // Connect the audio graph
    engineOsc.connect(engineFilter);
    engineFilter.connect(engineGain);
    engineGain.connect(audioContext.destination);

    jetOsc.connect(jetFilter);
    jetFilter.connect(jetGain);
    jetGain.connect(audioContext.destination);

    whooshOsc.connect(whooshFilter);
    whooshFilter.connect(whooshGain);
    whooshGain.connect(audioContext.destination);

    // Start and stop
    engineOsc.start(currentTime);
    jetOsc.start(currentTime);
    whooshOsc.start(currentTime + duration * 0.6);
    
    engineOsc.stop(currentTime + duration);
    jetOsc.stop(currentTime + duration);
    whooshOsc.stop(currentTime + duration);

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
      playSpaceshipTakeoff,
      playButtonClick
    };

    return () => {
      delete (window as any).spaceSounds;
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [playSpaceshipTakeoff, playButtonClick]);

  return null; // This component doesn't render anything
};

export default SoundEffects;
