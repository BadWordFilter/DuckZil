---
name: api-security-best-practices
description: "Security best practices for web applications and APIs. Use when reviewing security, implementing authentication, or hardening a web app against common vulnerabilities."
risk: safe
source: sickn33/antigravity-awesome-skills
---

# API & Web App Security Best Practices

## Overview

A comprehensive security guide for web applications. Covers authentication, authorization, input validation, rate limiting, and data protection. Essential checklist before going to production.

## When to Use This Skill

Use when:
- Implementing user authentication
- Reviewing code for security vulnerabilities
- Preparing for production deployment
- Adding new API endpoints or Firebase Rules
- Handling user-generated content

---

## Security Categories

### Step 1: Authentication & Authorization

#### Firebase Authentication Best Practices
```javascript
// ✅ Always check auth state properly
import { onAuthStateChanged } from 'firebase/auth';

let currentUser = null;
onAuthStateChanged(auth, (user) => {
  currentUser = user;
  if (!user) {
    // Redirect to login or show limited UI
    showUnauthenticatedState();
  }
});

// ✅ Check auth before sensitive operations
async function purchaseProduct(productId) {
  if (!currentUser) {
    showLoginModal();
    return;
  }
  // Proceed with purchase
}

// ❌ Never trust client-side user data
// Don't do: const userId = getUserIdFromLocalStorage();
// Do: const userId = currentUser.uid;
```

#### Firestore Security Rules (Critical)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Block all by default
    match /{document=**} {
      allow read, write: if false;
    }
    
    // Users: only read own data, update own profile
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId
        && request.resource.data.keys().hasAll(['displayName', 'email']);
    }
    
    // Products: anyone can read, only owner can edit
    match /products/{productId} {
      allow read: if true;
      allow create: if request.auth != null
        && request.resource.data.sellerId == request.auth.uid;
      allow update, delete: if request.auth != null
        && resource.data.sellerId == request.auth.uid;
    }
    
    // Messages: only participants can read/write
    match /chats/{chatId}/messages/{messageId} {
      allow read, write: if request.auth != null
        && request.auth.uid in get(/databases/$(database)/documents/chats/$(chatId)).data.participants;
    }
  }
}
```

---

### Step 2: Input Validation & Sanitization

```javascript
// ✅ Validate and sanitize all user inputs
function sanitizeText(input) {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML brackets
    .slice(0, 500);        // Enforce max length
}

function validateProduct(data) {
  const errors = [];
  
  if (!data.title || data.title.trim().length < 2) {
    errors.push('제목은 2자 이상이어야 합니다');
  }
  
  if (!data.price || typeof data.price !== 'number' || data.price <= 0) {
    errors.push('유효한 가격을 입력하세요');
  }
  
  if (!['figures', 'books', 'games', 'goods', 'other'].includes(data.category)) {
    errors.push('유효한 카테고리를 선택하세요');
  }
  
  return errors;
}

// ✅ Escape HTML in user-generated content
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ✅ Use textContent instead of innerHTML for user content
messageEl.textContent = userMessage; // Safe
// messageEl.innerHTML = userMessage; // ❌ XSS risk
```

---

### Step 3: Rate Limiting & Throttling

```javascript
// ✅ Client-side rate limiting for expensive operations
const rateLimiter = new Map();

function checkRateLimit(action, maxAttempts = 5, windowMs = 60000) {
  const key = `${action}_${currentUser?.uid}`;
  const now = Date.now();
  
  if (!rateLimiter.has(key)) {
    rateLimiter.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  const limit = rateLimiter.get(key);
  
  if (now > limit.resetTime) {
    rateLimiter.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (limit.count >= maxAttempts) {
    return false; // Rate limited
  }
  
  limit.count++;
  return true;
}

// Use it
async function sendMessage(chatId, text) {
  if (!checkRateLimit('send_message', 10, 60000)) {
    showError('메시지를 너무 많이 보냈습니다. 잠시 후 다시 시도하세요.');
    return;
  }
  // Send message...
}

// ✅ Debounce search to prevent excessive reads
const debouncedSearch = debounce(async (query) => {
  if (query.length < 2) return;
  await searchProducts(query);
}, 300);
```

---

### Step 4: Data Protection

```javascript
// ✅ Never store sensitive data in localStorage
// ❌ Bad: localStorage.setItem('userEmail', email);
// ✅ Good: Let Firebase Auth handle session persistence

// ✅ Minimize data in Firestore documents
// Don't store: passwords, payment info, personal IDs
// Do store: public profile data, product listings

// ✅ Use Firebase Storage rules for file uploads
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{userId}/{allPaths=**} {
      // Only authenticated users can upload to their own folder
      allow read: if true;
      allow write: if request.auth != null 
        && request.auth.uid == userId
        && request.resource.size < 5 * 1024 * 1024  // 5MB limit
        && request.resource.contentType.matches('image/.*');
    }
  }
}
```

---

### Step 5: XSS & CSRF Prevention

```javascript
// ✅ Content Security Policy (add to HTML or server headers)
// <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://www.gstatic.com https://apis.google.com; img-src 'self' https://firebasestorage.googleapis.com data:;">

// ✅ Avoid eval and new Function()
// ❌ eval(userInput);
// ❌ new Function(userInput)();

// ✅ Use DOMPurify for rich text if needed
// import DOMPurify from 'dompurify';
// element.innerHTML = DOMPurify.sanitize(userInput);
```

---

## Security Checklist

### Authentication & Authorization
- [ ] Firebase Security Rules written (not open read/write)
- [ ] Auth state checked before all sensitive operations
- [ ] Users can only modify their own data
- [ ] Session handling relies on Firebase Auth (not localStorage tokens)

### Input Validation
- [ ] All user inputs validated before Firestore writes
- [ ] Max length enforced on text fields
- [ ] File upload size and type restricted
- [ ] HTML entities escaped in user-generated content

### Rate Limiting
- [ ] Search queries debounced (300ms)
- [ ] Message sending rate limited
- [ ] Login attempts handled by Firebase Auth

### Data Protection
- [ ] No sensitive data in localStorage
- [ ] Firestore listeners use proper `where()` filters
- [ ] Storage rules restrict file types and sizes
- [ ] Error messages don't expose system internals

---

## OWASP Top 10 for Web Apps

| Rank | Vulnerability | Firebase/Web Context |
|------|--------------|---------------------|
| 1 | Broken Access Control | Security Rules enforcement |
| 2 | Cryptographic Failures | HTTPS always, Firebase handles tokens |
| 3 | Injection | Firestore parameterized queries (built-in) |
| 7 | XSS | Escape user content, avoid innerHTML |
| 8 | Software Failures | Keep Firebase SDK updated |
| 10 | SSRF | N/A for client-side apps |

---

## When to Use
Run this checklist before deploying to production, when adding authentication features, or when reviewing code for security issues. Always audit Firestore Security Rules before going live.
