# The Box Model

> **Quick Summary:** Every element is a box. Understanding the box model—content, padding, border, margin—is fundamental to CSS layout.

## What You'll Learn

In this lesson, we will examine the four distinct parts of the CSS box model and explore the critical differences between the `content-box` and `border-box` sizing methods. We'll also cover the phenomenon of margin collapse and investigate practical box model techniques that you can apply immediately to your layouts.

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

Padding creates space between your content and the border of the element. You can use shorthand values to set padding for all sides at once, or define different values for vertical and horizontal sides. For more granular control, you can specify individual values for the top, right, bottom, and left sides in a single declaration.

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

The border represents the visible edge of your element. You can use shorthand notation to define the width, style, and colour in one line, or specify each property individually if you prefer more explicit control. Common border styles include `solid`, `dashed`, `dotted`, and `double`.

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

Under the default `content-box` model, the width and height you specify apply only to the content area itself. Any padding and borders you add are then calculated on top of these dimensions, which can lead to counterintuitive results and complex layout mathematics.

### border-box (Recommended)

In contrast, the `border-box` model includes padding and border within the specified width and height. This means the content area automatically shrinks to accommodate them, which aligns much more closely with how most designers naturally think about sizing.

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

Margin collapse most commonly occurs between adjacent siblings, but you may also encounter it between a parent and its first or last child if there is no padding, border, or content separating them. Empty blocks can also experience this behaviour. To prevent margins from collapsing, you can add padding or a border between elements, use the `overflow` property on the parent, or switch to a flexbox or grid layout context, where margins do not collapse.

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

Block-level elements, such as `div`, `p`, and headings, naturally take up the full width available and stack vertically on the page.

### Inline Elements

Inline elements flow alongside text and are only as wide as their content. Elements like `span` and `anchor` tags fall into this category, and they typically ignore any width, height, or vertical margins you attempt to apply.

### Inline-Block

The `inline-block` value provides the best of both worlds by allowing elements to flow in a row like inline items while still respecting the width, height, and all margin settings. This is particularly useful for creating items like buttons that need to sit side-by-side.

### None

Setting `display: none` removes an element from the layout entirely, meaning it will no longer occupy any space on the page.

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
.centred {
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

### Exercise 1: Box Model Visualisation

Create a simple box element and use your browser’s developer tools to inspect its dimensions. Pay close attention to how the content, padding, border, and margin values are represented, and experiment with changing these values to see how they impact the total size.

### Exercise 2: Content-Box vs Border-Box

Develop two identical boxes, applying `content-box` to one and `border-box` to the other. Use the same width, padding, and border values for both to gain a clear visual understanding of how these two sizing models differ in practice.

### Exercise 3: Margin Collapse

Set up a few different scenarios to demonstrate margin collapse, including both adjacent siblings and parent-child structures. Once you have observed the collapse in action, try to fix it by applying padding to the containers.

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

To recap, the CSS box model consists of four layers: content, padding, border, and margin. For a more intuitive and predictable design experience, you should apply `box-sizing: border-box` to all elements in your project. Be mindful that vertical margins can collapse in certain contexts, though this behaviour is absent in flexbox and grid layouts. Finally, remember that the `display` property significantly alters box behaviour, and you can use the `overflow` property to manage any content that exceeds its container's dimensions.

## Next Steps

Continue to [Layout with Flexbox](./04-layout-with-flexbox.md) →
