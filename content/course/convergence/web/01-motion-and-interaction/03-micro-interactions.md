# Micro-interactions

> **Quick Summary:** Micro-interactions are small, contained animations that provide feedback, guide users, and add delight to interfaces.

## What You'll Learn

In this lesson, you will discover the anatomy of effective micro-interactions and explore the common patterns that make digital interfaces feel responsive and alive. We'll dive into the practical implementation of these small-scale animations using modern CSS and examine exactly how to balance visual delight with functional utility to ensure your interactions remain helpful without becoming distracting.

## Anatomy of a Micro-interaction

Every micro-interaction has four parts:

<!-- illustration: micro-interaction-anatomy -->

1. **Trigger** - What initiates it (click, hover, scroll, system event)
2. **Rules** - What happens when triggered
3. **Feedback** - The visual/audio response
4. **Loops & Modes** - Repeating behaviour or state changes

## Button Interactions

<!-- visual-example: button-states-demo -->

### Hover State

```css
.button {
  transform: translateY(0);
  transition:
    transform 0.15s ease-out,
    box-shadow 0.15s ease-out;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### Press State

```css
.button:active {
  transform: translateY(0) scale(0.98);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

### Loading State

```css
.button--loading {
  position: relative;
  color: transparent;
}

.button--loading::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
```

## Form Interactions

### Input Focus

```css
.input {
  border: 2px solid var(--neutral-200);
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

.input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  outline: none;
}
```

### Floating Label

<!-- visual-example: floating-label-demo -->

```css
.field {
  position: relative;
}

.label {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.2s ease-out;
  pointer-events: none;
}

.input:focus + .label,
.input:not(:placeholder-shown) + .label {
  top: 0;
  transform: translateY(-100%);
  font-size: 0.75rem;
  color: var(--primary);
}
```

### Validation Feedback

<!-- visual-example: form-validation-demo -->

```css
.input--error {
  border-color: var(--error);
  animation: shake 0.3s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-4px);
  }
  75% {
    transform: translateX(4px);
  }
}
```

## Toggle & Checkbox

<!-- visual-example: toggle-switch-demo -->

### Custom Toggle

```css
.toggle {
  width: 48px;
  height: 24px;
  background: var(--neutral-300);
  border-radius: 12px;
  position: relative;
  transition: background 0.2s;
}

.toggle::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  top: 2px;
  left: 2px;
  transition: transform 0.2s ease-out;
}

.toggle--active {
  background: var(--primary);
}

.toggle--active::after {
  transform: translateX(24px);
}
```

### Checkbox with Checkmark

```css
.checkbox-icon {
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
  transition: stroke-dashoffset 0.2s ease-out;
}

.checkbox:checked + .checkbox-icon {
  stroke-dashoffset: 0;
}
```

## Like/Heart Animation

<!-- visual-example: like-button-demo -->

```css
.heart {
  transform: scale(1);
  transition: transform 0.1s ease-out;
}

.heart--liked {
  animation: heartPop 0.3s ease-out;
}

@keyframes heartPop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
```

## Skeleton Loading

<!-- visual-example: skeleton-loading-demo -->

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--neutral-200) 25%,
    var(--neutral-100) 50%,
    var(--neutral-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

## Try It Yourself

### Exercise 1: Button States

Create a button with:

- Hover lift effect
- Active press effect
- Loading spinner state
- Success checkmark state

### Exercise 2: Like Button

Build a like button that:

- Scales up on click
- Changes colour (heart fill)
- Shows a small particle burst

### Exercise 3: Form Field

Create an input with:

- Floating label
- Focus ring
- Error shake animation
- Success checkmark

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "micro-interactions-quiz",
  "type": "multiple-choice",
  "title": "Micro-interactions",
  "description": "Test your understanding of micro-interaction design.",
  "difficulty": "medium",
  "question": "What makes a micro-interaction effective?",
  "options": [
    {
      "id": "a",
      "text": "Being complex enough that users notice and appreciate the effort",
      "isCorrect": false,
      "explanation": "Over-designed micro-interactions can be distracting and annoying."
    },
    {
      "id": "b",
      "text": "Being subtle, purposeful, and providing clear feedback without drawing too much attention",
      "isCorrect": true,
      "explanation": "Correct! The best micro-interactions are almost invisible. They confirm actions and provide feedback without demanding attention."
    },
    {
      "id": "c",
      "text": "Using the same animation everywhere for consistency",
      "isCorrect": false,
      "explanation": "Different interactions deserve different feedback—a delete action shouldn't animate like a success."
    },
    {
      "id": "d",
      "text": "Making them as fast as possible to not slow users down",
      "isCorrect": false,
      "explanation": "Some micro-interactions benefit from being visible (like success confirmations)."
    }
  ]
}
-->

## Key Takeaways

Successful micro-interactions are subtle and purposeful, providing immediate visual feedback that matches the user's expected behaviour without demanding excessive attention. By keeping animations brief (100-300ms) and prioritising transforms over simple colour changes, you can guide users through an interface with intuitive cues. Finally, ensuring your interactions respect reduced motion preferences will keep your refined experience accessible to all users.

## Next Steps

Continue to [Page Transitions](./04-page-transitions.md) →
