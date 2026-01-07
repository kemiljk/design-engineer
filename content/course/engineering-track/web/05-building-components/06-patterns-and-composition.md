# Patterns and Composition

> **Quick Summary:** Effective components follow patterns that enable composition, flexibility, and maintainability.

## What You'll Learn

- Component composition patterns
- Slot-based architecture
- Higher-order components
- Best practices for component APIs

## Composition Over Inheritance

Instead of creating specialised components through inheritance, compose simple components:

```html
<!-- Composition -->
<Card>
  <CardHeader>
    <Avatar src="..." />
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardBody>Content</CardBody>
</Card>

<!-- vs. Specialized component -->
<ProfileCard 
  avatar="..."
  title="Title"
  content="Content"
/>
```

Composition is more flexible.

## Slot Pattern

Create components with "slots" for flexible content:

```html
<div class="card">
  <div class="card__header" data-slot="header"></div>
  <div class="card__body" data-slot="body"></div>
  <div class="card__footer" data-slot="footer"></div>
</div>
```

Consumers fill the slots:

```javascript
function Card({ header, body, footer }) {
  return `
    <div class="card">
      ${header ? `<div class="card__header">${header}</div>` : ''}
      <div class="card__body">${body}</div>
      ${footer ? `<div class="card__footer">${footer}</div>` : ''}
    </div>
  `;
}
```

## Compound Components

Related components that work together:

```html
<Tabs>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>Content 1</TabPanel>
    <TabPanel>Content 2</TabPanel>
  </TabPanels>
</Tabs>
```

The parent manages state; children render UI.

## Render Props

Pass rendering control to consumers:

```javascript
function List({ items, renderItem }) {
  return `
    <ul class="list">
      ${items.map(item => `<li>${renderItem(item)}</li>`).join('')}
    </ul>
  `;
}

// Usage
List({
  items: users,
  renderItem: (user) => `
    <div class="user">
      <img src="${user.avatar}" />
      <span>${user.name}</span>
    </div>
  `
});
```

## API Design Principles

### Minimal Required Props

Only require what's essential:

```javascript
// Good - text is only required prop
Button({ text: 'Click' })

// Bad - too many required props
Button({ text: 'Click', size: 'medium', variant: 'primary', type: 'button' })
```

### Sensible Defaults

```javascript
function Button({ 
  text,
  variant = 'primary',
  size = 'medium',
  disabled = false
}) { ... }
```

### Boolean Props for Toggles

```javascript
// Good
<Button primary>Click</Button>
<Button disabled>Click</Button>

// Less good
<Button variant="primary">Click</Button>
<Button isDisabled={true}>Click</Button>
```

### Consistent Naming

If one component uses `onClick`, all should use `onClick` (not `handleClick`, `onPress`, etc.)

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "composition-quiz",
  "type": "multiple-choice",
  "title": "Component Composition",
  "description": "Test your understanding of composition patterns.",
  "difficulty": "medium",
  "question": "What is the 'compound component' pattern?",
  "options": [
    {
      "id": "a",
      "text": "Components that use multiple CSS classes",
      "isCorrect": false,
      "explanation": "Compound components are about component structure, not CSS."
    },
    {
      "id": "b",
      "text": "Related components that share implicit state through a parent context",
      "isCorrect": true,
      "explanation": "Correct! Compound components work together (like Select + SelectOption) sharing state through context, allowing flexible composition while maintaining coordinated behaviour."
    },
    {
      "id": "c",
      "text": "Components that can accept any type of children",
      "isCorrect": false,
      "explanation": "That's flexible children props, not specifically compound components."
    },
    {
      "id": "d",
      "text": "Components with both light and dark mode variants",
      "isCorrect": false,
      "explanation": "Theming is unrelated to the compound component pattern."
    }
  ]
}
-->

## Key Takeaways

- Prefer composition over specialised components
- Use slots for flexible content areas
- Compound components share state
- Render props give consumers control
- Design minimal, consistent APIs
- Provide sensible defaults

## Next Steps

You've completed the Building Components module!

Continue to [Design Systems in Code: Tokens in Code](../06-design-systems-in-code/01-tokens-in-code.md) →
