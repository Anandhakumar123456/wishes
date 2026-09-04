import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, X, Eye } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';
import type { Memory } from '../types';

export const MemoryTimeline: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <section id="story" className="relative py-24 px-4 bg-wedding-bg overflow-hidden scroll-mt-24">
      
      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3 mb-16"
        >
          <div className="inline-flex items-center gap-2 text-wedding-gold font-script text-2xl">
            <Sparkles className="w-4 h-4" />
            <span>Our Journey Together</span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-wedding-maroon">
            From Then... To Forever
          </h2>

          <p className="text-wedding-maroon/70 text-sm sm:text-base font-sans max-w-lg mx-auto">
            A glance back at the chapters that led to this magical moment.
          </p>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Timeline Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 relative">
          
          {/* Central Vertical Connector Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-wedding-gold/20 via-wedding-gold to-wedding-gold/20 -translate-x-1/2 pointer-events-none" />

          {weddingConfig.memories.map((mem, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={mem.id}
                initial={{ opacity: 0, y: 40, rotate: isEven ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, rotate: isEven ? -1.5 : 1.5 }}
                whileHover={{ scale: 1.02, rotate: 0, zIndex: 20 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className={`relative group cursor-pointer ${
                  isEven ? 'md:mr-4' : 'md:ml-4 md:mt-12'
                }`}
                onClick={() => setSelectedMemory(mem)}
              >
                {/* Polaroid Frame Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-wedding-card border border-wedding-gold/30 shadow-card-soft hover:shadow-gold-glow transition-all duration-300">
                  
                  {/* Decorative Washi Tape Graphic */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-wedding-gold/30 backdrop-blur-md border border-wedding-gold/40 rounded-sm rotate-[-2deg] z-10 shadow-xs pointer-events-none" />

                  {/* Image Holder with Polaroid styling */}
                  <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-wedding-ivory-warm mb-4 group/img">
                    <img
                      src={mem.image}
                      alt={mem.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-108"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay Icon */}
                    <div className="absolute inset-0 bg-wedding-maroon-deep/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-3 rounded-full bg-wedding-card/90 text-wedding-maroon shadow-lg transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-300">
                        <Eye className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Tag Badge */}
                    {mem.tag && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-wedding-maroon/80 text-wedding-gold-light text-xs font-sans font-medium backdrop-blur-sm shadow-sm">
                        {mem.tag}
                      </span>
                    )}

                    {/* Number Badge */}
                    <span className="absolute bottom-3 right-3 font-serif text-2xl font-bold text-white/90 drop-shadow-md">
                      {mem.number}
                    </span>
                  </div>

                  {/* Content Info */}
                  <div className="space-y-2 px-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-wedding-maroon">
                        {mem.title}
                      </h3>

                      {mem.date && (
                        <div className="flex items-center gap-1 text-xs font-sans text-wedding-gold-dark font-medium bg-wedding-gold-light/30 px-2.5 py-1 rounded-full">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{mem.date}</span>
                        </div>
                      )}
                    </div>

                    <p className="font-script text-lg text-wedding-gold-dark font-medium">
                      "{mem.subtitle}"
                    </p>

                    <p className="font-sans text-sm text-wedding-maroon/80 line-clamp-2 leading-relaxed">
                      {mem.description}
                    </p>
                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>

      {/* Memory Lightbox Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-8 bg-black/85 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedMemory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-2xl w-full bg-wedding-card rounded-3xl p-6 sm:p-8 border border-wedding-gold shadow-2xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prominent High-Contrast Close Button */}
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2.5 rounded-full bg-wedding-maroon text-wedding-gold shadow-xl hover:scale-110 hover:bg-wedding-maroon-deep border border-wedding-gold/40 transition-all"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-wedding-ivory-warm">
                  <img
                    src={selectedMemory.image}
                    alt={selectedMemory.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-sans font-bold uppercase tracking-widest text-wedding-gold-dark">
                    Chapter {selectedMemory.number}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-wedding-maroon">
                    {selectedMemory.title}
                  </h3>
                  <p className="font-sans text-wedding-maroon/90 text-sm sm:text-base leading-relaxed">
                    {selectedMemory.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
