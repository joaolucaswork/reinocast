# Lite-YouTube Webflow Integration Guide

## Overview

This guide explains how to use the lite-youtube web component in your Webflow project. The lite-youtube component is a lightweight, fast-loading YouTube embed that significantly improves page performance by only loading the full YouTube player when the user clicks to play the video.

## Benefits

- **Faster Page Load**: Loads ~224x faster than a standard YouTube embed
- **Reduced Bandwidth**: Only loads the thumbnail image initially
- **Better Performance**: Improves Core Web Vitals scores
- **Responsive**: Automatically adapts to container width with 16:9 aspect ratio
- **Accessible**: Includes proper ARIA labels and keyboard support
- **SEO Friendly**: Includes noscript fallback for search engines

## Installation in Webflow

### Step 1: Add the Script to Your Webflow Project

1. In your Webflow project, go to **Project Settings** > **Custom Code**
2. In the **Footer Code** section (before `</body>` tag), add:

```html
<script defer src="https://your-domain.com/dist/index.js"></script>
```

**Note**: Replace `https://your-domain.com/dist/index.js` with the actual URL where you host your built JavaScript file. You can host this on:
- Your Webflow site's hosting
- A CDN like jsDelivr, Cloudflare, or AWS CloudFront
- Your own server

### Step 2: Add the HTML Embed Element

1. In your Webflow Designer, drag an **Embed** element onto your page where you want the video
2. Paste the following code into the embed:

```html
<lite-youtube videoid="YOUR_VIDEO_ID"></lite-youtube>
```

Replace `YOUR_VIDEO_ID` with the actual YouTube video ID (the part after `v=` in the YouTube URL).

**Example**: For `https://www.youtube.com/watch?v=guJLfqTFfIw`, use:
```html
<lite-youtube videoid="guJLfqTFfIw"></lite-youtube>
```

## Basic Usage Examples

### Simple Video Embed
```html
<lite-youtube videoid="guJLfqTFfIw"></lite-youtube>
```

### Video with Custom Title (for accessibility)
```html
<lite-youtube 
  videoid="guJLfqTFfIw" 
  videotitle="Sample output of devtools-to-video cli tool">
</lite-youtube>
```

### Video with Fallback Link (recommended for SEO)
```html
<lite-youtube videoid="guJLfqTFfIw">
  <a class="lite-youtube-fallback" href="https://www.youtube.com/watch?v=guJLfqTFfIw">
    Watch on YouTube: "Sample output of devtools-to-video cli tool"
  </a>
</lite-youtube>
```

## Advanced Features

### Auto-load When Scrolled Into View
Automatically loads the video when it becomes visible in the viewport:
```html
<lite-youtube videoid="guJLfqTFfIw" autoload></lite-youtube>
```

### Start Video at Specific Time
Start the video at 5 seconds:
```html
<lite-youtube videoid="guJLfqTFfIw" videoStartAt="5"></lite-youtube>
```

### Privacy-Enhanced Mode (No Cookies)
Use YouTube's privacy-enhanced mode (youtube-nocookie.com):
```html
<lite-youtube videoid="guJLfqTFfIw" nocookie></lite-youtube>
```

### Auto-Pause When Scrolled Out of View
Automatically pauses the video when it's scrolled out of view:
```html
<lite-youtube videoid="guJLfqTFfIw" autopause></lite-youtube>
```

### YouTube Playlist
Load a playlist interface (requires a videoid for thumbnail):
```html
<lite-youtube 
  videoid="VLrYOji75Vc" 
  playlistid="PL-G5r6j4GptH5JTveoLTVqpp7w2oc27Q9">
</lite-youtube>
```

### Custom Poster Quality
Choose thumbnail quality (maxresdefault, sddefault, mqdefault, hqdefault):
```html
<lite-youtube 
  videoid="guJLfqTFfIw" 
  posterquality="maxresdefault">
</lite-youtube>
```

### YouTube Shorts Support (Mobile)
Enable YouTube Shorts-style interaction on mobile devices:
```html
<lite-youtube videoid="vMImN9gghao" short></lite-youtube>
```

### Custom YouTube Parameters
Add any YouTube embed parameters:
```html
<lite-youtube 
  videoid="guJLfqTFfIw" 
  params="controls=0&enablejsapi=1">
</lite-youtube>
```

## Styling in Webflow

### Basic Container Styling

You can wrap the `<lite-youtube>` element in a div and style it in Webflow:

1. Add a **Div Block** in Webflow
2. Give it a class name (e.g., `video-container`)
3. Add the **Embed** element inside it with the `<lite-youtube>` code
4. Style the container as needed (width, margin, padding, etc.)

