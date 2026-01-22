# Media Elements

> **Quick Summary:** Images, video, and audio enrich web content—knowing how to embed them properly ensures performance, accessibility, and quality.

## What You'll Learn

- The `<img>` element and responsive image techniques
- Using video and audio elements
- Ensuring media accessibility for all users
- Essential performance considerations for modern web experiences

## Images

The `<img>` element embeds images:

```html
<img src="photo.jpg" alt="A sunset over mountains">
```

### Required Attributes

To embed an image correctly, you must use two primary attributes. The `src` attribute specifies the image URL or path, while the `alt` attribute provides alternative text that is essential for accessibility and search engine visibility.

### Alt Text

Alt text describes images for users who cannot see them, such as those using screen readers or people with slow connections. When dealing with informative images, your alt text should provide a clear description of the content, such as a bar chart showing specific sales data. For purely decorative images that do not add information to the page, you should use an empty `alt=""` attribute, which tells screen readers to skip the image entirely.

When an image is particularly complex, such as a detailed system architecture diagram, you can use `aria-describedby` to link the image to a more thorough description elsewhere in the document.

### Image Sizing

**Fixed dimensions:**
```html
<img src="photo.jpg" alt="..." width="800" height="600">
```

Including `width` and `height` prevents layout shift while loading.

**CSS sizing:**
```css
img {
  max-width: 100%;
  height: auto;
}
```

This makes images responsive. They won't exceed container width.

### Responsive Images

Different images for different screen sizes:

**srcset (different resolutions):**
```html
<img 
  src="photo.jpg" 
  srcset="photo-400.jpg 400w,
          photo-800.jpg 800w,
          photo-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px,
         (max-width: 1000px) 800px,
         1200px"
  alt="A beautiful landscape">
```

The `srcset` attribute provides a list of available images along with their respective widths, while the `sizes` attribute informs the browser which size to select based on the current viewport.

**picture (different images/formats):**
```html
<picture>
  <source srcset="photo.avif" type="image/avif">
  <source srcset="photo.webp" type="image/webp">
  <img src="photo.jpg" alt="A beautiful landscape">
</picture>
```

Browser uses first supported format; `<img>` is the fallback.

**Art direction (different crops):**
```html
<picture>
  <source media="(max-width: 600px)" srcset="photo-portrait.jpg">
  <source media="(min-width: 601px)" srcset="photo-landscape.jpg">
  <img src="photo-landscape.jpg" alt="A beautiful landscape">
</picture>
```

### Lazy Loading

Defer loading images until needed:

```html
<img src="photo.jpg" alt="..." loading="lazy">
```

Use for images below the fold. Don't use for above-fold images (hero images).

### Image Formats

| Format | Best For | Notes |
|--------|----------|-------|
| JPEG | Photos | Good compression, no transparency |
| PNG | Graphics, transparency | Larger files, lossless |
| WebP | Both | Better compression, good support |
| AVIF | Both | Best compression, growing support |
| SVG | Icons, logos | Vector, infinitely scalable |
| GIF | Simple animations | Limited colours, avoid for photos |

## SVG Images

SVG (Scalable Vector Graphics) are perfect for icons and logos:

**As img:**
```html
<img src="logo.svg" alt="Company logo">
```

**Inline (allows CSS styling):**
```html
<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
</svg>
```

Inline SVG can be styled with CSS and animated.

## Figure and Figcaption

For images with captions:

```html
<figure>
  <img src="chart.png" alt="Sales chart">
  <figcaption>Figure 1: Q4 2024 sales data</figcaption>
</figure>
```

`<figure>` semantically groups the image and caption.

## Video

The `<video>` element embeds video:

```html
<video src="video.mp4" controls>
  Your browser doesn't support video.
</video>
```

### Video Attributes

```html
<video 
  src="video.mp4"
  controls
  width="640"
  height="360"
  poster="thumbnail.jpg"
  preload="metadata"
>
  Your browser doesn't support video.
</video>
```

Several attributes allow you to fine-tune video playback. The `controls` attribute shows the standard playback interface, while `poster` specifies an image to display before the video starts. You can use `preload` to suggest how much data the browser should download initially, and `autoplay` to start playback automatically—though this should be used sparingly and usually requires the `muted` attribute to function in modern browsers. Other useful attributes include `loop` for continuous playback and `playsinline` to prevent the video from taking over the full screen on mobile devices.

### Multiple Sources

```html
<video controls width="640" height="360">
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
  Your browser doesn't support video.
</video>
```

Browser uses first supported format.

### Video Accessibility

**Captions:**
```html
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track 
    kind="captions" 
    src="captions.vtt" 
    srclang="en" 
    label="English captions"
    default>
</video>
```

**Captions file (WebVTT format):**
```text
WEBVTT

00:00:01.000 --> 00:00:04.000
Welcome to our tutorial.

00:00:04.500 --> 00:00:07.000
Today we'll learn about HTML.
```

