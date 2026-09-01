import type { WeddingConfig } from './types';

export const weddingConfig: WeddingConfig = {
  // --- BRIDE & GROOM DETAILS ---
  groomName: "Vijay",
  brideName: "Sowntharya",
  weddingDate: "2026-09-13T10:00:00", // Format: YYYY-MM-DDTHH:MM:SS
  weddingLocation: "Sathyamangalam, Erode",
  yourName: "Anand & Your Best Friends",

  // --- HERO SECTION ---
  heroHeadline: "Two Hearts.\nOne Beautiful Beginning.",
  heroSubtitle: "Celebrating the beginning of a beautiful forever.",

  // --- PERSONAL WISH SECTION ---
  personalMessageTitle: "For You, With Love ❤️",
  personalMessage: `From all the little moments we've shared to this beautiful moment in your life, it feels so special to see you begin a new chapter.

You deserve a life filled with laughter, peace, endless love, crazy memories, and someone who always chooses you.

May your journey together be filled with beautiful surprises, countless smiles, and a lifetime of happiness.

Wishing you both a beautiful forever. ❤️`,
  signatureText: "With lots of love,",

  // --- "A LETTER FOR YOU" SECTION ---
  letterHeadline: "There's something I wanted to tell you...",
  letterGreeting: "Dear Sowndharya,",
  letterBody: [
    "Today isn't just another day.",
    "It's the beginning of a completely new chapter in your life.",
    "I hope this new chapter brings you everything your heart deserves — love, laughter, peace, adventures, and countless beautiful memories.",
    "No matter how much life changes, I hope you always remember the people and moments that made your journey special.",
    "Here's to your happiness, your dreams, and your forever. Congratulations on finding your person."
  ],
  letterClosing: "With love,",

  // --- FINAL SURPRISE BLESSING ---
  finalBlessing: "May your love story be beautiful, your laughter endless, and your forever unforgettable.",

  // --- MEMORY TIMELINE (4-6 Polaroid Memories) ---
  memories: [
    {
      id: "mem-1",
      number: "01",
      title: "The Beginning",
      subtitle: "Where our friendship started",
      description: "From endless late-night chats to laughing till our stomachs hurt. The start of an unbroken bond.",
      date: "2020",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      tag: "First Chapter"
    },
    {
      id: "mem-2",
      number: "02",
      title: "Crazy Memories",
      subtitle: "Too many moments to fit into one website",
      description: "Spontaneous road trips, shared secrets, inside jokes, and memories that still make us burst out laughing.",
      date: "2023",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      tag: "Unforgettable"
    },
    {
      id: "mem-3",
      number: "03",
      title: "The Good Times",
      subtitle: "Some memories deserve to stay forever",
      description: "Standing by each other through every high and low, celebrating every milestone together.",
      date: "2024",
      image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
      tag: "Treasured"
    },
    {
      id: "mem-4",
      number: "04",
      title: "A New Chapter",
      subtitle: "And now, your beautiful forever begins",
      description: "Watching you walk into this new phase with so much grace, beauty, and happiness is the greatest joy.",
      date: "2026",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      tag: "Forever"
    }
  ],

  // --- PHOTO GALLERY ---
  galleryImages: [
    {
      id: "gal-1",
      title: "Radiant Smiles",
      category: "moments",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
      caption: "Pure magic in every smile",
      aspectRatio: "tall"
    },
    {
      id: "gal-2",
      title: "The Haldi Glow",
      category: "celebration",
      url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1000&q=80",
      caption: "Laughter, turmeric & golden warmth",
      aspectRatio: "wide"
    },
    {
      id: "gal-3",
      title: "Best Friends Forever",
      category: "memories",
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
      caption: "Through thick and thin, always together",
      aspectRatio: "square"
    },
    {
      id: "gal-4",
      title: "Traditional Grace",
      category: "candid",
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
      caption: "A timeless Indian bride look",
      aspectRatio: "tall"
    },
    {
      id: "gal-5",
      title: "Royal Celebrations",
      category: "celebration",
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
      caption: "Dancing under twinkling lights",
      aspectRatio: "wide"
    },
    {
      id: "gal-6",
      title: "A Lifetime of Love",
      category: "moments",
      url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=80",
      caption: "Hand in hand towards tomorrow",
      aspectRatio: "square"
    }
  ],

  // --- REASONS YOU DESERVE HAPPINESS ---
  reasonsToBeHappy: [
    {
      id: "reason-1",
      title: "Your Smile",
      subtitle: "Lights up every room",
      description: "Your laughter has an infectious warmth that turns any ordinary day into a celebration.",
      iconName: "Smile"
    },
    {
      id: "reason-2",
      title: "Your Kind Heart",
      subtitle: "Purer than gold",
      description: "You always care so deeply for everyone around you, giving your love selflessly.",
      iconName: "Heart"
    },
    {
      id: "reason-3",
      title: "Your Crazy Energy",
      subtitle: "Never a dull moment",
      description: "Your fun spirit, sudden plans, and joyful chaos make life 10x more exciting.",
      iconName: "Zap"
    },
    {
      id: "reason-4",
      title: "Your Beautiful Soul",
      subtitle: "A rare treasure",
      description: "The grace and authenticity with which you live your life is truly inspiring.",
      iconName: "Sparkles"
    },
    {
      id: "reason-5",
      title: "Your Strength",
      subtitle: "Unshakeable & resilient",
      description: "You handle every milestone with maturity, kindness, and unwavering courage.",
      iconName: "Shield"
    },
    {
      id: "reason-6",
      title: "Your Happiness",
      subtitle: "Our biggest prayer",
      description: "Seeing you happy is all we could ever wish for. May your heart always be full.",
      iconName: "Sun"
    }
  ],

  // --- PRE-LOADED WISHES FOR THE WISH TREE ---
  initialWishes: [
    {
      id: "wish-1",
      name: "Priya",
      message: "May your forever be even more beautiful than your wildest dreams! So happy for you Sowndharya! ❤️",
      date: "Just now",
      leafColor: "#E5C158"
    },
    {
      id: "wish-2",
      name: "Rahul & Sneha",
      message: "Wishing you both a lifetime of laughter, endless chai dates, and sweet adventures! 🥂✨",
      date: "1 hour ago",
      leafColor: "#F4C2C2"
    },
    {
      id: "wish-3",
      name: "Vikram",
      message: "Congratulations Rohan & Sowndharya! Wishing you endless bliss and love in your journey together.",
      date: "2 hours ago",
      leafColor: "#93C5FD"
    }
  ],

  // --- BACKGROUND MUSIC AUDIO FILE ---
  // Supports:
  // 1. YouTube links (e.g. "https://www.youtube.com/watch?v=jN-aWJ5fwJI")
  // 2. Local MP3 files in 'public/audio/wedding-song.mp3' (e.g. "/audio/wedding-song.mp3")
  // 3. Any direct MP3 audio URL
  musicFile: "https://www.youtube.com/watch?v=jN-aWJ5fwJI"
};
