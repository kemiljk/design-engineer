# Component Architecture

> **Quick Summary:** Well-architected components are composable, flexible, and maintainable—they scale with your system instead of becoming technical debt.

## What You'll Learn

- Principles of good component architecture
- Building component variants and states
- Composition patterns for complex components
- Planning for flexibility and evolution

## Principles of Component Architecture

### Single Responsibility

Each component should do one thing well:

**Good:** A Button component handles button rendering and interactions.

**Bad:** A Button component also handles form submission logic, analytics tracking, and tooltip positioning.

If a component does too much, split it.

### Composability

Components should combine to create larger patterns:

```
Page
├── Header
│   ├── Logo
│   ├── Navigation
│   │   ├── NavItem
│   │   └── NavItem
│   └── UserMenu
│       └── Avatar
├── Main
│   └── CardGrid
│       ├── Card
│       │   ├── CardImage
│       │   ├── CardContent
│       │   └── CardActions
│       └── ...
└── Footer
```

Each piece is independent but works together.

### Flexibility Without Bloat

Components should handle real needs without becoming swiss-army-knife monsters.

**Too rigid:** Button only works one way.
**Too flexible:** Button has 47 props, most unused.
**Just right:** Button handles common cases elegantly, extends when needed.

### Consistency

Similar components should work similarly:

- All interactive components have hover/active/focus states
- All inputs handle error states the same way
- All spacing uses the same scale

Consistency reduces learning curve and maintenance burden.

## Designing Component Variants

Variants are predefined configurations for different use cases.

### Identifying Variants

Ask:
- What are the common use cases?
- What variations are semantically different?
- What needs visual differentiation?

**Button variants:**
- Primary (main action)
- Secondary (supporting action)
- Ghost (low emphasis)
- Danger (destructive action)

**Card variants:**
- Default (standard appearance)
- Elevated (prominent, with shadow)
- Outlined (bordered, no fill)

### Variant vs. Prop

Use variants for semantically different configurations:
```
<Button variant="primary">  // This IS different
<Button variant="danger">   // From this
```

Use props for customisation within a variant:
```
<Button variant="primary" size="lg" disabled>
```

### Size Variants

Most components need size variations:
- **Small:** Dense UIs, secondary actions
- **Medium:** Default size
- **Large:** Prominent placement, touch targets

Define sizes consistently across components:
- Button small = Input small = same height
- Icon sizes align with text sizes

## Designing Component States

States reflect the component's current condition.

<!-- illustration: component-states -->

### Interactive States

For interactive elements (buttons, links, inputs):

**Default:** Normal resting state
**Hover:** Mouse over (desktop)
**Focus:** Keyboard focus (accessibility critical)
**Active:** Being pressed/clicked
**Disabled:** Cannot interact

### Data States

For data-displaying elements:

**Empty:** No data to show
**Loading:** Fetching data
**Error:** Something went wrong
**Success:** Operation completed
**Partial:** Some data, loading more

### Validation States

For form inputs:

**Default:** Normal state
**Valid:** Input passed validation
**Invalid:** Input failed validation
**Warning:** Input is acceptable but concerning

### State Combinations

