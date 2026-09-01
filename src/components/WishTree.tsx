import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Leaf, Heart, X } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';
import type { UserWish } from '../types';
import { triggerGoldConfetti } from '../utils/confetti';

const LOCAL_STORAGE_KEY = 'wedding_wishes_list_v1';

export const WishTree: React.FC = () => {
  const [wishes, setWishes] = useState<UserWish[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [activeWish, setActiveWish] = useState<UserWish | null>(null);

  // Load from localStorage or initial seed
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setWishes(JSON.parse(saved));
      } else {
        setWishes(weddingConfig.initialWishes);
      }
    } catch (e) {
      setWishes(weddingConfig.initialWishes);
    }
  }, []);

  // Save to localStorage when wishes change
  const saveWishes = (newWishes: UserWish[]) => {
    setWishes(newWishes);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newWishes));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  };

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !messageInput.trim()) return;

    const colors = ['#E5C158', '#F4C2C2', '#93C5FD', '#FDE047', '#C084FC'];
    const newWish: UserWish = {
      id: `wish-${Date.now()}`,
      name: nameInput.trim(),
      message: messageInput.trim(),
      date: 'Just now',
      leafColor: colors[Math.floor(Math.random() * colors.length)]
    };

    const updated = [newWish, ...wishes];
    saveWishes(updated);
    setNameInput('');
    setMessageInput('');
    setIsModalOpen(false);
    setActiveWish(newWish);
    triggerGoldConfetti();
  };

  return (
    <section id="wishes" className="relative py-24 px-4 bg-wedding-ivory-warm overflow-hidden">
      
      <div className="max-w-5xl mx-auto relative z-10 text-center space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 text-wedding-gold font-script text-2xl">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <span>Blessings & Wishes</span>
            <Leaf className="w-5 h-5 text-emerald-600" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-wedding-maroon">
            The Interactive Wish Tree 🍃
          </h2>

          <p className="text-wedding-maroon/70 text-sm sm:text-base font-sans max-w-md mx-auto">
            Leave your glowing leaf of blessing for {weddingConfig.brideName} & {weddingConfig.groomName}.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-wedding-maroon text-wedding-gold font-semibold text-base shadow-maroon-glow hover:bg-wedding-maroon-light transition-all duration-300 border border-wedding-gold/40"
            >
              <Sparkles className="w-4 h-4" />
              <span>Leave a Wish ✨</span>
            </button>
          </div>
        </motion.div>

        {/* Tree Container SVG with Glowing Leaves */}
        <div className="relative py-10 max-w-2xl mx-auto flex flex-col items-center">
          
          <svg className="w-72 sm:w-96 h-auto text-wedding-maroon" viewBox="0 0 200 240" fill="none">
            {/* Tree Trunk */}
            <path
              d="M100 220 C100 160 90 140 100 90 C110 50 140 30 160 20 M100 130 C80 110 50 90 40 60 M100 100 C110 80 130 70 150 50 M90 140 C75 130 60 120 45 110"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Base roots */}
            <path d="M70 230 Q 90 220 100 220 Q 110 220 130 230" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          </svg>

          {/* Floating Glowing Wish Leaf Nodes */}
          <div className="absolute inset-0 pointer-events-none">
            {wishes.slice(0, 12).map((wish, index) => {
              const positions = [
                { top: '15%', left: '48%' },
                { top: '25%', left: '30%' },
                { top: '22%', left: '70%' },
                { top: '35%', left: '20%' },
                { top: '38%', left: '80%' },
                { top: '45%', left: '40%' },
                { top: '50%', left: '65%' },
                { top: '30%', left: '55%' },
                { top: '18%', left: '25%' },
                { top: '42%', left: '32%' },
              ];
              const pos = positions[index % positions.length];

              return (
                <motion.div
                  key={wish.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: index * 0.2
                  }}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute pointer-events-auto cursor-pointer"
                  onClick={() => setActiveWish(wish)}
                >
                  <div
                    className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-sans font-medium text-wedding-maroon-deep shadow-md border border-white/40 backdrop-blur-md transition-transform hover:scale-110"
                    style={{ backgroundColor: wish.leafColor || '#E5C158' }}
                  >
                    <Leaf className="w-3.5 h-3.5 fill-current" />
                    <span>{wish.name}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Wishes Cards Grid Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-left pt-6">
          {wishes.map((wish) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-5 rounded-2xl glass-luxury border-gold-thin shadow-xs space-y-2 relative group hover:border-wedding-gold transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg font-bold text-wedding-maroon flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  {wish.name}
                </span>
                <span className="text-xs text-wedding-maroon/50">{wish.date}</span>
              </div>
              <p className="font-sans text-sm text-wedding-maroon/80 leading-relaxed italic">
                "{wish.message}"
              </p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Leave a Wish Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wedding-maroon-deep/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-md w-full bg-wedding-card rounded-3xl p-6 sm:p-8 border border-wedding-gold shadow-2xl space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-wedding-maroon/60 hover:text-wedding-maroon"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1 text-center">
                <h3 className="font-serif text-2xl font-bold text-wedding-maroon">
                  Attach Your Blessing 🍃
                </h3>
                <p className="font-sans text-xs text-wedding-maroon/70">
                  Your wish will bloom on the wedding wish tree!
                </p>
              </div>

              <form onSubmit={handleSubmitWish} className="space-y-4 font-sans">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. Anandh"
                    className="w-full px-4 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:outline-none text-wedding-maroon"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1">
                    Your Wish
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="May your forever be more beautiful than your dreams. ❤️"
                    className="w-full px-4 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:outline-none text-wedding-maroon"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-wedding-maroon text-wedding-gold font-semibold text-base shadow-md hover:bg-wedding-maroon-light transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Attach Wish To Tree</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Wish Modal */}
      <AnimatePresence>
        {activeWish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wedding-maroon-deep/70 backdrop-blur-sm"
            onClick={() => setActiveWish(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative max-w-sm w-full bg-wedding-card rounded-2xl p-6 border border-wedding-gold shadow-2xl text-center space-y-3"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveWish(null)}
                className="absolute top-3 right-3 text-wedding-maroon/60"
              >
                <X className="w-5 h-5" />
              </button>

              <Leaf className="w-8 h-8 text-wedding-gold mx-auto" />
              <h4 className="font-serif text-xl font-bold text-wedding-maroon">
                {activeWish.name}'s Wish
              </h4>
              <p className="font-sans text-wedding-maroon/90 italic">
                "{activeWish.message}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
