import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { triggerGoldConfetti } from '../utils/confetti';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 2400);
    const timer2 = setTimeout(() => setStep(3), 4800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleOpenSurprise = () => {
    setIsOpening(true);
    triggerGoldConfetti();
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-wedding-maroon-deep text-wedding-bg p-6 overflow-hidden select-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-wedding-maroon-light/40 via-wedding-maroon-deep to-black opacity-80" />

          {/* Floating Gold Sparkle Ornaments */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <div className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-wedding-gold/20 blur-3xl animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full bg-wedding-blush-dark/20 blur-3xl animate-pulse-glow" />
          </div>

          <div className="relative z-10 max-w-xl text-center flex flex-col items-center justify-center space-y-8 px-4">
            
            {/* Stage 1 */}
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1 }}
                className="font-serif text-xl sm:text-2xl md:text-3xl text-wedding-gold-light/90 italic tracking-wide"
              >
                Something Beautiful Is About To Begin...
              </motion.div>
            )}

            {/* Stage 2 */}
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(8px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1 }}
                className="font-script text-3xl sm:text-4xl md:text-5xl text-wedding-gold font-normal flex items-center justify-center gap-3"
              >
                <span>To Someone Very Special</span>
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-rose-400 fill-rose-400 inline-block animate-heartbeat" />
              </motion.div>
            )}

            {/* Stage 3 - Final Reveal & Button */}
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 25, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1.2 }}
                className="space-y-10 pt-4"
              >
                <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-wide text-gold-gradient drop-shadow-lg">
                  Your Forever Begins Here.
                </h1>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="pt-4"
                >
                  <button
                    onClick={handleOpenSurprise}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-wedding-gold via-wedding-gold-accent to-wedding-gold-dark text-wedding-maroon-deep font-semibold text-lg sm:text-xl shadow-gold-glow hover:shadow-2xl transition-all duration-300 border border-wedding-gold-light/60 overflow-hidden"
                  >
                    {/* Button Inner Shimmer */}
                    <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    
                    <Sparkles className="w-5 h-5 text-wedding-maroon-deep animate-spin-slow" />
                    <span>Open Your Surprise</span>
                    <Sparkles className="w-5 h-5 text-wedding-maroon-deep" />
                  </button>
                </motion.div>
              </motion.div>
            )}

          </div>

          {/* Bottom Subtle Brand Mark */}
          <div className="absolute bottom-8 text-xs font-sans text-wedding-gold-light/40 tracking-widest uppercase">
            A Personal Digital Wedding Celebration
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
