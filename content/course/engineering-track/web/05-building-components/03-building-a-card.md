# Building a Card

> **Quick Summary:** Cards are versatile container components that group related content. Building them teaches composition and flexibility.

## What You'll Learn

- Card structure and composition
- Flexible layouts within cards
- How to handle various content types
- Techniques for making cards interactive

## Card Anatomy

A card typically contains a media area (image or video), a header (title and subtitle), content (description and metadata), and actions (buttons or links). All of these sections are optional; cards adapt to whatever content they contain.

<!-- visual-example: card-showcase-demo -->

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

---

## React Version

In React, cards become composable components that accept props and children:

### Basic Card Component

```jsx
// Card.jsx
function Card({ variant = 'default', interactive = false, className, children }) {
  const variants = {
    default: '',
    elevated: 'card--elevated',
    outlined: 'card--outlined',
  };

  return (
    <article 
      className={`card ${variants[variant]} ${interactive ? 'card--interactive' : ''} ${className ?? ''}`}
    >
      {children}
    </article>
  );
}

function CardMedia({ src, alt, aspectRatio = '16/9' }) {
  return (
    <div className="card__media" style={{ aspectRatio }}>
      <img src={src} alt={alt} />
    </div>
  );
}

function CardBody({ children }) {
  return <div className="card__body">{children}</div>;
}

function CardTitle({ children, clamp = false }) {
  return (
    <h3 className={`card__title ${clamp ? 'card__title--clamp' : ''}`}>
      {children}
    </h3>
  );
}

function CardDescription({ children, clamp = false }) {
  return (
    <p className={`card__description ${clamp ? 'card__description--clamp' : ''}`}>
      {children}
    </p>
  );
}

function CardActions({ children }) {
  return <div className="card__actions">{children}</div>;
}

export { Card, CardMedia, CardBody, CardTitle, CardDescription, CardActions };
```

### Usage Examples

```jsx
import { Card, CardMedia, CardBody, CardTitle, CardDescription, CardActions } from './Card';
import Button from './Button';

// Basic product card
function ProductCard({ product }) {
  return (
    <Card variant="elevated">
      <CardMedia src={product.image} alt={product.name} />
      <CardBody>
        <CardTitle clamp>{product.name}</CardTitle>
        <CardDescription clamp>{product.description}</CardDescription>
        <p className="card__price">£{product.price}</p>
      </CardBody>
      <CardActions>
        <Button variant="primary">Add to Cart</Button>
      </CardActions>
    </Card>
  );
}

// Horizontal article card
function ArticleCard({ article }) {
  return (
    <Card variant="outlined" className="card--horizontal">
      <CardMedia src={article.coverImage} alt="" aspectRatio="1/1" />
      <CardBody>
        <CardTitle>{article.title}</CardTitle>
        <CardDescription clamp>{article.excerpt}</CardDescription>
        <div className="card__meta">
          <span>{article.author}</span>
          <span>{article.readTime} min read</span>
        </div>
      </CardBody>
    </Card>
  );
}

// Grid of cards
function ProductGrid({ products }) {
  return (
    <div className="card-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Interactive Card with Link

```jsx
import { Link } from 'react-router-dom'; // or Next.js Link

function LinkCard({ href, children }) {
  return (
    <Card interactive>
      <Link to={href} className="card__link">
        <span className="sr-only">View details</span>
      </Link>
      {children}
    </Card>
  );
}

// Usage
<LinkCard href={`/products/${product.id}`}>
  <CardMedia src={product.image} alt={product.name} />
  <CardBody>
    <CardTitle>{product.name}</CardTitle>
  </CardBody>
</LinkCard>
```

### With TypeScript

```tsx
// Card.tsx
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface CardMediaProps {
  src: string;
  alt: string;
  aspectRatio?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  clamp?: boolean;
}

function Card({ variant = 'default', interactive = false, className, children }: CardProps) {
  return (
    <article 
      className={`card card--${variant} ${interactive ? 'card--interactive' : ''} ${className ?? ''}`}
    >
      {children}
    </article>
  );
}

// ... other typed components
```

### Why Composition Works

React's composition model shines with cards:

```jsx
// Flexible - use only what you need
<Card>
  <CardBody>
    <CardTitle>Simple card</CardTitle>
  </CardBody>
</Card>

// Full-featured - all slots filled
<Card variant="elevated">
  <CardMedia src="..." alt="..." />
  <CardBody>
    <CardTitle>Rich card</CardTitle>
    <CardDescription>With all the details</CardDescription>
  </CardBody>
  <CardActions>
    <Button>Action</Button>
  </CardActions>
</Card>
```

No need for complex conditional props—consumers compose what they need.

## Try It Yourself

### Exercise 1: Product Card

Build a product card featuring a product image, name and price, rating stars, and an "Add to cart" button.

### Exercise 2: Article Card

Build an article card that includes a cover image, title and excerpt, author avatar and name, plus read time and publication date.

### Exercise 3: Profile Card

Build a user profile card containing an avatar image, name and bio, stats such as followers and posts, and a follow button.

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

- To recap, cards group related content in flexible containers
- provide variants for different contexts
- provide variants for different contexts
- Handle content overflow gracefully and ensure interactive cards remain accessible
- React enables true composition with sub-components like `CardMedia` and `CardBody`
- by letting consumers compose only what they need, you create a highly flexible system
- by letting consumers compose only what they need, you create a highly flexible system

## Next Steps

Continue to [Building a Modal](./04-building-a-modal.md) →
