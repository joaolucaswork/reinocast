# 🏷️ Person Tooltip Guide

## Overview

This guide explains how to use the Person Tooltip feature, which automatically displays tooltips with person names when hovering over elements with the `person` attribute.

---

## ✨ Features

- ✅ **Automatic initialization** - Finds all elements with `person` attribute
- ✅ **Swiper-compatible** - Works correctly inside Swiper carousels
- ✅ **Lightweight** - Uses Tippy.js for smooth, performant tooltips
- ✅ **Accessible** - Supports keyboard focus and screen readers
- ✅ **Customizable** - Easy to modify appearance and behavior

---

## 🚀 Quick Start

### 1. Add the `person` attribute to your HTML elements

```html
<div person="Gabriel Tintori" class="people_item">
  <img src="path/to/image.jpg" alt="Gabriel Tintori" />
</div>

<div person="Carlus Tintori" class="people_item">
  <img src="path/to/image.jpg" alt="Carlus Tintori" />
</div>
```

### 2. The tooltip is automatically initialized

The `initPersonTooltips()` function is already called in `src/index.ts`, so tooltips will work automatically on page load.

---

## 📋 HTML Structure

### Basic Example

```html
<div class="people-podcast">
  <div person="Gabriel Tintori" class="people_item first">
    <img src="images/gabriel.png" alt="Gabriel Tintori" />
  </div>
  
  <div person="Carlus Tintori" class="people_item">
    <img src="images/carlus.png" alt="Carlus Tintori" />
  </div>
</div>
```

### Inside Swiper Carousel

The tooltip works perfectly inside Swiper slides:

```html
<div class="swiper is-podcast">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <div class="people-podcast">
        <div person="Gabriel Tintori" class="people_item">
          <img src="images/gabriel.png" alt="" />
        </div>
        <div person="Carlus Tintori" class="people_item">
          <img src="images/carlus.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## ⚙️ Configuration

### Default Settings

The tooltip is configured with these default options:

```typescript
{
  content: personName,        // Text from 'person' attribute
  placement: 'top',           // Tooltip appears above element
  animation: 'fade',          // Smooth fade animation
  arrow: true,                // Show arrow pointing to element
  theme: 'light',             // Light theme
  trigger: 'mouseenter focus', // Show on hover or keyboard focus
  hideOnClick: false,         // Don't hide when clicking
  zIndex: 9999,               // Ensure it appears above other elements
  offset: [0, 10],            // 10px spacing from element
  appendTo: document.body     // Append to body (avoids z-index issues)
}
```

### Customizing Tooltips

To customize the tooltip behavior, edit `src/utils/person-tooltip.ts`:

```typescript
tippy(element as Element, {
  content: personName,
  placement: 'bottom',        // Change position: 'top', 'bottom', 'left', 'right'
  theme: 'dark',              // Change theme: 'light', 'dark', 'custom'
  animation: 'scale',         // Change animation: 'fade', 'scale', 'shift-away'
  delay: [200, 0],            // Add delay: [show delay, hide delay] in ms
  duration: [300, 250],       // Animation duration: [show, hide] in ms
});
```

---

## 🎨 Styling

### Project Structure

This project follows a consistent CSS organization pattern:

```text
src/
├── styles.css                  # Main CSS entry point
└── utils/
    ├── person-tooltip.ts       # Tooltip logic (no CSS imports)
    └── person-tooltip.css      # Custom tooltip styles
```

**All CSS imports are centralized in `src/styles.css`:**

```css
/* Import Tippy.js core styles */
@import 'tippy.js/dist/tippy.css';

/* Import custom Tippy.js styles */
@import './utils/person-tooltip.css';
```

### Custom Themes

This project includes two custom themes:

#### 1. `person` (Dark Theme)

```css
.tippy-box[data-theme~='person'] {
  background-color: #333;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
}
```

#### 2. `person-light` (Light Theme - Default)

```css
.tippy-box[data-theme~='person-light'] {
  background-color: #fff;
  color: #26323d;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0 0 20px 4px rgba(154, 161, 177, 0.15);
}
```

### Customizing Styles

To customize tooltip styles, edit `src/utils/person-tooltip.css`:

```css
/* Add your custom styles */
.tippy-box[data-theme~='person-light'] {
  background-color: #your-color;
  /* ... other styles */
}
```

The build system will automatically bundle these styles into `dist/styles.css`.

---

## 🔧 Advanced Usage

### Programmatic Control

You can manually create and control tooltips:

```typescript
import tippy from 'tippy.js';

// Create a tooltip
const instance = tippy(element, {
  content: 'Custom content',
});

// Show tooltip
instance.show();

// Hide tooltip
instance.hide();

// Destroy tooltip
instance.destroy();

// Update content
instance.setContent('New content');
```

### Dynamic Content

Update tooltip content dynamically:

```typescript
const instance = tippy(element, {
  content: 'Loading...',
  onShow(instance) {
    // Fetch data and update content
    fetch('/api/person-info')
      .then(res => res.json())
      .then(data => {
        instance.setContent(data.name);
      });
  },
});
```

---

## 🐛 Troubleshooting

### Tooltips not appearing

1. **Check console for errors** - Open browser DevTools and check for error messages
2. **Verify element exists** - Make sure elements with `person` attribute are in the DOM
3. **Check z-index** - Ensure no other elements are covering the tooltip
4. **Verify Tippy.js is loaded** - Check that `tippy.js` is in `node_modules`

### Tooltips appearing in wrong position

- The tooltip uses `appendTo: document.body` to avoid z-index issues
- If position is still wrong, try adjusting the `placement` option

### Multiple tooltips on same element

- Each element should only have one tooltip
- If you see duplicates, check that `initPersonTooltips()` is only called once

---

## 📚 Resources

- [Tippy.js Documentation](https://atomiks.github.io/tippyjs/)
- [Tippy.js GitHub](https://github.com/atomiks/tippyjs)
- [All Tippy.js Options](https://atomiks.github.io/tippyjs/v6/all-props/)

---

## 🔍 Implementation Details

### How it works

1. **DOM Ready** - Waits 100ms after Webflow initialization to ensure DOM is ready
2. **Element Selection** - Finds all elements with `person` attribute
3. **Swiper Compatibility** - Excludes cloned slides (`.swiper-slide-duplicate`)
4. **Tooltip Creation** - Creates a Tippy instance for each element
5. **Error Handling** - Catches and logs any initialization errors

### File Structure

```text
src/
├── index.ts                    # Main entry point (calls initPersonTooltips)
├── styles.css                  # CSS entry point
└── utils/
    ├── person-tooltip.ts       # Tooltip initialization logic
    └── person-tooltip.css      # Custom tooltip styles
```

### Code Example

<augment_code_snippet path="src/utils/person-tooltip.ts" mode="EXCERPT">

````typescript
export const initPersonTooltips = (): Instance[] => {
  const instances: Instance[] = [];
  
  setTimeout(() => {
    const elementsWithPerson = document.querySelectorAll(
      '[person]:not(.swiper-slide-duplicate [person])'
    );
    
    elementsWithPerson.forEach((element) => {
      const personName = element.getAttribute('person');
      if (personName) {
        const instance = tippy(element as Element, {
          content: personName,
          placement: 'top',
          // ... more options
        });
        instances.push(instance);
      }
    });
  }, 100);
  
  return instances;
};
````

</augment_code_snippet>

---

## ✅ Summary

- Add `person="Name"` attribute to any HTML element
- Tooltip automatically appears on hover
- Works inside Swiper carousels
- Fully customizable appearance and behavior
- Accessible and performant
