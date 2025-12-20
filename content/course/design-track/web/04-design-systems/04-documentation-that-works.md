# Documentation That Works

> **Quick Summary:** Documentation is the interface between your design system and its users. Without good docs, even great components go unused.

## What You'll Learn

- Why documentation matters for adoption
- What to document and how
- Writing for different audiences
- Keeping documentation current

## The Documentation Problem

Many design systems fail not because the components are bad, but because people can't figure out how to use them.

Signs of documentation problems:
- Repeated questions about basic usage
- People recreating existing components
- Inconsistent usage across teams
- Abandonment in favor of custom solutions

Good documentation is a competitive advantage. It's the difference between "we have a design system" and "we use a design system."

## Audiences and Their Needs

Documentation serves multiple audiences with different needs:

### Designers

**What they need:**
- When to use each component
- What variants exist
- How to find and use in design tools
- Guidelines for proper usage

**How to serve them:**
- Visual examples
- Do's and don'ts with images
- Links to design tool assets
- Design rationale

### Developers

**What they need:**
- How to install and import
- API reference (props, types)
- Code examples
- Accessibility requirements

**How to serve them:**
- Copy-able code snippets
- Prop tables
- Implementation notes
- Framework-specific guidance

### Product Managers / Stakeholders

**What they need:**
- What's available
- What's coming
- System status

**How to serve them:**
- Component overview pages
- Roadmap visibility
- Release notes

## What to Document

### Component Documentation

Each component needs:

**Overview**
- What is this component?
- When should you use it?
- What problem does it solve?

**Examples**
- Basic usage
- All variants
- Common configurations
- Real-world contexts

**Properties / API**
- Property names
- Types
- Default values
- Descriptions

**Guidelines**
- Do's and don'ts
- Best practices
- Common mistakes

**Accessibility**
- Keyboard interaction
- Screen reader behavior
- ARIA requirements
- Focus management

**Related Components**
- Alternatives to consider
- Components that work together
- Migration from deprecated components

### Token Documentation

For design tokens:

**Value Reference**
- All token names and values
- Visual swatches for colors
- Examples for spacing

**Usage Guidelines**
- When to use which token
- How tokens relate (semantic references primitive)
- Theming implications

### Pattern Documentation

For patterns (solutions to common problems):

**Problem Statement**
- What challenge does this pattern address?

**Solution**
- How the pattern works
- Components involved
- Layout and structure

**Examples**
- Live examples or prototypes
- Different applications

**Considerations**
- When to use
- When not to use
- Accessibility implications

## Writing Effective Documentation

### Be Scannable

Users skim. Make it easy:
- Clear headings
- Bullet points
- Tables for structured data
- Highlighted key information

**Bad:**
> The Button component can be configured with several different variants including primary which should be used for main actions, secondary which works well for supporting actions, ghost for very low emphasis situations, and danger for destructive actions.

**Good:**
> **Variants:**
> - **Primary:** Main actions
> - **Secondary:** Supporting actions  
> - **Ghost:** Low emphasis
> - **Danger:** Destructive actions

### Show, Don't Tell

Visual examples communicate faster than descriptions:
- Interactive examples where possible
- Screenshots when interactive isn't feasible
- Before/after comparisons
- Do/don't side-by-sides

### Start with Why

Before explaining how, explain when:

**Before:**
> To create a primary button, pass `variant="primary"` to the Button component.

**After:**
> Use primary buttons for the main action on a page. There should typically be only one primary button visible at a time.
>
> `<Button variant="primary">Save Changes</Button>`

### Provide Context

Don't just document components in isolation. Show them working together:

```jsx
<Card>
  <CardHeader>
    <Avatar src={user.photo} />
    <CardTitle>{user.name}</CardTitle>
  </CardHeader>
  <CardContent>
    {user.bio}
  </CardContent>
  <CardActions>
    <Button variant="primary">Follow</Button>
    <Button variant="ghost">Message</Button>
  </CardActions>
</Card>
```

### Address Common Questions

Documentation should answer questions before they're asked:
- "What if my content is longer than expected?"
- "How does this work on mobile?"
- "What happens when I combine these props?"

