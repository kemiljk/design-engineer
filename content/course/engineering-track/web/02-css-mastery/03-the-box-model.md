# The Box Model

> **Quick Summary:** Every element is a box. Understanding the box model—content, padding, border, margin—is fundamental to CSS layout.

## What You'll Learn

- The four parts of the box model
- The difference between content-box and border-box
- How margins collapse
- Practical box model techniques

## Every Element is a Box

In CSS, every element generates a rectangular box. The box model describes how these boxes are sized:

<!-- illustration: box-model -->

## The Four Parts

### Content

The actual content—text, images, child elements:

```css
.box {
  width: 200px;
  height: 100px;
}
```

### Padding

Space between content and border:

```css
.box {
  padding: 20px;           /* All sides */
  padding: 10px 20px;      /* Vertical | Horizontal */
  padding: 10px 20px 30px; /* Top | Horizontal | Bottom */
  padding: 10px 20px 30px 40px; /* Top | Right | Bottom | Left */
}
```

Individual sides:
```css
.box {
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-left: 20px;
}
```

### Border

The visible edge of the element:

```css
.box {
  border: 1px solid black;  /* Shorthand */
  
  border-width: 1px;
  border-style: solid;      /* solid, dashed, dotted, double, none */
  border-color: black;
}
```

Individual sides:
```css
.box {
  border-top: 2px solid red;
  border-bottom: none;
}
```

Border radius for rounded corners:
```css
.box {
  border-radius: 8px;        /* All corners */
  border-radius: 8px 0;      /* TL+BR | TR+BL */
  border-radius: 50%;        /* Circle/ellipse */
}
```

### Margin

Space outside the border, between elements:

```css
.box {
  margin: 20px;             /* All sides */
  margin: 0 auto;           /* Center horizontally */
}
```

Negative margins are valid:
```css
.box {
  margin-top: -10px;        /* Pull element up */
}
```

## Box Sizing

The critical question: what does `width` mean?

### content-box (Default)

Width and height apply to content only. Padding and border add to total size.

```css
.box {
  box-sizing: content-box;  /* Default */
  width: 200px;
  padding: 20px;
  border: 1px solid black;
}
/* Total width: 200 + 40 + 2 = 242px */
```

This is counterintuitive and causes layout math headaches.

### border-box (Recommended)

Width and height include padding and border. Content shrinks to fit.

```css
.box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 1px solid black;
}
/* Total width: 200px (content shrinks to 158px) */
```

This is how most designers think about sizing.

### Global Border-Box Reset

Apply to everything:

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

This should be in every project's CSS reset.

## Margin Collapse

Vertical margins collapse. They don't add, they overlap:

```css
.paragraph {
  margin-top: 20px;
  margin-bottom: 20px;
}
```

Two paragraphs have 20px between them, not 40px. The larger margin wins.

### When Margins Collapse

- Adjacent siblings (most common)
- Parent and first/last child (if no padding/border/content between)
- Empty blocks

### Preventing Collapse

