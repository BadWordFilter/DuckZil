---
name: react-patterns
description: "Modern React patterns and principles. Hooks, composition, performance, TypeScript best practices. Also applicable to vanilla JS web apps."
allowed-tools: Read, Write, Edit, Glob, Grep
risk: unknown
source: sickn33/antigravity-awesome-skills
---

# React & JavaScript Patterns

> Principles for building production-ready web applications.

---

## 1. Component Design Principles

### Component Types

| Type | Use | State |
|------|-----|-------|
| **Server** | Data fetching, static | None |
| **Client** | Interactivity | useState, effects |
| **Presentational** | UI display | Props only |
| **Container** | Logic/state | Heavy state |

### Design Rules

- One responsibility per component
- Props down, events up
- Composition over inheritance
- Prefer small, focused components

---

## 2. Hook Patterns

### When to Extract Hooks

| Pattern | Extract When |
|---------|-------------|
| **useLocalStorage** | Same storage logic needed |
| **useDebounce** | Multiple debounced values |
| **useFetch** | Repeated fetch patterns |
| **useForm** | Complex form state |

### Hook Rules

- Hooks at top level only
- Same order every render
- Custom hooks start with "use"
- Clean up effects on unmount

---

## 3. State Management Selection

| Complexity | Solution |
|------------|----------|
| Simple | useState, useReducer |
| Shared local | Context |
| Server state | React Query, SWR |
| Complex global | Zustand, Redux Toolkit |

### State Placement

| Scope | Where |
|-------|-------|
| Single component | useState |
| Parent-child | Lift state up |
| Subtree | Context |
| App-wide | Global store |

---

## 4. Vanilla JS Patterns (for non-React apps)

### Module Pattern
```javascript
// Clean module pattern for organizing code
const ProductModule = (() => {
  // Private state
  let products = [];
  
  // Private methods
  function renderCard(product) {
    return `<div class="card">${product.title}</div>`;
  }
  
  // Public API
  return {
    init(data) {
      products = data;
    },
    render(container) {
      container.innerHTML = products.map(renderCard).join('');
    }
  };
})();
```

### Event Delegation (performance)
```javascript
// ✅ Single listener for many elements
document.querySelector('.product-grid').addEventListener('click', (e) => {
  const card = e.target.closest('.product-card');
  if (!card) return;
  
  const productId = card.dataset.id;
  handleProductClick(productId);
});

// ❌ Don't attach listeners to each element
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', ...); // Memory-intensive
});
```

### Debounce for Search
```javascript
function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const handleSearch = debounce((query) => {
  filterProducts(query);
}, 300);

searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
```

---

## 5. Composition Patterns

### Compound Components

- Parent provides context
- Children consume context
- Flexible slot-based composition
- Example: Tabs, Accordion, Dropdown

### Render Props vs Hooks

| Use Case | Prefer |
|----------|--------|
| Reusable logic | Custom hook |
| Render flexibility | Render props |
| Cross-cutting | Higher-order component |

---

## 6. Performance Principles

### When to Optimize

| Signal | Action |
|--------|--------|
| Slow renders | Profile first |
| Large lists | Virtualize |
| Expensive calc | useMemo |
| Stable callbacks | useCallback |

### Optimization Order

1. Check if actually slow
2. Profile with DevTools
3. Identify bottleneck
4. Apply targeted fix

### DOM Performance
```javascript
// ✅ Batch DOM updates with DocumentFragment
const fragment = document.createDocumentFragment();
products.forEach(product => {
  const el = createProductCard(product);
  fragment.appendChild(el);
});
container.appendChild(fragment); // Single reflow

// ❌ Multiple reflows
products.forEach(product => {
  container.innerHTML += createProductCard(product); // Reflow each time
});
```

---

## 7. Error Handling

### Error Boundary Usage

| Scope | Placement |
|-------|-----------|
| App-wide | Root level |
| Feature | Route/feature level |
| Component | Around risky component |

### Error Recovery

- Show fallback UI
- Log error
- Offer retry option
- Preserve user data

---

## 8. Async/Await Patterns

```javascript
// ✅ Proper async error handling
async function loadProducts(category) {
  try {
    const snapshot = await getDocs(
      query(collection(db, 'products'), where('category', '==', category))
    );
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Failed to load products:', error);
    showError('상품을 불러오는 데 실패했습니다.');
    return [];
  }
}

// ✅ Parallel fetches when independent
const [products, categories] = await Promise.all([
  loadProducts(),
  loadCategories()
]);
```

---

## 9. Testing Principles

| Level | Focus |
|-------|-------|
| Unit | Pure functions, hooks |
| Integration | Component behavior |
| E2E | User flows |

### Test Priorities

- User-visible behavior
- Edge cases
- Error states
- Accessibility

---

## 10. Anti-Patterns

| ❌ Don't | ✅ Do |
|----------|-------|
| Prop drilling deep | Use context |
| Giant components | Split smaller |
| useEffect for everything | Server components |
| Premature optimization | Profile first |
| Index as key | Stable unique ID |
| `innerHTML` with user data | Sanitize or use textContent |
| Multiple DOM reflows | Batch with DocumentFragment |

---

> **Remember:** Composition is key. Build small, combine thoughtfully.

## When to Use
This skill is applicable when writing React components, vanilla JavaScript, or any frontend code. Focus on patterns that improve maintainability and performance.
