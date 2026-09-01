# 💍 Elegant Digital Wedding Wishes & Memories Portal

A stunning, modern, and interactive wedding website built with **React 18**, **TypeScript**, **Express.js**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**. Designed as a luxury personalized digital invitation, memory timeline, interactive wish tree, and backend-managed photo & blessing hub for celebrating a special couple.

---

## ✨ Key Features & Highlights

- 💖 **Cinematic Intro Experience**: Interactive sealed envelope with ribbon animation and falling petal physics effects.
- 🍃 **Organic Interactive Wish Tree**: Tapered SVG trunk and foliage canopy where guests can attach glowing wish leaves that persist to the backend database.
- ⏱️ **Dynamic Relative Timestamps**: Wishes display real-time relative upload times (*"Just now"*, *"5 mins ago"*, *"2 hours ago"*, *"3 days ago"*).
- 📸 **Backend Photo Gallery & Lightbox**: Masonry photo gallery with categories (*Moments*, *Celebration*, *Candid*, *Memories*), likes, and full-screen lightbox modal with `z-100` stacking isolation.
- 🔗 **Shareable Friends Upload Link (`/upload`)**: Friends can upload photos and send wishes directly via a shareable link without needing an admin passcode.
- 👑 **Admin Management Control Center (`/admin`)**: Passcode-protected admin portal (`wedding123`) to manage Bride/Groom names, Wedding Date, Location, Gift Giver Signature Name, photos, and guest wishes.
- 🎵 **Continuous Background Audio Player**: Romantic background music supporting YouTube video URLs, MP3 audio files, and Web Audio synth fallback with mute/unmute control.
- ⏳ **Live Countdown Timer**: Real-time tracker counting down days, hours, minutes, and seconds to the wedding date.
- 📜 **Curated Memory Timeline**: Milestones of the couple's journey presented in a clean, scroll-aware timeline view.
- 💌 **"For You, With Love" & "A Letter For You"**: Interactive unsealable digital greeting cards with customizable gift giver signature.
- 🌸 **Petal Canvas Layer**: Organic HTML5 Canvas physics simulation of gently floating flower petals.
- 🚀 **Express Backend API Hub (`http://localhost:5000`)**: Interactive API dashboard listing all live endpoints.

---

## 🛠️ Technology Stack

