// Simple service worker: cache app shell and serve cached files when offline
const CACHE_NAME = 'coffee-strike-v1';
const ASSETS = [
  '/', '/index.html', '/menu.html', '/about.html',
  '/css/style.css', '/js/main.js', '/manifest.json',
  '/assets/1.jpg','/assets/2.jpg','/assets/3.jpg','/assets/4.jpg','/assets/LOGO.jpg','/assets/VD.mp4','/assets/icon-192.svg','/assets/icon-512.svg',
  '/assets/Insta.webp','/assets/Facebook.webp','/assets/tiktok.webp','/assets/whatsapp.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request)));
});
