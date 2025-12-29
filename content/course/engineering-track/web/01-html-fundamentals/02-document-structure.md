# Document Structure

> **Quick Summary:** Every HTML document follows a standard structure—understanding it ensures your pages work correctly across all browsers and environments.

## What You'll Learn

- The required parts of an HTML document
- What goes in `<head>` vs `<body>`
- Essential metadata elements
- How browsers interpret HTML structure

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
- Helps screen readers pronounce content correctly
- Assists translation tools
- Improves search engine understanding

Common language codes:
- `en` — English
- `es` — Spanish
- `fr` — French
- `de` — German
- `zh` — Chinese

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
- `width=device-width` — Set viewport width to device width
- `initial-scale=1.0` — Don't zoom by default

Without this, mobile browsers render pages at desktop width and zoom out, making text tiny.

### Title

```html
<title>Page Title</title>
```

The page title appears in:
- Browser tabs
- Bookmarks
- Search engine results
- Screen reader announcements

Make titles:
- Descriptive ("Home | My Website" rather than just "Home")
- Unique per page
- Front-loaded with important words

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

## Common Mistakes

### Missing DOCTYPE

Causes quirks mode rendering. Always include `<!DOCTYPE html>`.

### Missing Viewport Meta

Makes responsive designs fail on mobile.

### Multiple h1 Elements

Traditionally, one `<h1>` per page. Modern usage allows multiple, but maintain clear hierarchy.

### Empty Head

Always include charset, viewport, and title at minimum.

### Scripts Blocking Rendering

Use `defer` or `async` to prevent render blocking.

## Try It Yourself

### Exercise 1: Build a Template

Create your own HTML template with:
1. All required elements
2. Appropriate meta tags
3. Open Graph tags
4. Proper script loading

Save this for future projects.

### Exercise 2: Meta Tag Analysis

Inspect the `<head>` of three popular websites:
1. What meta tags do they include?
2. What Open Graph tags do they use?
3. How do they load scripts?

### Exercise 3: Validation

Take an HTML file you've created and validate it:
1. Go to validator.w3.org
2. Upload or paste your HTML
3. Fix any errors reported

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

- HTML documents need DOCTYPE, html, head, and body elements
- `<head>` contains metadata; `<body>` contains visible content
- Essential meta tags: charset, viewport, title, description
- Open Graph tags control social sharing appearance
- Use `defer` for scripts to prevent render blocking
- Validate your HTML to catch errors

## Next Steps

Continue to [Semantic Elements](./03-semantic-elements.md) →
