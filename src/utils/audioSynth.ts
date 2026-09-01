// Web Audio API Procedural Ambient Synth for Indian Wedding Atmosphere

let audioCtx: AudioContext | null = null;
let isPlayingSynth = false;
let intervalId: any = null;

const pentatonicScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // C4, D4, E4, G4, A4, C5, D5, E5

export const startAmbientSynth = () => {
  if (isPlayingSynth) return;
  
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isPlayingSynth = true;

    // Play a gentle note every 1.5 - 2.5 seconds
    const playNote = () => {
      if (!audioCtx || !isPlayingSynth) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      // Sine + soft triangle wave for flute/sitar like warmth
      osc.type = Math.random() > 0.5 ? 'sine' : 'triangle';
      
      // Select random frequency from warm pentatonic scale
      const freq = pentatonicScale[Math.floor(Math.random() * pentatonicScale.length)];
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      const now = audioCtx.currentTime;
      // Gentle attack and decay
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 3.6);
    };

    playNote();
    intervalId = setInterval(playNote, 2200);
  } catch (err) {
    console.warn("Web Audio API Ambient Synth notice:", err);
  }
};

export const stopAmbientSynth = () => {
  isPlayingSynth = false;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (audioCtx && audioCtx.state !== 'closed') {
    audioCtx.suspend();
  }
};
