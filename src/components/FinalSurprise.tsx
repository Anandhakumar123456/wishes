import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';
import { triggerGoldConfetti, triggerPetalShower } from '../utils/confetti';

export const FinalSurprise: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setIsRevealed(true);
    triggerGoldConfetti();
    setTimeout(() => {
      triggerPetalShower();
    }, 1500);
  };

  return (
    <section className="relative py-28 px-4 bg-wedding-maroon-deep text-wedding-bg overflow-hidden">
      
      {/* Ambient background particles glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-wedding-maroon-light/50 via-wedding-maroon-deep to-black opacity-90" />

      <div className="max-w-3xl mx-auto relative z-10 text-center space-y-8">

        {!isRevealed ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8 py-12"
          >
            <div className="font-script text-4xl sm:text-5xl text-wedding-gold font-normal">
              One Last Thing...
            </div>

            <motion.div
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={handleReveal}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-wedding-gold via-wedding-gold-accent to-wedding-gold-dark text-wedding-maroon-deep font-bold text-xl shadow-gold-glow hover:shadow-2xl transition-all duration-300 border border-wedding-gold-light"
              >
                <Heart className="w-6 h-6 text-rose-600 fill-rose-600 animate-heartbeat" />
                <span>Click Me ❤️</span>
                <Sparkles className="w-5 h-5 text-wedding-maroon-deep" />
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="py-8 space-y-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="font-serif text-2xl sm:text-4xl text-wedding-gold-light italic leading-relaxed max-w-2xl mx-auto"
              >
                "{weddingConfig.finalBlessing}"
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 1 }}
                className="space-y-4 pt-4 border-t border-wedding-gold/30"
              >
                <div className="font-script text-4xl sm:text-6xl text-wedding-gold font-normal">
                  Happy Married Life,
                </div>

                <div className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-wide">
                  {weddingConfig.brideName} & {weddingConfig.groomName} ❤️
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="pt-6 font-sans text-sm sm:text-base uppercase tracking-widest text-wedding-gold-light/70"
              >
                With Love,<br />
                <span className="font-script text-3xl text-wedding-gold font-bold normal-case tracking-normal">
                  {weddingConfig.yourName}
                </span>
              </motion.div>

              {/* Replay Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
                className="pt-8"
              >
                <button
                  onClick={() => setIsRevealed(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-wedding-gold-light text-xs font-sans hover:bg-white/20 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Relive The Surprise</span>
                </button>
              </motion.div>

            </motion.div>
          </AnimatePresence>
        )}

      </div>
    </section>
  );
};
