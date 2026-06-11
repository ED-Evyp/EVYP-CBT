const CACHE_NAME = 'evyp-cbt-v5';
const PRECACHE_ASSETS = [
  './', './index.html', './specs.html', './trials.html',
  './css/style.css', './css/specs.css', './css/trials.css',
  './js/app.js', './js/specs.js', './js/specs-data.js', './js/trials.js',
  './manifest.json',
  './icons/logo-white.png', './icons/logo-color.png',
  './icons/icon-192.png', './icons/icon-512.png',
  './icons/cert-patent.png', './icons/cert-ecocert.png',
  './icons/cert-ecocert-white.png', './icons/cert-organic.png',
  './icons/cert-iso9001.png', './icons/cert-iso14001.png',
  './images/products/Ultra_Green.png', './images/products/Amino_Power.png',
  './images/products/Amino16.png', './images/products/Amino_Cell_Antistress.png',
  './images/products/Amino_16_BZn.png', './images/products/Fruitfix.png',
  './images/products/Granbrix.png', './images/products/MicroRS.png',
  './images/products/NF_Hyd1.png', './images/products/BMC_Fixer.png',
  './images/products/Amino_Cell_S.png', './images/products/Amino_Cell_PK.png',
  './images/products/Amino_Cell_Si_3_.png',
];
self.addEventListener('install', e => e.waitUntil(
  caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE_ASSETS)).then(() => self.skipWaiting())
));
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))
  .then(() => self.clients.claim())
));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(r => {
      if (r && r.status===200 && r.type!=='opaque')
        caches.open(CACHE_NAME).then(c => c.put(e.request, r.clone()));
      return r;
    }).catch(() => e.request.mode==='navigate' ? caches.match('./index.html') : undefined))
  );
});
