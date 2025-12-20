# Image Optimization

> **Quick Summary:** Images are often the heaviest assets on a page. Optimizing them dramatically improves load times and user experience.

## What You'll Learn

- Modern image formats
- Responsive images
- Lazy loading
- Image CDNs and optimization services

## Modern Image Formats

### WebP
- 25-35% smaller than JPEG at same quality
- Supports transparency (like PNG)
- Wide browser support (95%+)

### AVIF
- 50% smaller than JPEG
- Growing browser support
- Best quality-to-size ratio

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

- `srcset`: Available image sizes
- `sizes`: How much viewport the image occupies
- Browser picks the best match

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

Benefits:
- Automatic format selection
- On-the-fly resizing
- Quality optimization
- Global CDN delivery

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

Automatic optimization, lazy loading, and blur placeholders.

## Try It Yourself

### Exercise 1: Format Comparison

Take a JPEG image and convert to WebP and AVIF. Compare file sizes and quality.

### Exercise 2: Responsive Implementation

Implement responsive images for a hero section with appropriate breakpoints.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "image-optimization-quiz",
  "type": "multiple-choice",
  "title": "Image Optimization",
  "description": "Test your understanding of web image optimization.",
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

- Use modern formats (WebP, AVIF) with fallbacks
- Serve responsive images with srcset
- Lazy load below-the-fold images
- Always specify dimensions
- Consider image CDNs for automatic optimization

## Next Steps

Continue to [CSS Performance](./03-css-performance.md) →
