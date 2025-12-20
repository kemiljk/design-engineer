# Screen Reader Experience

> **Quick Summary:** Screen readers convert visual interfaces to audio. Understanding how they work helps you build better experiences for all users.

## What You'll Learn

- How screen readers work
- Testing with screen readers
- Common screen reader issues
- Writing effective alternative text

## How Screen Readers Work

Screen readers:
1. Parse the accessibility tree (derived from DOM)
2. Announce element names, roles, and states
3. Provide navigation shortcuts
4. Allow interaction with focusable elements

They don't "see" the visual design—only the semantic structure.

## What Gets Announced

```html
<button>Save</button>
<!-- "Save, button" -->

<a href="/about">About us</a>
<!-- "About us, link" -->

<input type="email" aria-label="Email">
<!-- "Email, edit text" -->

<img src="photo.jpg" alt="Team photo from 2024 retreat">
<!-- "Team photo from 2024 retreat, image" -->
```

## Common Screen Readers

- **VoiceOver** (macOS/iOS) - Built-in, Cmd+F5 to toggle
- **NVDA** (Windows) - Free, popular
- **JAWS** (Windows) - Commercial, widely used
- **TalkBack** (Android) - Built-in

For testing, start with VoiceOver or NVDA.

## Testing Basics

### VoiceOver Quick Start (Mac)

1. Enable: Cmd + F5
2. Navigate: VO key (Ctrl + Option) + arrows
3. Interact: VO + Space
4. Web rotor: VO + U

### What to Check

- [ ] Can you navigate by headings?
- [ ] Are images described?
- [ ] Do form fields have labels?
- [ ] Are buttons and links announced correctly?
- [ ] Do state changes get announced?

## Alternative Text

### Images

```html
<!-- Informative image -->
<img src="chart.png" alt="Sales increased 25% in Q4">

<!-- Decorative image -->
<img src="decoration.png" alt="" role="presentation">

<!-- Complex image -->
<figure>
  <img src="flowchart.png" alt="User registration flow">
  <figcaption>
    Detailed description of the registration process...
  </figcaption>
</figure>
```

### Icons

```html
<!-- Icon with text -->
<button>
  <svg aria-hidden="true"><!-- icon --></svg>
  Settings
</button>

<!-- Icon only -->
<button aria-label="Settings">
  <svg aria-hidden="true"><!-- icon --></svg>
</button>
```

## Live Regions

For dynamic content updates:

```html
<!-- Polite: announced when convenient -->
<div aria-live="polite">
  Item added to cart
</div>

<!-- Assertive: announced immediately -->
<div aria-live="assertive">
  Session expiring in 1 minute
</div>

<!-- Status role (implicitly polite) -->
<div role="status">
  3 results found
</div>
```

## Common Issues

### Missing Labels
```html
<!-- Bad -->
<input placeholder="Email">

<!-- Good -->
<label for="email">Email</label>
<input id="email" type="email">
```

### Redundant Information
```html
<!-- Bad: "Link" is already announced -->
<a href="/about">About us link</a>

<!-- Good -->
<a href="/about">About us</a>
```

### Hidden Content
```html
<!-- Hidden from everyone -->
<div hidden>Not visible</div>

<!-- Hidden visually but announced -->
<div class="sr-only">For screen readers only</div>

<!-- Visible but not announced -->
<div aria-hidden="true">Decorative only</div>
```

## Try It Yourself

### Exercise 1: Screen Reader Testing

Turn on VoiceOver (Mac) or NVDA (Windows). Navigate a page you built:
- Use heading navigation
- Tab through interactive elements
- Note anything confusing or missing

### Exercise 2: Fix Issues

Based on your testing, fix:
- Missing alt text
- Unlabeled form fields
- Missing ARIA for dynamic content

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "screen-reader-quiz",
  "type": "multiple-choice",
  "title": "Screen Reader Experience",
  "description": "Test your understanding of screen reader accessibility.",
  "difficulty": "hard",
  "question": "How should you notify screen reader users when content updates dynamically (like a toast notification)?",
  "options": [
    {
      "id": "a",
      "text": "Use alert() which is always announced",
      "isCorrect": false,
      "explanation": "alert() is disruptive and bad UX for all users."
    },
    {
      "id": "b",
      "text": "Use aria-live regions that announce content changes without interrupting the user",
      "isCorrect": true,
      "explanation": "Correct! aria-live='polite' announces at the next pause; aria-live='assertive' interrupts immediately. This lets screen readers know about dynamic updates."
    },
    {
      "id": "c",
      "text": "Screen readers automatically detect DOM changes",
      "isCorrect": false,
      "explanation": "Screen readers don't automatically announce all DOM changes—you need to mark important updates with aria-live."
    },
    {
      "id": "d",
      "text": "Just make the notification visible—screen readers will see it",
      "isCorrect": false,
      "explanation": "Screen readers don't automatically re-read the page when content appears."
    }
  ]
}
-->

## Key Takeaways

- Screen readers parse the accessibility tree, not the visual design
- Semantic HTML provides the foundation
- All images need alt text (even if empty for decorative)
- Dynamic changes need live regions
- Test with real screen readers

## Next Steps

Continue to [Color and Contrast](./05-color-and-contrast.md) →
