# Screen Reader Experience

> **Quick Summary:** Screen readers convert visual interfaces to audio. Understanding how they work helps you build better experiences for all users.

## What You'll Learn

- How screen readers interpret your code by parsing the accessibility tree
- How to master the art of writing effective alternative text for images and dynamic content updates
- How to structure content for optimal screen reader navigation

## How Screen Readers Work

Screen readers do not "see" the visual design of your page; instead, they parse the **accessibility tree**, a semantic structure derived from your DOM. They announce the names, roles, and current states of interactive elements, provide robust navigation shortcuts for jumping between sections, and allow users to interact with focusable elements using keyboard commands.

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

There are several major screen readers you should be aware of. **VoiceOver** is built directly into macOS and iOS (toggled with Cmd+F5), making it the most accessible tool for Mac users. On Windows, **NVDA** is a popular free option, while **JAWS** remains a widely used commercial standard. Android users typically rely on the built-in **TalkBack** service. For your testing purposes, start with VoiceOver or NVDA.

## Testing Basics

### VoiceOver Quick Start (Mac)

1. Enable: Cmd + F5
2. Navigate: VO key (Ctrl + Option) + arrows
3. Interact: VO + Space
4. Web rotor: VO + U

### What to Check

When testing your interface, focus on these key checklist items: ensure you can navigate the entire page structure by headings alone and that all images have appropriate descriptions. Verify that every form form field has a properly associated label, that links and buttons are announced clearly with their purpose, and that any dynamic state changes (like opening a modal) are immediately announced to the user.

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

Turn on VoiceOver (Mac) or NVDA (Windows) and attempt to navigate a page you have built without looking at the screen. Use heading navigation shortcuts to jump through content sections, tab through every interactive element to ensure logical order, and take note of any components that are confusing, silent, or impossible to reach.

### Exercise 2: Fix Issues

Using the insights from your testing session, return to your code to fix the identified issues. This typically involves adding missing alt text to informative images, ensuring every form input has a clear label, and adding appropriate ARIA live regions to announce dynamic content updates that were previously silent.

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
      "explanation": "Screen readers don't automatically announce all DOM changes. You need to mark important updates with aria-live."
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

- Screen readers rely entirely on the semantic structure of your code (the accessibility tree) rather than visual appearance
- You must ensure all images have appropriate alt text—even if it is empty for decorative elements—to provide context
- Use ARIA labels and live regions to announce dynamic content changes

## Next Steps

Continue to [Color and Contrast](./05-colour-and-contrast.md) →
