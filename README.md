# 💍 Elegant Digital Wedding Wishes & Memories Portal

A stunning, modern, and interactive wedding website built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**. Designed as a luxury personalized digital invitation, memory timeline, and interactive wish platform for celebrating a special couple.

---

## ✨ Features

- 💖 **Cinematic Intro Experience**: Interactive sealed envelope with ribbon animation and falling petal effects.
- 🍃 **Interactive Wish Tree**: Organic SVG tree illustration where guests can leave custom glowing leaf blessings (persisted in `localStorage`).
- 🎵 **Floating Music Player**: Romantic background music with seamless Web Audio ambient synthesizer fallback.
- ⏳ **Live Wedding Countdown**: Real-time countdown timer tracking days, hours, minutes, and seconds until the big day.
- 📸 **Interactive Photo Gallery**: Filterable photo grid with heart likes and lightbox preview modal.
- 📜 **Memory Timeline**: Milestones of the couple's journey presented in a clean timeline view.
- 💌 **"A Letter For You"**: Unsealable digital greeting card with celebratory petal confetti shower.
- 🌸 **Petal Canvas Layer**: Organic HTML5 Canvas physics simulation of gently falling flower petals.
- 🎨 **Luxury Aesthetic System**: Customized glassmorphism (`glass-luxury`), gold gradients (`#D4AF37`, `#E5C158`), and deep maroon accents (`#4A0E17`).

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **FX**: [Canvas Confetti](https://github.com/catdad/canvas-confetti)
- **Audio Engine**: Web HTML5 Audio + Web Audio Synth Fallback

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/your-username/wedding-wishes.git
cd wedding-wishes
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 🎵 How to Change the Background Audio

You can easily use your own custom MP3 audio track or an online music URL.

### Option A: Use a Local MP3 File (Recommended)
1. Place your `.mp3` audio file into the `public/audio/` directory:
   ```text
   public/audio/your-wedding-song.mp3
   ```
2. Open `src/weddingConfig.ts` and set `musicFile` to your local file path:
   ```typescript
   musicFile: "/audio/your-wedding-song.mp3"
   ```

### Option B: Use a YouTube Link (e.g. `https://www.youtube.com/watch?v=...`)
1. Open `src/weddingConfig.ts`.
2. Paste any YouTube video URL directly into `musicFile`:
   ```typescript
   musicFile: "https://www.youtube.com/watch?v=jN-aWJ5fwJI"
   ```

### Option C: Use an Online MP3 Audio URL
1. Open `src/weddingConfig.ts`.
2. Replace `musicFile` with any direct MP3 link (HTTPS URL):
   ```typescript
   musicFile: "https://example.com/path-to-your-song.mp3"
   ```

> **Note**: The player automatically detects YouTube links, MP3 files, or local audio. If network playback fails, it gracefully falls back to an ambient Web Audio synthesizer so music always plays!

---

## ⚙️ Configuration & Customization (`weddingConfig.ts`)

All content and details are centralized in `src/weddingConfig.ts`. You can customize:

- **Bride & Groom Names**: `brideName`, `groomName`
- **Wedding Date & Location**: `weddingDate` (Format: `YYYY-MM-DDTHH:MM:SS`), `weddingLocation`
- **Personal Messages & Letter**: `personalMessage`, `letterGreeting`, `letterBody`
- **Memory Timeline**: `memories` array (dates, titles, descriptions, photos)
- **Photo Gallery**: `galleryImages` array (categories, captions, image URLs)
- **Initial Wishes**: `initialWishes` list

---

## 📂 Project Structure

```text
Wishes/
├── public/
│   ├── audio/              # Store custom MP3 audio tracks here
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/         # Modular UI components
│   │   ├── FloatingNavigation.tsx
│   │   ├── WeddingHero.tsx
│   │   ├── WishSection.tsx
│   │   ├── MemoryTimeline.tsx
│   │   ├── PhotoGallery.tsx
│   │   ├── LetterSection.tsx
│   │   ├── Countdown.tsx
│   │   ├── WishTree.tsx
│   │   ├── MusicPlayer.tsx
│   │   └── PetalCanvas.tsx
│   ├── utils/              # Confetti & Audio Synth utilities
│   ├── types.ts            # TypeScript interfaces
│   ├── weddingConfig.ts    # Centralized application configuration
│   ├── App.tsx             # Main page container layout
│   └── main.tsx            # Entry point
├── package.json
└── README.md
```

---

## 📄 License

Created with ❤️ for personal wedding celebrations. Free to customize and share!
