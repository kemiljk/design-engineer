---
estimatedTime: 12
---

# What is HTML?

> **Quick Summary:** HTML is the skeleton of every web page. It's the structural foundation that gives content meaning and makes the web accessible.

## What You'll Learn

During this module, you will learn exactly what HTML is and why it remains the essential foundation of the web. We'll examine how HTML provides semantic structure to your content and explore the critical relationship between HTML, CSS, and JavaScript. You will also discover why mastering semantic HTML is particularly important for Design Engineers in creating accessible and performant interfaces.

## The Foundation of the Web

> *"The web is more a social creation than a technical one."* — Tim Berners-Lee

Every website you've ever visited is built on HTML. When you load a page, your browser receives HTML—a text document that describes the content and structure of that page.

HTML stands for **HyperText Markup Language**. The "HyperText" part refers to text containing links to other text, which forms the basis of the "web" in the World Wide Web. "Markup" refers to the tags used to describe the content, while "Language" indicates that there is a standardised way of writing these tags for browsers to interpret.

HTML isn't a programming language—it's a markup language. It doesn't perform logic or calculations. It describes content: "this is a heading," "this is a paragraph," "this is a link."

## HTML as Structure

Think of a document like a human body:

<!-- illustration: html-css-js-layers -->

Think of a web document as a human body where **HTML** serves as the skeleton, providing the essential structure that holds everything together. **CSS** acts as the appearance—the skin, clothing, and style—whilst **JavaScript** represents the behaviour, enabling movement, actions, and interactive responses.

Without HTML, there's nothing to style or animate. It's the foundation.

## How HTML Works

HTML uses tags to mark up content:

```html
<p>This is a paragraph of text.</p>
```

Let's break this down:
In this example, `<p>` represents the **opening tag** and `</p>` is the **closing tag**, with the text "This is a paragraph of text" serving as the **content**. Together, these components form what is known as an **element**.

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
This structure includes the `<!DOCTYPE html>` declaration to inform browsers that the document is HTML5, whilst the `<html>` element contains the entire page content. The `<head>` section stores metadata such as the page title and linked files, and the `<body>` contains all visible content, including top-level headings like `<h1>` and paragraphs defined by `<p>`.

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
Whilst both semantic and non-semantic code might appear identical once styled with CSS, using semantic HTML is superior because it communicates clear meaning to browsers and assistive technologies. It significantly improves accessibility by helping screen readers understand a page's structure and assists search engines in accurately indexing your content. Furthermore, semantic HTML makes your code much more readable and provides essential default behaviours for interactive elements like forms and links.

## Why Semantic HTML Matters for Design Engineers

As a Design Engineer, you might think: "I'll just use `<div>` and style it however I want."

This works visually, but fails in important ways:

### Accessibility

Screen readers announce "Navigation landmark" for `<nav>`, but nothing meaningful for `<div class="nav">`. Users who can't see your design rely on semantic structure.

### SEO

Search engines use semantic HTML to understand content. A `<main>` element tells Google "this is the important stuff." Proper headings create an outline.

### Maintainability

Semantic HTML is self-documenting. `<article>` clearly means "this is an article." `<div class="item-thing-wrapper">` doesn't.

### Default Behaviours

Semantic elements come with built-in behaviours:
Semantic elements also come with powerful built-in behaviours that would otherwise require significant JavaScript to recreate. For instance, a `<button>` is inherently keyboard accessible, an `<a>` tag provides native navigation, and the `<form>` element handles data submission automatically. By using these elements correctly, you ensure your interface is robust and functional for all users with minimal extra effort.

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

Pick three websites you admire. Right-click and select "View Page Source" or use browser dev tools:
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

To build high-quality web interfaces, you must remember that HTML is the structural foundation of every page and uses tags to mark up content with genuine meaning. Prioritising semantic HTML ensures that your work is accessible, searchable, and maintainable, whilst also helping you make more informed design decisions that are easier to implement in code.

## Next Steps

Continue to [Document Structure](./02-document-structure.md) →