### Custom CSS Styling

Add this to your **Project Settings** > **Custom Code** > **Head Code**:

```html
<style>
  /* Container styling */
  .video-container {
    max-width: 800px;
    margin: 2rem auto;
  }

  /* Custom aspect ratio (default is 16:9) */
  lite-youtube {
    --lite-youtube-aspect-ratio: 16 / 9;
  }

  /* For vertical videos or custom ratios */
  lite-youtube.vertical {
    --lite-youtube-aspect-ratio: 9 / 16;
  }

  /* Disable the shadow overlay */
  lite-youtube.no-shadow {
    --lite-youtube-frame-shadow-visible: no;
  }

  /* Style the play button */
  lite-youtube::part(playButton) {
    /* Your custom styles here */
    opacity: 0.9;
  }

  lite-youtube::part(playButton):hover {
    opacity: 1;
  }

  /* Fallback link styling */
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

  /* Play icon for fallback */
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
</style>
```

## Complete Webflow Setup Example

### In Project Settings > Custom Code > Head Code:
```html
<style>
  .video-wrapper {
    max-width: 900px;
    margin: 0 auto;
  }

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

### In Project Settings > Custom Code > Footer Code:
```html
<script defer src="https://your-domain.com/dist/index.js"></script>
```

### In Your Webflow Page (Embed Element):
```html
<lite-youtube 
  videoid="guJLfqTFfIw" 
  videotitle="My Awesome Video"
  autoload>
  <a class="lite-youtube-fallback" href="https://www.youtube.com/watch?v=guJLfqTFfIw">
    Watch on YouTube: "My Awesome Video"
  </a>
</lite-youtube>
```

## Available Attributes

| Attribute | Description | Default | Example |
|-----------|-------------|---------|---------|
| `videoid` | YouTube video ID (required) | - | `guJLfqTFfIw` |
| `videotitle` | Video title for accessibility | `"Video"` | `"My Video Title"` |
| `videoplay` | Play button label (for translation) | `"Play"` | `"Reproducir"` |
| `playlistid` | YouTube playlist ID | - | `PL-G5r6j4GptH...` |
| `videoStartAt` | Start time in seconds | `0` | `5` |
| `posterquality` | Thumbnail quality | `hqdefault` | `maxresdefault` |
| `posterloading` | Image loading strategy | `lazy` | `eager` |
| `params` | YouTube embed parameters | - | `controls=0&rel=0` |
| `autoload` | Auto-load when visible | `false` | (no value needed) |
| `autopause` | Auto-pause when not visible | `false` | (no value needed) |
| `nocookie` | Use privacy-enhanced mode | `false` | (no value needed) |
| `short` | Enable Shorts mode on mobile | `false` | (no value needed) |
| `disablenoscript` | Disable noscript injection | `false` | (no value needed) |

## Events

You can listen to events in custom JavaScript:

```html
<script>
  document.addEventListener('liteYoutubeIframeLoaded', (event) => {
    console.log('Video loaded:', event.detail.videoId);
    // Your custom code here
  });
</script>
```

## Troubleshooting

### Video Not Showing
- Ensure the script is loaded in the footer
- Check that the video ID is correct
- Verify the embed element is published

### Script Not Loading
- Check the script URL is correct and accessible
- Ensure the script is in the Footer Code section
- Clear browser cache and reload

### Styling Issues
- Make sure custom CSS is in the Head Code section
- Check for CSS conflicts with Webflow's styles
- Use browser DevTools to inspect the element

## Performance Tips

1. **Use `autoload`** for videos below the fold to defer loading
2. **Use `nocookie`** for privacy and potentially faster loading
3. **Use `posterquality="hqdefault"`** (default) for faster thumbnail loading
4. **Add fallback links** for better SEO and accessibility
5. **Limit the number** of video embeds per page for best performance

## Browser Support

The lite-youtube component works in all modern browsers that support:
- Web Components (Custom Elements)
- Shadow DOM
- Intersection Observer (for autoload feature)

This includes:
- Chrome/Edge 67+
- Firefox 63+
- Safari 10.1+
- Opera 54+

## Additional Resources

- [Original lite-youtube repository](https://github.com/justinribeiro/lite-youtube)
- [YouTube Embed Parameters](https://developers.google.com/youtube/player_parameters)
- [Webflow Custom Code Documentation](https://university.webflow.com/lesson/custom-code-in-the-head-and-body-tags)

## Support

For issues specific to this implementation, please check the project repository or contact your development team.

