# EVYP-CBT Product Portal

PWA for EVYP Crop Biostimulation Technologies.

## Deploy to GitHub Pages

1. Push this repo to GitHub
2. Go to Settings → Pages → Source: Deploy from branch → `main` → `/ (root)`
3. Your PWA will be live at `https://yourusername.github.io/evyp-cbt/`

## Structure

```
evyp-cbt/
├── index.html          # Main app shell
├── manifest.json       # PWA manifest
├── sw.js               # Service worker (offline support)
├── css/
│   └── style.css       # All styles
├── js/
│   └── app.js          # Navigation + SW registration
└── icons/
    ├── logo-white.png  # Header logo (white variant)
    ├── logo-color.png  # Color logo
    ├── icon-192.png    # PWA icon
    └── icon-512.png    # PWA icon (large)
```

## Development

Open `index.html` directly in a browser for local preview.  
For SW to work, serve via `npx serve .` or `python3 -m http.server`.
