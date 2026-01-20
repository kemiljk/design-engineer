# Versioning and Releases

> **Quick Summary:** Proper versioning communicates changes and helps teams upgrade safely. Semantic versioning is the standard.

## What You'll Learn

In this lesson, we will cover the principles of semantic versioning (SemVer) and how to write clear, effective changelogs. You will learn strategies for managing breaking changes and understand the steps involved in a professional release process.

## Semantic Versioning

**MAJOR.MINOR.PATCH** (e.g., 2.1.3)

### PATCH (2.1.3 → 2.1.4)

A patch release is for bug fixes that do not change the API. Examples include fixing a button hover colour, correcting a modal focus trap, or addressing an accessibility issue.

### MINOR (2.1.3 → 2.2.0)

A minor release introduces new features in a backwards-compatible manner. This might involve adding a new button variant, introducing a size prop to the Avatar component, or creating an entirely new Card component.

### MAJOR (2.1.3 → 3.0.0)

A major release signals breaking changes that require consumers to update their code. These changes often involve removing deprecated props, altering a component's API, or renaming components entirely.

## Changelog Format

```markdown
# Changelog

## [2.2.0] - 2024-03-15

### Added
- New `ghost` variant for Button component
- `loading` prop for Button
- Avatar component

### Changed
- Updated primary colour to improve contrast

### Deprecated
- `outline` variant (use `ghost` instead)

### Fixed
- Button focus ring not visible on dark backgrounds
- Modal close button accessibility

## [2.1.3] - 2024-03-01

### Fixed
- Card shadow rendering on Safari
```

## Managing Breaking Changes

### Deprecation First

```javascript
// Version 2.x - deprecate
function Button({ outline, ghost, ...props }) {
  if (outline) {
    console.warn('Button: outline prop is deprecated. Use variant="ghost"');
  }
  // Support both temporarily
}

// Version 3.x - remove
function Button({ variant, ...props }) {
  // outline prop no longer works
}
```

### Migration Guide

```markdown
# Migrating to v3

## Button changes

### outline → ghost

Before:
\`\`\`jsx
<Button outline>Click</Button>
\`\`\`

After:
\`\`\`jsx
<Button variant="ghost">Click</Button>
\`\`\`
```

## Release Process

The typical release process involves a series of structured steps. First, you must update the version in your `package.json` file and then update the changelog with all relevant changes. Once documented, create a git tag for the version and publish the package to npm or your chosen registry. Finally, communicate the release clearly to your consumers to ensure they are aware of the new changes.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "versioning-releases-quiz",
  "type": "multiple-choice",
  "title": "Versioning and Releases",
  "description": "Test your understanding of semantic versioning.",
  "difficulty": "medium",
  "question": "In semantic versioning, when do you bump the MAJOR version?",
  "options": [
    {
      "id": "a",
      "text": "When you add new features",
      "isCorrect": false,
      "explanation": "New features that don't break existing usage are MINOR bumps."
    },
    {
      "id": "b",
      "text": "When you make breaking changes that require consumers to update their code",
      "isCorrect": true,
      "explanation": "Correct! MAJOR version bumps signal breaking changes—removed props, changed API signatures, removed components. Consumers know they need to review before upgrading."
    },
    {
      "id": "c",
      "text": "When you fix bugs",
      "isCorrect": false,
      "explanation": "Bug fixes are PATCH bumps."
    },
    {
      "id": "d",
      "text": "Once a year on a schedule",
      "isCorrect": false,
      "explanation": "Version bumps are based on change type, not schedule."
    }
  ]
}
-->

## Key Takeaways

To recap, you should use semantic versioning consistently to communicate the nature of your changes. Ensure all updates are documented in a clear changelog and always deprecate features before removing them entirely. Providing migration guides for breaking changes is essential for helping your users upgrade, and clear communication remains a vital part of every release.

## Congratulations!

You've completed the Engineering Track - Web!

You now have a solid understanding of HTML structure and semantics, CSS styling and layout, and JavaScript fundamentals. You also understand React and component-based UI development, how to build complex components, and how to implement design systems in code.

**Next Steps:**

→ [Convergence Track: Motion and Interaction](../../convergence/web/01-motion-and-interaction/01-why-motion-matters.md) to bring your skills together

→ [Design Track](../../design-track/web/01-foundations/01-what-is-visual-design.md) if you haven't covered design fundamentals
