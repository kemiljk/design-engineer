# Component Thinking

> **Quick Summary:** Components are the building blocks of modern UIs—self-contained, reusable pieces that combine to create complete interfaces.

## What You'll Learn

- The component mental model
- Breaking designs into components
- Component anatomy and structure
- Planning before building

## The Component Model

Modern frontend development is component-based. Instead of building pages, you build components that compose into pages.

A component is:
- **Self-contained:** Has its own HTML, CSS, and behavior
- **Reusable:** Can be used in multiple places
- **Composable:** Can contain other components
- **Configurable:** Adapts through properties

## Breaking Down a UI

When you see a design, practice decomposition:

### Example: Card Grid

A grid of product cards breaks down into:
```
ProductGrid (organism)
├── ProductCard (molecule)
│   ├── ProductImage (atom)
│   ├── ProductTitle (atom)
│   ├── ProductPrice (atom)
│   └── AddToCartButton (atom)
```

### Identifying Components

Look for:
- **Repetition:** Same structure repeated = component
- **Independence:** Can exist on its own = component
- **Reusability:** Used elsewhere = component
- **Complexity:** Getting complex = break into smaller components

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
Basic building blocks:
- Buttons
- Inputs
- Labels
- Icons

### Composite Components (Molecules)
Combinations of atoms:
- Form fields (label + input + error)
- Search bars (input + button)
- Navigation items (icon + text)

### Feature Components (Organisms)
Complete features:
- Navigation headers
- Comment threads
- Product cards
- Modal dialogs

### Layout Components
Structure without content:
- Page layouts
- Grid containers
- Stack components

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

## Try It Yourself

### Exercise 1: Component Decomposition

Take a complex UI (Twitter feed, Amazon product page, etc.):
1. Identify all components
2. Categorize as atom/molecule/organism
3. Draw the component tree

### Exercise 2: Component Planning

For a "user profile card" component, plan:
1. Required data
2. Optional data
3. All possible states
4. Variations needed

### Exercise 3: Naming

Practice naming components. Names should be:
- Descriptive
- Consistent
- Following conventions

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

- Components are self-contained, reusable UI pieces
- Break interfaces into atoms, molecules, and organisms
- Plan before building: data, states, variations
- Good component design enables composition and reuse
- Naming matters for maintainability

## Next Steps

Continue to [Building a Button](./02-building-a-button.md) →
