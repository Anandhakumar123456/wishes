import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';
import type { GalleryItem } from '../types';

export const PhotoGallery: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const filteredImages = filter === 'all'
    ? weddingConfig.galleryImages
    : weddingConfig.galleryImages.filter(img => img.category === filter);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! === 0 ? filteredImages.length - 1 : prev! - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev! === filteredImages.length - 1 ? 0 : prev! + 1));
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  return (
    <section id="memories" className="relative py-24 px-4 bg-wedding-ivory-warm overflow-hidden">
      
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-3 mb-12"
        >
          <div className="inline-flex items-center gap-2 text-wedding-gold font-script text-2xl">
            <Sparkles className="w-4 h-4" />
            <span>Captured Joy</span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-wedding-maroon">
            Little Moments, Big Memories 📸
          </h2>

          <p className="text-wedding-maroon/70 text-sm sm:text-base font-sans max-w-lg mx-auto">
            A celebration of smiles, laughter, and timeless glimpses.
          </p>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto mt-4" />
        </motion.div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'moments', label: 'Moments' },
            { id: 'celebration', label: 'Celebration' },
            { id: 'candid', label: 'Candid' },
            { id: 'memories', label: 'Memories' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-sans font-medium transition-all duration-300 border ${
                filter === tab.id
                  ? 'bg-wedding-maroon text-wedding-gold border-wedding-gold shadow-md'
                  : 'bg-wedding-card text-wedding-maroon/80 border-wedding-gold/30 hover:border-wedding-gold'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredImages.map((img: GalleryItem, index: number) => {
              const isLiked = likedIds.includes(img.id);

              return (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="relative group cursor-pointer rounded-2xl overflow-hidden glass-luxury border-gold-thin shadow-card-soft"
                  onClick={() => setSelectedIndex(index)}
                >
                  {/* Photo Container */}
                  <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-wedding-ivory-warm">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-wedding-maroon-deep/80 via-wedding-maroon-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                      
                      <div className="flex justify-end">
                        <button
                          onClick={(e) => toggleLike(img.id, e)}
                          className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition-colors"
                        >
                          <Heart className={`w-5 h-5 ${isLiked ? 'text-rose-500 fill-rose-500' : 'text-white'}`} />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Maximize2 className="w-4 h-4 text-wedding-gold" />
                          <h4 className="font-serif text-lg font-bold text-wedding-gold-light">
                            {img.title}
                          </h4>
                        </div>
                        <p className="font-sans text-xs text-white/90 italic">
                          {img.caption}
                        </p>
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {selectedIndex !== null && filteredImages[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wedding-maroon-deep/90 backdrop-blur-lg"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Preview Box */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[selectedIndex].url}
                alt={filteredImages[selectedIndex].title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl border border-wedding-gold/40 shadow-2xl"
              />

              <div className="mt-4 text-center text-wedding-bg space-y-1">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-wedding-gold">
                  {filteredImages[selectedIndex].title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-wedding-bg/80">
                  {filteredImages[selectedIndex].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
