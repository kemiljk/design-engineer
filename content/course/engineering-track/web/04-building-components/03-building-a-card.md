# Building a Card

> **Quick Summary:** Cards are versatile container components that group related content. Building them teaches composition and flexibility.

## What You'll Learn

- Card structure and composition
- Flexible layouts within cards
- Handling various content types
- Making cards interactive

## Card Anatomy

A card typically contains:

- Media (image, video)
- Header (title, subtitle)
- Content (description, metadata)
- Actions (buttons, links)

All are optional; cards adapt to their content.

## Basic Card Structure

```html
<article class="card">
  <div class="card__media">
    <img src="image.jpg" alt="Description" />
  </div>
  <div class="card__body">
    <h3 class="card__title">Card Title</h3>
    <p class="card__description">Card description text goes here.</p>
  </div>
  <div class="card__actions">
    <button class="button">Action</button>
  </div>
</article>
```

## Base Card Styles

```css
.card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card__media {
  aspect-ratio: 16 / 9;
}

.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__body {
  padding: 1.5rem;
  flex: 1;
}

.card__title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.card__description {
  margin: 0;
  color: var(--color-neutral-600);
}

.card__actions {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--color-neutral-100);
  display: flex;
  gap: 0.5rem;
}
```

## Card Variants

### Horizontal Card

```css
.card--horizontal {
  flex-direction: row;
}

.card--horizontal .card__media {
  width: 200px;
  flex-shrink: 0;
  aspect-ratio: auto;
}
```

### Elevated Card

```css
.card--elevated {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### Outlined Card

```css
.card--outlined {
  box-shadow: none;
  border: 1px solid var(--colour-neutral-200);
}
```

## Interactive Cards

For clickable cards:

```html
<article class="card card--interactive">
  <a href="/page" class="card__link">
    <span class="sr-only">Read more about Title</span>
  </a>
  <!-- rest of card content -->
</article>
```

```css
.card--interactive {
  position: relative;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.card--interactive:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.card__link {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.card--interactive .card__actions {
  position: relative;
  z-index: 1;
}
```

## Flexible Content

Cards should handle varying content:

```css
/* Title truncation */
.card__title--clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Description truncation */
.card__description--clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

## Card Grid

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

## Try It Yourself

### Exercise 1: Product Card

Build a product card with:

- Product image
- Name and price
- Rating stars
- Add to cart button

### Exercise 2: Article Card

Build an article card with:

- Cover image
- Title and excerpt
- Author avatar and name
- Read time and date

### Exercise 3: Profile Card

Build a user profile card with:

- Avatar image
- Name and bio
- Stats (followers, posts)
- Follow button

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "card-component-quiz",
  "type": "multiple-choice",
  "title": "Building a Card Component",
  "description": "Test your understanding of card component design.",
  "difficulty": "medium",
  "question": "How should you handle a card that links to a detail page?",
  "options": [
    {
      "id": "a",
      "text": "Wrap the entire card in an <a> tag",
      "isCorrect": false,
      "explanation": "This can cause issues with nested interactive elements and makes the link target unclear."
    },
    {
      "id": "b",
      "text": "Use a heading link with a pseudo-element to stretch the clickable area, keeping other interactions separate",
      "isCorrect": true,
      "explanation": "Correct! This pattern uses CSS to expand the link's click area while keeping the link semantically on the title, and allows other buttons/links inside the card to remain independent."
    },
    {
      "id": "c",
      "text": "Add onClick to the card div and use JavaScript navigation",
      "isCorrect": false,
      "explanation": "This loses link semantics (no right-click menu, no keyboard navigation, bad for SEO)."
    },
    {
      "id": "d",
      "text": "Cards shouldn't be clickable—only buttons inside should be",
      "isCorrect": false,
      "explanation": "Clickable cards are a valid and common pattern when done accessibly."
    }
  ]
}
-->

## Key Takeaways

- Cards group related content in flexible containers
- Use semantic HTML (`<article>` for standalone content)
- Build with flexible internal structure
- Provide variants for different contexts
- Handle content overflow gracefully
- Make interactive cards accessible

## Next Steps

Continue to [Building a Modal](./04-building-a-modal.md) →
