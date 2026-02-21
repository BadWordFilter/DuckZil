---
name: seo-audit
description: "Comprehensive SEO audit framework. Use when auditing or improving a website's search engine optimization including technical SEO, on-page SEO, and content quality."
risk: safe
source: sickn33/antigravity-awesome-skills
---

# SEO Audit

A comprehensive, structured framework for auditing website SEO. Produces actionable findings with priority rankings and an SEO Health Index score (0-100).

---

## Scope Gate (Ask First if Missing)
Before starting, confirm:
- **URL(s) to audit** — full URL or local file path
- **Audit depth** — quick (top 3 issues per category) or full (all categories)
- **Business context** — what is this site for? Who is the audience?

---

## Audit Framework (Priority Order)

### 1. Technical SEO

#### Crawlability
- `robots.txt` — exists? blocks important pages?
- XML sitemap — exists? submitted to Search Console?
- Canonical tags — self-referencing? no duplicates?
- Redirect chains — 301s correct? no loops?

#### Indexation
- `<meta name="robots">` — no accidental `noindex`
- `nofollow` on internal links — shouldn't be there
- Status codes — 404s? 410s?

#### Performance & Core Web Vitals
- LCP (Largest Contentful Paint) < 2.5s
- FID/INP < 100ms
- CLS (Cumulative Layout Shift) < 0.1
- Page weight — minimize JS/CSS/image sizes
- Use lazy loading for images

#### Mobile-Friendliness
- Viewport meta tag present: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Text readable without zooming
- Touch targets ≥ 44px
- No horizontal scrolling

#### Security & Accessibility Signals
- HTTPS (required)
- Valid SSL certificate
- No mixed content warnings

---

### 2. On-Page SEO Audit

#### Title Tags
```html
<!-- ✅ Good -->
<title>오타쿠 마켓 - 애니 굿즈 · 피규어 · 도서 직거래 플랫폼 | Otaku Market</title>

<!-- ❌ Bad -->
<title>Home</title>
<title>오타쿠 마켓</title>  <!-- Too short, no keywords -->
```
- Length: 50-60 characters
- Include primary keyword near the front
- Unique per page
- Brand name at end

#### Meta Descriptions
```html
<!-- ✅ Good -->
<meta name="description" content="오타쿠 마켓은 애니메이션 굿즈, 피규어, 만화책을 사고팔 수 있는 국내 최대 오타쿠 전문 중고 거래 플랫폼입니다. 지금 바로 시작하세요!">

<!-- Length: 150-160 characters -->
<!-- Include: primary keyword, CTA, value proposition -->
```

#### Heading Structure
```html
<!-- ✅ One H1 per page -->
<h1>애니메이션 굿즈 직거래 | 오타쿠 마켓</h1>

<!-- ✅ H2 for major sections -->
<h2>인기 카테고리</h2>
<h2>최신 상품</h2>

<!-- ✅ H3 for subsections -->
<h3>피규어</h3>
<h3>도서/만화</h3>
```

#### Content Optimization
- Primary keyword in: title, H1, first 100 words, image alt text
- Related keywords naturally throughout
- Minimum 300 words for meaningful pages
- No keyword stuffing

#### Images
```html
<!-- ✅ Always include alt text -->
<img src="naruto-figure.jpg" alt="나루토 피규어 - 점프 어드벤처 한정판 30cm">

<!-- ✅ Use modern formats -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="...">
</picture>
```

#### Internal Linking
- Link related pages to each other
- Use descriptive anchor text (not "click here")
- Avoid orphaned pages
- Maintain logical site hierarchy

---

### 3. Content Quality & E-E-A-T

#### Experience & Expertise
- Show real product photos (not stock images)
- Display user reviews and ratings
- Show seller credentials/history
- Demonstrate real marketplace activity

#### Authoritativeness
- Backlinks from relevant sites
- Social signals
- Brand mentions

#### Trustworthiness
- Privacy policy page
- Terms of service
- Secure payment indicators
- Contact information visible

---

## SEO Health Index Scoring

### Categories & Weights
| Category | Weight | Max Points |
|----------|--------|-----------|
| Technical SEO | 30% | 30 |
| On-Page SEO | 25% | 25 |
| Content Quality | 20% | 20 |
| Mobile/Performance | 15% | 15 |
| E-E-A-T Signals | 10% | 10 |

### Health Bands
| Score | Band | Action Required |
|-------|------|----------------|
| 90-100 | 🟢 Excellent | Maintain |
| 70-89 | 🟡 Good | Minor improvements |
| 50-69 | 🟠 Needs Work | Prioritize issues |
| 30-49 | 🔴 Poor | Immediate action |
| 0-29 | ⛔ Critical | Full audit needed |

---

## Quick Fixes for Otaku Market

### 1. Meta Tags (High Impact, Low Effort)
```html
<!-- Add to <head> -->
<meta name="description" content="오타쿠 마켓 - 애니, 피규어, 굿즈 직거래 플랫폼">
<meta property="og:title" content="오타쿠 마켓">
<meta property="og:description" content="애니메이션 굿즈를 직접 사고파세요">
<meta property="og:image" content="/og-image.png">
<meta property="og:type" content="website">
```

### 2. Structured Data for Products
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "나루토 피규어",
  "image": "https://...",
  "offers": {
    "@type": "Offer",
    "price": "15000",
    "priceCurrency": "KRW"
  }
}
</script>
```

### 3. Performance Quick Wins
```html
<!-- Preload critical fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="dns-prefetch" href="https://firebasestorage.googleapis.com">

<!-- Lazy load images -->
<img src="product.jpg" alt="..." loading="lazy">
```

---

## Related Skills

Works well with: `ui-ux-pro-max`, `api-security-best-practices`

## When to Use
Use when auditing a website's SEO, adding meta tags, or optimizing for search engines. Run a quick audit before any major SEO changes.
