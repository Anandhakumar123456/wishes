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
import { Heart } from 'lucide-react';
import { weddingConfig } from './weddingConfig';
import type { GalleryItem } from './types';

const LOCAL_STORAGE_GALLERY_KEY = 'wedding_gallery_photos_v2';
const LOCAL_STORAGE_CONFIG_KEY = 'wedding_config_custom_v1';

export function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [weddingDetails, setWeddingDetails] = useState({
    groomName: weddingConfig.groomName,
    brideName: weddingConfig.brideName,
    weddingDate: weddingConfig.weddingDate,
    weddingLocation: weddingConfig.weddingLocation,
    heroSubtitle: weddingConfig.heroSubtitle,
    personalMessage: weddingConfig.personalMessage,
  });

  // Dedicated Route Detection for /admin, #admin, or trailing slash /admin/
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      
      if (path === '/admin' || path.endsWith('/admin') || hash === '#admin' || search.includes('admin=true')) {
        setIsAdminOpen(true);
        setShowIntro(false);
      }
    };

    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);
    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, []);

  // Load config & photos from API backend or localStorage or weddingConfig
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
            return;
          }
        }
      } catch (e) {}

      try {
        const savedPhotos = localStorage.getItem(LOCAL_STORAGE_GALLERY_KEY);
        if (savedPhotos) {
          setPhotos(JSON.parse(savedPhotos));
        } else {
          setPhotos(weddingConfig.galleryImages);
        }
      } catch (e) {
        setPhotos(weddingConfig.galleryImages);
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
            <WishTree />
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
              // Clean URL if closed
              if (window.location.pathname.toLowerCase() === '/admin') {
                window.history.pushState({}, '', '/');
              }
            }}
            photos={photos}
            onPhotoAdded={handlePhotoAdded}
            onPhotoDeleted={handlePhotoDeleted}
            weddingDetails={weddingDetails}
            onSaveDetails={handleSaveDetails}
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
