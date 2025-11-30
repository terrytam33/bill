# Financial Management App - PWA

A Progressive Web App (PWA) for tracking expenses by category. Install it on your mobile device for easy access!

## Features

- 📱 **Installable on Mobile**: Works as a native app on iOS and Android
- 💾 **Offline Support**: Works without internet connection
- 🎯 **Quick Expense Entry**: One-click buttons for common categories
- 📊 **Expense Tracking**: View totals and category breakdowns
- 💰 **Persistent Storage**: Your data is saved locally

## Installation Instructions

### For Android:

1. Open the app in **Chrome** browser on your Android device
2. Tap the **menu** (three dots) in the top right
3. Select **"Add to Home screen"** or **"Install app"**
4. Tap **"Install"** or **"Add"**
5. The app will appear on your home screen like a native app!

### For iOS (iPhone/iPad):

1. Open the app in **Safari** browser on your iOS device
2. Tap the **Share** button (square with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"** in the top right
5. The app will appear on your home screen!

## Setup for Local Development

### Option 1: Using a Local Server (Recommended)

You need to serve the files through a web server (not just open the HTML file) for the PWA to work properly.

#### Using Python:
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then open: `http://localhost:8000`

#### Using Node.js:
```bash
npx http-server -p 8000
```

#### Using PHP:
```bash
php -S localhost:8000
```

### Option 2: Generate Icons

1. Open `generate-icons.html` in your browser
2. The icons will automatically download
3. Place `icon-192.png` and `icon-512.png` in the same folder as `index.html`

### Option 3: Deploy Online

For full PWA functionality, deploy to a web server with HTTPS:
- GitHub Pages (free)
- Netlify (free)
- Vercel (free)
- Firebase Hosting (free)

## Files Structure

```
├── index.html          # Main app HTML
├── styles.css          # App styling
├── script.js           # App functionality
├── manifest.json       # PWA manifest
├── service-worker.js   # Offline support
├── icon-192.png        # App icon (192x192)
├── icon-512.png        # App icon (512x512)
└── generate-icons.html # Icon generator tool
```

## Usage

1. **Quick Add**: Tap any category button, enter amount, and confirm
2. **Manual Add**: Enter amount, select category, tap "Add Expense"
3. **View Summary**: Scroll down to see totals and category breakdowns
4. **View History**: See all your recent expenses with timestamps

## Notes

- Data is stored locally in your browser (localStorage)
- Works offline after first visit
- No account or login required
- All data stays on your device

## Troubleshooting

**App won't install?**
- Make sure you're using Chrome (Android) or Safari (iOS)
- The app must be served over HTTPS (or localhost for development)
- Check that `manifest.json` and `service-worker.js` are accessible

**Icons not showing?**
- Generate icons using `generate-icons.html`
- Make sure `icon-192.png` and `icon-512.png` are in the root folder

**Service Worker not working?**
- Make sure you're accessing via a web server (not file://)
- Check browser console for errors
- Clear browser cache and reload

