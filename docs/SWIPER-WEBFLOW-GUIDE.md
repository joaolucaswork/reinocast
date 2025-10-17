# Swiper Carousel Webflow Integration Guide

## Overview

This guide explains how to use the Swiper carousel module in your Webflow project. The implementation is optimized for video content (lite-youtube embeds) and follows Webflow best practices.

## Benefits

- **Touch-Enabled**: Native touch/drag support on mobile and desktop
- **Keyboard Navigation**: Full keyboard accessibility (arrow keys)
- **Video-Optimized**: Automatically pauses videos when changing slides
- **Responsive**: Adapts to different screen sizes
- **Accessible**: Built-in ARIA labels and screen reader support
- **Performance**: Preloads adjacent slides for smooth transitions

## Required HTML Structure in Webflow

### Basic Structure

Your Webflow carousel needs the following structure:

```
Div Block (class: swiper)
├── Div Block (class: swiper-wrapper)
│   ├── Div Block (class: swiper-slide)
│   │   └── [Your content - lite-youtube, images, etc.]
│   ├── Div Block (class: swiper-slide)
│   │   └── [Your content]
│   └── Div Block (class: swiper-slide)
│       └── [Your content]
├── Div Block (class: swiper-button-prev)
└── Div Block (class: swiper-button-next)
└── Div Block (class: swiper-pagination)
```

### Step-by-Step in Webflow Designer

1. **Create Main Container**
   - Add a **Div Block**
   - Give it the class: `swiper`
   - Add combo class: `is-podcast` (for your podcast carousel)

2. **Create Wrapper**
   - Inside the swiper div, add another **Div Block**
   - Give it the class: `swiper-wrapper`

3. **Create Slides**
   - Inside the wrapper, add **Div Blocks** for each slide
   - Give each the class: `swiper-slide`
   - Add your content inside each slide (lite-youtube embeds, images, text, etc.)

4. **Add Navigation Buttons** (Optional)
   - Add a **Div Block** with class: `swiper-button-prev`
   - Add a **Div Block** with class: `swiper-button-next`
   - These should be siblings of `swiper-wrapper` (inside the main `swiper` container)

5. **Add Pagination** (Optional)
   - Add a **Div Block** with class: `swiper-pagination`
   - This should be a sibling of `swiper-wrapper` (inside the main `swiper` container)

## HTML Example with Lite-YouTube Videos

```html
<div class="swiper is-podcast">
  <div class="swiper-wrapper">
    
    <!-- Slide 1 -->
    <div class="swiper-slide">
      <lite-youtube 
        videoid="guJLfqTFfIw" 
        videotitle="Episode 1: Introduction"
        nocookie>
      </lite-youtube>
    </div>
    
    <!-- Slide 2 -->
    <div class="swiper-slide">
      <lite-youtube 
        videoid="dQw4w9WgXcQ" 
        videotitle="Episode 2: Deep Dive"
        nocookie>
      </lite-youtube>
    </div>
    
    <!-- Slide 3 -->
    <div class="swiper-slide">
      <lite-youtube 
        videoid="jNQXAC9IVRw" 
        videotitle="Episode 3: Conclusion"
        nocookie>
      </lite-youtube>
    </div>
    
  </div>
  
  <!-- Navigation buttons -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
  
  <!-- Pagination -->
  <div class="swiper-pagination"></div>
</div>
```

## Required CSS in Webflow

Add this to **Project Settings** > **Custom Code** > **Head Code**:

```html
<style>
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

  .swiper-button-prev:after,
  .swiper-button-next:after {
    font-family: swiper-icons;
    font-size: 20px;
    text-transform: none !important;
    letter-spacing: 0;
    font-variant: initial;
    line-height: 1;
  }

  .swiper-button-prev {
    left: 10px;
  }

  .swiper-button-next {
    right: 10px;
  }

  .swiper-button-prev:after {
    content: 'prev';
  }

  .swiper-button-next:after {
    content: 'next';
  }

  /* Pagination */
  .swiper-pagination {
    position: absolute;
    text-align: center;
    transition: 300ms opacity;
    transform: translate3d(0, 0, 0);
    z-index: 10;
    bottom: 10px;
    left: 0;
    width: 100%;
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

  /* Podcast carousel specific styles */
  .swiper.is-podcast {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 50px;
  }

  .swiper.is-podcast .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .swiper.is-podcast {
      padding: 0 20px;
    }
    
    .swiper-button-prev,
    .swiper-button-next {
      width: 36px;
      height: 36px;
      margin-top: -18px;
    }
  }
</style>
```

## JavaScript Integration

The Swiper module is already integrated in `src/index.ts`. It will automatically initialize all carousels with the class `swiper` when Webflow loads.

### Default Configuration

The module uses these default settings for video carousels:

