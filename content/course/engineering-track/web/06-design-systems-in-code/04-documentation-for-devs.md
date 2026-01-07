# Documentation for Devs

> **Quick Summary:** Good documentation helps developers use components correctly. It should be accurate, complete, and easy to find.

## What You'll Learn

- What to document for each component
- Code examples and usage patterns
- Living documentation with Storybook
- Keeping docs up to date

## Component Documentation Structure

### Overview

```markdown
# Button

Buttons trigger actions. Use them for form submissions, 
confirmations, and important interactions.

## When to use
- Primary actions in forms
- CTAs in hero sections
- Confirmations in dialogs

## When not to use
- Navigation (use links)
- Low-emphasis actions (use links or text buttons)
```

### Props Table

```markdown
## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'ghost' | 'primary' | Visual style |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| disabled | boolean | false | Disables interaction |
| children | ReactNode | - | Button content |
```

### Examples

```markdown
## Examples

### Basic usage
\`\`\`jsx
<Button>Click me</Button>
\`\`\`

### With variants
\`\`\`jsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
\`\`\`

### With icons
\`\`\`jsx
<Button leftIcon={<Icon />}>With Icon</Button>
\`\`\`
```

## Storybook Integration

```javascript
// Button.stories.js
export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'ghost'],
      control: { type: 'select' }
    }
  }
};

export const Primary = {
  args: {
    children: 'Primary Button',
    variant: 'primary'
  }
};

export const AllVariants = () => (
  <>
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
  </>
);
```

## Do's and Don'ts

```markdown
## Guidelines

### ✅ Do
- Use primary buttons for main actions
- Include clear action text
- Ensure sufficient colour contrast

### ❌ Don't
- Use multiple primary buttons together
- Use vague text like "Click here"
- Use buttons for navigation
```

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "dev-docs-quiz",
  "type": "multiple-choice",
  "title": "Documentation for Developers",
  "description": "Test your understanding of effective developer documentation.",
  "difficulty": "easy",
  "question": "What type of documentation helps developers most when using a component?",
  "options": [
    {
      "id": "a",
      "text": "Long paragraphs explaining the design philosophy",
      "isCorrect": false,
      "explanation": "Developers often want to get started quickly—philosophy can come later."
    },
    {
      "id": "b",
      "text": "Copy-able code examples for common use cases with props tables",
      "isCorrect": true,
      "explanation": "Correct! Developers learn by example. Working code snippets they can copy and modify, combined with clear props reference, gets them productive fastest."
    },
    {
      "id": "c",
      "text": "Screenshots showing all visual variants",
      "isCorrect": false,
      "explanation": "Screenshots help designers—developers need code examples."
    },
    {
      "id": "d",
      "text": "Links to the original design files",
      "isCorrect": false,
      "explanation": "Design files are helpful context but don't help developers implement."
    }
  ]
}
-->

## Key Takeaways

- Document what, when to use, and how
- Provide copy-paste code examples
- Use tools like Storybook for interactive docs
- Include do's and don'ts
- Keep docs updated with code

## Next Steps

Continue to [Versioning and Releases](./05-versioning-and-releases.md) →
