import { useState, useEffect } from 'react';
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
    const checkRoutes = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      
      if (path === '/admin' || path.endsWith('/admin') || hash === '#admin' || search.includes('admin=true')) {
        setIsAdminOpen(true);
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
        setShowIntro(false);
      }
    };

    checkRoutes();
    window.addEventListener('popstate', checkRoutes);
    window.addEventListener('hashchange', checkRoutes);
    return () => {
      window.removeEventListener('popstate', checkRoutes);
      window.removeEventListener('hashchange', checkRoutes);
    };
  }, []);

  // Load config, photos & wishes from API backend or localStorage or weddingConfig
  useEffect(() => {
    async function fetchInitialData() {
      // 1. Fetch Config
      try {
        const res = await fetch('/api/config');
        if (res.ok) {
          const customConfig = await res.json();
          if (customConfig && Object.keys(customConfig).length > 0) {
            Object.assign(weddingConfig, customConfig);
            setWeddingDetails((prev) => ({ ...prev, ...customConfig }));
          }
        }
      } catch (e) {
        try {
          const savedConfig = localStorage.getItem(LOCAL_STORAGE_CONFIG_KEY);
          if (savedConfig) {
            const parsed = JSON.parse(savedConfig);
            Object.assign(weddingConfig, parsed);
            setWeddingDetails((prev) => ({ ...prev, ...parsed }));
          }
        } catch (err) {}
      }

      // 2. Fetch Photos
      try {
        const res = await fetch('/api/photos');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setPhotos(data);
          }
        }
      } catch (e) {
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
      }

      // 3. Fetch Wishes
      try {
        const res = await fetch('/api/wishes');
        if (res.ok) {
          const wishData = await res.json();
          if (wishData && wishData.length > 0) {
            setWishes(wishData);
            return;
          }
        }
      } catch (e) {}

      try {
        const savedWishes = localStorage.getItem(LOCAL_STORAGE_WISHES_KEY);
        if (savedWishes) {
          setWishes(JSON.parse(savedWishes));
        } else {
          setWishes(weddingConfig.initialWishes);
        }
      } catch (e) {
        setWishes(weddingConfig.initialWishes);
      }
    }

    fetchInitialData();
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
              if (window.location.pathname.toLowerCase() === '/admin') {
                window.history.pushState({}, '', '/');
              }
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
              const path = window.location.pathname.toLowerCase();
              if (path.includes('/upload') || path.includes('/contribute')) {
                window.history.pushState({}, '', '/');
              }
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
