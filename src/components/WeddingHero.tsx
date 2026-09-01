import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronDown, Sparkles } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';

export const WeddingHero: React.FC = () => {
  // Format wedding date to readable string
  const formattedDate = new Date(weddingConfig.weddingDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-wedding-bg scroll-mt-24">

      {/* Background Indian Mandala Rotating Ornament */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15 overflow-hidden">
        <svg className="w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] text-wedding-gold animate-spin-slow" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 2" />
          <path d="M 50 5 Q 55 25 50 45 Q 45 25 50 5 Z" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <path d="M 50 95 Q 55 75 50 55 Q 45 75 50 95 Z" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <path d="M 5 50 Q 25 55 45 50 Q 25 45 5 50 Z" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <path d="M 95 50 Q 75 55 55 50 Q 75 45 95 50 Z" fill="none" stroke="currentColor" strokeWidth="0.4" />
        </svg>
      </div>

      {/* Decorative Top Arch Pattern */}
      <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-wedding-blush-dark/10 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 px-4">

        {/* Top Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-luxury border-gold-thin text-wedding-maroon text-xs sm:text-sm font-medium tracking-widest uppercase shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-wedding-gold" />
          <span>An Invitation of Love & Joy</span>
          <Sparkles className="w-4 h-4 text-wedding-gold" />
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-4"
        >
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-wedding-maroon font-bold leading-tight">
            Two Hearts.<br />
            <span className="text-gold-gradient italic font-normal">One Beautiful Beginning.</span>
          </h1>

          <p className="text-wedding-maroon/80 text-base sm:text-xl font-sans max-w-2xl mx-auto">
            {weddingConfig.heroSubtitle}
          </p>
        </motion.div>

        {/* Decorative Ornate Names Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative py-8 px-6 sm:px-12 rounded-3xl glass-luxury border-gold-thin shadow-card-soft max-w-2xl mx-auto overflow-hidden"
        >
          {/* Floral Corner Accents */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-wedding-gold/60 rounded-tl-lg" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-wedding-gold/60 rounded-tr-lg" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-wedding-gold/60 rounded-bl-lg" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-wedding-gold/60 rounded-br-lg" />

          <div className="flex flex-col items-center justify-center space-y-2">

            {/* Bride Name */}
            <div className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold tracking-wide text-wedding-maroon">
              {weddingConfig.groomName}
            </div>

            {/* Decorative "&" */}
            <div className="my-1 font-script text-5xl sm:text-7xl text-wedding-gold font-normal animate-pulse-glow">
              &
            </div>

            {/* Groom Name */}
            <div className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold tracking-wide text-wedding-maroon">
              {weddingConfig.brideName}
            </div>

          </div>

          {/* Location & Date Pill */}
          <div className="mt-8 pt-6 border-t border-wedding-gold/20 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-sans text-wedding-maroon/90 font-medium">
            <div className="flex items-center gap-1.5 bg-wedding-gold-light/40 px-4 py-1.5 rounded-full border border-wedding-gold/30">
              <Calendar className="w-4 h-4 text-wedding-maroon" />
              <span>{formattedDate}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-wedding-gold-light/40 px-4 py-1.5 rounded-full border border-wedding-gold/30">
              <MapPin className="w-4 h-4 text-wedding-maroon" />
              <span>{weddingConfig.weddingLocation}</span>
            </div>
          </div>

        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          className="pt-6"
        >
          <a
            href="#wish"
            className="inline-flex flex-col items-center gap-1 text-wedding-maroon/70 hover:text-wedding-maroon text-xs tracking-widest uppercase font-sans transition-colors"
          >
            <span>Scroll To Discover</span>
            <ChevronDown className="w-5 h-5 text-wedding-gold" />
          </a>
        </motion.div>

      </div>
    </section>
  );
};
