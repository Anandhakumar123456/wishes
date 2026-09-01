import { useState } from 'react';
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
import { Heart } from 'lucide-react';
import { weddingConfig } from './weddingConfig';

export function App() {
  const [showIntro, setShowIntro] = useState(true);

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
            <PhotoGallery />
            <LetterSection />
            <Countdown />
            <WishTree />
            <ReasonsSection />
            <FinalSurprise />
          </main>

          {/* Floating Music Player */}
          <MusicPlayer />

          {/* Footer */}
          <footer className="relative z-10 py-10 px-4 bg-wedding-maroon-deep text-wedding-gold-light/70 text-center border-t border-wedding-gold/20 text-xs sm:text-sm font-sans space-y-2">
            <div className="flex items-center justify-center gap-1.5 font-script text-xl text-wedding-gold">
              <span>Crafted with love for</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline-block" />
              <span>{weddingConfig.brideName} & {weddingConfig.groomName}</span>
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
