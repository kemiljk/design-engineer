# Document Structure

> **Quick Summary:** Every HTML document follows a standard structure—understanding it ensures your pages work correctly across all browsers and environments.

## What You'll Learn

During this module, you will learn the essential components of a standard HTML document and examine the critical differences between the `<head>` and `<body>` sections. We'll explore indispensable metadata elements and walk through how modern browsers interpret and render HTML structures for an optimal user experience.

## The HTML Document Template

Every HTML page needs this basic structure:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
  </head>
  <body>
    <!-- Visible content goes here -->
  </body>
</html>
```

Let's examine each part.

## DOCTYPE

```html
<!DOCTYPE html>
```

This declaration tells browsers to render the page in standards mode. It's not an HTML tag—it's an instruction to the browser.

Without it, browsers enter "quirks mode" and render pages inconsistently. Always include it as the first line.

## The html Element

```html
<html lang="en">
```

The root element that contains everything else.

The `lang` attribute specifies the page language:
The `lang` attribute is essential for high-quality web development because it helps screen readers pronounce content correctly and assists various translation tools in identifying the page's primary language. Furthermore, it significantly improves search engine understanding by providing clear context about the intended audience and language of your content.

Common language codes include `en` for English, `es` for Spanish, `fr` for French, `de` for German, and `zh` for Chinese. Use the code that matches the primary language of your content.

## The head Element

The `<head>` contains metadata—information about the page that isn't displayed directly.

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <meta name="description" content="Page description for search engines">
  <link rel="stylesheet" href="styles.css">
  <link rel="icon" href="favicon.ico">
</head>
```

### Character Encoding

```html
<meta charset="UTF-8">
```

Declares the character encoding. UTF-8 supports virtually all characters and is the standard choice. Always include this first in `<head>`.

### Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Essential for responsive design:
The viewport meta tag is essential for responsive design as it allows you to set the viewport width to match the device's width and prevents the browser from zooming in by default. By configuring these parameters correctly, you ensure that your application displays accurately across all screen sizes rather than forcing mobile users to navigate a tiny, zoomed-out version of a desktop layout.

Without this, mobile browsers render pages at desktop width and zoom out, making text tiny.

### Title

```html
<title>Page Title</title>
```

The page title appears in:
The page title is a critical element that appears in browser tabs, bookmarks, and search engine results, whilst also being the primary identifier used during screen reader announcements. To ensure the best user experience, your titles should be descriptive and unique for every page, with important keywords front-loaded to make them immediately recognisable to your users.

When creating titles, you should strive to make them descriptive—for example, using "Home | My Website" instead of simply "Home"—and ensure that every page on your site has a unique title. By front-loading important keywords, you make the page's purpose immediately clear to both users and search engines.

### Meta Description

```html
<meta name="description" content="A brief description of the page content.">
```

Displayed in search results. Keep to ~155 characters. Should be unique per page and accurately describe the content.

### Linking Resources

**Stylesheets:**
```html
<link rel="stylesheet" href="styles.css">
```

**Favicon:**
```html
<link rel="icon" href="favicon.ico">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
```

**Fonts:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
```

**Scripts (in head):**
```html
<script src="analytics.js" defer></script>
```

### Open Graph Tags

For social media sharing:

```html
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">
```

Twitter has its own format:

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Page description">
<meta name="twitter:image" content="https://example.com/image.jpg">
```

## The body Element

The `<body>` contains everything visible on the page:

```html
<body>
  <header>
    <nav>...</nav>
  </header>
  
  <main>
    <article>...</article>
  </main>
  
  <footer>...</footer>
  
  <script src="app.js"></script>
</body>
```

### Script Placement

Scripts can go in `<head>` or at the end of `<body>`:

**In head with defer:**
```html
<head>
  <script src="app.js" defer></script>
</head>
```
Downloads during HTML parsing, executes after parsing complete.

**End of body:**
```html
<body>
  <!-- content -->
  <script src="app.js"></script>
</body>
```
Traditional approach—scripts don't block rendering.

**Async (for independent scripts):**
```html
<script src="analytics.js" async></script>
```
Downloads and executes as soon as possible, order not guaranteed.