- **Frontend**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Backend API**: [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/) + [Multer](https://github.com/expressjs/multer)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Confetti & Effects**: [Canvas Confetti](https://github.com/catdad/canvas-confetti)
- **Audio Engine**: YouTube Iframe API + HTML5 Audio + Web Audio Synth Fallback

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/your-username/wedding-wishes.git
cd wedding-wishes
npm install
```

### 2. Run Both Frontend & Backend Concurrently
```bash
npm run dev:all
```

This starts both servers simultaneously:
- ⚡ **Frontend Web App**: `http://localhost:5173`
- 🚀 **Backend Express API & Hub**: `http://localhost:5000`

---

## 📌 Dedicated Routes & Links

| Route | Purpose | Access |
| :--- | :--- | :--- |
| **`http://localhost:5173`** | Main Wedding Website & Invitation | Public |
| **`http://localhost:5173/upload`** | **Friends Shareable Link**: Upload photos & leave wishes | Public (No passcode) |
| **`http://localhost:5173/admin`** | **Admin Control Center**: Edit details, names, date & moderate content | Protected (`wedding123`) |
| **`http://localhost:5000`** | **Server API Hub**: Interactive REST API documentation & dashboard | Public |

---

## 👑 Admin Control Center (`/admin`)

To edit core wedding details or moderate content:

1. Open **`http://localhost:5173/admin`** (or `http://localhost:5000/admin`).
2. Enter the Admin Passcode: **`wedding123`** (or **`1234`**).
3. **Capabilities**:
   - ⚙️ **Details & Names**: Edit Groom Name, Bride Name, Wedding Date & Time, Location, and **Gift Giver Signature Name** (*e.g., "Anandh" or "Anand & Your Best Friends"*).
   - 💬 **Wishes Moderation**: View all submitted guest wishes, add new blessings, or delete unwanted wishes.
   - ➕ **Upload Photos**: Drag & drop or select image files to upload to the server.
   - 🖼️ **Gallery Grid**: View all uploaded photos with one-click deletion.

---

## 📸 Shareable Friends Contribution Link (`/upload`)

Send **`http://localhost:5173/upload`** to friends so they can contribute directly:
- **Upload Photo**: Pick an image file from any phone or computer, select a category, and publish it to the memory gallery.
- **Send a Wish**: Enter their name (*e.g., Anandh, Janani, Rahul*) and blessing message to plant a leaf on the Wish Tree.
- **No Password Required**: Clean, frictionless experience for guests!

---

## 🔌 Express Backend API Endpoints (`server.js`)

All data is automatically persisted in `server/data/`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/config` | Fetch Bride, Groom, Date, Location, and Gift Giver Name |
| `POST` | `/api/config` | Update and save wedding configuration |
| `GET` | `/api/photos` | Fetch all gallery photos metadata |
| `POST` | `/api/photos` | Upload image file (via `multer`) or image URL |
| `DELETE` | `/api/photos/:id` | Delete photo by ID and remove image file from server |
| `GET` | `/api/wishes` | Fetch all guest wishes with relative timestamps |
| `POST` | `/api/wishes` | Save a new guest blessing to `wishes.json` |
| `DELETE` | `/api/wishes/:id` | Delete wish by ID |
| `POST` | `/api/admin/login` | Verify admin passcode |

---

## 🎵 Background Music Configuration

Centralized in `src/weddingConfig.ts`:

### Option A: YouTube Link (Current Default)
```typescript
musicFile: "https://www.youtube.com/watch?v=jN-aWJ5fwJI"
```

### Option B: Local MP3 File
Place audio in `public/audio/song.mp3` and update:
```typescript
musicFile: "/audio/song.mp3"
```

> **Autoplay Feature**: Audio plays continuously and includes a floating mute/unmute widget (`Volume2` / `VolumeX`) on the bottom-right of the screen.

---

## 📂 Project Structure

```text
Wishes/
├── public/
│   ├── uploads/            # Server uploaded photo files
│   └── audio/              # Local MP3 tracks
├── server/
│   └── data/               # Persistent JSON databases
│       ├── config.json
│       ├── photos.json
│       └── wishes.json
├── src/
│   ├── components/         # Modular React UI components
│   │   ├── AdminDashboard.tsx      # Admin control center modal
│   │   ├── GuestUploadModal.tsx    # Friends shareable upload modal
│   │   ├── FloatingNavigation.tsx  # Capsule navigation bar
│   │   ├── WeddingHero.tsx         # Hero invitation section
│   │   ├── WishSection.tsx        # Personal message section
│   │   ├── MemoryTimeline.tsx      # Milestones timeline
│   │   ├── PhotoGallery.tsx        # Masonry photo gallery
│   │   ├── LetterSection.tsx       # Unsealable digital letter
│   │   ├── Countdown.tsx           # Real-time countdown timer
│   │   ├── WishTree.tsx            # Interactive organic wish tree
│   │   ├── MusicPlayer.tsx         # Audio player with YouTube & synth
│   │   ├── IntroAnimation.tsx      # Intro sealed envelope
│   │   └── PetalCanvas.tsx         # HTML5 canvas falling petals
│   ├── utils/              # Confetti, date formatters & audio synth
│   │   ├── dateFormatter.ts        # Dynamic relative time utility
│   │   ├── confetti.ts             # Particle confetti triggers
│   │   └── audioSynth.ts           # Web Audio synth fallback
│   ├── types.ts            # TypeScript interfaces
│   ├── weddingConfig.ts    # Central application configuration
│   ├── App.tsx             # Main application & routing logic
│   └── main.tsx            # Application entry point
├── server.js               # Express backend API server
├── package.json
└── README.md
```

---

## 📄 License

Created with ❤️ for personal wedding celebrations. Free to customize, share, and enjoy!