States can combine:
- Disabled + hover (show it's disabled but hoverable)
- Loading + disabled (prevent interaction while loading)

Design for realistic combinations.

## Composition Patterns

### Slots

Define areas where content can be inserted:

```
Card
├── [Media slot]       ← Image, video, or graphic
├── [Header slot]      ← Title, subtitle
├── [Content slot]     ← Main content
└── [Actions slot]     ← Buttons, links
```

Each slot is optional. The component adapts.

### Compound Components

Related components that work together:

```
<Select>
  <SelectTrigger />
  <SelectContent>
    <SelectItem>Option 1</SelectItem>
    <SelectItem>Option 2</SelectItem>
  </SelectContent>
</Select>
```

The parent provides context; children provide content.

### Layout Components

Components that arrange other components:

```
<Stack direction="vertical" gap="md">
  <ComponentA />
  <ComponentB />
  <ComponentC />
</Stack>
```

Layout components separate structure from content.

### Render Props / Slots

Let consumers customise rendering:

```
<DataTable
  data={items}
  renderRow={(item) => (
    <TableRow>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.status}</TableCell>
    </TableRow>
  )}
/>
```

This provides flexibility without bloating the component.

## Component API Design

The "API" is how consumers interact with your component.

### Props (Design Side: Properties)

**What can be customised?**
- Variants
- Sizes
- States
- Content
- Behavior

**How are they named?**
- Consistent with other components
- Intuitive meaning
- Boolean for on/off, enum for choices

### Default Values

Set sensible defaults:
- Most common usage should require minimal props
- Defaults should be the "safe" option

```
Button
├── variant: "primary" (default)
├── size: "medium" (default)
├── disabled: false (default)
└── loading: false (default)
```

### Required vs Optional

- **Required:** Content that the component can't function without
- **Optional:** Customizations that have reasonable defaults

## Documentation Structure

Each component needs documentation:

### Overview

- What is this component?
- When should you use it?
- When should you use something else?

### Usage Examples

- Basic usage
- With variants
- With different content
- In context with other components

### Properties

- Property name
- Type (string, boolean, enum)
- Default value
- Description

### Do's and Don'ts

- Do: Use primary buttons for main actions
- Don't: Use more than one primary button per section
- Do: Always include accessible labels
- Don't: Disable buttons without explanation

### Accessibility

- Keyboard behaviour
- Screen reader announcements
- Required ARIA attributes
- Focus management

## Planning for Evolution

Components will change. Plan for it:

### Versioning Strategy

- Minor changes: Add props, add variants
- Breaking changes: Major version bump

### Deprecation Process

1. Mark as deprecated (with warning)
2. Provide migration path
3. Remove in future major version

### Extensibility Points

Build in points where behaviour can be extended:
- Custom styling hooks
- Event callbacks
- Render customisation

## Try It Yourself

### Exercise 1: Component Specification

For a notification/toast component, specify:
1. Variants (types of notifications)
2. All possible states
3. Required properties
4. Optional properties
5. Slots or customisation points

### Exercise 2: Composition Design

Design a comment system using composition:
1. Identify the smallest components (atoms)
2. Combine into molecules
3. Combine into the full comment thread organism
4. Draw the hierarchy

### Exercise 3: API Review

Review an existing component in your project:
1. Is the API consistent with similar components?
2. Are defaults sensible?
3. Is required/optional appropriate?
4. What would you change?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "component-architecture-quiz",
  "type": "multiple-choice",
  "title": "Component Architecture",
  "description": "Test your understanding of good component architecture principles.",
  "difficulty": "medium",
  "question": "A Button component handles button rendering, form submission logic, analytics tracking, and tooltip positioning. What principle does this violate?",
  "options": [
    {
      "id": "a",
      "text": "Composability—buttons should be able to combine with other components",
      "isCorrect": false,
      "explanation": "While composability is important, this component's issue is more fundamental."
    },
    {
      "id": "b",
      "text": "Consistency—different buttons should work the same way",
      "isCorrect": false,
      "explanation": "Consistency is about similar components working similarly, not about a single component's scope."
    },
    {
      "id": "c",
      "text": "Single Responsibility—each component should do one thing well",
      "isCorrect": true,
      "explanation": "Correct! A Button should handle button rendering and interactions. Form submission, analytics, and tooltips should be separate concerns—either in parent components or as separate utilities."
    },
    {
      "id": "d",
      "text": "Flexibility—components should handle common cases elegantly",
      "isCorrect": false,
      "explanation": "Flexibility is about avoiding both rigidity and bloat—this component has too much responsibility, which is a different issue."
    }
  ]
}
-->

## Key Takeaways

- Good architecture: single responsibility, composable, flexible, consistent
- Variants are semantically different configurations
- States reflect current conditions (interactive, data, validation)
- Composition patterns: slots, compound components, layout components
- API design: clear props, sensible defaults, minimal required
- Documentation is essential: overview, examples, props, guidelines
- Plan for evolution: versioning, deprecation, extensibility

## Next Steps

Continue to [Documentation That Works](./04-documentation-that-works.md) →
