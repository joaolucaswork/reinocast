# Swiper Carousel Quick Reference

## 🚀 Quick Start

### 1. HTML Structure in Webflow

```
Div Block (class: swiper is-podcast)
├── Div Block (class: swiper-wrapper)
│   ├── Div Block (class: swiper-slide)
│   │   └── lite-youtube embed
│   ├── Div Block (class: swiper-slide)
│   │   └── lite-youtube embed
│   └── Div Block (class: swiper-slide)
│       └── lite-youtube embed
├── Div Block (class: swiper-button-prev)
├── Div Block (class: swiper-button-next)
└── Div Block (class: swiper-pagination)
```

### 2. Required Classes

- **Main container**: `swiper` (+ optional combo class like `is-podcast`)
- **Wrapper**: `swiper-wrapper`
- **Each slide**: `swiper-slide`
- **Previous button**: `swiper-button-prev`
- **Next button**: `swiper-button-next`
- **Pagination**: `swiper-pagination`

### 3. Initialization

The carousel automatically initializes when Webflow loads. No additional code needed!

---

## 📝 HTML Example with Videos

```html
<div class="swiper is-podcast">
  <div class="swiper-wrapper">
    
    <div class="swiper-slide">
      <lite-youtube 
        videoid="guJLfqTFfIw" 
        videotitle="Episode 1"
        nocookie>
      </lite-youtube>
    </div>
    
    <div class="swiper-slide">
      <lite-youtube 
        videoid="dQw4w9WgXcQ" 
        videotitle="Episode 2"
        nocookie>
      </lite-youtube>
    </div>
    
    <div class="swiper-slide">
      <lite-youtube 
        videoid="jNQXAC9IVRw" 
        videotitle="Episode 3"
        nocookie>
      </lite-youtube>
    </div>
    
  </div>
  
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
  <div class="swiper-pagination"></div>
</div>
```

---

## 🎨 Required CSS (Add to Head Code)

```css
/* Swiper container */
.swiper {
  width: 100%;
  height: auto;
  position: relative;
}

/* Swiper wrapper */
.swiper-wrapper {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition-property: transform;
  box-sizing: content-box;
}

/* Individual slides */
.swiper-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition-property: transform;
}

/* Navigation buttons */
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  width: 44px;
  height: 44px;
  margin-top: -22px;
  z-index: 10;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
}

.swiper-button-prev { left: 10px; }
.swiper-button-next { right: 10px; }

/* Pagination */
.swiper-pagination {
  position: absolute;
  text-align: center;
  bottom: 10px;
  left: 0;
  width: 100%;
  z-index: 10;
}

.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 50%;
  background: #000;
  opacity: 0.2;
  margin: 0 4px;
  cursor: pointer;
}

.swiper-pagination-bullet-active {
  opacity: 1;
  background: #007aff;
}

/* Video-specific styles */
.swiper-slide lite-youtube {
  width: 100%;
  max-width: 100%;
}

/* Podcast carousel specific */
.swiper.is-podcast {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 50px;
}

@media (max-width: 768px) {
  .swiper.is-podcast {
    padding: 0 20px;
  }
}
```

---

## ⚙️ Default Configuration

The module automatically uses these settings:

| Setting | Value | Description |
|---------|-------|-------------|
| `slidesPerView` | `1` | Shows 1 slide at a time |
| `spaceBetween` | `30` | 30px space between slides |
| `navigation` | `true` | Shows prev/next arrows |
| `pagination` | `true` | Shows pagination dots |
| `keyboard` | `true` | Arrow keys work |
| `loop` | `false` | No infinite loop |
| `speed` | `300` | 300ms transition |
| `simulateTouch` | `true` | Drag works on desktop |
| `pauseVideosOnSlideChange` | `true` | Pauses videos automatically |

---

## 🎯 Configuration Options

### Basic Options

```typescript
{
  slidesPerView: 1,           // Number of slides visible
  spaceBetween: 30,           // Space between slides (px)
  navigation: true,           // Show navigation arrows
  pagination: true,           // Show pagination dots
  keyboard: true,             // Enable keyboard navigation
  loop: false,                // Enable infinite loop
  speed: 300,                 // Transition speed (ms)
  simulateTouch: true,        // Enable drag on desktop
}
```

### Video-Specific Options

```typescript
{
  watchSlidesProgress: true,      // Preload adjacent slides
  pauseVideosOnSlideChange: true, // Pause videos on slide change
}
```

### Advanced Options

