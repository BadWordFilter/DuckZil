---
name: pwa-optimization
description: "Progressive Web App optimization guide. Use when improving PWA performance, offline support, installability, or mobile experience for web apps with service workers and manifest."
risk: safe
source: custom
---

# PWA Optimization Guide

## Overview

Expert knowledge for building high-quality Progressive Web Apps (PWA). Covers Service Worker strategies, manifest configuration, offline support, performance, and mobile UX best practices.

## When to Use

Use when:
- Optimizing PWA performance scores (Lighthouse)
- Setting up or debugging Service Workers
- Improving offline functionality
- Enhancing installability
- Optimizing for mobile devices

---

## 1. Web App Manifest Best Practices

```json
{
  "name": "오타쿠 마켓",
  "short_name": "오타쿠마켓",
  "description": "애니메이션 굿즈 직거래 플랫폼",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "orientation": "portrait-primary",
  "background_color": "#0D0B1E",
  "theme_color": "#7C3AED",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/screenshots/mobile.png",
      "sizes": "390x844",
      "type": "image/png",
      "form_factor": "narrow"
    }
  ],
  "categories": ["shopping", "entertainment"],
  "lang": "ko"
}
```

---

## 2. Service Worker Strategies

### Cache-First (Static Assets)
```javascript
// Best for: fonts, icons, CSS, JS bundles
self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'style' || 
      event.request.destination === 'script' ||
      event.request.destination === 'font') {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(response => {
          return caches.open('static-v1').then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  }
});
```

### Network-First (Dynamic Content/API)
```javascript
// Best for: Firestore data, user profiles, fresh content
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('firestore.googleapis.com')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache successful responses
          const cacheResponse = response.clone();
          caches.open('dynamic-v1').then(cache => {
            cache.put(event.request, cacheResponse);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cache when offline
          return caches.match(event.request);
        })
    );
  }
});
```

### Offline Fallback Page
```javascript
// Show offline page when network unavailable
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/offline.html');
      })
    );
  }
});
```

---

## 3. Install Prompt (A2HS)

```javascript
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show custom install button
  document.getElementById('install-btn').style.display = 'flex';
});

async function promptInstall() {
  if (!deferredPrompt) return;
  
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  
  if (outcome === 'accepted') {
    console.log('PWA installed');
    document.getElementById('install-btn').style.display = 'none';
  }
  
  deferredPrompt = null;
}

// Detect if already installed
window.addEventListener('appinstalled', () => {
  document.getElementById('install-btn').style.display = 'none';
});

// Check if running as installed PWA
function isRunningStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone
    || document.referrer.includes('android-app://');
}
```

---

## 4. Performance Optimization

### Critical CSS Inlining
```html
<!-- Inline critical styles in <head> -->
<style>
  /* Critical above-the-fold styles */
  body { margin: 0; background: #0D0B1E; color: #F9FAFB; }
  .header { display: flex; align-items: center; height: 60px; }
  .loading-skeleton { animation: pulse 1.5s infinite; }
</style>

<!-- Defer non-critical CSS -->
<link rel="stylesheet" href="index.css" media="print" 
      onload="this.media='all'">
```

### Image Optimization
```html
<!-- Use modern formats with fallback -->
<picture>
  <source srcset="product.webp" type="image/webp">
  <img src="product.jpg" 
       alt="..." 
       loading="lazy"
       decoding="async"
       width="300" 
       height="200">
</picture>
```

### Preload Critical Resources
```html
<head>
  <!-- Preconnect to Firebase -->
  <link rel="preconnect" href="https://firebasestorage.googleapis.com">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  
  <!-- Preload critical font -->
  <link rel="preload" 
        href="https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2" 
        as="font" 
        type="font/woff2" 
        crossorigin>
</head>
```

---

## 5. Lighthouse Score Targets

| Category | Target | Key Requirements |
|----------|--------|-----------------|
| Performance | 90+ | LCP < 2.5s, TTI < 5s |
| PWA | All checks | HTTPS, manifest, SW |
| Accessibility | 90+ | Alt text, contrast, ARIA |
| Best Practices | 90+ | HTTPS, no errors |
| SEO | 90+ | Meta tags, mobile |

### Common Lighthouse Failures & Fixes

| Issue | Fix |
|-------|-----|
| No meta description | Add `<meta name="description">` |
| Images without alt | Add alt attribute to all `<img>` |
| Poor contrast | Use 4.5:1 contrast ratio |
| Missing viewport | Add `<meta name="viewport">` |
| Not HTTPS | Deploy to Firebase Hosting (auto HTTPS) |
| Large JS bundle | Code-split, remove unused deps |
| Render-blocking resources | Defer non-critical CSS/JS |

---

## 6. Push Notifications (Firebase Cloud Messaging)

```javascript
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const messaging = getMessaging();

async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();
  
  if (permission === 'granted') {
    const token = await getToken(messaging, {
      vapidKey: 'YOUR_VAPID_KEY'
    });
    
    // Save token to Firestore for this user
    await updateDoc(doc(db, 'users', currentUser.uid), {
      fcmToken: token,
      notificationsEnabled: true
    });
  }
}

// Handle foreground messages
onMessage(messaging, (payload) => {
  console.log('Message received:', payload);
  // Show in-app notification
  showNotification(payload.notification.title, payload.notification.body);
});
```

---

## Checklist Before Deploy

- [ ] Manifest has all required icons (192px, 512px)
- [ ] `theme_color` matches header color
- [ ] Service Worker registered correctly
- [ ] Offline fallback page exists
- [ ] HTTPS in production (Firebase Hosting)
- [ ] `viewport` meta tag present
- [ ] Images have `loading="lazy"` and `alt` text
- [ ] Lighthouse PWA score: all checks passed

## When to Use
Use when working on the Otaku Market PWA - optimizing Service Worker, improving Lighthouse scores, adding offline support, or implementing push notifications.
