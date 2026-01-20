# Text and Links

> **Quick Summary:** Text elements give structure and meaning to written content, from headings that create hierarchy to links that connect the web.

## What You'll Learn

During this module, you will learn how to use heading elements to create a logical document hierarchy and examine the various elements available for paragraph and text formatting. We'll explore the different types of lists and when to apply them, whilst also walking through the anatomy of a link and the best practices for connecting your web content effectively.

## Headings

Headings create content hierarchy, from most important (`<h1>`) to least (`<h6>`):

```html
<h1>Main Page Title</h1>
<h2>Major Section</h2>
<h3>Subsection</h3>
<h4>Sub-subsection</h4>
<h5>Minor heading</h5>
<h6>Smallest heading</h6>
```

### Heading Rules

**Don't skip levels.** Go from `<h1>` to `<h2>` to `<h3>`, not `<h1>` to `<h3>`:

```html
<!-- Bad -->
<h1>Title</h1>
<h3>Subtitle</h3>

<!-- Good -->
<h1>Title</h1>
<h2>Subtitle</h2>
```

**Use headings for hierarchy, not styling.** If you want smaller text, use CSS—don't use `<h5>` just because it's small.

**Screen readers use headings for navigation.** Users jump from heading to heading to scan content. Proper hierarchy is essential.

### How Many h1 Elements?

Traditional guidance: one `<h1>` per page.

HTML5 spec allows multiple `<h1>` elements within sectioning elements. However, browser support for the document outline algorithm is incomplete.

**Safe practice:** One `<h1>` per page for the main title, with `<h2>` and below for sections.

## Paragraphs

The `<p>` element represents a paragraph:

```html
<p>This is a paragraph of text. It can contain multiple sentences.</p>

<p>This is another paragraph. Paragraphs are block-level elements.</p>
```

Paragraphs automatically have margin above and below (which you can style with CSS).

Don't use `<p>` for everything—use appropriate elements for different content types.

## Text Formatting

### Emphasis

