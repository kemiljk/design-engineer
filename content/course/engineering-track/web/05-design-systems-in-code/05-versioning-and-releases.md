# Versioning and Releases

> **Quick Summary:** Proper versioning communicates changes and helps teams upgrade safely. Semantic versioning is the standard.

## What You'll Learn

- Semantic versioning (SemVer)
- Writing changelogs
- Managing breaking changes
- Release process

## Semantic Versioning

**MAJOR.MINOR.PATCH** (e.g., 2.1.3)

### PATCH (2.1.3 → 2.1.4)

Bug fixes, no API changes:
- Fixed button hover color
- Fixed modal focus trap
- Fixed accessibility issue

### MINOR (2.1.3 → 2.2.0)

New features, backwards compatible:
- Added new button variant
- Added size prop to Avatar
- New Card component

### MAJOR (2.1.3 → 3.0.0)

Breaking changes:
- Removed deprecated props
- Changed component API
- Renamed components

## Changelog Format

```markdown
# Changelog

## [2.2.0] - 2024-03-15

### Added
- New `ghost` variant for Button component
- `loading` prop for Button
- Avatar component

### Changed
- Updated primary color to improve contrast

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

1. **Update version** in package.json
2. **Update changelog** with all changes
3. **Create git tag** for the version
4. **Publish** to npm/registry
5. **Announce** to consumers

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

- Use semantic versioning consistently
- Document all changes in changelog
- Deprecate before removing
- Provide migration guides for breaking changes
- Communicate releases clearly

## Congratulations!

You've completed the Engineering Track - Web!

You now understand:
- HTML structure and semantics
- CSS styling and layout
- JavaScript fundamentals
- Building components
- Design systems in code

**Next Steps:**

→ [Convergence Track: Motion and Interaction](../../convergence/web/01-motion-and-interaction/01-why-motion-matters.md) to bring your skills together

→ [Design Track](../../design-track/web/01-foundations/01-what-is-visual-design.md) if you haven't covered design fundamentals
