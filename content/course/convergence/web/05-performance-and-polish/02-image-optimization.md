# Image Optimisation

> **Quick Summary:** Images are often the heaviest assets on a page. Optimising them dramatically improves load times and user experience.

## What You'll Learn

- Throughout this lesson, you will master the art of reducing asset weight without sacrificing visu...
- implement lazy loading and image CDNs to ensure your site performs optimally on any connection
- implement lazy loading and image CDNs to ensure your site performs optimally on any connection

## Modern Image Formats

### WebP
WebP is a versatile modern format that typically produces files **25-35% smaller** than comparable JPEGs at the same visual quality. Crucially, it also supports transparency, making it a superior replacement for PNGs in many cases. It is supported by over 95% of browsers.

### AVIF
AVIF offers even greater efficiency, often creating files **50% smaller** than JPEG. While it currently has slightly less browser support than WebP, it provides the best quality-to-size ratio available today and should be your preferred format where supported.

### Format Selection

```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Fallback">
</picture>
```

## Responsive Images

Serve appropriate sizes for different screens:

```html
<img 
  src="image-800.jpg"
  srcset="
    image-400.jpg 400w,
    image-800.jpg 800w,
    image-1200.jpg 1200w
  "
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Description"
>
```

The `srcset` attribute provides a comma-separated list of available image files along with their inherent widths (e.g., `400w`). The `sizes` attribute then tells the browser how much screen space the image will occupy at different breakpoints. The browser uses this information to mathematically calculate and download the single best image file for the user's specific screen resolution.

## Lazy Loading

Load images only when needed:

```html
<!-- Native lazy loading -->
<img src="image.jpg" loading="lazy" alt="Description">

<!-- Eager for above-the-fold -->
<img src="hero.jpg" loading="eager" alt="Hero image">
```

## Image Dimensions

Always specify dimensions to prevent layout shift:

```html
<img 
  src="image.jpg" 
  width="800" 
  height="600"
  alt="Description"
>
```

```css
img {
  max-width: 100%;
  height: auto;
}
```

## Image CDNs

Services like Cloudinary, imgix, or Vercel Image Optimization:

```html
<!-- Cloudinary example -->
<img src="https://res.cloudinary.com/demo/image/upload/w_400,f_auto,q_auto/sample.jpg">
```

Using an image CDN provides significant advantages. These services handle **automatic format selection** (serving AVIF to Chrome and JPEG to older Safari), perform **on-the-fly resizing** to match your layout dimensions, apply intelligent **quality optimisation** that reduces file size without visible degradation, and deliver assets via a global network for low latency.

## Next.js Image Component

```tsx
import Image from 'next/image';

<Image
  src="/photo.jpg"
  alt="Description"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

Automatic optimisation, lazy loading, and blur placeholders.

## Try It Yourself

### Exercise 1: Format Comparison

Take a JPEG image and convert to WebP and AVIF. Compare file sizes and quality.

### Exercise 2: Responsive Implementation

Implement responsive images for a hero section with appropriate breakpoints.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "image-optimisation-quiz",
  "type": "multiple-choice",
  "title": "Image Optimisation",
  "description": "Test your understanding of web image optimisation.",
  "difficulty": "medium",
  "question": "What is the advantage of using WebP or AVIF formats over JPEG and PNG?",
  "options": [
    {
      "id": "a",
      "text": "They work in older browsers that don't support JPEG",
      "isCorrect": false,
      "explanation": "Actually, WebP/AVIF are newer and have less browser support than JPEG/PNG."
    },
    {
      "id": "b",
      "text": "Significantly smaller file sizes with similar or better quality, reducing load time",
      "isCorrect": true,
      "explanation": "Correct! WebP is typically 25-35% smaller than JPEG at similar quality. AVIF is even smaller. Use with fallbacks for older browsers."
    },
    {
      "id": "c",
      "text": "They automatically resize to fit any container",
      "isCorrect": false,
      "explanation": "Responsive sizing requires srcset/sizes attributes regardless of format."
    },
    {
      "id": "d",
      "text": "They don't require alt text",
      "isCorrect": false,
      "explanation": "All images need alt text for accessibility."
    }
  ]
}
-->

## Key Takeaways

- Using modern formats like WebP
- AVIF (with appropriate fallbacks) can significantly reduce your bandwidth usage
- AVIF (with appropriate fallbacks) can significantly reduce your bandwidth usage
- Combine this with `srcset` for responsive sizing and lazy loading for off-screen content
- you will dramatically improve initial load times
- you will dramatically improve initial load times
- Finally, always specify explicit width and height attributes to prevent layout shifts
- consider using image CDNs for automated, on-the-fly optimisation
- consider using image CDNs for automated, on-the-fly optimisation

## Next Steps

Continue to [CSS Performance](./03-css-performance.md) →