`<em>` for stress emphasis (how you'd emphasise speaking):

```html
<p>I <em>really</em> want this to work.</p>
```

Screen readers may change tone for `<em>`. Use for actual emphasis, not just styling.

### Strong Importance

`<strong>` for important text:

```html
<p><strong>Warning:</strong> This action cannot be undone.</p>
```

Use for actual importance, not just bold text.

### Bold and Italic (Visual Only)

`<b>` for stylistically bold without importance:

```html
<p>Product names like <b>iPhone</b> or <b>PlayStation</b>.</p>
```

`<i>` for stylistically italic without emphasis:

```html
<p>The ship <i>HMS Victory</i> is a museum.</p>
```

When deciding which element to use for text emphasis, you should choose `<em>` for stress emphasis and `<strong>` to denote actual importance. If you only require bold or italic styles for visual purposes without changing the underlying meaning, you should use `<b>` or `<i>` respectively, or ideally apply these styles through CSS.

## Other Text Elements

### Code

`<code>` for inline code:

```html
<p>Use the <code>querySelector()</code> method to find elements.</p>
```

For code blocks, combine with `<pre>` (preformatted text):

```html
<pre><code>function greet(name) {
  return `Hello, ${name}!`;
}</code></pre>
```

### Quotations

`<blockquote>` for block quotes:

```html
<blockquote cite="https://example.com/source">
  <p>Design is not just what it looks like and feels like. Design is how it works.</p>
  <footer>— Steve Jobs</footer>
</blockquote>
```

`<q>` for inline quotes:

```html
<p>As the saying goes, <q>less is more</q>.</p>
```

### Abbreviations

`<abbr>` for abbreviations and acronyms:

```html
<p>The <abbr title="World Wide Web">WWW</abbr> was invented in 1989.</p>
```

### Time

`<time>` for dates and times:

```html
<p>Posted on <time datetime="2024-03-15">March 15, 2024</time></p>
```

The `datetime` attribute provides machine-readable format.

### Addresses

`<address>` for contact information:

```html
<address>
  Contact us at <a href="mailto:info@example.com">info@example.com</a>
</address>
```

## Lists

### Unordered Lists

For items without inherent order:

```html
<ul>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>
```

The unordered list is ideal for navigation menus and feature lists, but you should use it for any grouping where the specific order of items does not significantly impact the content's meaning.

### Ordered Lists

For items with meaningful order:

```html
<ol>
  <li>Preheat oven to 350°F</li>
  <li>Mix ingredients</li>
  <li>Bake for 30 minutes</li>
</ol>
```

Use an ordered list for any sequential items where the order is critical, such as the specific steps in a process or a list of rankings.

### Description Lists

For name-value pairs:

```html
<dl>
  <dt>HTML</dt>
  <dd>HyperText Markup Language, the structure of web pages.</dd>
  
  <dt>CSS</dt>
  <dd>Cascading Style Sheets, the presentation of web pages.</dd>
</dl>
```

Description lists are particularly effective for glossaries and FAQs, but also serve well for displaying metadata such as an author's name, the publication date, or content categories.

### Nested Lists

Lists can contain other lists:

```html
<ul>
  <li>Frontend
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>Backend
    <ul>
      <li>Node.js</li>
      <li>Python</li>
    </ul>
  </li>
</ul>
```

## Links

Links are the foundation of the web. They connect pages and resources.

### Basic Link

```html
<a href="https://example.com">Visit Example</a>
```

- `href` — The URL to navigate to
- Content — The clickable text

### Link Types

**Absolute URLs:**
```html
<a href="https://example.com/page">External link</a>
```

**Relative URLs:**
```html
<a href="/about">Link to about page</a>
<a href="page.html">Link to page in same folder</a>
<a href="../other/page.html">Link to page in parent folder</a>
```

**Email links:**
```html
<a href="mailto:info@example.com">Email us</a>
```

**Phone links:**
```html
<a href="tel:+1234567890">Call us</a>
```

**Page anchors:**
```html
<a href="#section-id">Jump to section</a>
```

### Link Attributes

**target:**
```html
<a href="https://example.com" target="_blank">Opens in new tab</a>
```

**rel (for external links):**
```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External link
</a>
```

`noopener` prevents security vulnerabilities. `noreferrer` prevents passing referrer information.

**download:**
```html
<a href="/file.pdf" download>Download PDF</a>
```

### Link Best Practices

**Descriptive link text:**
```html
<!-- Bad -->
<a href="/pricing">Click here</a>

<!-- Good -->
<a href="/pricing">View pricing plans</a>
```

Screen readers often list links out of context—"click here" tells them nothing.

**Don't use URLs as link text:**
```html
<!-- Bad -->
<a href="https://example.com/very-long-url">https://example.com/very-long-url</a>

<!-- Good -->
<a href="https://example.com/very-long-url">Read the documentation</a>
```

**Indicate external links:**
Consider adding an icon or "opens in new tab" text for external links.

## Try It Yourself

### Exercise 1: Structure an Article

Write the HTML for a blog post with:
- Main heading
- Subheadings for sections
- Multiple paragraphs
- An emphasized word
- An important warning
- A block quote

### Exercise 2: Build Navigation

Create navigation with:
- Unordered list of links
- One link with nested submenu
- Active state class for current page

### Exercise 3: Format Content

Take a recipe and mark it up with:
- Description list for ingredients
- Ordered list for steps
- Proper heading hierarchy
- Time elements for duration

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "html-headings-quiz",
  "type": "multiple-choice",
  "title": "Heading Hierarchy",
  "description": "Test your understanding of proper heading usage.",
  "difficulty": "easy",
  "question": "Why shouldn't you skip heading levels (e.g., going from h1 to h3)?",
  "options": [
    {
      "id": "a",
      "text": "It causes CSS styling to break",
      "isCorrect": false,
      "explanation": "CSS styling will work fine. The issue is semantic, not visual."
    },
    {
      "id": "b",
      "text": "Screen reader users navigate by headings, and skipping levels confuses the document structure",
      "isCorrect": true,
      "explanation": "Correct! Screen reader users jump between headings to navigate. Skipped levels suggest missing sections and make the document structure confusing."
    },
    {
      "id": "c",
      "text": "Search engines will penalize the page for invalid HTML",
      "isCorrect": false,
      "explanation": "Skipping headings isn't a validation error, but it is a semantic best practice issue."
    },
    {
      "id": "d",
      "text": "The browser will auto-generate missing heading levels",
      "isCorrect": false,
      "explanation": "Browsers don't auto-generate headings—they'll just display what you write."
    }
  ]
}
-->

## Key Takeaways

To build high-quality web content, you must master the use of headings to create a clear document hierarchy and consistently use `<em>` and `<strong>` to convey genuine emphasis and importance. Leverage the three primary list types to organise your data logically and ensure that all links use descriptive text rather than generic phrases. Finally, remember to apply `rel="noopener noreferrer"` to any external links that open in a new tab to maintain the security and performance of your application.

## Next Steps

Continue to [Forms and Inputs](./05-forms-and-inputs.md) →
