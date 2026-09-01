import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Ensure upload & data directories exist
const uploadDir = path.join(__dirname, 'public', 'uploads');
const dataDir = path.join(__dirname, 'server', 'data');
const photosJsonPath = path.join(dataDir, 'photos.json');
const configJsonPath = path.join(dataDir, 'config.json');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(photosJsonPath)) {
  fs.writeFileSync(photosJsonPath, JSON.stringify([]));
}
if (!fs.existsSync(configJsonPath)) {
  fs.writeFileSync(configJsonPath, JSON.stringify({}));
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadDir));

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, 'photo-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage });

// Helper functions for data reading/writing
function getPhotos() {
  try {
    const raw = fs.readFileSync(photosJsonPath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function savePhotos(photos) {
  fs.writeFileSync(photosJsonPath, JSON.stringify(photos, null, 2));
}

function getConfig() {
  try {
    const raw = fs.readFileSync(configJsonPath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function saveConfig(config) {
  fs.writeFileSync(configJsonPath, JSON.stringify(config, null, 2));
}

// --- API ENDPOINTS ---

// 1. Admin Passcode Verification
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'wedding123';

app.get('/api/admin/login', (req, res) => {
  res.json({
    status: 'Admin Auth Endpoint Active',
    method: 'POST',
    description: 'Send JSON body { "password": "your-passcode" } to authenticate',
    defaultPasscode: 'wedding123'
  });
});

app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD || password === '1234') {
    res.json({ success: true, message: 'Admin authenticated' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid Admin Password' });
  }
});

app.get(['/admin', '/admin/*'], (req, res) => {
  res.redirect('http://localhost:5173/admin');
});

// 2. Get & Update Wedding Configuration (Groom, Bride, Date, Location, etc.)
app.get('/api/config', (req, res) => {
  const customConfig = getConfig();
  res.json(customConfig);
});

app.post('/api/config', (req, res) => {
  const newConfig = req.body;
  const existing = getConfig();
  const updated = { ...existing, ...newConfig };
  saveConfig(updated);
  res.json({ success: true, config: updated });
});

// 3. Get All Gallery Photos
app.get('/api/photos', (req, res) => {
  const photos = getPhotos();
  res.json(photos);
});

// 4. Upload Photo (File or URL)
app.post('/api/photos', upload.single('image'), (req, res) => {
  const { title, category, caption, imageUrl } = req.body;
  let finalUrl = '';

  if (req.file) {
    finalUrl = `/uploads/${req.file.filename}`;
  } else if (imageUrl) {
    finalUrl = imageUrl;
  } else {
    return res.status(400).json({ error: 'No image file or URL provided' });
  }

  const newPhoto = {
    id: 'photo-' + Date.now(),
    title: title || 'Wedding Memory',
    category: category || 'moments',
    caption: caption || 'Captured with love',
    url: finalUrl,
    createdAt: new Date().toISOString()
  };

  const photos = getPhotos();
  photos.unshift(newPhoto);
  savePhotos(photos);

  res.status(201).json(newPhoto);
});

// 5. Delete Photo by ID
app.delete('/api/photos/:id', (req, res) => {
  const { id } = req.params;
  let photos = getPhotos();
  const target = photos.find(p => p.id === id);

  if (target) {
    if (target.url.startsWith('/uploads/')) {
      const filePath = path.join(uploadDir, path.basename(target.url));
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.warn('Could not delete file:', filePath);
        }
      }
    }
    photos = photos.filter(p => p.id !== id);
    savePhotos(photos);
    res.json({ success: true, message: 'Photo deleted' });
  } else {
    res.status(404).json({ error: 'Photo not found' });
  }
});

// Serve frontend dist build if present
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
}

// Root Route Handler - Interactive API Hub & Frontend Redirect
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Wedding API & Server Hub</title>
      <style>
        body {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
          background: #FAF7F2;
          color: #4A0E17;
          margin: 0;
          padding: 40px 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 90vh;
        }
        .card {
          background: rgba(253, 251, 247, 0.95);
          border: 1px solid rgba(212, 175, 55, 0.4);
          box-shadow: 0 20px 40px rgba(74, 14, 23, 0.1);
          border-radius: 24px;
          padding: 40px;
          max-width: 650px;
          width: 100%;
          text-align: center;
        }
        h1 {
          font-size: 28px;
          margin-bottom: 8px;
          color: #36090F;
        }
        p {
          color: rgba(74, 14, 23, 0.7);
          font-size: 14px;
          margin-bottom: 30px;
        }
        .btn-main {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, #4A0E17 0%, #6B1124 100%);
          color: #E5C158;
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 15px;
          box-shadow: 0 10px 25px rgba(74, 14, 23, 0.3);
          transition: all 0.3s ease;
          margin-bottom: 30px;
        }
        .btn-main:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(74, 14, 23, 0.4);
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
          text-align: left;
        }
        .api-card {
          background: #FFFFFF;
          border: 1px solid rgba(212, 175, 55, 0.3);
          padding: 18px;
          border-radius: 16px;
          transition: all 0.2s ease;
          text-decoration: none;
          color: inherit;
        }
        .api-card:hover {
          border-color: #D4AF37;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
        .badge {
          display: inline-block;
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: bold;
          margin-bottom: 8px;
        }
        .get { background: #DEF7EC; color: #03543F; }
        .post { background: #E1EFFE; color: #1E40AF; }
        .del { background: #FDE8E8; color: #9B1C1C; }
        .api-title {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 4px;
          color: #4A0E17;
        }
        .api-desc {
          font-size: 12px;
          color: rgba(74, 14, 23, 0.65);
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>🚀 Wedding API & Server Hub</h1>
        <p>Backend Express API Server is live & healthy on port 5000</p>
        
        <a href="http://localhost:5173" class="btn-main">
          <span>✨ Open React Web App (Port 5173)</span>
        </a>

        <div style="font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #AA771C; margin-bottom: 14px;">
          Interactive API Endpoints
        </div>

        <div class="grid">
          <a href="/api/photos" target="_blank" class="api-card">
            <span class="badge get">GET</span>
            <div class="api-title">📸 Photos API</div>
            <div class="api-desc">View all gallery photos stored in backend database</div>
          </a>

          <a href="/api/config" target="_blank" class="api-card">
            <span class="badge get">GET</span>
            <div class="api-title">⚙️ Config API</div>
            <div class="api-desc">Fetch Groom, Bride, Date & Location parameters</div>
          </a>

          <a href="/api/admin/login" target="_blank" class="api-card">
            <span class="badge post">API</span>
            <div class="api-title">🔑 Admin Auth Info</div>
            <div class="api-desc">View API authentication endpoint specifications</div>
          </a>

          <a href="/admin" class="api-card">
            <span class="badge get">LAUNCH</span>
            <div class="api-title">👑 Admin Control Center</div>
            <div class="api-desc">Open Admin Dashboard to edit details & photos</div>
          </a>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Wedding Backend API server running on http://localhost:${PORT}`);
});
