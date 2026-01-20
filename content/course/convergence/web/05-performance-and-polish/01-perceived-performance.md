# Perceived Performance

> **Quick Summary:** How fast an interface _feels_ matters more than how fast it actually is. Learn techniques to make experiences feel instant.

## What You'll Learn

In this lesson, you will explore the critical difference between actual load times and how fast an interface feels to the user. We'll examine techniques like skeleton screens and optimistic UI patterns that can mask latency, and identify strategies for effective progress indication that keep users engaged even during unavoidable delays.

## Perception vs. Reality

Users do not measure performance in milliseconds; they measure it in feelings. A site that loads in 2 seconds but provides no feedback will feel slower than a site that loads in 3 seconds but immediately shows a skeleton screen. Users might say "That felt instant" purely because the interface reacted immediately to their touch, or conversely, "I'm not sure if it's working" if a button press hangs for even 200ms without a state change.

Two interfaces with identical load times can feel dramatically different based on how they handle the wait.

## Skeleton Screens

Replace empty space with content-shaped placeholders:

<!-- illustration: skeleton-loading -->

```html
<div class="card skeleton">
  <div class="skeleton-image"></div>
  <div class="skeleton-line skeleton-line--title"></div>
  <div class="skeleton-line"></div>
  <div class="skeleton-line skeleton-line--short"></div>
</div>
```

```css
.skeleton-line {
  height: 1em;
  background: linear-gradient(
    90deg,
    var(--neutral-200) 25%,
    var(--neutral-100) 50%,
    var(--neutral-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
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

Skeleton screens are effective because they communicate the page structure instantly, reducing cognitive load. By directing attention to where content will eventually appear and using a shimmering animation to suggest activity, they make the wait feel active rather than passive.

## Optimistic UI

Update the UI immediately, assume success:

```javascript
async function likePost(postId) {
  // Update UI immediately
  setLiked(true);
  setLikeCount((count) => count + 1);

  try {
    await api.likePost(postId);
  } catch (error) {
    // Revert on failure
    setLiked(false);
    setLikeCount((count) => count - 1);
    showError("Failed to like post");
  }
}
```

Optimistic UI is best suited for low-risk actions that rarely fail, such as "liking" a post, toggling a bookmark, or adding an item to a list. These frequent interactions benefit immensely from feeling instantaneous, and the cost of rolling back the UI in the rare event of an error is low.

## Progress Indication

### Determinate Progress

When you know how long something will take:

```html
<progress value="45" max="100">45%</progress>
```

### Indeterminate Progress

When duration is unknown:

```html
<div class="spinner" role="status">
  <span class="sr-only">Loading...</span>
</div>
```

### Progress Steps

For multi-step processes:

```html
<ol class="steps">
  <li class="step step--complete">Cart</li>
  <li class="step step--current">Shipping</li>
  <li class="step">Payment</li>
  <li class="step">Confirmation</li>
</ol>
```

## Instant Feedback

Every interaction should acknowledge immediately:

```css
.button:active {
  transform: scale(0.98);
  transition: transform 0.05s;
}
```

Even if the action takes time, the button responded instantly.

## Try It Yourself

### Exercise 1: Skeleton Screen

Create a skeleton version of a card component that matches the final layout.

### Exercise 2: Optimistic Like

Build a like button with optimistic updates and error rollback.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "perceived-perf-quiz",
  "type": "multiple-choice",
  "title": "Perceived Performance",
  "description": "Test your understanding of perceived performance.",
  "difficulty": "medium",
  "question": "What is 'optimistic UI' and why does it improve perceived performance?",
  "options": [
    {
      "id": "a",
      "text": "Making UI colours brighter to seem faster",
      "isCorrect": false,
      "explanation": "Optimistic UI is about interaction behaviour, not visual design."
    },
    {
      "id": "b",
      "text": "Showing the expected result immediately before the server confirms, then rolling back if it fails",
      "isCorrect": true,
      "explanation": "Correct! Instead of waiting for server response, show the expected state immediately (like incrementing a like count). This makes the interface feel instant while the server processes in the background."
    },
    {
      "id": "c",
      "text": "Caching all API responses permanently",
      "isCorrect": false,
      "explanation": "Caching is a different optimisation technique."
    },
    {
      "id": "d",
      "text": "Never showing loading states to avoid perceived slowness",
      "isCorrect": false,
      "explanation": "Some loading states are important for longer operations."
    }
  ]
}
-->

## Key Takeaways

Perceived speed often matters far more than actual millisecond execution time. By using skeleton screens to provide immediate visual structure and implementing optimistic UI to assume success before server confirmation, you can make your application feel instantaneous. Remember that every interaction deserves immediate feedback, and when waits are unavoidable, always provide clear progress indication to maintain user trust.

## Next Steps

Continue to [Image Optimization](./02-image-optimisation.md) →
