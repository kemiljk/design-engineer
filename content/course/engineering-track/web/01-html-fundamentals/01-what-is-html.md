---
estimatedTime: 12
---

# What is HTML?

> **Quick Summary:** HTML is the skeleton of every web page. It's the structural foundation that gives content meaning and makes the web accessible.

## What You'll Learn

- What HTML is and why it matters
- How HTML provides semantic structure
- The relationship between HTML, CSS, and JavaScript
- Why semantic HTML matters for Design Engineers

## The Foundation of the Web

> *"The web is more a social creation than a technical one."* — Tim Berners-Lee

Every website you've ever visited is built on HTML. When you load a page, your browser receives HTML—a text document that describes the content and structure of that page.

HTML stands for **HyperText Markup Language**:
- **HyperText:** Text with links to other text (the "web" in World Wide Web)
- **Markup:** Tags that describe content
- **Language:** A standardised way of writing these tags

HTML isn't a programming language—it's a markup language. It doesn't perform logic or calculations. It describes content: "this is a heading," "this is a paragraph," "this is a link."

## HTML as Structure

Think of a document like a human body:

<!-- illustration: html-css-js-layers -->

- **HTML** is the skeleton: the structure that holds everything together
- **CSS** is the appearance—skin, clothing, style
- **JavaScript** is the behaviour—movement, actions, responses

Without HTML, there's nothing to style or animate. It's the foundation.

## How HTML Works

HTML uses tags to mark up content:

```html
<p>This is a paragraph of text.</p>
```

Let's break this down:
- `<p>` is the **opening tag**
- `This is a paragraph of text.` is the **content**
- `</p>` is the **closing tag**
- The whole thing is an **element**

Tags can have **attributes** that provide additional information:

```html
<a href="https://example.com">Click here</a>
```

Here, `href` is an attribute that tells the link where to go.

## Your First HTML

The simplest HTML document:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
    <p>This is my first web page.</p>
  </body>
</html>
```

What's happening here:
- `<!DOCTYPE html>` tells browsers this is HTML5
- `<html>` contains everything
- `<head>` contains metadata (title, linked files)
- `<body>` contains visible content
- `<h1>` is a top-level heading
- `<p>` is a paragraph

## Semantic HTML

Semantic HTML uses tags that describe the meaning of content, not just its appearance.

**Non-semantic:**
```html
<div class="header">Site Title</div>
<div class="nav">...</div>
<div class="main">...</div>
```

**Semantic:**
```html
<header>Site Title</header>
<nav>...</nav>
<main>...</main>
```

Both might look the same with CSS, but semantic HTML:
- Communicates meaning to browsers and assistive technologies
- Improves accessibility (screen readers understand the structure)
- Helps search engines understand content
- Makes code more readable
- Provides default behaviors (forms, links)

## Why Semantic HTML Matters for Design Engineers

As a Design Engineer, you might think: "I'll just use `<div>` and style it however I want."

This works visually, but fails in important ways:

### Accessibility

Screen readers announce: "Navigation landmark" for `<nav>`, but nothing meaningful for `<div class="nav">`. Users who can't see your design rely on semantic structure.

### SEO

Search engines use semantic HTML to understand content. A `<main>` element tells Google "this is the important stuff." Proper headings create an outline.

### Maintainability

Semantic HTML is self-documenting. `<article>` clearly means "this is an article." `<div class="item-thing-wrapper">` doesn't.

### Default Behaviors

Semantic elements come with built-in behaviors:
- `<button>` is keyboard accessible by default
- `<a>` provides navigation
- `<form>` handles submission

Recreating these with `<div>` requires significant JavaScript.

## Common HTML Elements

Here's a quick overview of essential elements (we'll cover each in depth):

### Structure
- `<header>` — Page or section header
- `<nav>` — Navigation links
- `<main>` — Main content
- `<section>` — Thematic grouping
- `<article>` — Self-contained content
- `<aside>` — Tangentially related content
- `<footer>` — Page or section footer

### Text
- `<h1>` to `<h6>` — Headings (hierarchy)
- `<p>` — Paragraph
- `<span>` — Inline text container
- `<strong>` — Important text
- `<em>` — Emphasized text

### Links and Media
- `<a>` — Links
- `<img>` — Images
- `<video>` — Video content
- `<audio>` — Audio content

### Lists
- `<ul>` — Unordered list
- `<ol>` — Ordered list
- `<li>` — List item

### Forms
- `<form>` — Form container
- `<input>` — Input field
- `<button>` — Clickable button
- `<label>` — Input label

## HTML and Design Decisions

Design decisions often have HTML implications:

**Design decision:** "I want a clickable card"
**HTML consideration:** The whole card as a link? Or a button inside?

**Design decision:** "I want a tabbed interface"
**HTML consideration:** How are tabs announced to screen readers?

**Design decision:** "I want a modal dialog"
**HTML consideration:** Focus trap, escape key, announcement?

Understanding HTML helps you design more implementable interfaces and catch issues before they reach code.

## Try It Yourself

### Exercise 1: View Source

Pick three websites you admire. Right-click and "View Page Source" or use browser dev tools:
1. What elements do you see?
2. Is the HTML semantic or mostly `<div>` soup?
3. Can you identify the structure?

### Exercise 2: Write Basic HTML

Create a simple HTML file:
1. Open a text editor
2. Write a basic HTML document with:
   - A title
   - A heading
   - Two paragraphs
   - A link
3. Save as `index.html`
4. Open in a browser

### Exercise 3: Semantic Analysis

Take a design you've created (or a page you like). List:
1. What semantic elements would you use?
2. What's the heading hierarchy?
3. What would be in `<nav>`, `<main>`, `<aside>`?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "html-semantic-quiz",
  "type": "multiple-choice",
  "title": "Semantic HTML",
  "description": "Test your understanding of HTML fundamentals.",
  "difficulty": "easy",
  "question": "Why is semantic HTML important for Design Engineers?",
  "options": [
    {
      "id": "a",
      "text": "It makes pages load faster by reducing file size",
      "isCorrect": false,
      "explanation": "Semantic HTML doesn't significantly affect file size—both semantic and non-semantic HTML can be similar in length."
    },
    {
      "id": "b",
      "text": "It improves accessibility, SEO, and provides meaning to assistive technologies",
      "isCorrect": true,
      "explanation": "Correct! Semantic HTML tells browsers and screen readers what content means, not just how it looks. This helps assistive technology users navigate, improves SEO, and creates more maintainable code."
    },
    {
      "id": "c",
      "text": "It's required by modern browsers to render pages correctly",
      "isCorrect": false,
      "explanation": "Browsers will render non-semantic HTML fine—semantic HTML is about meaning and accessibility, not rendering."
    },
    {
      "id": "d",
      "text": "It automatically applies CSS styles without needing a stylesheet",
      "isCorrect": false,
      "explanation": "Semantic elements have some default browser styles, but they don't eliminate the need for CSS."
    }
  ]
}
-->

## Key Takeaways

- HTML is the structural foundation of every web page
- It uses tags to mark up content with meaning
- Semantic HTML describes what content is, not how it looks
- Semantic HTML improves accessibility, SEO, and maintainability
- Understanding HTML helps Design Engineers make better design decisions

## Next Steps

Continue to [Document Structure](./02-document-structure.md) →
