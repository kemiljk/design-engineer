# Thinking in Components

> **Quick Summary:** Component thinking is the foundation of modern design and development—breaking interfaces into reusable, composable pieces.

## What You'll Learn

- What components are and why they matter
- Atomic design: atoms, molecules, organisms
- How to identify and define components
- The relationship between design components and code components

## The Component Mental Model

A component is a self-contained, reusable piece of UI. Instead of designing entire pages from scratch, you design building blocks that combine to create pages.

This approach:
- **Improves consistency:** The same button looks the same everywhere
- **Speeds up design:** Reuse existing pieces instead of recreating
- **Simplifies maintenance:** Change once, update everywhere
- **Bridges design and code:** Components translate directly to code

If you've used any modern framework (React, Vue, SwiftUI), you're already thinking in components when coding. This lesson applies the same thinking to design.

## Atomic Design

Brad Frost's Atomic Design provides a useful vocabulary for component hierarchy:

<!-- illustration: atomic-design -->

### Atoms

The smallest possible units. They can't be broken down further while remaining functional.

**Examples:**
- Button (single element)
- Input field
- Label
- Icon
- Avatar
- Badge
- Checkbox

Atoms often map to single HTML elements or basic design tool components.

### Molecules

Groups of atoms functioning together as a unit.

**Examples:**
- Form field (label + input + error message)
- Search bar (input + button)
- Navigation item (icon + text)
- Card header (avatar + name + date)

Molecules have a single, focused purpose.

### Organisms

Complex components composed of molecules and atoms, forming distinct sections of UI.

**Examples:**
- Navigation header (logo + nav items + search + profile menu)
- Card (header + content + footer + actions)
- Form (multiple form fields + submit button)
- Comment thread (comment + replies + actions)

Organisms are substantial but still reusable.

### Templates

Page-level layouts showing how organisms combine. Focus on structure, not content.

**Examples:**
- Blog post template
- Dashboard layout
- Settings page structure

### Pages

Specific instances of templates with real content. This is where you see the full design.

## Identifying Components

When looking at a design, how do you break it into components?

### Look for Repetition

Anything that appears multiple times is a component candidate:
- Multiple cards with similar structure
- Repeated navigation patterns
- Consistent button styles
- Similar form layouts

### Look for Independence

Can this element exist on its own? Does it make sense outside its current context?

A button makes sense anywhere. A specific error message might not.

### Look for Encapsulation

Does this element have clear boundaries? Can you draw a box around it?

Components should have defined edges. If boundaries are fuzzy, the component might need rethinking.

### Look for Variability

What changes between instances? These become component variants or props:
- Primary vs. secondary button (variant)
- Different button text (prop)
- With or without icon (option)

## Component Properties

Components aren't static—they adapt through properties:

### Variants

Predefined variations with meaningful differences:
- Button: Primary, Secondary, Ghost, Danger
- Input: Default, Error, Disabled
- Card: Default, Elevated, Outlined

Variants are finite options, not infinite customization.

### States

How the component responds to interaction:
- Default
- Hover
- Active/Pressed
- Focused
- Disabled
- Loading

### Content

The data that fills the component:
- Button text
- Card title and description
- Avatar image

### Options/Slots

Optional additions or removals:
- Icon (left, right, or none)
- Badge count (shown or hidden)
- Actions (included or not)

## Naming Components

Clear names make components findable and understandable:

### Use Descriptive Names

- ✓ `PrimaryButton`
- ✓ `UserAvatar`
- ✓ `NavigationHeader`
- ✗ `Component1`
- ✗ `BlueBox`
- ✗ `NewThing`

### Be Consistent

Choose a naming pattern and stick with it:
- `ButtonPrimary` or `PrimaryButton` — pick one
- `UserCard` or `CardUser` — be consistent across components

### Match Code Conventions

If your codebase uses `Header`, don't call it `NavigationBar` in design. Alignment reduces confusion.

## From Design to Code

Design components should map clearly to code components.

### One-to-One Mapping

Ideally, every design component has a code equivalent:
- Design: `Button/Primary` → Code: `<Button variant="primary">`
- Design: `Card/Elevated` → Code: `<Card elevation={2}>`

### Shared Language

Use the same terminology:
- Design calls it "variant," code calls it "variant"
- Design has "hover state," code handles hover state
- Design tokens match CSS variable names

### Property Alignment

Design component properties should match code props:

```
Design:
- Button
  - Variant: Primary, Secondary
  - Size: Small, Medium, Large
  - Icon: Left, Right, None

Code:
<Button 
  variant="primary"
  size="medium"
  icon={<Icon />}
  iconPosition="left"
/>
```

## Component Documentation

Components need documentation to be useful:

### What to Document

- **Purpose:** What is this component for?
- **Variants:** What variations exist and when to use each?
- **States:** What states does it have?
- **Do's and Don'ts:** Usage guidelines
- **Accessibility:** Any special considerations?

### Keep It Current

Outdated documentation is worse than no documentation. As components evolve, update the docs.

## Try It Yourself

### Exercise 1: Component Breakdown

Take a complex page (like a social media feed or dashboard). Break it down into:
1. Atoms (list at least 10)
2. Molecules (list at least 5)
3. Organisms (list at least 3)

Draw boxes around each level.

### Exercise 2: Component Definition

For a simple component (like a comment), define:
1. Its sub-components (atoms/molecules it contains)
2. Its variants (if any)
3. Its states
4. Its content properties
5. Its optional elements

### Exercise 3: Naming Exercise

You have these components to name:
- A button that opens a dropdown menu
- A card showing a user profile
- A toast notification for errors
- A skeleton loader for content

Propose clear, consistent names following a pattern.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "atomic-design-quiz",
  "type": "multiple-choice",
  "title": "Atomic Design Hierarchy",
  "description": "Test your understanding of component hierarchy.",
  "difficulty": "medium",
  "question": "A search bar consisting of an input field and a search button would be classified as what in Atomic Design?",
  "options": [
    {
      "id": "a",
      "text": "An atom, because it's a single functional unit",
      "isCorrect": false,
      "explanation": "Atoms are the smallest possible units—they can't be broken down further. The search bar contains multiple elements."
    },
    {
      "id": "b",
      "text": "A molecule, because it's a group of atoms functioning together",
      "isCorrect": true,
      "explanation": "Correct! A molecule is a group of atoms (input + button) that work together as a single unit with a focused purpose."
    },
    {
      "id": "c",
      "text": "An organism, because it's a complex interactive component",
      "isCorrect": false,
      "explanation": "Organisms are more complex sections made of molecules and atoms—like a full navigation header."
    },
    {
      "id": "d",
      "text": "A template, because it appears on multiple pages",
      "isCorrect": false,
      "explanation": "Templates are page-level layouts showing how organisms combine, not reusable UI components."
    }
  ]
}
-->

## Key Takeaways

- Components are reusable, self-contained UI pieces
- Atomic design provides hierarchy: atoms → molecules → organisms → templates → pages
- Identify components by looking for repetition, independence, and clear boundaries
- Components have properties: variants, states, content, options
- Clear naming and documentation make components usable
- Design components should map directly to code components

## Next Steps

Continue to [Design Tool Fundamentals](./02-design-tool-fundamentals.md) →
