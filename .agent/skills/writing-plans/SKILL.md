---
name: writing-plans
description: "Use when you have a spec or requirements for a multi-step task, before touching code. Creates comprehensive implementation plans."
risk: unknown
source: sickn33/antigravity-awesome-skills
---

# Writing Plans

## Overview

Write comprehensive implementation plans assuming the engineer has zero context for our codebase and questionable taste. Document everything they need to know: which files to touch for each task, code, testing, docs they might need to check, how to test it. Give them the whole plan as bite-sized tasks. DRY. YAGNI. TDD. Frequent commits.

Assume they are a skilled developer, but know almost nothing about our toolset or problem domain.

**Announce at start:** "I'm using the writing-plans skill to create the implementation plan."

**Save plans to:** `docs/plans/YYYY-MM-DD-<feature-name>.md`

## Bite-Sized Task Granularity

**Each step is one action (2-5 minutes):**
- "Add the HTML structure for the modal" - step
- "Add the CSS styles for the modal" - step
- "Add the JavaScript event listeners" - step
- "Test in browser" - step
- "Commit" - step

## Plan Document Header

**Every plan MUST start with this header:**

```markdown
# [Feature Name] Implementation Plan

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach]

**Files Affected:**
- `index.html` - [what changes]
- `app.js` - [what changes]
- `index.css` - [what changes]

---
```

## Task Structure

```markdown
### Task N: [Component Name]

**Files:**
- Modify: `app.js` (around line 123)
- Modify: `index.html` (modal section)
- Modify: `index.css` (modal styles)

**Step 1: Add HTML structure**
```html
<!-- Add inside modal container -->
<div class="feature-container">
  <button id="feature-btn">...</button>
</div>
```

**Step 2: Add CSS styles**
```css
.feature-container {
  display: flex;
  gap: 8px;
}
```

**Step 3: Add JavaScript logic**
```javascript
document.getElementById('feature-btn').addEventListener('click', () => {
  // implementation
});
```

**Step 4: Test manually**
- Open browser
- Click [specific button]
- Verify [expected behavior]

**Step 5: Commit**
```bash
git add -A
git commit -m "feat: add [feature name]"
```
```

## Remember
- Exact file paths always
- Complete code in plan (not "add validation")
- Reference relevant Firebase collections
- DRY, YAGNI, commit often
- Test in browser after each major step

## For Otaku Market Specifically
When planning features for Otaku Market, always consider:
1. **Firebase Firestore structure** - which collections are affected?
2. **Authentication state** - does the feature require login?
3. **Real-time updates** - should this use `onSnapshot` or `getDocs`?
4. **Mobile responsiveness** - test at 375px width
5. **PWA compatibility** - does it work offline?

## When to Use
Run this skill when the user wants to implement a new feature. Always create the plan BEFORE touching any code. Use after the brainstorming skill has validated the design.