- **slidesPerView**: 1 (shows one slide at a time)
- **spaceBetween**: 30px (space between slides)
- **navigation**: true (shows prev/next buttons)
- **pagination**: true (shows pagination dots)
- **keyboard**: true (enables arrow key navigation)
- **loop**: false (no infinite loop)
- **pauseVideosOnSlideChange**: true (pauses videos when changing slides)
- **simulateTouch**: true (enables drag on desktop)
- **watchSlidesProgress**: true (preloads adjacent slides)

### Special Configuration for `is-podcast` Class

If your swiper container has the combo class `is-podcast`, it automatically gets optimized settings for podcast video carousels.

## Advanced Usage

### Custom Configuration

If you need custom settings, you can modify `src/index.ts`:

```typescript
import { initSwiper } from '$utils/swiper';

window.Webflow.push(() => {
  // Custom configuration
  initSwiper({
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: true,
    pagination: true,
    keyboard: true,
    loop: false,
    speed: 400,
    pauseVideosOnSlideChange: true,
  });
});
```

### Initialize Specific Carousel

To initialize a specific carousel with custom settings:

```typescript
import { initSwiperSingle } from '$utils/swiper';

window.Webflow.push(() => {
  // Initialize only the podcast carousel
  initSwiperSingle('.swiper.is-podcast', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: true,
    pagination: true,
  });
});
```

### Programmatic Control

You can control the carousel programmatically:

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
    
    // Get the Swiper instance
    const swiperInstance = carousel.getInstance();
    
    // Destroy the carousel
    carousel.destroy();
  }
});
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerSelector` | string | `'.swiper'` | CSS selector for container |
| `slidesPerView` | number | `1` | Number of slides visible |
| `spaceBetween` | number | `30` | Space between slides (px) |
| `navigation` | boolean | `true` | Show navigation arrows |
| `pagination` | boolean | `true` | Show pagination dots |
| `keyboard` | boolean | `true` | Enable keyboard navigation |
| `loop` | boolean | `false` | Enable infinite loop |
| `centeredSlides` | boolean | `false` | Center active slide |
| `autoplay` | boolean/object | `false` | Enable autoplay |
| `speed` | number | `300` | Transition speed (ms) |
| `simulateTouch` | boolean | `true` | Enable drag on desktop |
| `watchSlidesProgress` | boolean | `true` | Preload adjacent slides |
| `pauseVideosOnSlideChange` | boolean | `true` | Pause videos on slide change |

## Best Practices

### For Video Carousels

1. **Use `nocookie` attribute** on lite-youtube for privacy
2. **Don't use `autoload`** on lite-youtube in carousels (let users click to play)
3. **Keep `pauseVideosOnSlideChange: true`** to avoid multiple videos playing
4. **Use `watchSlidesProgress: true`** for better performance
5. **Limit slides** to 10-15 for best performance

### For Accessibility

1. **Always include navigation buttons** for keyboard users
2. **Use descriptive `videotitle`** attributes on lite-youtube
3. **Test with keyboard** (arrow keys should work)
4. **Test with screen readers** (ARIA labels are included)

### For Performance

1. **Don't use `loop: true`** with many slides
2. **Use `lazy` loading** for images in slides
3. **Preload only adjacent slides** (default behavior)
4. **Avoid autoplay** with video content

## Troubleshooting

### Carousel Not Showing

- ✅ Check that HTML structure matches the required format
- ✅ Verify all required classes are present (`swiper`, `swiper-wrapper`, `swiper-slide`)
- ✅ Ensure CSS is added to Head Code
- ✅ Check browser console for errors

### Navigation Buttons Not Working

- ✅ Verify `swiper-button-prev` and `swiper-button-next` classes
- ✅ Check that buttons are siblings of `swiper-wrapper`
- ✅ Ensure CSS for buttons is included

### Videos Not Pausing

- ✅ Confirm `pauseVideosOnSlideChange: true` in config
- ✅ Check that lite-youtube is properly initialized
- ✅ Verify videos are using lite-youtube component (not iframe embeds)

### Slides Not Dragging

- ✅ Ensure `simulateTouch: true` in config
- ✅ Check for CSS conflicts (pointer-events, touch-action)
- ✅ Verify swiper-wrapper has proper structure

## Browser Support

- ✅ Chrome/Edge 67+
- ✅ Firefox 63+
- ✅ Safari 10.1+
- ✅ Opera 54+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Resources

- [Swiper Official Documentation](https://swiperjs.com/)
- [Lite-YouTube Integration Guide](./LITE-YOUTUBE-WEBFLOW-GUIDE.md)
- [Swiper API Reference](https://swiperjs.com/swiper-api)

## Support

For issues specific to this implementation, check the project repository or contact your development team.

