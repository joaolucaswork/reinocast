# Lite-YouTube Quick Reference Card

## 🚀 Quick Start (Webflow)

### 1. Add Script (Project Settings > Custom Code > Footer)
```html
<script defer src="https://your-domain.com/dist/index.js"></script>
```

### 2. Add Embed Element
```html
<lite-youtube videoid="YOUR_VIDEO_ID"></lite-youtube>
```

---

## 📝 Common Patterns

### Basic Embed
```html
<lite-youtube videoid="guJLfqTFfIw"></lite-youtube>
```

### Recommended (with fallback & accessibility)
```html
<lite-youtube 
  videoid="guJLfqTFfIw" 
  videotitle="My Video Title"
  autoload
  nocookie>
  <a class="lite-youtube-fallback" href="https://www.youtube.com/watch?v=guJLfqTFfIw">
    Watch on YouTube: "My Video Title"
  </a>
</lite-youtube>
```

### Start at Specific Time
```html
<lite-youtube videoid="guJLfqTFfIw" videoStartAt="30"></lite-youtube>
```

### Privacy Mode
```html
<lite-youtube videoid="guJLfqTFfIw" nocookie></lite-youtube>
```

### Auto-load When Visible
```html
<lite-youtube videoid="guJLfqTFfIw" autoload></lite-youtube>
```

### Playlist
```html
<lite-youtube 
  videoid="VLrYOji75Vc" 
  playlistid="PL-G5r6j4GptH5JTveoLTVqpp7w2oc27Q9">
</lite-youtube>
```

---

## 🎨 Styling (Add to Head Code)

### Custom Aspect Ratio
```css
lite-youtube {
  --lite-youtube-aspect-ratio: 16 / 9;
}

/* For vertical videos */
lite-youtube.vertical {
  --lite-youtube-aspect-ratio: 9 / 16;
}
```

### Remove Shadow Overlay
```css
lite-youtube {
  --lite-youtube-frame-shadow-visible: no;
}
```

### Style Play Button
```css
lite-youtube::part(playButton) {
  opacity: 0.9;
}

lite-youtube::part(playButton):hover {
  opacity: 1;
}
```

### Fallback Link Styling
```css
.lite-youtube-fallback {
  aspect-ratio: 16 / 9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  background-color: #000;
  color: #fff;
  text-decoration: none;
}

.lite-youtube-fallback::before {
  display: block;
  content: '';
  border: solid transparent;
  border-width: 2em 0 2em 3em;
  border-left-color: red;
}

.lite-youtube-fallback:hover::before {
  border-left-color: #fff;
}
```

---

## 📋 All Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `videoid` | string | required | YouTube video ID |
| `videotitle` | string | `"Video"` | Video title (accessibility) |
| `videoplay` | string | `"Play"` | Play button label |
| `playlistid` | string | - | YouTube playlist ID |
| `videoStartAt` | number | `0` | Start time in seconds |
| `posterquality` | string | `hqdefault` | Thumbnail quality |
| `posterloading` | string | `lazy` | Image loading strategy |
| `params` | string | - | YouTube embed parameters |
| `autoload` | boolean | `false` | Auto-load when visible |
| `autopause` | boolean | `false` | Auto-pause when hidden |
| `nocookie` | boolean | `false` | Privacy-enhanced mode |
| `short` | boolean | `false` | YouTube Shorts mode |
| `disablenoscript` | boolean | `false` | Disable noscript tag |

---

## 🎯 Poster Quality Options

- `maxresdefault` - 1280x720 (if available)
- `sddefault` - 640x480
- `hqdefault` - 480x360 (default)
- `mqdefault` - 320x180

---

## 🔧 YouTube Parameters Examples

```html
<!-- Disable controls -->
params="controls=0"

<!-- Disable related videos -->
params="rel=0"

<!-- Enable JS API -->
params="enablejsapi=1"

<!-- Multiple parameters -->
params="controls=0&rel=0&modestbranding=1"
```

[Full list of YouTube parameters](https://developers.google.com/youtube/player_parameters)

---

## 🎪 Events

### Listen for Video Load
```javascript
document.addEventListener('liteYoutubeIframeLoaded', (event) => {
  console.log('Video loaded:', event.detail.videoId);
});
```

---

## 💡 Tips

1. **Always use `videotitle`** for better accessibility
2. **Add fallback links** for SEO and no-JS users
3. **Use `autoload`** for videos below the fold
4. **Use `nocookie`** for privacy compliance
5. **Use `hqdefault`** (default) for faster loading
6. **Wrap in a container div** for easier Webflow styling

---

## 🐛 Troubleshooting

### Video not showing?
- ✅ Check video ID is correct
- ✅ Verify script is loaded in footer
- ✅ Check browser console for errors

### Script not loading?
- ✅ Verify script URL is correct
- ✅ Check script is in Footer Code
- ✅ Clear cache and reload

### Styling not working?
- ✅ CSS should be in Head Code
- ✅ Check for CSS specificity issues
- ✅ Use browser DevTools to inspect

---

## 📦 File Structure

```
src/
├── index.ts              # Main entry point
└── utils/
    ├── greet.ts          # Example utility
    └── lite-youtube.ts   # Lite-YouTube component

dist/
└── index.js              # Built file (use this in Webflow)

docs/
├── LITE-YOUTUBE-WEBFLOW-GUIDE.md  # Full documentation
├── QUICK-REFERENCE.md              # This file
└── lite-youtube-example.html       # Live examples
```

---

## 🌐 Browser Support

- ✅ Chrome/Edge 67+
- ✅ Firefox 63+
- ✅ Safari 10.1+
- ✅ Opera 54+

---

## 📚 Resources

- [Full Documentation](./LITE-YOUTUBE-WEBFLOW-GUIDE.md)
- [Live Examples](./lite-youtube-example.html)
- [Original Repository](https://github.com/justinribeiro/lite-youtube)
- [YouTube Parameters](https://developers.google.com/youtube/player_parameters)

---

## 🎓 Example: Complete Webflow Setup

### Head Code:
```html
<style>
  lite-youtube {
    --lite-youtube-aspect-ratio: 16 / 9;
  }
  
  .lite-youtube-fallback {
    aspect-ratio: 16 / 9;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1em;
    padding: 1em;
    background-color: #000;
    color: #fff;
    text-decoration: none;
  }
  
  .lite-youtube-fallback::before {
    display: block;
    content: '';
    border: solid transparent;
    border-width: 2em 0 2em 3em;
    border-left-color: red;
  }
</style>
```

### Footer Code:
```html
<script defer src="https://your-domain.com/dist/index.js"></script>
```

### Embed Element:
```html
<lite-youtube 
  videoid="guJLfqTFfIw" 
  videotitle="My Awesome Video"
  autoload
  nocookie>
  <a class="lite-youtube-fallback" href="https://www.youtube.com/watch?v=guJLfqTFfIw">
    Watch on YouTube: "My Awesome Video"
  </a>
</lite-youtube>
```

---

**Need help?** Check the [full documentation](./LITE-YOUTUBE-WEBFLOW-GUIDE.md) or [view live examples](./lite-youtube-example.html).

