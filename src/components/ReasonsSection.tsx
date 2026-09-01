import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Heart, Zap, Sparkles, Shield, Sun } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';
import type { ReasonCard } from '../types';

const iconMap: Record<string, React.ElementType> = {
  Smile,
  Heart,
  Zap,
  Sparkles,
  Shield,
  Sun
};

export const ReasonsSection: React.FC = () => {
  return (
    <section className="relative py-24 px-4 bg-wedding-bg overflow-hidden">
      
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 text-wedding-gold font-script text-2xl">
            <Sparkles className="w-4 h-4" />
            <span>Pure Admiration</span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-wedding-maroon">
            Because You Deserve Every Bit Of Happiness
          </h2>

          <p className="text-wedding-maroon/70 text-sm sm:text-base font-sans max-w-lg mx-auto">
            A celebration of all the wonderful things that make you so special.
          </p>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto mt-4" />
        </motion.div>

        {/* 6 Interactive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {weddingConfig.reasonsToBeHappy.map((reason: ReasonCard, index: number) => {
            const IconComponent = iconMap[reason.iconName] || Sparkles;

            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative p-6 sm:p-8 rounded-3xl glass-luxury border-gold-thin shadow-card-soft space-y-4 group overflow-hidden hover:border-wedding-gold transition-all duration-300"
              >
                {/* Background Glow on Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-wedding-gold/10 rounded-full blur-2xl group-hover:bg-wedding-gold/25 transition-colors pointer-events-none" />

                {/* Icon Badge */}
                <div className="w-14 h-14 rounded-2xl bg-wedding-maroon text-wedding-gold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-7 h-7" />
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-bold text-wedding-maroon">
                    {reason.title}
                  </h3>
                  <span className="text-xs font-sans uppercase tracking-widest text-wedding-gold-dark font-medium block">
                    {reason.subtitle}
                  </span>
                </div>

                {/* Description */}
                <p className="font-sans text-sm text-wedding-maroon/80 leading-relaxed">
                  {reason.description}
                </p>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
