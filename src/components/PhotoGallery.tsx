import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';
import type { GalleryItem } from '../types';

const LOCAL_STORAGE_GALLERY_KEY = 'wedding_gallery_photos_v2';

interface PhotoGalleryProps {
  photos?: GalleryItem[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [likedIds, setLikedIds] = useState<string[]>([]);

  // Sync photos from props or localStorage or weddingConfig
  useEffect(() => {
    if (photos && photos.length > 0) {
      setGalleryList(photos);
      return;
    }

    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_GALLERY_KEY);
      if (saved) {
        setGalleryList(JSON.parse(saved));
      } else {
        setGalleryList(weddingConfig.galleryImages);
      }
    } catch (e) {
      setGalleryList(weddingConfig.galleryImages);
    }
  }, [photos]);

  const filteredImages = filter === 'all'
    ? galleryList
    : galleryList.filter(img => img.category === filter);

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
    <section id="memories" className="relative py-20 sm:py-24 px-4 bg-wedding-ivory-warm scroll-mt-24">
      
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-10 sm:mb-12"
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
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
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

        {/* Masonry / Responsive Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredImages.map((img: GalleryItem, index: number) => {
              const isLiked = likedIds.includes(img.id);

              return (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  whileHover={{ y: -4 }}
                  className="relative flex flex-col group cursor-pointer rounded-2xl overflow-hidden glass-luxury border-gold-thin shadow-card-soft"
                  onClick={() => setSelectedIndex(index)}
                >
                  {/* Photo Container */}
                  <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-wedding-ivory-warm w-full shrink-0">
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-wedding-maroon-deep/70 text-wedding-gold-light text-[10px] uppercase font-sans font-semibold tracking-wider backdrop-blur-md">
                        {img.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Content - Document Flow Layout */}
                  <div className="p-4 flex flex-col gap-1.5 bg-wedding-card/90 border-t border-wedding-gold/20 flex-grow justify-between">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <Maximize2 className="w-3.5 h-3.5 text-wedding-gold shrink-0" />
                        <h4 className="font-serif text-base sm:text-lg font-bold text-wedding-maroon truncate">
                          {img.title}
                        </h4>
                      </div>
                      <button
                        onClick={(e) => toggleLike(img.id, e)}
                        className="p-1.5 rounded-full hover:bg-wedding-gold/20 transition-colors shrink-0"
                        title="Like Photo"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'text-rose-500 fill-rose-500' : 'text-wedding-maroon/40'}`} />
                      </button>
                    </div>
                    {img.caption && (
                      <p className="font-sans text-xs text-wedding-maroon/75 line-clamp-2 italic leading-relaxed">
                        {img.caption}
                      </p>
                    )}
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
            className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-8 bg-black/90 backdrop-blur-xl overflow-y-auto"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full bg-wedding-maroon text-wedding-gold border border-wedding-gold/40 shadow-xl hover:scale-110 transition-all z-50"
              title="Close"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 text-wedding-gold border border-wedding-gold/40 hover:bg-black/80 transition-all z-50"
              title="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 text-wedding-gold border border-wedding-gold/40 hover:bg-black/80 transition-all z-50"
              title="Next photo"
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
              className="relative max-w-3xl w-full my-auto flex flex-col items-center gap-4 bg-[#FAF7F2] text-[#4A0E17] p-4 sm:p-6 rounded-3xl border border-wedding-gold/60 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-h-[60vh] sm:max-h-[68vh] flex items-center justify-center overflow-hidden rounded-2xl bg-black/5">
                <img
                  src={filteredImages[selectedIndex].url}
                  alt={filteredImages[selectedIndex].title}
                  className="max-h-[60vh] sm:max-h-[68vh] w-auto max-w-full object-contain rounded-2xl"
                />
              </div>

              <div className="text-center space-y-1 px-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-wedding-maroon">
                  {filteredImages[selectedIndex].title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-wedding-maroon/80 italic">
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
