import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, CheckCircle2, Send } from 'lucide-react';
import type { UserWish } from '../types';
import { triggerGoldConfetti } from '../utils/confetti';
import { PetalCanvas } from './PetalCanvas';
import { weddingConfig } from '../weddingConfig';

interface GuestUploadModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onPhotoAdded?: (photo: any) => void;
  onWishAdded: (wish: UserWish) => void;
  groomName?: string;
  brideName?: string;
}

export const GuestUploadModal: React.FC<GuestUploadModalProps> = ({
  onWishAdded,
  groomName = weddingConfig.groomName,
  brideName = weddingConfig.brideName,
}) => {
  // Wish Form State
  const [wishName, setWishName] = useState('');
  const [wishText, setWishText] = useState('');
  const [isSubmittingWish, setIsSubmittingWish] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishText.trim()) return;

    setIsSubmittingWish(true);
    const colors = ['#E5C158', '#F4C2C2', '#93C5FD', '#FDE047', '#C084FC'];
    const newWish: UserWish = {
      id: `wish-${Date.now()}`,
      name: wishName.trim(),
      message: wishText.trim(),
      leafColor: colors[Math.floor(Math.random() * colors.length)],
      date: 'Just now',
      createdAt: new Date().toISOString(),
    };

    onWishAdded(newWish);
    setIsSubmittingWish(false);
    triggerGoldConfetti();
    setWishName('');
    setWishText('');
    setSuccessMsg('Your blessing has been posted to the Wish Tree! 🍃');
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  return (
    <div className="min-h-screen w-full bg-wedding-bg text-wedding-maroon relative font-sans flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto selection:bg-wedding-gold/30">
      {/* Background Petal Animation */}
      <PetalCanvas density={25} />

      {/* Main Upload Card */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-lg w-full bg-wedding-card rounded-3xl p-6 sm:p-8 border border-wedding-gold shadow-2xl space-y-6 z-10 my-auto"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-full bg-wedding-gold/20 flex items-center justify-center mx-auto text-wedding-gold border border-wedding-gold/40 shadow-inner">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500" />
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wedding-maroon tracking-tight">
            Share Your Blessing 💖
          </h1>

          <p className="font-sans text-xs sm:text-sm text-wedding-maroon/70 max-w-xs mx-auto">
            Leave a heartfelt wish for {groomName} & {brideName} on their special day!
          </p>

          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-wedding-gold to-transparent mx-auto pt-1" />
        </div>

        {/* Success Alert */}
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-semibold shadow-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </motion.div>
        )}

        {/* Wish Form */}
        <form onSubmit={handleWishSubmit} className="space-y-4 font-sans text-left">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1.5">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={wishName}
              onChange={(e) => setWishName(e.target.value)}
              placeholder="e.g. Anandh, Janani, Rahul"
              className="w-full px-4 py-3 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:ring-2 focus:ring-wedding-gold/30 focus:outline-none text-wedding-maroon text-sm shadow-inner transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1.5">
              Your Blessing / Wish Message *
            </label>
            <textarea
              rows={4}
              required
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              placeholder="e.g. Wishing you both a lifetime of happiness, laughter, and endless love!"
              className="w-full px-4 py-3 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:ring-2 focus:ring-wedding-gold/30 focus:outline-none text-wedding-maroon text-sm shadow-inner transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmittingWish || !wishName.trim() || !wishText.trim()}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-wedding-maroon to-wedding-maroon-deep text-wedding-gold font-semibold text-sm shadow-xl hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-wedding-gold/30 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            <Sparkles className="w-4 h-4 text-wedding-gold-light" />
            <span>Post Blessing to Wish Tree 🍃</span>
          </button>
        </form>

        {/* Footer Note / Optional Navigation to Main Website
        <div className="pt-2 text-center border-t border-wedding-gold/20">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-wedding-maroon/60 hover:text-wedding-maroon transition-colors hover:underline"
          >
            <span>View Full Wishes Website</span>
            <span>→</span>
          </a>
        </div> */}
      </motion.div>
    </div>
  );
};