```typescript
{
  centeredSlides: false,     // Center active slide
  autoplay: false,           // Enable autoplay
  // or
  autoplay: {
    delay: 5000,
    disableOnInteraction: true
  }
}
```

---

## 🎮 Programmatic Control

### Initialize with Custom Config

```typescript
import { initSwiper } from '$utils/swiper';

window.Webflow.push(() => {
  initSwiper({
    slidesPerView: 1,
    spaceBetween: 20,
    speed: 400,
  });
});
```

### Control Specific Carousel

```typescript
import { initSwiperSingle } from '$utils/swiper';

window.Webflow.push(() => {
  const carousel = initSwiperSingle('.swiper.is-podcast');
  
  if (carousel) {
    // Navigate to next slide
    carousel.slideNext();
    
    // Navigate to previous slide
    carousel.slidePrev();
    
    // Go to specific slide (0-indexed)
    carousel.slideTo(2);
    
    // Get Swiper instance
    const swiper = carousel.getInstance();
    
    // Destroy carousel
    carousel.destroy();
  }
});
```

---

## 💡 Best Practices

### ✅ DO

- Use `nocookie` on lite-youtube embeds
- Keep `pauseVideosOnSlideChange: true` for videos
- Include navigation buttons for accessibility
- Use descriptive `videotitle` attributes
- Test with keyboard (arrow keys)
- Limit to 10-15 slides for performance

### ❌ DON'T

- Don't use `autoload` on lite-youtube in carousels
- Don't use `loop: true` with many slides
- Don't enable autoplay with video content
- Don't forget navigation buttons
- Don't skip accessibility testing

---

## 🐛 Troubleshooting

### Carousel Not Showing
- ✅ Check HTML structure matches required format
- ✅ Verify all classes are present
- ✅ Ensure CSS is in Head Code
- ✅ Check browser console for errors

### Navigation Not Working
- ✅ Verify button classes (`swiper-button-prev`, `swiper-button-next`)
- ✅ Check buttons are siblings of `swiper-wrapper`
- ✅ Ensure CSS for buttons is included

### Videos Not Pausing
- ✅ Confirm `pauseVideosOnSlideChange: true`
- ✅ Check lite-youtube is initialized
- ✅ Verify using lite-youtube (not iframe)

### Slides Not Dragging
- ✅ Ensure `simulateTouch: true`
- ✅ Check for CSS conflicts
- ✅ Verify swiper-wrapper structure

---

## ⌨️ Keyboard Shortcuts

- **→** (Right Arrow) - Next slide
- **←** (Left Arrow) - Previous slide
- **Home** - First slide
- **End** - Last slide

---

## 📱 Responsive Behavior

The carousel automatically adjusts for mobile:

- **Desktop (768px+)**: Full configuration
- **Mobile (<768px)**: Optimized spacing and button sizes

---

## 🌐 Browser Support

- ✅ Chrome/Edge 67+
- ✅ Firefox 63+
- ✅ Safari 10.1+
- ✅ Opera 54+
- ✅ iOS Safari
- ✅ Chrome Mobile

---

## 📚 Resources

- [Full Documentation](./SWIPER-WEBFLOW-GUIDE.md)
- [Swiper Official Docs](https://swiperjs.com/)
- [Lite-YouTube Guide](./LITE-YOUTUBE-WEBFLOW-GUIDE.md)

---

## 🎓 Complete Webflow Setup

### 1. Head Code (Project Settings > Custom Code)

```html
<style>
  /* Copy the CSS from the "Required CSS" section above */
</style>
```

### 2. Footer Code (Project Settings > Custom Code)

```html
<script defer src="https://your-domain.com/dist/index.js"></script>
```

### 3. Page Structure (Webflow Designer)

1. Add Div Block → class: `swiper is-podcast`
2. Inside: Add Div Block → class: `swiper-wrapper`
3. Inside wrapper: Add Div Blocks → class: `swiper-slide` (one for each slide)
4. Inside each slide: Add Embed Element with lite-youtube code
5. After wrapper: Add Div Block → class: `swiper-button-prev`
6. After wrapper: Add Div Block → class: `swiper-button-next`
7. After wrapper: Add Div Block → class: `swiper-pagination`

### 4. Embed Element Content (in each slide)

```html
<lite-youtube 
  videoid="YOUR_VIDEO_ID" 
  videotitle="Your Video Title"
  nocookie>
</lite-youtube>
```

---

**That's it!** Your carousel will automatically initialize when the page loads. 🎉

