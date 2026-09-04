import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IntroAnimation } from './components/IntroAnimation';
import { PetalCanvas } from './components/PetalCanvas';
import { FloatingNavigation } from './components/FloatingNavigation';
import { WeddingHero } from './components/WeddingHero';
import { WishSection } from './components/WishSection';
import { MemoryTimeline } from './components/MemoryTimeline';
import { PhotoGallery } from './components/PhotoGallery';
import { LetterSection } from './components/LetterSection';
import { Countdown } from './components/Countdown';
import { WishTree } from './components/WishTree';
import { ReasonsSection } from './components/ReasonsSection';
import { FinalSurprise } from './components/FinalSurprise';
import { MusicPlayer } from './components/MusicPlayer';
import { AdminDashboard } from './components/AdminDashboard';
import { GuestUploadModal } from './components/GuestUploadModal';
import { Heart } from 'lucide-react';
import { weddingConfig } from './weddingConfig';
import type { GalleryItem, UserWish } from './types';

const LOCAL_STORAGE_GALLERY_KEY = 'wedding_gallery_photos_v2';
const LOCAL_STORAGE_WISHES_KEY = 'wedding_wishes_list_v2';
const LOCAL_STORAGE_CONFIG_KEY = 'wedding_config_custom_v1';

export function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showIntro, setShowIntro] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isGuestUploadOpen, setIsGuestUploadOpen] = useState(false);
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [wishes, setWishes] = useState<UserWish[]>([]);
  const [weddingDetails, setWeddingDetails] = useState({
    groomName: weddingConfig.groomName,
    brideName: weddingConfig.brideName,
    weddingDate: weddingConfig.weddingDate,
    weddingLocation: weddingConfig.weddingLocation,
    yourName: weddingConfig.yourName,
    heroSubtitle: weddingConfig.heroSubtitle,
    personalMessage: weddingConfig.personalMessage,
  });

  // Route Detection for /admin (Admin Panel) & /upload (Guest Shareable Link)
  useEffect(() => {
    const path = location.pathname.toLowerCase().replace(/\/$/, '');
    const hash = location.hash.toLowerCase();
    const search = location.search.toLowerCase();
    
    if (path === '/admin' || path.endsWith('/admin') || hash === '#admin' || search.includes('admin=true')) {
      setIsAdminOpen(true);
      setIsGuestUploadOpen(false);
      setShowIntro(false);
    } else if (
      path === '/upload' ||
      path.endsWith('/upload') ||
      path === '/contribute' ||
      path.endsWith('/contribute') ||
      hash === '#upload' ||
      hash === '#contribute' ||
      search.includes('upload=true')
    ) {
      setIsGuestUploadOpen(true);
      setIsAdminOpen(false);
      setShowIntro(false);
    } else {
      setIsAdminOpen(false);
      setIsGuestUploadOpen(false);
    }
  }, [location]);

  // Load config, photos & wishes from localStorage or weddingConfig
  useEffect(() => {
    // 1. Config
    try {
      const savedConfig = localStorage.getItem(LOCAL_STORAGE_CONFIG_KEY);
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig);
        Object.assign(weddingConfig, parsed);
        setWeddingDetails((prev) => ({ ...prev, ...parsed }));
      }
    } catch (err) {}

    // 2. Photos
    try {
      const savedPhotos = localStorage.getItem(LOCAL_STORAGE_GALLERY_KEY);
      if (savedPhotos) {
        setPhotos(JSON.parse(savedPhotos));
      } else {
        setPhotos(weddingConfig.galleryImages);
      }
    } catch (err) {
      setPhotos(weddingConfig.galleryImages);
    }

    // 3. Wishes
    try {
      const savedWishes = localStorage.getItem(LOCAL_STORAGE_WISHES_KEY);
      if (savedWishes) {
        const parsed: UserWish[] = JSON.parse(savedWishes);
        const normalized = parsed.map((w, idx) => ({
          ...w,
          createdAt: w.createdAt || new Date(Date.now() - (idx + 1) * 5 * 60 * 1000).toISOString()
        }));
        setWishes(normalized);
      } else {
        setWishes(weddingConfig.initialWishes);
      }
    } catch (e) {
      setWishes(weddingConfig.initialWishes);
    }
  }, []);

  const handleSaveDetails = (newDetails: Partial<typeof weddingDetails>) => {
    setWeddingDetails((prev) => {
      const updated = { ...prev, ...newDetails };
      Object.assign(weddingConfig, updated);
      try {
        localStorage.setItem(LOCAL_STORAGE_CONFIG_KEY, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handlePhotoAdded = (newPhoto: GalleryItem) => {
    const updated = [newPhoto, ...photos];
    setPhotos(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_GALLERY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  };

  const handlePhotoDeleted = (id: string) => {
    const updated = photos.filter(p => p.id !== id);
    setPhotos(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_GALLERY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
  };

  const handleWishAdded = (newWish: UserWish) => {
    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_WISHES_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  const handleWishDeleted = (id: string) => {
    const updated = wishes.filter(w => w.id !== id);
    setWishes(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_WISHES_KEY, JSON.stringify(updated));
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-wedding-bg text-wedding-maroon relative font-sans selection:bg-wedding-gold/30">

      {/* Intro Cinematic Experience */}
      {showIntro ? (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      ) : (
        <>
          {/* Petal Canvas Animation Layer */}
          <PetalCanvas density={30} />

          {/* Floating Navigation Header */}
          <FloatingNavigation />

          {/* Main Website Sections */}
          <main className="relative z-10">
            <WeddingHero />
            <WishSection />
            <MemoryTimeline />
            <PhotoGallery photos={photos} />
            <LetterSection />
            <Countdown />
            <WishTree wishes={wishes} onWishAdded={handleWishAdded} />
            <ReasonsSection />
            <FinalSurprise />
          </main>

          {/* Floating Music Player */}
          <MusicPlayer />

          {/* Admin Management Dashboard Modal */}
          <AdminDashboard
            isOpen={isAdminOpen}
            onClose={() => {
              setIsAdminOpen(false);
              navigate('/');
            }}
            photos={photos}
            wishes={wishes}
            onPhotoAdded={handlePhotoAdded}
            onPhotoDeleted={handlePhotoDeleted}
            onWishAdded={handleWishAdded}
            onWishDeleted={handleWishDeleted}
            weddingDetails={weddingDetails}
            onSaveDetails={handleSaveDetails}
          />

          {/* Guest Shareable Photo & Wish Upload Modal */}
          <GuestUploadModal
            isOpen={isGuestUploadOpen}
            onClose={() => {
              setIsGuestUploadOpen(false);
              navigate('/');
            }}
            onPhotoAdded={handlePhotoAdded}
            onWishAdded={handleWishAdded}
          />

          {/* Footer */}
          <footer className="relative z-10 py-10 px-4 bg-wedding-maroon-deep text-wedding-gold-light/70 text-center border-t border-wedding-gold/20 text-xs sm:text-sm font-sans space-y-3">
            <div className="flex items-center justify-center gap-1.5 font-script text-xl text-wedding-gold">
              <span>Crafted with love for</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline-block" />
              <span>{weddingConfig.groomName} & {weddingConfig.brideName}</span>
            </div>
            
            <p className="text-wedding-gold-light/40">
              © {new Date().getFullYear()} Personal Wedding Gift. All memories preserved with love.
            </p>
          </footer>
        </>
      )}

    </div>
  );
}

export default App;
