import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Quote } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';

export const WishSection: React.FC = () => {
  const paragraphs = weddingConfig.personalMessage.split('\n\n');

  return (
    <section id="wish" className="relative py-20 px-4 bg-wedding-ivory-warm overflow-hidden scroll-mt-24">
      
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-wedding-blush-dark/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3 mb-12"
        >
          <div className="inline-flex items-center justify-center gap-2 text-wedding-gold font-script text-2xl sm:text-3xl">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <span>A Personal Message</span>
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-wedding-maroon">
            {weddingConfig.personalMessageTitle}
          </h2>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Message Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1 }}
          className="relative p-8 sm:p-12 rounded-3xl glass-luxury border-gold-glow shadow-card-soft space-y-6"
        >
          {/* Quote Icon Ornaments */}
          <Quote className="absolute top-6 left-6 w-10 h-10 text-wedding-gold/20 rotate-180" />
          <Quote className="absolute bottom-6 right-6 w-10 h-10 text-wedding-gold/20" />

          {/* Typewriter Reveal Paragraphs */}
          <div className="space-y-6 relative z-10 font-sans text-base sm:text-lg text-wedding-maroon/90 leading-relaxed font-normal">
            {paragraphs.map((paragraph, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="first-letter:text-2xl first-letter:font-serif first-letter:font-bold first-letter:text-wedding-gold-dark"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Calligraphic Handwritten Signature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-8 border-t border-wedding-gold/20 flex flex-col items-end text-right"
          >
            <span className="text-xs sm:text-sm font-sans uppercase tracking-widest text-wedding-maroon/60 mb-1">
              {weddingConfig.signatureText}
            </span>
            
            <span className="font-script text-3xl sm:text-4xl text-wedding-maroon font-semibold">
              {weddingConfig.yourName}
            </span>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};
