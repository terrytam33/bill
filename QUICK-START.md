# Quick Start Guide - Install on Mobile

## Step 1: Generate Icons (One-time setup)

1. Open `create-icons.html` in your browser
2. Click "Generate & Download Icons"
3. Save the downloaded files (`icon-192.png` and `icon-512.png`) in the same folder as `index.html`

## Step 2: Run a Local Server

**Windows (PowerShell):**
```powershell
# If you have Python installed:
python -m http.server 8000

# Or if you have Node.js:
npx http-server -p 8000
```

**Mac/Linux:**
```bash
python3 -m http.server 8000
```

Then open: `http://localhost:8000` in your browser

## Step 3: Install on Your Phone

### Android (Chrome):
1. Open the app URL in Chrome on your phone
2. Tap menu (⋮) → **"Install app"** or **"Add to Home screen"**
3. Tap **"Install"**

### iPhone/iPad (Safari):
1. Open the app URL in Safari on your phone
2. Tap Share button (□↑) → **"Add to Home Screen"**
3. Tap **"Add"**

## Step 4: Access Your App

The app will appear on your home screen like a native app! Tap it to open.

---

**Note:** For production use, deploy to a web server with HTTPS (GitHub Pages, Netlify, etc.) for the best experience.