FAQ sections or inline notes help.

## Documentation Formats

### Component Pages

Dedicated pages per component:
- All information in one place
- Deep dives possible
- Searchable

### Storybook (or Similar)

Living documentation with interactive examples:
- See real components
- Try different props
- View code
- Test responsiveness

### API Reference

Generated documentation from code:
- Always accurate (generated from source)
- Complete prop coverage
- Type information

### Wiki / Knowledge Base

Guidelines and decisions:
- Design principles
- Contribution guidelines
- ADRs (Architecture Decision Records)

## Keeping Docs Current

Outdated documentation is worse than no documentation—it misleads.

### Documentation as Part of Process

- PRs don't merge without doc updates
- Component changes include doc changes
- "Done" includes "documented"

### Review and Audit

- Regular review cycles
- Check for deprecated content
- Verify examples still work
- Update screenshots

### User Feedback Loop

- Track documentation questions
- Identify gaps from support requests
- Let users suggest improvements

### Automate What You Can

- Generate API docs from types
- Test code examples in CI
- Flag broken links
- Detect outdated screenshots

## Documentation Structure

### Site Organization

```
/
├── Getting Started
│   ├── Introduction
│   ├── Installation
│   └── Usage
├── Foundation
│   ├── Colors
│   ├── Typography
│   ├── Spacing
│   └── Icons
├── Components
│   ├── Button
│   ├── Input
│   ├── Card
│   └── ...
├── Patterns
│   ├── Forms
│   ├── Navigation
│   └── ...
└── Resources
    ├── Design Assets
    ├── Release Notes
    └── Contributing
```

### Component Page Structure

```
# Button

Overview paragraph

## Examples
[Interactive examples]

## Usage Guidelines
When to use, when not to use

## Properties
[Props table]

## Variants
[Variant examples]

## Accessibility
[A11y requirements]

## Related
[Related components]
```

## Try It Yourself

### Exercise 1: Documentation Audit

Review documentation for a component in an existing system:
1. Is it clear when to use this component?
2. Are all variants documented?
3. Are there code examples?
4. Is accessibility covered?
5. What's missing?

### Exercise 2: Write Component Docs

Document a simple component (like a Badge) including:
1. Overview (50 words)
2. When to use / when not to use
3. All variants with examples
4. Properties table
5. One "Do" and one "Don't"

### Exercise 3: Improve Existing Docs

Take documentation you've written or own. Apply the principles from this lesson:
1. Make it more scannable
2. Add a visual example
3. Lead with "why"
4. Address a common question

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "documentation-quiz",
  "type": "multiple-choice",
  "title": "Effective Documentation",
  "description": "Test your understanding of documentation best practices.",
  "difficulty": "easy",
  "question": "What is the most important first piece of information to include in component documentation?",
  "options": [
    {
      "id": "a",
      "text": "The full API reference with all props and types",
      "isCorrect": false,
      "explanation": "API reference is important but not the first thing users need—they first need to know if this is the right component."
    },
    {
      "id": "b",
      "text": "When and why to use this component (starting with 'why')",
      "isCorrect": true,
      "explanation": "Correct! Before explaining how to use a component, explain when to use it. Users need to know if this component solves their problem before diving into the API."
    },
    {
      "id": "c",
      "text": "Installation instructions and import statements",
      "isCorrect": false,
      "explanation": "Installation is important for getting started, but users first need to know if this component is right for their use case."
    },
    {
      "id": "d",
      "text": "Code examples showing all possible configurations",
      "isCorrect": false,
      "explanation": "Examples are valuable but overwhelming upfront. Start with the 'why' before showing all the 'how'."
    }
  ]
}
-->

## Key Takeaways

- Documentation is critical for adoption—without it, systems go unused
- Different audiences (designers, developers, PMs) need different things
- Document: overview, examples, API, guidelines, accessibility, related
- Write scannably, show don't tell, start with why, provide context
- Keep docs current: integrate into process, review regularly, automate
- Structure documentation for both discovery and reference

## Next Steps

Continue to [Maintaining and Evolving](./05-maintaining-and-evolving.md) →
