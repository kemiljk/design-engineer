# Documentation for Devs

> **Quick Summary:** Good documentation helps developers use components correctly. It should be accurate, complete, and easy to find.

## What You'll Learn

- What should be documented for each component
- Code examples and common usage patterns
- Interactive documentation using storybook
- Strategies for keeping documentation accurate and up to date as your codebase evolves

## Component Documentation Structure

### Overview

Buttons are used to trigger actions such as form submissions, confirmations, and other important interactions. They should be used for primary actions in forms, call-to-action (CTA) buttons in hero sections, and for confirmations within dialogs. Conversely, buttons should not be used for navigation, where links are more appropriate, nor for low-emphasis actions that could be handled by text buttons.

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

## Guidelines

### Best Practices

When using primary buttons, ensure they are reserved for the main action on a page and include clear, descriptive text. It is also vital to ensure that all button variants maintain sufficient colour contrast for accessibility.

### Things to Avoid

Avoid using multiple primary buttons in close proximity, as this can confuse the user's primary path. You should also steer clear of vague text such as "Click here"—always describe the action being taken—and never use button elements for purely navigational purposes.

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

- Documentation should clearly state what each component is, when to use it, and how to implement it
- Provide copy-and-paste code examples
- Use tools like storybook for interactive documentation
- Include clear usage guidelines
- Keep documentation in sync with the underlying code

## Next Steps

Continue to [Versioning and Releases](./05-versioning-and-releases.md) →