## Complete Example

A well-structured HTML document:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Character encoding -->
    <meta charset="UTF-8">
    
    <!-- Viewport for responsive design -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Page title -->
    <title>About Us | Company Name</title>
    
    <!-- SEO -->
    <meta name="description" content="Learn about our company, mission, and team.">
    
    <!-- Social sharing -->
    <meta property="og:title" content="About Us | Company Name">
    <meta property="og:description" content="Learn about our company, mission, and team.">
    <meta property="og:image" content="https://example.com/about-og.jpg">
    <meta property="og:url" content="https://example.com/about">
    
    <!-- Favicon -->
    <link rel="icon" href="/favicon.ico">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <link rel="stylesheet" href="/styles.css">
  </head>
  
  <body>
    <header>
      <a href="/" aria-label="Home">
        <img src="/logo.svg" alt="Company Name">
      </a>
      <nav aria-label="Main navigation">
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/products">Products</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
    
    <main>
      <h1>About Us</h1>
      <p>Content goes here...</p>
    </main>
    
    <footer>
      <p>&copy; 2024 Company Name</p>
    </footer>
    
    <script src="/app.js" defer></script>
  </body>
</html>
```

### Common Mistakes

Ensuring your document structure is correct involves avoiding several common pitfalls. One of the most frequent errors is omitting the DOCTYPE declaration, which inadvertently triggers quirks mode in many browsers. Similarly, failing to include the viewport meta tag will cause your responsive designs to display incorrectly on mobile devices. While modern browsers are more flexible, you should traditionally aim for one `<h1>` per page to maintain a clear content hierarchy, and never leave your `<head>` empty—it must contain character encoding, viewport settings, and a title at a minimum. Finally, avoid letting scripts block the rendering of your page; instead, use the `defer` or `async` attributes to ensure a smooth loading experience for your users.

## Try It Yourself

### Exercise 1: Build a Template

Develop your own comprehensive HTML template that includes all required elements, appropriate meta tags, Open Graph properties, and an efficient script loading strategy. This template will serve as a reliable foundation for all your future web projects.

### Exercise 2: Meta Tag Analysis

Select three popular websites and use your browser's developer tools to inspect their `<head>` sections. Note the specific meta tags and Open Graph properties they include, and examine how they choose to load their external scripts.

### Exercise 3: Validation

Validate your HTML files by visiting validator.w3.org and either uploading or pasting your code. This process will help you identify and fix any structural errors, ensuring your pages are fully compliant with modern web standards.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "html-viewport-quiz",
  "type": "multiple-choice",
  "title": "HTML Document Structure",
  "description": "Test your understanding of essential HTML metadata.",
  "difficulty": "easy",
  "question": "What happens if you omit the viewport meta tag on a mobile device?",
  "options": [
    {
      "id": "a",
      "text": "The page won't load at all",
      "isCorrect": false,
      "explanation": "The page will still load, but it won't display correctly on mobile."
    },
    {
      "id": "b",
      "text": "The browser renders the page at desktop width and zooms out, making text tiny",
      "isCorrect": true,
      "explanation": "Correct! Without the viewport meta tag, mobile browsers assume a desktop-width page and zoom out to fit it, resulting in tiny, hard-to-read text."
    },
    {
      "id": "c",
      "text": "CSS media queries won't work",
      "isCorrect": false,
      "explanation": "Media queries still work, but without the viewport tag, the device-width basis is wrong."
    },
    {
      "id": "d",
      "text": "The page will only show in portrait mode",
      "isCorrect": false,
      "explanation": "Orientation is unaffected by the viewport meta tag."
    }
  ]
}
-->

## Key Takeaways

To build robust and standard-compliant web pages, you must include the DOCTYPE declaration along with correctly structured html, head, and body elements. Ensure that your `<head>` contains all essential metadata, including character encoding, viewport settings, and descriptive titles, whilst also leveraging Open Graph tags to control how your content appears when shared socially. By using `defer` for your scripts to prevent render blocking and consistently validating your HTML, you can maintain a high-quality codebase that performs reliably across all devices.

## Next Steps

Continue to [Semantic Elements](./03-semantic-elements.md) →
