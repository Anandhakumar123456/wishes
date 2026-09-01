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

### 3. Start Frontend & Backend API Together
```bash
npm run dev:all
```
This runs the **Express Backend Server** (Port `5000`) and **Vite Frontend** (Port `5173`) concurrently.

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

---

## 🔐 Admin Management Portal & Backend

The app includes a dedicated **Admin Control Center** (`AdminDashboard.tsx`) with a passcode lock to manage photos & content:

1. **Access Admin Portal**: Scroll to the footer and click **`Admin Portal 🔐`**.
2. **Default Passcode**: `wedding123` (or `1234`).
3. **Features**:
   - 📤 **Upload Photos**: Drag & drop / select photos from any device to upload to the server.
   - 🖼️ **Manage Gallery Grid**: View all uploaded photos and delete unwanted ones in real time.
   - 💾 **Backend API (`server.js`)**: Uploaded images are stored in `public/uploads/` with metadata stored in `server/data/photos.json`.

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

## 📸 How to Upload Photos (Anytime & Anywhere)

### Method 1: Live In-App Upload (Instant & Easy)
1. Scroll to the **Photo Gallery** section on the website.
2. Click the **`Upload Photo 📷`** button.
3. Choose any image from your phone or computer, add a title/category, and click **`Add to Gallery ✨`**.
4. The photo will instantly appear in the gallery and stay saved in browser storage!

### Method 2: Adding Local Images to the Project
1. Save your photos in `public/images/` (e.g. `public/images/reception.jpg`).
2. Open `src/weddingConfig.ts` and add your image object to the `galleryImages` array:
   ```typescript
   {
     id: "photo-custom-1",
     title: "Reception Joy",
     category: "celebration",
     url: "/images/reception.jpg",
     caption: "A magical evening with family & friends"
   }
   ```

### Method 3: Using Online Image Links (Imgur / Cloudinary)
1. Upload your photo to [Imgur.com](https://imgur.com) or [PostImages.org](https://postimages.org).
2. Copy the direct image URL (e.g. `https://i.imgur.com/your-photo.jpg`).
3. Paste the URL into `galleryImages` in `src/weddingConfig.ts`.

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
