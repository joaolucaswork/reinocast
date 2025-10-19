# Mux Player Webflow Integration Guide

## Overview

This guide explains how to use the Mux Player web component in your Webflow project. Mux Player is a professional-grade video player that provides fast, reliable video playback with built-in analytics and monitoring.

## What is Mux?

Mux is a comprehensive video platform for developers that handles:
- **Video Hosting**: Upload and store your videos securely
- **Encoding**: Automatic transcoding to multiple formats and resolutions
- **Streaming**: HLS/DASH adaptive bitrate streaming
- **Analytics**: Detailed playback metrics and viewer insights
- **Monitoring**: Real-time performance tracking

## Benefits

- **Professional Quality**: Enterprise-grade video infrastructure
- **Fast Playback**: Optimized delivery with CDN integration
- **Analytics Built-in**: Track viewer engagement and playback quality
- **Responsive**: Automatically adapts to screen size and bandwidth
- **Accessible**: Includes proper ARIA labels and keyboard support
- **Customizable**: Extensive theming and styling options

## Prerequisites

Before using Mux Player in Webflow, you need:

1. **Mux Account**: Sign up at [mux.com](https://mux.com)
2. **Video Assets**: Upload videos to Mux via the dashboard or API
3. **Playback ID**: Each video has a unique playback ID for embedding

## Getting Your Playback ID

1. Log in to [Mux Dashboard](https://dashboard.mux.com/)
2. Navigate to **Video** → **Assets**
3. Select your video asset
4. Copy the **Playback ID** from the asset details

## Webflow Integration

### Step 1: Add the Script

The Mux Player script is automatically loaded by our custom code. No manual script addition needed!

### Step 2: Add an Embed Element

1. In Webflow Designer, drag an **Embed** element to your page
2. Paste the Mux Player code (see examples below)
3. Replace `YOUR_PLAYBACK_ID` with your actual playback ID
4. Publish your site

## Basic Usage

### Simple Video Embed

```html
<mux-player
  playback-id="YOUR_PLAYBACK_ID"
></mux-player>
```

### Recommended Setup (with metadata)

```html
<mux-player
  playback-id="YOUR_PLAYBACK_ID"
  metadata-video-title="My Awesome Video"
  metadata-viewer-user-id="user-id-007"
  stream-type="on-demand"
></mux-player>
```

## Advanced Features

### Custom Thumbnail Time

Choose which frame to use as the thumbnail:

```html
<mux-player
  playback-id="YOUR_PLAYBACK_ID"
  thumbnail-time="10"
></mux-player>
```

### Autoplay (muted)

```html
<mux-player
  playback-id="YOUR_PLAYBACK_ID"
  autoplay
  muted
></mux-player>
```

### Custom Accent Color

```html
<mux-player
  playback-id="YOUR_PLAYBACK_ID"
  accent-color="#ac39f2"
></mux-player>
```

### Disable Specific Controls

```html
<mux-player
  playback-id="YOUR_PLAYBACK_ID"
  no-volume-pref
  no-hotkeys
></mux-player>
```

## Styling

### Using Webflow Classes

You can add Webflow classes to style the player container:

```html
<mux-player
  playback-id="YOUR_PLAYBACK_ID"
  class="video-player"
></mux-player>
```

Then style `.video-player` in Webflow Designer.

### Custom CSS

Add custom CSS in **Project Settings** → **Custom Code** → **Head Code**:

```html
<style>
  mux-player {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    border-radius: 12px;
    overflow: hidden;
  }
</style>
```

## Common Attributes

| Attribute | Description | Default | Example |
|-----------|-------------|---------|---------|
| `playback-id` | Mux video playback ID | (required) | `"abc123..."` |
| `stream-type` | Type of stream | `"on-demand"` | `"on-demand"`, `"live"`, `"ll-live"` |
| `metadata-video-title` | Video title for analytics | - | `"My Video"` |
| `metadata-viewer-user-id` | User ID for analytics | - | `"user-123"` |
| `thumbnail-time` | Thumbnail timestamp (seconds) | `0` | `10` |
| `accent-color` | Player accent color | - | `"#ac39f2"` |
| `autoplay` | Auto-start playback | `false` | (no value needed) |
| `muted` | Start muted | `false` | (no value needed) |
| `loop` | Loop playback | `false` | (no value needed) |
| `no-hotkeys` | Disable keyboard shortcuts | `false` | (no value needed) |

## Live Streaming

For live streams, use `stream-type="live"`:

```html
<mux-player
  playback-id="YOUR_LIVE_STREAM_PLAYBACK_ID"
  stream-type="live"
  metadata-video-title="Live Event"
></mux-player>
```

## Secure Playback (Signed URLs)

For private videos, use signed playback:

```html
<mux-player
  playback-id="YOUR_PLAYBACK_ID"
  playback-token="YOUR_SIGNED_TOKEN"
></mux-player>
```

Generate signed tokens using the Mux API or SDKs.

## Analytics and Metadata

Mux automatically tracks playback metrics. Enhance your analytics by adding metadata:

```html
<mux-player
  playback-id="YOUR_PLAYBACK_ID"
  metadata-video-id="video-123"
  metadata-video-title="Product Demo"
  metadata-viewer-user-id="user-456"
  metadata-video-series="Product Tutorials"
  metadata-sub-property-id="marketing-site"
></mux-player>
```

View analytics in the [Mux Dashboard](https://dashboard.mux.com/).

## Troubleshooting

### Video Not Showing

- Verify the playback ID is correct
- Check that the video asset is ready (not still processing)
- Ensure the script is loaded correctly
- Check browser console for errors

### Playback Issues

- Verify your Mux account is active
- Check if the video is public or requires signed URLs
- Test in different browsers
- Check network connectivity

### Styling Issues

- Use browser DevTools to inspect the element
- Check for CSS conflicts with Webflow styles
- Ensure custom CSS is in the Head Code section

## Performance Tips

1. **Use appropriate thumbnail times** for better first impressions
2. **Add metadata** for better analytics insights
3. **Consider autoplay carefully** - it requires muting
4. **Use signed URLs** for private content
5. **Monitor analytics** to optimize viewer experience

## Browser Support

Mux Player works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Additional Resources

- [Mux Player Documentation](https://www.mux.com/docs/guides/mux-player-web)
- [Mux Dashboard](https://dashboard.mux.com/)
- [Mux API Reference](https://docs.mux.com/)
- [Mux Community](https://community.mux.com/)

## Support

For issues specific to this implementation, check the project repository or contact your development team.

For Mux platform issues, visit [Mux Support](https://mux.com/support).

