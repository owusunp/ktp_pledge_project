// Service Worker for KTP Website
// Caches all resources for offline access and faster loading

const CACHE_NAME = 'ktp-website-v1';
const STATIC_CACHE = 'ktp-static-v1';
const FONT_CACHE = 'ktp-fonts-v1';

// Resources to cache immediately
const PRECACHE_URLS = [
  // HTML pages
  '/',
  '/about.html',
  '/brothers.html',
  '/recruitment.html',
  '/ktp_in_action.html',
  '/contact.html',
  
  // CSS files
  '/css/footer-styles/footer.css',
  '/css/styles.css',
  
  // JavaScript files
  '/js/header.js',
  '/js/footer.js',
  '/js/main.js',
  '/js/cache-manager.js',
  
  // Images
  '/images/logo.png',
  '/images/home1.jpeg',
  '/images/home3.jpeg',
  
  // Company logos
  '/apple.png',
  '/epichire.png',
  '/google.jpg',
  '/microsoft.png',
  '/nvidia.png',
  '/Netflix.png'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(PRECACHE_URLS)),
      caches.open(FONT_CACHE).then(cache => {
        return cache.addAll([
          'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
          'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmSU5fBBc4.woff2',
          'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu5mxKKTU1Kg.woff2'
        ]);
      })
    ]).then(() => {
      console.log('Service worker installed and resources cached');
      self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== FONT_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service worker activated');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log('Serving from cache:', event.request.url);
        return response;
      }

      // Clone the request because it's a stream
      return fetch(event.request.clone()).then(response => {
        // Check if valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response because it's a stream
        const responseToCache = response.clone();
        
        // Determine which cache to use
        let cacheName = STATIC_CACHE;
        if (event.request.url.includes('fonts.googleapis.com') || 
            event.request.url.includes('fonts.gstatic.com')) {
          cacheName = FONT_CACHE;
        }

        caches.open(cacheName).then(cache => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Return offline page if available
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      });
    })
  );
});

// Background sync for cache updates
self.addEventListener('sync', event => {
  if (event.tag === 'cache-update') {
    event.waitUntil(updateCache());
  }
});

async function updateCache() {
  const cache = await caches.open(STATIC_CACHE);
  const requests = await cache.keys();
  
  return Promise.all(
    requests.map(async request => {
      try {
        const response = await fetch(request);
        if (response.status === 200) {
          await cache.put(request, response);
        }
      } catch (error) {
        console.log('Failed to update cache for:', request.url);
      }
    })
  );
} 