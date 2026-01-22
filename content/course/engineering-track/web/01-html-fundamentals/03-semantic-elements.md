# Semantic Elements

> **Quick Summary:** Semantic elements describe their content's meaning. They make HTML readable, accessible, and meaningful to browsers, screen readers, and search engines.

## What You'll Learn

- Primary semantic elements and when to use them
- How to structure page layouts semantically
- Differences between generic `<div>` containers and semantic elements
- Best practices for writing clean, accessible, semantic html

## Why Semantic Elements?

In HTML4, we built layouts with `<div>` and `<span>`:

```html
<div class="header">
  <div class="nav">...</div>
</div>
<div class="main">
  <div class="article">...</div>
</div>
<div class="footer">...</div>
```

This works visually but tells browsers nothing about what the content means.

HTML5 introduced semantic elements:

```html
<header>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
</main>
<footer>...</footer>
```

Same visual result, but browsers (and assistive technologies) now understand the structure.

## Page Structure Elements

### header

Introductory content for a page or section:

```html
<header>
  <img src="logo.svg" alt="Company Name">
  <nav>...</nav>
</header>
```

Use `<header>` for:
- Page banners with logo and navigation
- Article headers with title and author
- Section headers

A page can have multiple `<header>` elements—one for the page, others for sections.

### nav

Navigation links:

```html
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

Use `<nav>` for major navigation blocks. Not every link group needs `<nav>`—use for primary, secondary, and footer navigation.

Add `aria-label` when multiple `<nav>` elements exist to distinguish them.

### main

The main content of the page:

```html
<main>
  <h1>Page Title</h1>
  <p>Primary content...</p>
</main>
```

Rules for `<main>`:
- Only one per page
- Should not be inside `<header>`, `<nav>`, `<footer>`, `<aside>`, or `<article>`
- Contains the unique content of the page (not repeated headers/footers)

### article

Self-contained, independently distributable content:

```html
<article>
  <header>
    <h2>Article Title</h2>
    <p>By Author Name • March 15, 2024</p>
  </header>
  <p>Article content...</p>
</article>
```

Use `<article>` for:
The `<article>` element is ideally suited for self-contained content such as blog posts, news articles, and user comments. You should also consider using it for independent units like forum posts, product cards, or social media updates, provided they remain meaningful even when syndicated on their own.

Test: Would this make sense syndicated on its own? If yes, it's an `<article>`.

### section

A thematic grouping of content:

```html
<section>
  <h2>Features</h2>
  <p>Our product features...</p>
</section>

<section>
  <h2>Pricing</h2>
  <p>Our pricing plans...</p>
</section>
```

Use `<section>` for:
- Chapters
- Tabbed content panels
- Numbered sections of a document
- Distinct sections of a page

Typically includes a heading.

### aside

Content tangentially related to the surrounding content:

```html
<aside>
  <h3>Related Articles</h3>
  <ul>...</ul>
</aside>
```

Use `<aside>` for:
The `<aside>` element is perfect for sidebars, pull quotes, and advertising that is tangentially related to the surrounding content. It is also commonly used for author biographies in an article context or for grouping related links that provide additional value without being part of the primary content stream.

### footer

Footer for a page or section:

```html
<footer>
  <nav>
    <a href="/privacy">Privacy</a>
    <a href="/terms">Terms</a>
  </nav>
  <p>&copy; 2024 Company Name</p>
</footer>
```

Use `<footer>` for:
- Copyright information
- Legal links
- Contact information
- Related navigation
- Article footers (author bio, tags)

A page can have multiple footers—one for the page, others for sections/articles.

## Grouping Elements

### div

A generic container with no semantic meaning:

```html
<div class="card-grid">
  <div class="card">...</div>
  <div class="card">...</div>
</div>
```

Use `<div>` when:
- No semantic element fits
- You need a container for styling purposes
- You're grouping elements for layout only

Don't use `<div>` when a semantic element would be more appropriate.

### span

Inline generic container:

```html
<p>The price is <span class="price">$49.99</span></p>
```

Use `<span>` for:
The `<span>` element serves as an inline generic container that is particularly useful for styling specific portions of text or targeting elements with JavaScript. You should reach for a `<span>` whenever no other inline semantic element fits your specific needs, such as when you need to highlight a price or apply a specific colour to a single word.

## Complete Page Structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>...</head>
  <body>
    <header>
      <a href="/" class="logo">
        <img src="logo.svg" alt="Company">
      </a>
      <nav aria-label="Main">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </header>
    
    <main>
      <article>
        <header>
          <h1>Article Title</h1>
          <p>By Author • Date</p>
        </header>
        
        <section>
          <h2>Introduction</h2>
          <p>Content...</p>
        </section>
        
        <section>
          <h2>Main Point</h2>
          <p>Content...</p>
        </section>
        
        <footer>
          <p>Tags: design, development</p>
        </footer>
      </article>
      
      <aside>
        <h2>Related Articles</h2>
        <ul>...</ul>
      </aside>
    </main>
    
    <footer>
      <nav aria-label="Footer">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </nav>
      <p>&copy; 2024 Company Name</p>
    </footer>
  </body>
</html>
```