Always provide captions for accessibility.

## Audio

The `<audio>` element embeds audio:

```html
<audio src="podcast.mp3" controls>
  Your browser doesn't support audio.
</audio>
```

### Audio with Multiple Sources

```html
<audio controls>
  <source src="audio.ogg" type="audio/ogg">
  <source src="audio.mp3" type="audio/mpeg">
  Your browser doesn't support audio.
</audio>
```

### Audio Attributes

Same as video: `controls`, `autoplay`, `muted`, `loop`, `preload`.

### Audio Accessibility

Provide transcripts for podcasts and audio content—audio tracks don't work with `<audio>`.

## Embedding External Media

### iframes

For embedding external content (YouTube, maps, etc.):

```html
<iframe 
  src="https://www.youtube.com/embed/VIDEO_ID"
  width="560"
  height="315"
  title="Video title"
  allowfullscreen
></iframe>
```

**Always include `title`** for accessibility.

**Security considerations:**
```html
<iframe 
  src="https://example.com"
  sandbox="allow-scripts allow-same-origin"
  loading="lazy"
></iframe>
```

`sandbox` restricts iframe capabilities.

## Performance Considerations

### Image Optimisation

To ensure your images do not slow down your site, always choose the right format, such as WebP or AVIF for photographs and SVG for icons. You should also size your images appropriately, avoiding the common mistake of serving a high-resolution image for a much smaller container. Use tools like ImageOptim or Squoosh for compression, implement lazy loading for images that appear below the fold, and always serve appropriate sizes via responsive image techniques.

### Video Optimisation

When embedding video, compress your files to reduce their size without sacrificing visible quality. Avoid using autoplay whenever possible to give users control over their experience, and always provide a poster image to show during the loading phase. For longer videos or high-traffic sites, consider using a dedicated streaming service rather than hosting the files yourself.

## Accessibility Summary

| Element | Accessibility Requirement |
|---------|--------------------------|
| `<img>` | Alt text (or empty `alt=""` for decorative) |
| `<video>` | Captions track |
| `<audio>` | Transcript (linked separately) |
| `<iframe>` | Title attribute |
| `<svg>` inline | `aria-hidden="true"` if decorative, proper labelling if informative |

## Try It Yourself

### Exercise 1: Responsive Image Gallery

Create a responsive image gallery containing four to six images. You should implement responsive images using the `srcset` attribute and use the `<picture>` element to serve WebP files with a JPEG fallback. Ensure that all images include proper alt text and use lazy loading to improve performance.

### Exercise 2: Video Player

Add a video to your project that includes multiple format sources for maximum compatibility. Include a poster image, a captions track created as a simple VTT file, and ensure that accessible controls are available for the user.

### Exercise 3: Performance Audit

Select an existing page featuring multiple images and conduct a performance audit. Compare the actual image file dimensions against their display sizes to identify optimisation opportunities. Implement lazy loading where appropriate and test the final result using throttled network settings in your browser's developer tools.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "html-images-quiz",
  "type": "multiple-choice",
  "title": "Image Best Practices",
  "description": "Test your understanding of image accessibility and performance.",
  "difficulty": "medium",
  "question": "When should you use an empty alt attribute (alt=\"\") on an image?",
  "options": [
    {
      "id": "a",
      "text": "Never—all images must have descriptive alt text",
      "isCorrect": false,
      "explanation": "Empty alt is actually correct for purely decorative images that add no information."
    },
    {
      "id": "b",
      "text": "When the image is purely decorative and adds no information",
      "isCorrect": true,
      "explanation": "Correct! Empty alt (alt=\"\") tells screen readers to skip the image entirely, avoiding unnecessary announcements for decorative visuals."
    },
    {
      "id": "c",
      "text": "When you don't know what to write for alt text",
      "isCorrect": false,
      "explanation": "If an image conveys information, you should provide that information in alt text. Only decorative images should have empty alt."
    },
    {
      "id": "d",
      "text": "When the image has a caption below it",
      "isCorrect": false,
      "explanation": "Captions and alt text serve different purposes—alt text is for when the image can't be seen."
    }
  ]
}
-->

## Key Takeaways

To recap, always ensure your images include an `alt` attribute, using an empty value for purely decorative elements. Use responsive image techniques like `srcset`, `sizes`, and the `<picture>` element to improve performance, and select the most efficient format for your needs. Always specify `width` and `height` to prevent layout shifts and apply `loading="lazy"` to images appearing below the fold. For audio and video, include the `controls` attribute for accessibility and provide captions or transcripts to ensure all users can access your content. Finally, remember that all iframes require a `title` attribute for proper accessibility.

Congratulations on completing the HTML Fundamentals module. You have now developed a solid understanding of HTML document structure, the use of semantic elements for better organization, and how to effectively implement text, links, forms, and media.

Continue to [CSS Mastery: How CSS Works](../02-css-mastery/01-how-css-works.md) →
