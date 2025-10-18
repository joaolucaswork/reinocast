# 🏷️ Person Tooltip - Quick Reference

## Overview

Automatic tooltips for elements with `person` attribute, following the same CSS organization pattern as Swiper.

---

## 📦 CSS Organization Pattern

### ✅ Correct Pattern (Following Swiper)

**TypeScript File** (`src/utils/person-tooltip.ts`):
```typescript
// ✅ NO CSS imports in TypeScript files
import tippy, { type Instance } from 'tippy.js';
```

**CSS Entry Point** (`src/styles.css`):
```css
/* Import Tippy.js core styles */
@import 'tippy.js/dist/tippy.css';

/* Import custom Tippy.js styles */
@import './utils/person-tooltip.css';
```

**Custom Styles** (`src/utils/person-tooltip.css`):
```css
/* Project-specific tooltip customizations */
.tippy-box[data-theme~='person-light'] {
  background-color: #fff;
  /* ... */
}
```

### ❌ Incorrect Pattern (What We Fixed)

```typescript
// ❌ DON'T import CSS in TypeScript files
import 'tippy.js/dist/tippy.css';
import tippy from 'tippy.js';
```

---

## 🎯 Why This Pattern?

### Benefits

1. **Centralized CSS Management** - All CSS imports in one place (`src/styles.css`)
2. **Consistent with Project Structure** - Follows the same pattern as Swiper
3. **Better Build Optimization** - CSS bundler can optimize imports
4. **Easier Maintenance** - Clear separation of concerns
5. **No Duplicate CSS** - Prevents multiple imports of the same CSS

### Comparison with Swiper

| Feature | Swiper | Tippy.js (Fixed) |
|---------|--------|------------------|
| TypeScript imports CSS? | ❌ No | ❌ No |
| CSS in `styles.css`? | ✅ Yes | ✅ Yes |
| Custom CSS file? | ✅ `swiper.css` | ✅ `person-tooltip.css` |
| Core library CSS imported? | ✅ `swiper/css` | ✅ `tippy.js/dist/tippy.css` |

---

## 📁 File Structure

```text
src/
├── index.ts                    # Main entry point
├── styles.css                  # ⭐ CSS entry point (all @imports here)
└── utils/
    ├── swiper.ts               # Swiper logic (no CSS imports)
    ├── swiper.css              # Custom Swiper styles
    ├── person-tooltip.ts       # Tooltip logic (no CSS imports)
    └── person-tooltip.css      # Custom tooltip styles
```

---

## 🚀 Quick Start

### 1. Add `person` attribute to HTML

```html
<div person="Gabriel Tintori" class="people_item">
  <img src="image.jpg" alt="Gabriel" />
</div>
```

### 2. Tooltips work automatically

The initialization is already done in `src/index.ts`:

```typescript
import { initPersonTooltips } from '$utils/person-tooltip';

window.Webflow.push(() => {
  initPersonTooltips();
});
```

---

## 🎨 Available Themes

### Default: `person-light`

```typescript
tippy(element, {
  theme: 'person-light', // Light background, dark text
});
```

### Alternative: `person`

```typescript
tippy(element, {
  theme: 'person', // Dark background, light text
});
```

---

## 🔧 Customization

### Change Theme

Edit `src/utils/person-tooltip.ts`:

```typescript
const instance = tippy(element as Element, {
  theme: 'person', // Change from 'person-light' to 'person'
});
```

### Customize Styles

Edit `src/utils/person-tooltip.css`:

```css
.tippy-box[data-theme~='person-light'] {
  background-color: #your-color;
  font-size: 16px;
  /* ... your custom styles */
}
```

### Add New Theme

1. Add CSS in `src/utils/person-tooltip.css`:

```css
.tippy-box[data-theme~='person-custom'] {
  background-color: #ff6b6b;
  color: white;
  /* ... */
}
```

2. Use in `src/utils/person-tooltip.ts`:

```typescript
tippy(element, {
  theme: 'person-custom',
});
```

---

## 📚 Documentation References

- **Full Guide**: `docs/PERSON-TOOLTIP-GUIDE.md`
- **Tippy.js Docs**: https://atomiks.github.io/tippyjs/
- **Swiper Pattern**: `src/utils/swiper.ts` and `src/utils/swiper.css`

---

## ✅ Checklist for Adding New Features

When adding new libraries with CSS:

- [ ] Import library in TypeScript file (NO CSS imports)
- [ ] Add core library CSS to `src/styles.css`
- [ ] Create custom CSS file in `src/utils/`
- [ ] Import custom CSS in `src/styles.css`
- [ ] Follow the same pattern as Swiper/Tippy.js

---

## 🐛 Common Issues

### Tooltips not styled

**Problem**: CSS not loading

**Solution**: Check that `src/styles.css` imports are correct:

```css
@import 'tippy.js/dist/tippy.css';
@import './utils/person-tooltip.css';
```

### Duplicate CSS in bundle

**Problem**: CSS imported in multiple places

**Solution**: Remove CSS imports from TypeScript files, keep only in `src/styles.css`

### Build errors

**Problem**: CSS import path incorrect

**Solution**: Use correct paths:
- Core library: `'tippy.js/dist/tippy.css'`
- Custom styles: `'./utils/person-tooltip.css'`

---

## 📊 Build Output

After running `pnpm run build`, check:

```bash
dist/
├── index.js          # Bundled JavaScript
└── styles.css        # Bundled CSS (includes Tippy.js + custom styles)
```

Verify CSS is bundled:

```bash
# Search for tippy styles in bundled CSS
grep -i "tippy" dist/styles.css
```

---

## 🎓 Key Takeaways

1. **Never import CSS in TypeScript files** - Use `src/styles.css` instead
2. **Follow the Swiper pattern** - Consistency is key
3. **Separate concerns** - Logic in `.ts`, styles in `.css`
4. **Centralize CSS imports** - All `@import` statements in `src/styles.css`
5. **Custom styles in utils** - Create `[feature].css` files in `src/utils/`

---

## 📝 Summary

| Aspect | Implementation |
|--------|----------------|
| **Pattern** | Same as Swiper (CSS in `styles.css`) |
| **TypeScript** | No CSS imports |
| **CSS Entry** | `src/styles.css` |
| **Custom CSS** | `src/utils/person-tooltip.css` |
| **Core CSS** | `tippy.js/dist/tippy.css` |
| **Themes** | `person` (dark), `person-light` (light) |
| **Build Output** | `dist/styles.css` (bundled) |

