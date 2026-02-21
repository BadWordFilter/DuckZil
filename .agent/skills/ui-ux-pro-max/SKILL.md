---
name: ui-ux-pro-max
description: "Comprehensive design intelligence for web and mobile UI/UX. Contains guidance on styles, color palettes, font pairings, UX guidelines, accessibility, and design systems. Use when building or reviewing UI."
source: nextlevelbuilder/ui-ux-pro-max-skill
risk: safe
---

# UI/UX Pro Max - Design Intelligence

Comprehensive design guide for web and mobile applications. Contains 50+ styles, 97 color palettes, 57 font pairings, 99 UX guidelines, and 25 chart types across 9 technology stacks.

---

## When to Apply
Reference these guidelines when:
- Designing new UI components or pages
- Choosing color palettes and typography
- Reviewing code for UX issues
- Building landing pages or dashboards
- Implementing accessibility requirements

## Rule Categories by Priority
| Priority | Category | Impact |
|----------|----------|--------|
| 1 | Accessibility | CRITICAL |
| 2 | Touch & Interaction | CRITICAL |
| 3 | Performance | HIGH |
| 4 | Layout & Responsive | HIGH |
| 5 | Typography & Color | MEDIUM |
| 6 | Animation | MEDIUM |
| 7 | Style Selection | MEDIUM |
| 8 | Charts & Data | LOW |

---

## Quick Reference

### 1. Accessibility (CRITICAL)
- Color contrast: minimum 4.5:1 for normal text, 3:1 for large text
- All interactive elements must have focus states
- Never rely on color alone to convey information
- Use semantic HTML (`<button>`, `<nav>`, `<main>`, `<article>`)
- Provide `alt` text for images
- Keyboard navigable: Tab, Enter, Escape, Arrow keys

### 2. Touch & Interaction (CRITICAL)
- Minimum touch target: 44x44px
- `cursor: pointer` on ALL clickable elements
- Hover states with smooth transitions (150-300ms)
- Active/pressed states for immediate feedback
- Prevent text selection during drag interactions
- Disable `user-select` on interactive elements

### 3. Performance (HIGH)
- Lazy load images below the fold
- Use `loading="lazy"` on `<img>` tags
- Minimize layout shifts (CLS)
- Use `will-change` sparingly
- Prefer CSS transforms over layout properties for animation
- Debounce scroll/resize handlers

### 4. Layout & Responsive (HIGH)
- Mobile-first: 375px → 768px → 1024px → 1440px
- Use CSS Grid for 2D layouts, Flexbox for 1D
- Consistent spacing scale (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- Max content width: 1200-1440px for most layouts
- Avoid fixed heights that break with dynamic content

### 5. Typography & Color (MEDIUM)
```css
/* Recommended Google Font pairings */
/* E-commerce / Marketplace: */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
font-family: 'Inter', sans-serif;

/* Premium / Luxury: */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&display=swap');

/* Modern Tech / App: */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');

/* Type scale */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
```

### Color Palette Examples
```css
/* Otaku/Anime Marketplace - Dark Theme */
--primary: #6C63FF;      /* Vibrant purple */
--primary-light: #9B8FFF;
--accent: #FF6584;       /* Anime pink */
--bg-dark: #0F0E17;      /* Near black */
--bg-card: #1A1829;      /* Dark card */
--bg-surface: #22213A;    /* Surface */
--text-primary: #FFFFFE;
--text-secondary: #A7A9BE;

/* Light Mode Alternative */
--primary: #7C3AED;        /* Purple */
--accent: #EC4899;         /* Pink */
--bg: #FAFAFA;
--card-bg: #FFFFFF;
--text-primary: #1A1A2E;
--text-secondary: #6B7280;
```

### 6. Animation (MEDIUM)
```css
/* Micro-animations that feel premium */
.button {
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card {
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

/* Page transitions */
.fade-in {
  animation: fadeIn 300ms ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 7. Style Selection Guide

| Product Type | Recommended Style | Key Features |
|-------------|------------------|--------------|
| **Anime/Otaku Marketplace** | Vibrant Dark / Glassmorphism | Neon accents, gradient cards, blur effects |
| **E-commerce** | Clean Minimal | White space, sharp CTAs, trust badges |
| **Dashboard** | Professional Dark | Data density, grid layout, muted colors |
| **Social App** | Warm & Friendly | Rounded corners, avatars, notification badges |
| **Gaming** | Cyberpunk/Neon | Glow effects, bold typography, dark bg |

---

## Design System for Otaku Market

### Recommended Palette (Dark Mode - Anime Theme)
```css
:root {
  /* Brand */
  --color-primary: #7C3AED;      /* Purple */
  --color-primary-hover: #6D28D9;
  --color-accent: #EC4899;        /* Pink */
  --color-accent-hover: #DB2777;
  
  /* Backgrounds */
  --bg-base: #0D0B1E;
  --bg-elevated: #14122B;
  --bg-card: #1C1A38;
  --bg-overlay: rgba(124, 58, 237, 0.1);
  
  /* Text */
  --text-primary: #F9FAFB;
  --text-secondary: #9CA3AF;
  --text-muted: #6B7280;
  
  /* Status */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  
  /* Borders */
  --border: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(124, 58, 237, 0.5);
}
```

### Component Patterns
```css
/* Premium Card */
.product-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 200ms ease, border-color 200ms ease;
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-hover);
}

/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 150ms ease, transform 150ms ease;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Glassmorphism Effect */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}
```

---

## Pre-Delivery Checklist

### Visual Quality
- [ ] No emojis as icons (use SVG: Heroicons/Lucide or emoji only for decor)
- [ ] Consistent border-radius throughout
- [ ] Consistent spacing using scale (4, 8, 16, 24, 32px)
- [ ] No hardcoded magic numbers for spacing

### Interaction
- [ ] `cursor: pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Focus states visible for keyboard nav
- [ ] Active/pressed states for buttons

### Responsive
- [ ] Works at 375px (iPhone SE)
- [ ] Works at 768px (tablet)
- [ ] Works at 1024px (laptop)
- [ ] Works at 1440px (desktop)

### Accessibility
- [ ] Text contrast 4.5:1 minimum
- [ ] `alt` text on all images
- [ ] Semantic HTML structure
- [ ] `prefers-reduced-motion` respected

### Dark Mode
- [ ] All text readable on dark backgrounds
- [ ] No pure `#000000` or pure `#FFFFFF` (use near-black/white)
- [ ] Consistent dark surface hierarchy

---

## Common Anti-Patterns

| ❌ Avoid | ✅ Do Instead |
|----------|--------------|
| Plain red/green/blue (#FF0000) | Curated palette (HSL-tuned) |
| Inconsistent border-radius | Single radius variable |
| Missing hover states | Transition on all interactives |
| Text on low-contrast background | Check 4.5:1 ratio |
| `cursor: default` on buttons | Always `cursor: pointer` |
| Harsh shadows (rgba(0,0,0,0.5)) | Soft shadows (rgba(0,0,0,0.15)) |
| Font-weight: 400 for headings | 600-700 for visual hierarchy |
| Full-width on desktop | Max-width container with padding |

## When to Use
Always apply when building or reviewing UI. This skill ensures consistent, professional, and accessible design. Particularly useful for Otaku Market's anime-themed marketplace aesthetic.
