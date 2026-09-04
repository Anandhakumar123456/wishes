import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, X, Heart } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';
import { triggerPetalShower } from '../utils/confetti';

export const LetterSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(true);
    triggerPetalShower();
  };

  return (
    <section id="letter" className="relative py-24 px-4 bg-wedding-maroon-deep text-wedding-bg overflow-hidden scroll-mt-24">
      
      {/* Background Gold Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-wedding-maroon-light/30 via-wedding-maroon-deep to-black opacity-90" />

      <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 text-wedding-gold font-script text-2xl">
            <Sparkles className="w-4 h-4" />
            <span>From The Heart</span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-gold-gradient">
            {weddingConfig.letterHeadline}
          </h2>

          <p className="text-wedding-gold-light/80 text-sm sm:text-base font-sans max-w-md mx-auto">
            A special note written just for you to keep forever.
          </p>
        </motion.div>

        {/* Closed Interactive Envelope Stage */}
        <div className="py-8 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            className="relative w-full max-w-sm sm:max-w-md aspect-4/3 rounded-2xl bg-gradient-to-br from-wedding-card to-wedding-ivory-warm border border-wedding-gold/60 shadow-2xl p-6 flex flex-col items-center justify-center text-wedding-maroon cursor-pointer group envelope-shadow"
            onClick={handleOpenLetter}
          >
            {/* Wax Seal Stamp Icon */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-wedding-gold to-wedding-gold-dark text-wedding-maroon-deep flex items-center justify-center shadow-lg border border-wedding-gold-light group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 fill-wedding-maroon-deep" />
            </div>

            <div className="mt-4 font-serif text-lg font-bold text-wedding-maroon text-center">
              To: {weddingConfig.brideName}
            </div>

            <div className="text-xs font-sans uppercase tracking-widest text-wedding-gold-dark mt-1 text-center">
              Tap To Open Envelope 💌
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleOpenLetter}
            className="mt-8 inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-wedding-gold text-wedding-maroon-deep font-semibold text-base sm:text-lg shadow-gold-glow hover:bg-wedding-gold-accent transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
            <span>Open Letter 💌</span>
          </motion.button>
        </div>

      </div>

      {/* Unfolded Letter Full Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-8 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
              className="relative max-w-2xl w-full bg-[#FAF7F2] text-[#4A0E17] rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-wedding-gold shadow-2xl flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 sm:p-2.5 rounded-full bg-wedding-gold-light/40 text-wedding-maroon hover:bg-wedding-gold transition-colors z-20"
                title="Close Letter"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Top Handwritten Greeting */}
              <div className="border-b border-wedding-gold/30 pb-4 pr-10 sm:pr-12">
                <span className="font-script text-3xl sm:text-4xl md:text-5xl text-wedding-gold-dark block break-words">
                  {weddingConfig.letterGreeting}
                </span>
              </div>

              {/* Emotional Letter Body */}
              <div className="space-y-3.5 sm:space-y-4 font-sans text-sm sm:text-base md:text-lg text-wedding-maroon/90 leading-relaxed font-normal">
                {weddingConfig.letterBody.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Closing Signature */}
              <div className="pt-5 sm:pt-6 border-t border-wedding-gold/30 flex flex-col items-end text-right">
                <span className="text-xs sm:text-sm font-sans uppercase tracking-widest text-wedding-maroon/60">
                  {weddingConfig.letterClosing}
                </span>
                <span className="font-script text-2xl sm:text-3xl md:text-4xl text-wedding-gold-dark font-bold mt-1 break-words">
                  {weddingConfig.yourName}
                </span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
