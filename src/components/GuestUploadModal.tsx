import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Sparkles, MessageCircle, Image as ImageIcon, Heart, CheckCircle2 } from 'lucide-react';
import type { GalleryItem, UserWish } from '../types';
import { triggerGoldConfetti } from '../utils/confetti';

interface GuestUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoAdded: (photo: GalleryItem) => void;
  onWishAdded: (wish: UserWish) => void;
}

export const GuestUploadModal: React.FC<GuestUploadModalProps> = ({
  isOpen,
  onClose,
  onPhotoAdded,
  onWishAdded,
}) => {
  const [activeTab, setActiveTab] = useState<'photo' | 'wish'>('photo');

  // Photo Upload Form State
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<'moments' | 'celebration' | 'candid' | 'memories'>('moments');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmittingPhoto, setIsSubmittingPhoto] = useState(false);

  // Wish Form State
  const [wishName, setWishName] = useState('');
  const [wishText, setWishText] = useState('');
  const [isSubmittingWish, setIsSubmittingWish] = useState(false);

  const [successMsg, setSuccessMsg] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handlePhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || (!file && !previewUrl)) return;

    setIsSubmittingPhoto(true);

    const newPhoto: GalleryItem = {
      id: `photo-${Date.now()}`,
      title: title.trim(),
      caption: caption.trim() || 'Shared by a loving friend',
      category,
      url: previewUrl || '',
    };

    onPhotoAdded(newPhoto);
    triggerGoldConfetti();
    setTitle('');
    setCaption('');
    setFile(null);
    setPreviewUrl(null);
    setSuccessMsg('Photo shared successfully to the memory gallery! 🎉');
    setTimeout(() => setSuccessMsg(''), 4000);
    setIsSubmittingPhoto(false);
  };

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
      createdAt: new Date().toISOString()
    };

    onWishAdded(newWish);
    setIsSubmittingWish(false);
    triggerGoldConfetti();
    setWishName('');
    setWishText('');
    setSuccessMsg('Your blessing has been posted to the Wish Tree! 🍃');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-start justify-center p-4 sm:p-6 pt-20 sm:pt-24 pb-8 bg-black/85 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-lg w-full bg-wedding-card rounded-3xl p-6 sm:p-8 border border-wedding-gold shadow-2xl space-y-6 my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Prominent High-Contrast Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-wedding-maroon text-wedding-gold shadow-xl hover:scale-110 border border-wedding-gold/40 transition-all"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-wedding-gold/20 flex items-center justify-center mx-auto text-wedding-gold border border-wedding-gold/40">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-wedding-maroon">
              Share Your Memory & Wish 💖
            </h3>
            <p className="font-sans text-xs text-wedding-maroon/70">
              Upload your photos or leave a blessing for the couple!
            </p>

            {/* Tab Switcher */}
            <div className="flex items-center justify-center gap-2 pt-3">
              <button
                onClick={() => setActiveTab('photo')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'photo'
                    ? 'bg-wedding-maroon text-wedding-gold shadow-md'
                    : 'bg-wedding-ivory text-wedding-maroon/70 hover:bg-wedding-gold/10'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>📸 Upload Photo</span>
              </button>

              <button
                onClick={() => setActiveTab('wish')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'wish'
                    ? 'bg-wedding-maroon text-wedding-gold shadow-md'
                    : 'bg-wedding-ivory text-wedding-maroon/70 hover:bg-wedding-gold/10'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>💬 Send a Wish</span>
              </button>
            </div>
          </div>

          {successMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: UPLOAD PHOTO */}
          {activeTab === 'photo' && (
            <form onSubmit={handlePhotoSubmit} className="space-y-4 font-sans text-left">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-2">
                  Select Photo File
                </label>
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-wedding-gold/50 rounded-2xl cursor-pointer bg-wedding-ivory hover:bg-wedding-gold/10 transition-colors relative overflow-hidden">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 text-wedding-maroon/70">
                      <Upload className="w-8 h-8 text-wedding-gold mb-2" />
                      <p className="text-xs font-semibold">Click to pick photo from device</p>
                      <p className="text-[10px] text-wedding-maroon/50 mt-1">PNG, JPG, WEBP, GIF</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1">
                  Photo Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Sangeet Dancing Memories"
                  className="w-full px-4 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:outline-none text-wedding-maroon text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:outline-none text-wedding-maroon text-sm"
                  >
                    <option value="moments">Moments</option>
                    <option value="celebration">Celebration</option>
                    <option value="candid">Candid</option>
                    <option value="memories">Memories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1">
                    Caption (Optional)
                  </label>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="e.g. Best times together!"
                    className="w-full px-4 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:outline-none text-wedding-maroon text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingPhoto || (!file && !previewUrl) || !title.trim()}
                className="w-full py-3 rounded-xl bg-wedding-maroon text-wedding-gold font-semibold text-sm shadow-md hover:bg-wedding-maroon-light transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>Share Photo to Gallery ✨</span>
              </button>
            </form>
          )}

          {/* TAB 2: SEND WISH */}
          {activeTab === 'wish' && (
            <form onSubmit={handleWishSubmit} className="space-y-4 font-sans text-left">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={wishName}
                  onChange={(e) => setWishName(e.target.value)}
                  placeholder="e.g. Anandh, Janani, Rahul"
                  className="w-full px-4 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:outline-none text-wedding-maroon text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1">
                  Your Blessing / Wish Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="e.g. Wishing you both a lifetime of happiness, laughter, and endless love!"
                  className="w-full px-4 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:outline-none text-wedding-maroon text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingWish || !wishName.trim() || !wishText.trim()}
                className="w-full py-3 rounded-xl bg-wedding-maroon text-wedding-gold font-semibold text-sm shadow-md hover:bg-wedding-maroon-light transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>Post Blessing to Wish Tree 🍃</span>
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
