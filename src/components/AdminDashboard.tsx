import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Key, Upload, Trash2, X, Sparkles, CheckCircle2, ShieldAlert, Settings, Image as ImageIcon, MessageCircle, UserCheck } from 'lucide-react';
import type { GalleryItem, UserWish } from '../types';
import { triggerGoldConfetti } from '../utils/confetti';
import { formatRelativeTime } from '../utils/dateFormatter';

interface WeddingDetails {
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingLocation: string;
  yourName: string;
  heroSubtitle: string;
  personalMessage: string;
}

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  photos: GalleryItem[];
  wishes: UserWish[];
  onPhotoAdded: (photo: GalleryItem) => void;
  onPhotoDeleted: (id: string) => void;
  onWishAdded: (wish: UserWish) => void;
  onWishDeleted: (id: string) => void;
  weddingDetails: WeddingDetails;
  onSaveDetails: (newDetails: Partial<WeddingDetails>) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  photos,
  wishes,
  onPhotoAdded,
  onPhotoDeleted,
  onWishAdded,
  onWishDeleted,
  weddingDetails,
  onSaveDetails,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'details' | 'upload' | 'photos' | 'wishes'>('details');

  // Details Form State
  const [groomName, setGroomName] = useState(weddingDetails.groomName);
  const [brideName, setBrideName] = useState(weddingDetails.brideName);
  const [weddingDate, setWeddingDate] = useState(weddingDetails.weddingDate);
  const [weddingLocation, setWeddingLocation] = useState(weddingDetails.weddingLocation);
  const [yourName, setYourName] = useState(weddingDetails.yourName || 'Anand & Your Best Friends');
  const [heroSubtitle, setHeroSubtitle] = useState(weddingDetails.heroSubtitle || '');
  const [personalMessage, setPersonalMessage] = useState(weddingDetails.personalMessage || '');

  // Photo Upload State
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState<'moments' | 'celebration' | 'candid' | 'memories'>('moments');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Wish Add State
  const [wishName, setWishName] = useState('');
  const [wishText, setWishText] = useState('');

  const [, setTick] = useState(0);

  // Live timer interval to automatically update relative timestamps
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(timer);
  }, [isOpen]);

  // Sync props when opening
  useEffect(() => {
    setGroomName(weddingDetails.groomName);
    setBrideName(weddingDetails.brideName);
    setWeddingDate(weddingDetails.weddingDate);
    setWeddingLocation(weddingDetails.weddingLocation);
    setYourName(weddingDetails.yourName || 'Anand & Your Best Friends');
    setHeroSubtitle(weddingDetails.heroSubtitle || '');
    setPersonalMessage(weddingDetails.personalMessage || '');
  }, [weddingDetails, isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (passcode === 'wedding123' || passcode === '1234') {
      setIsAuthenticated(true);
      setPasscode('');
    } else {
      setErrorMsg('Incorrect passcode. Try "wedding123"');
    }
  };

  const handleSaveWeddingDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccessMsg('');

    const newDetails = {
      groomName: groomName.trim(),
      brideName: brideName.trim(),
      weddingDate,
      weddingLocation: weddingLocation.trim(),
      yourName: yourName.trim(),
      heroSubtitle: heroSubtitle.trim(),
      personalMessage: personalMessage.trim()
    };

    onSaveDetails(newDetails);

    setSaveSuccessMsg('Wedding details & gift giver name updated successfully!');
    triggerGoldConfetti();
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

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

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || (!file && !previewUrl)) return;

    setIsSubmitting(true);

    const newPhoto: GalleryItem = {
      id: `photo-${Date.now()}`,
      title: title.trim(),
      caption: caption.trim() || 'Uploaded via Admin',
      category,
      url: previewUrl || '',
    };

    onPhotoAdded(newPhoto);
    triggerGoldConfetti();
    setTitle('');
    setCaption('');
    setFile(null);
    setPreviewUrl(null);
    setActiveTab('photos');
    setIsSubmitting(false);
  };

  const handleDeletePhoto = (id: string) => {
    onPhotoDeleted(id);
  };

  const handleAddWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishText.trim()) return;

    const colors = ['#E5C158', '#F4C2C2', '#93C5FD', '#FDE047', '#C084FC'];
    const createdWish: UserWish = {
      id: `wish-${Date.now()}`,
      name: wishName.trim(),
      message: wishText.trim(),
      leafColor: colors[Math.floor(Math.random() * colors.length)],
      date: 'Just now',
      createdAt: new Date().toISOString()
    };

    onWishAdded(createdWish);
    triggerGoldConfetti();
    setWishName('');
    setWishText('');
    setSaveSuccessMsg('Wish added successfully!');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  const handleDeleteWish = (id: string) => {
    onWishDeleted(id);
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
          className="relative max-w-2xl w-full bg-wedding-card rounded-3xl p-6 sm:p-8 border border-wedding-gold shadow-2xl space-y-6 my-auto"
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

          {!isAuthenticated ? (
            /* --- LOGIN FORM --- */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-wedding-gold/20 flex items-center justify-center mx-auto text-wedding-gold border border-wedding-gold/40">
                <Lock className="w-8 h-8 text-wedding-maroon" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-wedding-maroon">
                  Admin Management Portal 🔐
                </h3>
                <p className="font-sans text-xs text-wedding-maroon/70">
                  Enter admin passcode to edit wedding details, gift giver name, & wishes.
                </p>
              </div>

              <form onSubmit={handleLogin} className="max-w-sm mx-auto space-y-4 font-sans text-left">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1">
                    Admin Passcode
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 absolute left-3.5 top-3.5 text-wedding-maroon/50" />
                    <input
                      type="password"
                      required
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="e.g. wedding123"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:outline-none text-wedding-maroon text-sm"
                    />
                  </div>
                  <p className="text-[11px] text-wedding-maroon/50 mt-1">
                    Default passcode: <code className="bg-wedding-ivory px-1.5 py-0.5 rounded border border-wedding-gold/30">wedding123</code>
                  </p>
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-100 text-rose-800 text-xs">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-wedding-maroon text-wedding-gold font-semibold text-sm shadow-md hover:bg-wedding-maroon-light transition-all flex items-center justify-center gap-2"
                >
                  <span>Unlock Admin Panel</span>
                </button>
              </form>
            </div>
          ) : (
            /* --- ADMIN MANAGEMENT DASHBOARD --- */
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b border-wedding-gold/20 pb-4 space-y-3">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-wedding-maroon flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Admin Control Center</span>
                  </h3>
                  <p className="font-sans text-xs text-wedding-maroon/70">
                    Manage Groom/Bride names, Gift Giver name, photos & wishes
                  </p>
                </div>

                {/* Tab Controls */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab === 'details'
                        ? 'bg-wedding-maroon text-wedding-gold shadow-md'
                        : 'bg-wedding-ivory text-wedding-maroon/70 hover:bg-wedding-gold/10'
                      }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>⚙️ Details & Names</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('wishes')}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab === 'wishes'
                        ? 'bg-wedding-maroon text-wedding-gold shadow-md'
                        : 'bg-wedding-ivory text-wedding-maroon/70 hover:bg-wedding-gold/10'
                      }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>💬 Wishes ({wishes.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('upload')}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab === 'upload'
                        ? 'bg-wedding-maroon text-wedding-gold shadow-md'
                        : 'bg-wedding-ivory text-wedding-maroon/70 hover:bg-wedding-gold/10'
                      }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>➕ Add Photo</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('photos')}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${activeTab === 'photos'
                        ? 'bg-wedding-maroon text-wedding-gold shadow-md'
                        : 'bg-wedding-ivory text-wedding-maroon/70 hover:bg-wedding-gold/10'
                      }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>🖼️ Gallery ({photos.length})</span>
                  </button>
                </div>
              </div>

              {saveSuccessMsg && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {/* TAB 1: EDIT WEDDING DETAILS & GIFT GIVER NAME */}
              {activeTab === 'details' && (
                <form onSubmit={handleSaveWeddingDetails} className="space-y-4 font-sans text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1">
                        Groom Name 🤵
                      </label>
                      <input
                        type="text"
                        required
                        value={groomName}
                        onChange={(e) => setGroomName(e.target.value)}
                        placeholder="e.g. Vijay"
                        className="w-full px-4 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:outline-none text-wedding-maroon text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1">
                        Bride Name 👰
                      </label>
                      <input
                        type="text"
                        required
                        value={brideName}
                        onChange={(e) => setBrideName(e.target.value)}
                        placeholder="e.g. Sowntharya"
                        className="w-full px-4 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:outline-none text-wedding-maroon text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1">
                      Gift Giver / Signature Name 🎁
                    </label>
                    <div className="relative">
                      <UserCheck className="w-4 h-4 absolute left-3.5 top-3.5 text-wedding-maroon/50" />
                      <input
                        type="text"
                        required
                        value={yourName}
                        onChange={(e) => setYourName(e.target.value)}
                        placeholder="e.g. Anand & Your Best Friends"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:outline-none text-wedding-maroon text-sm font-semibold"
                      />
                    </div>
                    <span className="text-[10px] text-wedding-maroon/60 mt-1 block">
                      This name appears on the signature of "For You, With Love" & "A Letter For You" sections!
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1">
                        Wedding Date & Time 📅
                      </label>
                      <input
                        type="text"
                        required
                        value={weddingDate}
                        onChange={(e) => setWeddingDate(e.target.value)}
                        placeholder="e.g. 2026-09-13T10:00:00"
                        className="w-full px-4 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:outline-none text-wedding-maroon text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1">
                        Wedding Location 📍
                      </label>
                      <input
                        type="text"
                        required
                        value={weddingLocation}
                        onChange={(e) => setWeddingLocation(e.target.value)}
                        placeholder="e.g. Sathyamangalam, Erode"
                        className="w-full px-4 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:outline-none text-wedding-maroon text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1">
                      Personal Message Text
                    </label>
                    <textarea
                      rows={3}
                      value={personalMessage}
                      onChange={(e) => setPersonalMessage(e.target.value)}
                      placeholder="Enter personal love message..."
                      className="w-full px-4 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:outline-none text-wedding-maroon text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-wedding-maroon text-wedding-gold font-semibold text-sm shadow-md hover:bg-wedding-maroon-light transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Save All Details & Gift Giver Name ✨</span>
                  </button>
                </form>
              )}

              {/* TAB 2: MANAGE WISHES */}
              {activeTab === 'wishes' && (
                <div className="space-y-6">
                  {/* Add New Wish Form */}
                  <form onSubmit={handleAddWishSubmit} className="p-4 rounded-2xl bg-wedding-ivory border border-wedding-gold/40 space-y-3">
                    <h4 className="font-serif font-bold text-sm text-wedding-maroon flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-wedding-gold" />
                      <span>Add New Wish to Wish Tree & Wall</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={wishName}
                        onChange={(e) => setWishName(e.target.value)}
                        placeholder="Wish Giver Name (e.g. Anandh)"
                        className="px-3.5 py-2 rounded-xl bg-white border border-wedding-gold/40 focus:outline-none text-wedding-maroon text-xs"
                      />
                      <input
                        type="text"
                        required
                        value={wishText}
                        onChange={(e) => setWishText(e.target.value)}
                        placeholder="Wish Message (e.g. Happy married life!)"
                        className="px-3.5 py-2 rounded-xl bg-white border border-wedding-gold/40 focus:outline-none text-wedding-maroon text-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-wedding-maroon text-wedding-gold font-semibold text-xs shadow-md hover:bg-wedding-maroon-light transition-all flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Add Wish</span>
                    </button>
                  </form>

                  {/* Wish Cards Grid */}
                  <div className="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
                    {wishes.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-wedding-ivory border border-wedding-gold/30 hover:border-wedding-gold transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-sm font-bold text-wedding-maroon">
                              ❤️ {item.name}
                            </span>
                            <span className="text-[10px] text-wedding-maroon/50">
                              {formatRelativeTime(item.createdAt, item.date)}
                            </span>
                          </div>
                          <p className="text-xs text-wedding-maroon/80 italic">
                            "{item.message}"
                          </p>
                        </div>

                        <button
                          onClick={() => handleDeleteWish(item.id)}
                          className="p-2 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-600 hover:text-white transition-colors shrink-0 ml-3"
                          title="Delete Wish"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: UPLOAD PHOTO */}
              {activeTab === 'upload' && (
                <form onSubmit={handleUploadSubmit} className="space-y-4 font-sans text-left">
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
                          <p className="text-xs font-semibold">Click to select photo from device</p>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1">
                        Photo Title
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Sangeet Celebration"
                        className="w-full px-4 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:outline-none text-wedding-maroon text-sm"
                      />
                    </div>

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
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-wedding-maroon/80 mb-1">
                      Caption
                    </label>
                    <input
                      type="text"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="e.g. Pure joy and dancing with family"
                      className="w-full px-4 py-2.5 rounded-xl bg-wedding-ivory border border-wedding-gold/40 focus:border-wedding-gold focus:outline-none text-wedding-maroon text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || (!file && !previewUrl) || !title.trim()}
                    className="w-full py-3 rounded-xl bg-wedding-maroon text-wedding-gold font-semibold text-sm shadow-md hover:bg-wedding-maroon-light transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Publish Photo to Gallery ✨</span>
                  </button>
                </form>
              )}

              {/* TAB 4: MANAGE PHOTOS GRID */}
              {activeTab === 'photos' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto pr-1">
                  {photos.map((item) => (
                    <div
                      key={item.id}
                      className="relative group rounded-xl overflow-hidden border border-wedding-gold/30 bg-wedding-ivory"
                    >
                      <img src={item.url} alt={item.title} className="w-full h-28 object-cover" />
                      <div className="p-2 space-y-1">
                        <p className="text-xs font-bold text-wedding-maroon truncate">{item.title}</p>
                        <p className="text-[10px] text-wedding-maroon/60 capitalize">{item.category}</p>
                      </div>

                      <button
                        onClick={() => handleDeletePhoto(item.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 text-white shadow-md hover:bg-rose-700 transition-colors z-10"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
