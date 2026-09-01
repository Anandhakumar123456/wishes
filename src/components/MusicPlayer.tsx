import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { VolumeX, Volume2 } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';
import { startAmbientSynth, stopAmbientSynth } from '../utils/audioSynth';

function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const youtubeId = getYouTubeVideoId(weddingConfig.musicFile);

  useEffect(() => {
    if (!youtubeId) {
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
    }
  }, [youtubeId]);

  const toggleMusic = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (youtubeId) {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }),
          '*'
        );
      } else {
        if (audioRef.current && !hasError) {
          audioRef.current.pause();
        }
        stopAmbientSynth();
      }
    } else {
      setIsPlaying(true);
      if (youtubeId) {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'playVideo', args: '' }),
          '*'
        );
      } else {
        if (audioRef.current && !hasError) {
          audioRef.current.play().catch(() => {
            setHasError(true);
            startAmbientSynth();
          });
        } else {
          startAmbientSynth();
        }
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Hidden YouTube Iframe Player if a YouTube link is provided */}
      {youtubeId && (
        <iframe
          ref={iframeRef}
          className="absolute w-0 h-0 opacity-0 pointer-events-none -z-50"
          width="1"
          height="1"
          src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&autoplay=0&loop=1&playlist=${youtubeId}`}
          allow="autoplay"
          title="Wedding Music Player"
        />
      )}

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
