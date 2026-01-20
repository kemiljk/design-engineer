# Designing for Edge Cases

> **Quick Summary:** The "happy path" is a myth. In reality, users encounter errors, weak connections, empty databases, and extreme inputs constantly. A robust design anticipates these failures and handles them with grace.

## The Edge Case Problem

It's easy to design a perfect interface when you assume the user has a short name, a fast internet connection, and perfect data. But reality is messy.

Designing for a resilient product requires anticipating messy realities like empty states with nothing to show, server failures that trigger errors, and the necessary loading indicators that fill the gap while users wait. It also means handling content extremes like fifty-character names and managing permission states when users decline access to necessary hardware like cameras.

Designing for edge cases isn't "extra credit"—it's the difference between a fragile prototype and a resilient product.

## Empty States

An empty state is a screen with no data. This often happens on first launch, or when a search returns no results.

### The Problem with Blank

A blank screen is confusing. It tells the user "nothing is here," but it doesn't explain *why* or *how to fix it*. It feels broken.

A good empty state serves as an onboarding opportunity by explaining why no data is present, such as "You haven't created any projects yet," and guiding the user's next action with a prompt like "Create a project to start tracking your tasks." Placing the primary action button directly in the centre of the screen makes the solution immediate and clear.

**Example: Search Results**
Instead of just saying "No results found," try:
"We couldn't find anything for 'X'. Try adjusting your filters or checking for typos."
*(And provide a "Clear Filters" button).*

## Error States

Errors are inevitable. How you handle them defines your user experience.

### The Anatomy of a Good Error Message

**Bad:** "Error 500" or "Something went wrong."
**Good:** "We couldn't save your changes because you are offline. Please check your connection."

A good error message uses plain language to describe what happened, provides necessary context for why it occurred, and offers an actionable next step so the user knows exactly how to proceed.

### Placement Matters

Strategic placement involves positioning form errors directly below invalid fields, using global toasts for system-wide alerts like lost connections, and reserving heavy-handed modals or full-page states for critical failures that make the entire application unusable.

## Loading States

Speed is a feature, but perceived performance is just as important.

Feedback threshold varies by duration: interactions under 100ms feel instant and need no indicator, while delays up to one second benefit from a small spinner. For waits between one and ten seconds, skeleton screens or progress bars are necessary to show continued activity, and anything exceeding ten seconds requires time estimates or the ability for users to background the task.

### Skeleton Screens vs. Spinners

Spinners focus attention on the *waiting*. Skeleton screens focus attention on the *content* that is about to appear. Skeletons (grey placeholder shapes) make the app feel faster because they lay out the structure immediately, preventing jarring layout shifts when the real data arrives.

## Content Extremes

Data is rarely uniform.

### The Long and the Short of It
Design for content variability by deciding whether long headlines should wrap to preserve info or truncate to save space, and ensure the layout doesn't look broken when lists only contain a single item. Always provide fallback icons or initials for missing content like avatars rather than leaving broken image links.

### Numerical Extremes
Handle numerical extremes by correctly formatting zero, singular, and plural counts, and ensure badges use overflow signals like "99+" to prevent them from expanding excessively across the layout.

## Permission States

Mobile apps often need access to the Camera, Location, or Photos.

**The "Deny" Loop:**
If a user denies permission, the feature breaks. Don't just fail silently. Show a specific state:
"We need access to your camera to scan QR codes. Please enable it in Settings."
Provide a button that deep-links directly to the App Settings.

## Try It Yourself

### Exercise 1: Empty State Design
Design the "My Orders" screen for an e-commerce app for a user who has never bought anything. How do you turn this empty screen into a sales opportunity?

### Exercise 2: The "Bad Data" Stress Test
Stress test your card components by filling them with extreme data, such as a hundred-character title, a missing image, or a million-pound price point, to ensure the CSS and layout handle these cases without breaking.
Does it break? Fix the CSS/Layout to handle these extremes gracefully.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "edge-cases-quiz",
  "type": "multiple-choice",
  "title": "Edge Case Design",
  "description": "Test your understanding of designing for edge cases.",
  "difficulty": "medium",
  "question": "For an operation that takes 5 seconds to complete, what loading pattern is most appropriate?",
  "options": [
    {
      "id": "a",
      "text": "No indicator—5 seconds is fast enough that users won't notice",
      "isCorrect": false,
      "explanation": "5 seconds without feedback feels broken. Users will click again or assume something failed."
    },
    {
      "id": "b",
      "text": "A simple spinner that appears immediately",
      "isCorrect": false,
      "explanation": "Spinners work for shorter operations, but for 5+ seconds, users benefit from progress indication."
    },
    {
      "id": "c",
      "text": "Clear progress indication like a progress bar or skeleton screen",
      "isCorrect": true,
      "explanation": "Correct! For operations lasting 1-10 seconds, show clear progress. Progress bars, skeleton screens, or step indicators help users understand the wait is expected and track completion."
    },
    {
      "id": "d",
      "text": "A modal dialog explaining that processing is happening",
      "isCorrect": false,
      "explanation": "A modal is heavy-handed for routine operations. Progress indication is more appropriate."
    }
  ]
}
-->

## Key Takeaways

Designing for the rare "happy path" is insufficient since most users encounter edge cases that require actionable errors to guide them. By treating empty states as onboarding opportunities, using loaders to manage performance perception, and stress-testing designs with diverse data extremes, you can build a more resilient and professional user experience.

## Next Steps

Congratulations! You've completed the Design Track for Web.

You now understand:
By completing this track, you have gained a comprehensive understanding of visual design fundamentals, including typography, colour, spacing, and layout. You have also mastered essential design tools and workflows, developed a deep knowledge of design systems and component architecture, and learned to apply UX principles and user-centred thinking to every project.

**Where to go next:**

If you came from engineering background:
→ Head to [Convergence: Motion and Interaction](../../convergence/web/01-motion-and-interaction/01-why-motion-matters.md) to merge your skills

If you're building engineering skills:
→ Head to [Engineering Track: HTML Fundamentals](../../engineering-track/web/01-html-fundamentals/01-what-is-html.md) to learn to build

If you're exploring mobile:
→ Check out the [iOS Design Track](../../ios/01-hig-fundamentals/01-ios-design-philosophy.md) or [Android Design Track](../../android/01-material-design/01-material-design-philosophy.md)
