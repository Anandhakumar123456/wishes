import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Leaf, Heart, X } from 'lucide-react';
import { weddingConfig } from '../weddingConfig';
import type { UserWish } from '../types';
import { triggerGoldConfetti } from '../utils/confetti';
import { formatRelativeTime } from '../utils/dateFormatter';

const LOCAL_STORAGE_KEY = 'wedding_wishes_list_v1';

interface WishTreeProps {
  wishes?: UserWish[];
  onWishAdded?: (wish: UserWish) => void;
}

export const WishTree: React.FC<WishTreeProps> = ({ wishes: propWishes, onWishAdded }) => {
  const [wishes, setWishes] = useState<UserWish[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [activeWish, setActiveWish] = useState<UserWish | null>(null);

  // Sync from props, API or localStorage
  useEffect(() => {
    if (propWishes && propWishes.length > 0) {
      setWishes(propWishes);
      return;
    }

    async function fetchWishes() {
      try {
        const res = await fetch('/api/wishes');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setWishes(data);
            return;
          }
        }
      } catch (e) {}

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
    }

    fetchWishes();
  }, [propWishes]);

  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !messageInput.trim()) return;

    const colors = ['#E5C158', '#F4C2C2', '#93C5FD', '#FDE047', '#C084FC'];
    const payload = {
      name: nameInput.trim(),
      message: messageInput.trim(),
      leafColor: colors[Math.floor(Math.random() * colors.length)]
    };

    let createdWish: UserWish = {
      id: `wish-${Date.now()}`,
      ...payload,
      date: 'Just now'
    };

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        createdWish = await res.json();
      }
    } catch (err) {}

    if (onWishAdded) {
      onWishAdded(createdWish);
    } else {
      const updated = [createdWish, ...wishes];
      setWishes(updated);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {}
    }

    setNameInput('');
    setMessageInput('');
    setIsModalOpen(false);
    setActiveWish(createdWish);
    triggerGoldConfetti();
  };

  return (
    <section id="wishes" className="relative py-24 px-4 bg-wedding-ivory-warm overflow-hidden scroll-mt-24">
      
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

        {/* Tree Container SVG with Lush Canopy & Glowing Leaves */}
        <div className="relative py-4 w-full max-w-2xl mx-auto flex flex-col items-center min-h-[420px] sm:min-h-[480px]">
          
          <svg
            className="w-full max-w-lg h-auto drop-shadow-2xl overflow-visible"
            viewBox="0 0 500 480"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Trunk Wood Gradient */}
              <linearGradient id="trunkGrad" x1="250" y1="460" x2="250" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2A070B" />
                <stop offset="45%" stopColor="#4A0E17" />
                <stop offset="100%" stopColor="#6B1124" />
              </linearGradient>

              {/* Gold Highlight Gradient for Bark */}
              <linearGradient id="trunkGoldHighlight" x1="200" y1="460" x2="300" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#E5C158" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#AA771C" stopOpacity="0.4" />
              </linearGradient>

              {/* Ambient Glow behind Canopy */}
              <radialGradient id="canopyGlow" cx="250" cy="180" r="220" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FCE7AC" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#E5C158" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
              </radialGradient>

              {/* Foliage Canopy Gradients */}
              <radialGradient id="foliageMain" cx="250" cy="160" r="140" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4E7C48" stopOpacity="0.85" />
                <stop offset="65%" stopColor="#2D5A27" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#1B3B17" stopOpacity="0.95" />
              </radialGradient>

              <radialGradient id="foliageHighlight" cx="210" cy="120" r="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#8FBA8A" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#4E7C48" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#2D5A27" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="blushFoliage" cx="330" cy="140" r="90" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#F4C2C2" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#E5C158" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2D5A27" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ambient Background Glow behind Canopy */}
            <circle cx="250" cy="180" r="210" fill="url(#canopyGlow)" />

            {/* Ground Shadow & Root Base Mound */}
            <ellipse cx="250" cy="455" rx="140" ry="16" fill="#36090F" fillOpacity="0.15" />
            <path d="M160 455 C 210 445, 290 445, 340 455 C 380 463, 120 463, 160 455 Z" fill="#4A0E17" fillOpacity="0.25" />

            {/* FOLIAGE CANOPY LAYERS */}
            <g opacity="0.92">
              {/* Outer left cloud */}
              <circle cx="150" cy="200" r="80" fill="url(#foliageMain)" />
              {/* Outer right cloud */}
              <circle cx="350" cy="200" r="80" fill="url(#foliageMain)" />
              {/* Upper left cloud */}
              <circle cx="180" cy="130" r="75" fill="url(#foliageHighlight)" />
              {/* Upper right cloud */}
              <circle cx="320" cy="130" r="75" fill="url(#blushFoliage)" />
              {/* Center top crown */}
              <circle cx="250" cy="100" r="70" fill="url(#foliageHighlight)" />
              {/* Main central canopy mass */}
              <circle cx="250" cy="170" r="110" fill="url(#foliageMain)" />
            </g>

            {/* Decorative Organic Leaf Clusters in Canopy */}
            <g fill="#7FA479" fillOpacity="0.4">
              <path d="M120 180 Q130 160 140 180 Q130 200 120 180 Z" />
              <path d="M370 170 Q380 150 390 170 Q380 190 370 170 Z" />
              <path d="M230 75 Q240 55 250 75 Q240 95 230 75 Z" />
              <path d="M160 110 Q170 90 180 110 Q170 130 160 110 Z" />
              <path d="M320 100 Q330 80 340 100 Q330 120 320 100 Z" />
            </g>

            {/* Gold Sparkle Points in Canopy */}
            <g fill="#E5C158" fillOpacity="0.7">
              <circle cx="210" cy="90" r="4" />
              <circle cx="290" cy="95" r="5" />
              <circle cx="140" cy="150" r="4" />
              <circle cx="360" cy="140" r="4.5" />
              <circle cx="250" cy="65" r="5" />
              <circle cx="190" cy="220" r="3.5" />
              <circle cx="310" cy="220" r="4" />
            </g>

            {/* MAIN TRUNK & BRANCHES STRUCTURE */}
            <path
              d="M 215 455
                 C 220 420, 230 360, 232 300
                 C 233 260, 215 220, 175 180
                 C 160 165, 135 145, 110 130
                 L 118 124
                 C 145 140, 172 160, 192 180
                 C 210 198, 222 215, 232 235
                 C 238 215, 245 180, 246 140
                 C 246 110, 240 85, 235 70
                 L 245 68
                 C 252 86, 258 112, 258 142
                 C 258 175, 252 205, 258 225
                 C 268 200, 282 180, 310 160
                 C 335 142, 368 126, 395 115
                 L 401 122
                 C 374 133, 342 149, 318 167
                 C 292 187, 276 210, 268 238
                 C 278 265, 272 310, 274 360
                 C 276 410, 282 435, 288 455
                 Z"
              fill="url(#trunkGrad)"
            />

            {/* Trunk Gold Overlay / Bark Lines */}
            <path
              d="M 220 450 C 232 380, 236 320, 237 270"
              stroke="url(#trunkGoldHighlight)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 283 450 C 275 390, 271 330, 266 270"
              stroke="url(#trunkGoldHighlight)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Secondary Branch Extensions */}
            <path
              d="M 180 185 C 165 155, 145 135, 130 115"
              stroke="#36090F"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 150 156 C 140 140, 120 130, 100 120"
              stroke="#4A0E17"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 205 210 C 185 225, 160 235, 135 240"
              stroke="#36090F"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            <path
              d="M 315 170 C 335 145, 360 125, 380 105"
              stroke="#36090F"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 345 148 C 365 135, 385 130, 410 125"
              stroke="#4A0E17"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M 290 195 C 315 215, 340 225, 365 230"
              stroke="#36090F"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Root Flares */}
            <path
              d="M 220 445 C 200 452, 175 455, 155 458"
              stroke="#2A070B"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M 280 445 C 300 452, 325 455, 345 458"
              stroke="#2A070B"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>

          {/* Floating Glowing Wish Leaf Nodes */}
          <div className="absolute inset-0 pointer-events-none">
            {wishes.slice(0, 12).map((wish, index) => {
              // Staggered grid coordinates ensuring zero overlap between adjacent leaf badges
              const positions = [
                { top: '12%', left: '50%' }, // Top center crown
                { top: '15%', left: '20%' }, // Far left top
                { top: '15%', left: '80%' }, // Far right top
                { top: '26%', left: '33%' }, // Upper left mid
                { top: '26%', left: '67%' }, // Upper right mid
                { top: '40%', left: '14%' }, // Far left wing
                { top: '38%', left: '50%' }, // Center canopy
                { top: '40%', left: '86%' }, // Far right wing
                { top: '53%', left: '27%' }, // Lower left branch
                { top: '53%', left: '73%' }, // Lower right branch
                { top: '64%', left: '40%' }, // Bottom left accent
                { top: '64%', left: '60%' }, // Bottom right accent
              ];
              const pos = positions[index % positions.length];

              return (
                <motion.div
                  key={wish.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    y: [0, -5, 0],
                    rotate: [-1, 1, -1]
                  }}
                  transition={{
                    duration: 3.5 + (index % 3),
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                    delay: index * 0.12
                  }}
                  style={{ top: pos.top, left: pos.left }}
                  className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-20"
                  onClick={() => setActiveWish(wish)}
                >
                  <div
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-sans font-semibold text-wedding-maroon-deep shadow-md border border-white/60 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:shadow-gold-glow whitespace-nowrap"
                    style={{ backgroundColor: wish.leafColor || '#E5C158' }}
                  >
                    <Leaf className="w-3 h-3 fill-current shrink-0" />
                    <span className="truncate max-w-[120px]">{wish.name}</span>
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
                <span className="text-xs text-wedding-maroon/50">{formatRelativeTime(wish.createdAt, wish.date)}</span>
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
