const CACHE_NAME = 'duckmarket-v2.0';
const ASSETS = [
    './',
    './index.html',
    './index.css',
    './app.js',
    './firebase-config.js',
    './manifest.json'
];

// 설치 단계: 자원 캐싱 및 즉시 활성화 준비
self.addEventListener('install', (event) => {
    self.skipWaiting(); // 새로운 서비스 워커가 대기하지 않고 즉시 설치되도록 함
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// 활성화 단계: 오래된 캐시 정리 및 제어권 획득
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        }).then(() => {
            return self.clients.claim(); // 즉시 현재 페이지들을 제어함
        })
    );
});

// 페치 단계: 네트워크 우선 전략 (개발 및 업데이트 반영에 유리함)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
