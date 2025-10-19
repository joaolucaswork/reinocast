# Migration Guide: Lite YouTube → Mux Player

## Overview

This guide helps you migrate from Lite YouTube embeds to Mux Player in your Webflow project.

## Why Migrate to Mux?

- **Professional Infrastructure**: Enterprise-grade video hosting and delivery
- **Built-in Analytics**: Detailed viewer insights and playback metrics
- **Better Control**: Full ownership of your video content
- **Advanced Features**: Live streaming, DRM, custom thumbnails, and more
- **No YouTube Branding**: Clean, customizable player interface
- **Better Performance**: Optimized delivery with adaptive bitrate streaming

## Prerequisites

1. **Mux Account**: Sign up at [mux.com](https://mux.com)
2. **Upload Videos**: Transfer your videos from YouTube to Mux
3. **Get Playback IDs**: Each video will have a unique playback ID

## Code Changes

### Before (Lite YouTube)

```html
<lite-youtube
  videoid="9fCzmyCgK1o"
  videotitle="CLAREZA: o que ninguém te conta sobre investir"
  posterquality="maxresdefault"
  posterloading="eager"
  class="lite-youtube"
></lite-youtube>
```

### After (Mux Player)

```html
<mux-player
  playback-id="YOUR_MUX_PLAYBACK_ID"
  metadata-video-title="CLAREZA: o que ninguém te conta sobre investir"
  metadata-viewer-user-id="user-id-007"
  stream-type="on-demand"
  class="mux-player"
></mux-player>
```

## Attribute Mapping

| Lite YouTube | Mux Player | Notes |
|--------------|------------|-------|
| `videoid` | `playback-id` | Get from Mux Dashboard |
| `videotitle` | `metadata-video-title` | For analytics |
| `posterquality` | `thumbnail-time` | Specify time in seconds |
| `posterloading` | - | Not needed (handled automatically) |
| `autoload` | - | Not needed (loads on demand) |
| `nocookie` | - | Not applicable (Mux doesn't use cookies) |
| `autopause` | - | Can be implemented with custom JS |

## Uploading Videos to Mux

### Option 1: Mux Dashboard (Manual)

1. Log in to [Mux Dashboard](https://dashboard.mux.com/)
2. Go to **Video** → **Assets**
3. Click **Upload Video**
4. Select your video file or provide a URL
5. Wait for processing to complete
6. Copy the **Playback ID**

### Option 2: Mux API (Programmatic)

```javascript
// Using Mux Node SDK
const Mux = require('@mux/mux-node');
const mux = new Mux();

// Upload from URL
const asset = await mux.video.assets.create({
  input: 'https://example.com/video.mp4',
  playback_policy: ['public'],
  metadata: {
    video_title: 'My Video Title'
  }
});

console.log('Playback ID:', asset.playback_ids[0].id);
```

### Option 3: Direct Upload

For large files, use Mux's direct upload feature:

1. Create a direct upload URL via API
2. Upload file directly from browser
3. Get playback ID when processing completes

See [Mux Direct Upload Guide](https://docs.mux.com/guides/direct-upload) for details.

## Downloading Videos from YouTube

To migrate your YouTube videos to Mux:

### Using yt-dlp (Recommended)

```bash
# Install yt-dlp
pip install yt-dlp

# Download video
yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]" \
  -o "%(title)s.%(ext)s" \
  "https://www.youtube.com/watch?v=VIDEO_ID"
```

### Using youtube-dl

```bash
# Install youtube-dl
pip install youtube-dl

# Download video
youtube-dl -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]" \
  -o "%(title)s.%(ext)s" \
  "https://www.youtube.com/watch?v=VIDEO_ID"
```

## Updating Webflow

### Step 1: Update Embed Elements

1. Open your Webflow project
2. Find each `<lite-youtube>` embed
3. Replace with `<mux-player>` code
4. Update the playback ID

### Step 2: Update CSS (if needed)

If you have custom CSS for `.lite-youtube`, update it for `.mux-player`:

```css
/* Before */
.lite-youtube {
  width: 100%;
  border-radius: 12px;
}

/* After */
.mux-player,
mux-player {
  width: 100%;
  border-radius: 12px;
}
```

### Step 3: Test

1. Preview your site in Webflow
2. Test video playback
3. Check responsive behavior
4. Verify analytics are tracking

### Step 4: Publish

Once everything works, publish your Webflow site.

## Subtitle Synchronization

The subtitle sync feature has been updated to work with Mux Player automatically. No changes needed to your SRT files or speaker elements.

The system now:
- Detects `mux-player` elements instead of `lite-youtube`
- Uses HTML5 video events instead of YouTube IFrame API
- Works the same way from your perspective

## Analytics Migration

### YouTube Analytics → Mux Data

Mux provides more detailed analytics than YouTube:

- **Playback Quality**: Buffering, startup time, errors
- **Viewer Engagement**: Watch time, completion rate, rewatch
- **Technical Metrics**: Bitrate, resolution, CDN performance
- **Custom Metadata**: Track by user, video series, etc.

Access analytics at [Mux Dashboard](https://dashboard.mux.com/) → **Data**

## Troubleshooting

### Video Not Playing

**Issue**: Mux Player shows but video doesn't play

**Solutions**:
- Verify playback ID is correct
- Check video asset status in Mux Dashboard
- Ensure video processing is complete
- Check browser console for errors

### Missing Thumbnails

**Issue**: No thumbnail image shows

**Solutions**:
- Wait for Mux to generate thumbnails (can take a few minutes)
- Specify `thumbnail-time` attribute
- Check if asset has completed processing

### Subtitle Sync Not Working

**Issue**: Speaker highlighting doesn't work

**Solutions**:
- Verify `mux-player` element exists on page
- Check browser console for errors
- Ensure SRT file is accessible
- Verify speaker names match in SRT and HTML

## Cost Considerations

### Mux Pricing

Mux charges for:
- **Storage**: Video file storage
- **Encoding**: Video processing
- **Streaming**: Video delivery (per GB)
- **Mux Data**: Analytics (optional)

See [Mux Pricing](https://mux.com/pricing) for current rates.

### YouTube vs Mux

- **YouTube**: Free but with ads and branding
- **Mux**: Paid but professional, ad-free, and customizable

For business/professional use, Mux often provides better ROI.

## Rollback Plan

If you need to rollback to Lite YouTube:

1. Restore the old code from git history
2. Run `pnpm remove @mux/mux-player && pnpm add @justinribeiro/lite-youtube`
3. Update Webflow embeds back to `<lite-youtube>`
4. Republish

## Next Steps

1. ✅ Upload all videos to Mux
2. ✅ Update Webflow embeds
3. ✅ Test thoroughly
4. ✅ Monitor analytics
5. ✅ Optimize based on viewer data

## Support

- **Mux Documentation**: [docs.mux.com](https://docs.mux.com/)
- **Mux Community**: [community.mux.com](https://community.mux.com/)
- **Mux Support**: [mux.com/support](https://mux.com/support)

## Additional Resources

- [Mux Player Guide](./MUX-PLAYER-WEBFLOW-GUIDE.md)
- [Mux Dashboard](https://dashboard.mux.com/)
- [Mux API Reference](https://docs.mux.com/)

