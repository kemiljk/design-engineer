# Component Thinking

> **Quick Summary:** Components are the building blocks of modern UIs—self-contained, reusable pieces that combine to create complete interfaces.

## What You'll Learn

In this lesson, we will introduce the component mental model and show you how to break designs into individual components. You will learn the anatomy and structure of a component, and how to plan effectively before you start building.

## The Component Model

Modern frontend development is component-based. Instead of building pages, you build components that compose into pages.

A component is self-contained, meaning it encapsulates its own HTML, CSS, and behaviour. It is reusable, so it can be employed in multiple places across your application. It is composable, allowing it to contain and work alongside other components. Finally, it is configurable, adapting through properties that you pass in.

## Vanilla JS vs. React Components

Throughout this module, we'll show you both approaches:

**Vanilla HTML/CSS/JS** teaches you the fundamentals—semantic HTML, CSS styling, and DOM manipulation. These skills transfer everywhere.

**React** gives you true component superpowers—declarative UI, automatic re-rendering, props, state, and composition patterns that would be cumbersome to build from scratch.

### Why Both?

Understanding vanilla implementation helps you debug framework issues, work with legacy code, and truly appreciate what frameworks do on your behalf.

Using React helps you build faster with less code, manage complex state automatically, and create truly reusable component libraries.

In production, most teams use React (or Vue, Svelte, etc.). But knowing the underlying principles makes you a better developer regardless of which framework you choose.

## Breaking Down a UI

When you see a design, practice decomposition:

### Example: Card Grid

A grid of product cards breaks down into:
```text
ProductGrid (organism)
├── ProductCard (molecule)
│   ├── ProductImage (atom)
│   ├── ProductTitle (atom)
│   ├── ProductPrice (atom)
│   └── AddToCartButton (atom)
```

### Identifying Components

Look for these signals: repetition (the same structure appearing multiple times), independence (something that can exist on its own), reusability (an element used in other contexts), and complexity (when an area is getting too complex, break it into smaller pieces).

## Component Anatomy

Every component has:

### Template/Structure (HTML)
The markup that defines structure.

### Styles (CSS)
The visual presentation.

### Behavior (JavaScript)
Interactivity and state management.

### Interface (Props/API)
How the component receives data and configuration.

## Component Categories

### UI Components (Atoms)

Basic building blocks such as buttons, inputs, labels, and icons.

### Composite Components (Molecules)

Combinations of atoms such as form fields (label + input + error), search bars (input + button), and navigation items (icon + text).

### Feature Components (Organisms)

Complete features such as navigation headers, comment threads, product cards, and modal dialogs.

### Layout Components

Components that provide structure without content, including page layouts, grid containers, and stack components.

## Planning Components

Before coding, plan:

1. **What data does it need?**
   - Required props
   - Optional props
   - Default values

2. **What states can it be in?**
   - Default
   - Loading
   - Error
   - Empty
   - Interactive states

3. **What variations exist?**
   - Sizes
   - Variants
   - Themes

4. **How will it compose?**
   - What goes inside it?
   - Where does it go?

## Components in Practice: A Preview

Here's the same button component in vanilla JS versus React:

### Vanilla JavaScript

```javascript
function createButton({ variant = 'primary', size = 'medium', label }) {
  const button = document.createElement('button');
  button.className = `button button--${variant} button--${size}`;
  button.textContent = label;
  return button;
}

// Usage
const container = document.getElementById('app');
container.appendChild(createButton({ label: 'Click me' }));
```

### React

```jsx
function Button({ variant = 'primary', size = 'medium', children }) {
  return (
    <button className={`button button--${variant} button--${size}`}>
      {children}
    </button>
  );
}

// Usage
<Button variant="primary">Click me</Button>
```

Notice how React's declarative syntax reads more like HTML? You describe *what* you want, not *how* to create it. The framework handles DOM updates automatically when props or state change.

In the following lessons, we'll build each component both ways so you understand the fundamentals and the framework patterns.

## Try It Yourself

### Exercise 1: Component Decomposition

Take a complex UI such as a Twitter feed or an Amazon product page, identify all the components, categorise each as an atom, molecule, or organism, and draw the component tree.

### Exercise 2: Component Planning

For a "user profile card" component, plan out the required data, optional data, all possible states, and any variations that might be needed.

### Exercise 3: Naming

Practise naming components. Names should be descriptive, consistent, and follow established conventions.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "component-thinking-quiz",
  "type": "multiple-choice",
  "title": "Component Thinking",
  "description": "Test your understanding of component architecture.",
  "difficulty": "easy",
  "question": "What is the main benefit of building UIs with components?",
  "options": [
    {
      "id": "a",
      "text": "Components always load faster than regular HTML",
      "isCorrect": false,
      "explanation": "Component architecture doesn't inherently improve load time."
    },
    {
      "id": "b",
      "text": "Reusability, consistency, and easier maintenance through encapsulated, composable pieces",
      "isCorrect": true,
      "explanation": "Correct! Components encapsulate logic and styling, can be reused across the app, ensure consistency, and make changes easier—update one component to update everywhere."
    },
    {
      "id": "c",
      "text": "You don't need CSS when using components",
      "isCorrect": false,
      "explanation": "Components still need styling. They just encapsulate it with their logic."
    },
    {
      "id": "d",
      "text": "Components work without JavaScript",
      "isCorrect": false,
      "explanation": "Most component patterns rely on JavaScript frameworks."
    }
  ]
}
-->

## Key Takeaways

To recap, components are self-contained, reusable UI pieces. You should break interfaces into atoms, molecules, and organisms, and plan before building by considering data, states, and variations. Good component design enables composition and reuse, and naming matters greatly for maintainability. Vanilla JS teaches you the fundamentals, while React provides declarative, composable patterns—understanding both makes you a more versatile developer.

## Next Steps

Continue to [Building a Button](./02-building-a-button.md) →