## Decision Guide

When deciding which element to use:

1. **Is it site-wide navigation?** → `<nav>`
2. **Is it the main content?** → `<main>`
3. **Is it standalone/syndicatable?** → `<article>`
4. **Is it a thematic grouping with heading?** → `<section>`
5. **Is it tangentially related?** → `<aside>`
6. **Is it introductory content?** → `<header>`
7. **Is it footer content?** → `<footer>`
8. **Is it just for styling/layout?** → `<div>`

## Accessibility Benefits

Screen readers announce semantic elements:
- "Navigation landmark"
- "Main landmark"
- "Article"

Users can jump between landmarks, making navigation faster.

Without semantic elements, screen reader users must navigate linearly through all content—slow and frustrating.

## Common Mistakes

### Wrapping Everything in Sections

```html
<!-- Don't do this -->
<section class="hero">
  <section class="hero-content">
    <section class="hero-text">...</section>
  </section>
</section>
```

If it doesn't represent a thematic grouping, use `<div>`.

### Using article for Everything

`<article>` is for self-contained, syndicatable content—not every card or component.

### Skipping main

Every page should have exactly one `<main>` element containing the primary content.

### Multiple navs Without Labels

If you have multiple `<nav>` elements, use `aria-label` to distinguish them:

```html
<nav aria-label="Main navigation">...</nav>
<nav aria-label="Footer navigation">...</nav>
```

## Try It Yourself

### Exercise 1: Convert div Soup

Take this non-semantic HTML and convert it to semantic elements:

```html
<div class="header">
  <div class="logo">Logo</div>
  <div class="nav">
    <div class="nav-item"><a href="/">Home</a></div>
    <div class="nav-item"><a href="/about">About</a></div>
  </div>
</div>
<div class="content">
  <div class="article">
    <div class="article-header">
      <div class="article-title">Title</div>
    </div>
    <div class="article-body">Content here...</div>
  </div>
  <div class="sidebar">Related content...</div>
</div>
<div class="footer">Copyright 2024</div>
```

### Exercise 2: Semantic Audit

Pick a website and inspect its HTML. Evaluate:
1. Does it use semantic elements?
2. Does it use them correctly?
3. What improvements would you suggest?

### Exercise 3: Structure a Design

Take a page design (your own or from Dribbble):
1. Identify the content regions
2. Write the HTML structure using semantic elements
3. No styling, just structure

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "html-main-quiz",
  "type": "multiple-choice",
  "title": "Semantic Page Structure",
  "description": "Test your understanding of semantic HTML elements.",
  "difficulty": "medium",
  "question": "What is the rule for using the <main> element in HTML?",
  "options": [
    {
      "id": "a",
      "text": "You can use multiple <main> elements, one for each major section",
      "isCorrect": false,
      "explanation": "There should only be one <main> element per page. It represents the unique content."
    },
    {
      "id": "b",
      "text": "Only one per page, containing the unique content not repeated across pages",
      "isCorrect": true,
      "explanation": "Correct! <main> should be unique per page and contain the primary content. It should not be inside <header>, <nav>, <footer>, <aside>, or <article>."
    },
    {
      "id": "c",
      "text": "<main> must be inside the <body> tag but can be nested in <article>",
      "isCorrect": false,
      "explanation": "<main> should not be nested inside <article> or other sectioning elements."
    },
    {
      "id": "d",
      "text": "<main> is optional and only needed for accessibility purposes",
      "isCorrect": false,
      "explanation": "While <main> is crucial for accessibility (screen reader navigation), it's also semantically important for all pages."
    }
  ]
}
-->

## Key Takeaways

- To build high-quality web interfaces, prioritise using structure-defining tags such as `<header>`, `<nav>`, and `<main>` appropriately
- Only resort to `<div>` or `<span>` when no semantic alternative exists
- Semantic HTML improves accessibility, SEO, and long-term maintainability of your web projects

## Next Steps

Continue to [Text and Links](./04-text-and-links.md) →
