const filesToCache = [
    '/',
    'style2.css',
    'index.html'
];

const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
        caches.open(staticCacheName)
        .then(cache => {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("activate", (activating) => {
    console.log("Service Worker: All systems online, ready to go!");
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("push", (pushing) => {
    console.log("Service Worker: I received some push data, but because I am still very simple I don't know what to do with it :(");
})