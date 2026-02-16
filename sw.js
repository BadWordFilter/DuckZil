const CACHE_NAME = 'otaku-market-v1';
const ASSETS = [
    './',
    './index.html',
    './index.css',
    './app.js',
    './firebase-config.js',
    './manifest.json'
];

// 설치 단계: 자원 캐싱
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// 활성화 단계: 오래된 캐시 정리
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
});

// 페치 단계: 캐시 우선 전략 (Offline support)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
