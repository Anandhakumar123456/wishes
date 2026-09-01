import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { VolumeX, Volume2 } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';
import { startAmbientSynth, stopAmbientSynth } from '../utils/audioSynth';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(weddingConfig.musicFile);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    const handleAudioError = () => {
      setHasError(true);
    };

    audioRef.current.addEventListener('error', handleAudioError);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('error', handleAudioError);
      }
      stopAmbientSynth();
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      if (audioRef.current && !hasError) {
        audioRef.current.pause();
      }
      stopAmbientSynth();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (audioRef.current && !hasError) {
        audioRef.current.play().catch(() => {
          // If HTML5 audio play fails due to CORS or broken URL, fallback to ambient synth!
          setHasError(true);
          startAmbientSynth();
        });
      } else {
        startAmbientSynth();
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className={`relative group p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center border ${
          isPlaying
            ? 'bg-wedding-gold text-wedding-maroon-deep border-wedding-gold-light shadow-gold-glow animate-pulse-glow'
            : 'bg-wedding-maroon text-wedding-gold border-wedding-gold/40 hover:bg-wedding-maroon-light'
        }`}
        title={isPlaying ? 'Mute Music' : 'Play Wedding Music'}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 animate-spin-slow" />
        ) : (
          <VolumeX className="w-6 h-6" />
        )}

        {/* Outer Ring Pulse when playing */}
        {isPlaying && (
          <span className="absolute -inset-1 rounded-full border border-wedding-gold/60 animate-ping pointer-events-none opacity-40" />
        )}

        {/* Tooltip on hover */}
        <span className="absolute right-full mr-3 px-3 py-1 rounded-lg bg-wedding-maroon-deep text-wedding-gold text-xs font-sans whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md border border-wedding-gold/30">
          {isPlaying ? 'Music On 🎵' : 'Music Off 🎵'}
        </span>
      </motion.button>
    </div>
  );
};