- Add padding or border between elements
- Use `overflow: hidden` or `overflow: auto` on parent
- Use flexbox or grid (margins don't collapse in these contexts)

### Example

```html
<div class="parent">
  <div class="child">Content</div>
</div>
```

```css
.parent {
  margin-top: 20px;
}
.child {
  margin-top: 30px;
}
```

The child's margin "escapes" the parent. Total margin from top: 30px (larger wins), not 50px.

Fix with padding:
```css
.parent {
  padding-top: 1px;  /* Prevents collapse */
  margin-top: 20px;
}
```

## Display Property

The `display` property affects box behaviour:

### Block Elements

Take full width, stack vertically:

```css
.block {
  display: block;
}
/* Default for: div, p, h1-h6, section, header, etc. */
```

### Inline Elements

Flow with text, only as wide as content:

```css
.inline {
  display: inline;
}
/* Default for: span, a, strong, em, etc. */
```

Inline elements ignore width, height, and vertical margins.

### Inline-Block

Inline flow, but respects width, height, and all margins:

```css
.inline-block {
  display: inline-block;
}
```

Useful for things like buttons in a row.

### None

Removes from layout entirely:

```css
.hidden {
  display: none;
}
```

## Width and Height

### Content Dimensions

```css
.box {
  width: 300px;
  height: 200px;
}
```

### Constraints

```css
.box {
  min-width: 200px;
  max-width: 600px;
  min-height: 100px;
  max-height: 400px;
}
```

### Percentage Values

Relative to parent:

```css
.box {
  width: 50%;  /* Half of parent's width */
}
```

Height percentages require parent to have explicit height.

### Auto

Browser calculates:

```css
.box {
  width: auto;   /* Default block: full width */
  height: auto;  /* Default: fit content */
  margin: auto;  /* Can center horizontally */
}
```

### Viewport Units

Relative to viewport:

```css
.box {
  width: 100vw;   /* 100% of viewport width */
  height: 100vh;  /* 100% of viewport height */
  min-height: 100dvh; /* Dynamic viewport height (mobile-friendly) */
}
```

## Overflow

What happens when content exceeds the box?

```css
.box {
  overflow: visible;  /* Default: content spills out */
  overflow: hidden;   /* Clips content */
  overflow: scroll;   /* Always shows scrollbars */
  overflow: auto;     /* Scrollbars when needed */
}
```

Individual axes:
```css
.box {
  overflow-x: hidden;
  overflow-y: auto;
}
```

## Practical Patterns

### Centering Horizontally

```css
.centered {
  width: 800px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
}
```

### Aspect Ratio

```css
.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}
```

### Full-Bleed with Constrained Content

```css
.section {
  padding: 4rem 1rem;
}

.section-content {
  max-width: 1200px;
  margin: 0 auto;
}
```

### Card with Consistent Spacing

```css
.card {
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.card > * + * {
  margin-top: 1rem;  /* Space between children */
}
```

## Try It Yourself

### Exercise 1: Box Model Visualization

Create a box and use browser dev tools to inspect:
- Content dimensions
- Padding
- Border
- Margin

Change values and observe how total size changes.

### Exercise 2: Content-Box vs Border-Box

Create two identical boxes, one with `content-box`, one with `border-box`. Give both the same width, padding, and border. Observe the difference.

### Exercise 3: Margin Collapse

Create scenarios demonstrating margin collapse:
1. Adjacent siblings
2. Parent-child
3. Fix the collapse with padding

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "css-box-model-quiz",
  "type": "multiple-choice",
  "title": "The Box Model",
  "description": "Test your understanding of CSS box model.",
  "difficulty": "medium",
  "question": "Why do most CSS resets include 'box-sizing: border-box' on all elements?",
  "options": [
    {
      "id": "a",
      "text": "It makes pages load faster",
      "isCorrect": false,
      "explanation": "box-sizing doesn't affect performance. It affects how sizes are calculated."
    },
    {
      "id": "b",
      "text": "It makes width and height include padding and border, making sizing more intuitive",
      "isCorrect": true,
      "explanation": "Correct! With border-box, if you set width: 200px, the element is 200px total including padding and border. With content-box (default), padding and border add to the width."
    },
    {
      "id": "c",
      "text": "It's required for flexbox and grid to work properly",
      "isCorrect": false,
      "explanation": "Flexbox and grid work with either box-sizing value—border-box is just more intuitive."
    },
    {
      "id": "d",
      "text": "It fixes margin collapse issues",
      "isCorrect": false,
      "explanation": "box-sizing doesn't affect margin behaviour—margins are outside the box regardless."
    }
  ]
}
-->

## Key Takeaways

- Box model: content → padding → border → margin
- Use `box-sizing: border-box` everywhere
- Vertical margins collapse—be aware when debugging
- Block elements stack; inline elements flow
- Use `overflow` to handle content that exceeds the box
- Width and height behave differently depending on `box-sizing`

## Next Steps

Continue to [Layout with Flexbox](./04-layout-with-flexbox.md) →
