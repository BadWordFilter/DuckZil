---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
source: vercel-labs/agent-skills
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Fetch the latest guidelines from the source URL below
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in the fetched guidelines
4. Output findings in the terse `file:line` format

## Guidelines Source

Fetch fresh guidelines before each review:

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

Use read_url_content to retrieve the latest rules. The fetched content contains all the rules and output format instructions.

## Usage

When a user provides a file or pattern argument:
1. Fetch guidelines from the source URL above
2. Read the specified files
3. Apply all rules from the fetched guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.

---

## Common Web Interface Guidelines (Summary)

While the full guidelines are fetched dynamically, here are the core principles:

### Semantic HTML
- Use `<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<section>` appropriately
- One `<h1>` per page
- Buttons for actions, links for navigation
- `<label>` associated with every `<input>`

### Accessibility
- All images: `alt` attribute (empty `alt=""` for decorative images)
- Color contrast: 4.5:1 for normal text, 3:1 for large text (18px+)
- Focus visible on all interactive elements
- No `tabindex` values > 0
- ARIA roles only when semantic HTML isn't sufficient

### Performance
- `loading="lazy"` on below-fold images
- `width` and `height` on `<img>` to prevent CLS
- No render-blocking resources
- External fonts: `<link rel="preconnect">`
- Minimal use of `@import` in CSS

### Interactivity
- `cursor: pointer` on all clickable non-link elements
- Touch targets ≥ 44×44px
- No horizontal overflow at common breakpoints
- Transitions should respect `prefers-reduced-motion`

### Forms
- Submit buttons inside `<form>` tags
- `autocomplete` attributes on personal data fields
- Error messages associated with inputs via `aria-describedby`
- Required fields marked with `aria-required="true"`

### CSS
- No inline styles for visual design (use classes)
- CSS variables for repeated values
- No `!important` except for utility overrides
- Mobile-first media queries

## Output Format

Report issues as:
```
file.html:42 - [RULE] Description of issue
```

Group by severity:
- 🔴 **Critical** (accessibility, broken functionality)
- 🟡 **Warning** (best practice violations)
- 🟢 **Info** (minor improvements)

## When to Use
Use this skill when asked to review, audit, or check a web interface. Always fetch the latest guidelines from the source URL before auditing.
