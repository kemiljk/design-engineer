# Designing for Edge Cases

> **Quick Summary:** The "happy path" is a myth. In reality, users encounter errors, weak connections, empty databases, and extreme inputs constantly. A robust design anticipates these failures and handles them with grace.

## The Edge Case Problem

It's easy to design a perfect interface when you assume the user has a short name, a fast internet connection, and perfect data. But reality is messy.

*   **Empty States:** What does the screen look like when there's nothing to show?
*   **Errors:** What happens when the server fails?
*   **Loading:** What does the user see while waiting?
*   **Extremes:** What if the user's name is 50 characters long?
*   **Permissions:** What if the user says "No" to camera access?

Designing for edge cases isn't "extra credit"—it's the difference between a fragile prototype and a resilient product.

## Empty States

An empty state is a screen with no data. This often happens on first launch, or when a search returns no results.

### The Problem with Blank

A blank screen is confusing. It tells the user "nothing is here," but it doesn't explain *why* or *how to fix it*. It feels broken.

### The Solution: Educate and prompt

A good empty state is an opportunity to onboard the user.
1.  **Explain the "Why":** "You haven't created any projects yet."
2.  **Guide the Action:** "Create a project to start tracking your tasks."
3.  **Provide the Button:** Place the primary "Create" button right there in the center.

**Example: Search Results**
Instead of just saying "No results found," try:
"We couldn't find anything for 'X'. Try adjusting your filters or checking for typos."
*(And provide a "Clear Filters" button).*

## Error States

Errors are inevitable. How you handle them defines your user experience.

### The Anatomy of a Good Error Message

**Bad:** "Error 500" or "Something went wrong."
**Good:** "We couldn't save your changes because you are offline. Please check your connection."

A good error message answers three questions:
1.  **What happened?** (Plain language description)
2.  **Why did it happen?** (Context)
3.  **What can I do about it?** (Actionable next step)

### Placement Matters

*   **Form Errors:** Place the message directly below the invalid field. Don't make the user hunt for it at the top of the page.
*   **System Errors:** Use a global toast or banner for things like "Connection Lost."
*   **Critical Errors:** Use a modal or a full-page state only if the app is unusable (e.g., "Server Down").

## Loading States

Speed is a feature, but perceived performance is just as important.

### The 100ms Rule
*   **< 100ms:** Instant. No feedback needed.
*   **100ms - 1s:** The user feels a delay. A small spinner or loader is appropriate.
*   **1s - 10s:** The user's mind starts to wander. Use a skeleton screen or a progress bar to show that *something* is happening.
*   **> 10s:** You risk losing the user completely. Provide a time estimate or allow them to background the task.

### Skeleton Screens vs. Spinners

Spinners focus attention on the *waiting*. Skeleton screens focus attention on the *content* that is about to appear. Skeletons (gray placeholder shapes) make the app feel faster because they lay out the structure immediately, preventing jarring layout shifts when the real data arrives.

## Content Extremes

Data is rarely uniform.

### The Long and the Short of It
*   **Long Content:** What happens if a headline runs for three lines? Does it truncate (`...`) or wrap? Truncation saves space but hides information. Wrapping preserves information but breaks alignment. Choose based on importance.
*   **Short Content:** What if a "Top 10" list only has one item? Does the layout look broken?
*   **Missing Content:** What if a user doesn't have an avatar? Use a fallback (initials or a generic icon) rather than a broken image link.

### Numerical Extremes
*   **Zero:** "0 items" (or "No items").
*   **One:** "1 item" (Singular).
*   **Many:** "1,234 items" (Comma formatting).
*   **Too Many:** "99+" (Badges shouldn't explode with width).

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
Take a card component you designed. Fill it with:
*   A 100-character title.
*   A missing image.
*   A price of $1,000,000.00.
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

-   **The "Happy Path" is rare.** Most users encounter edge cases.
-   **Empty states are onboarding opportunities.** Don't just say "empty."
-   **Errors should be actionable.** Tell the user how to fix it.
-   **Loaders manage perception.** Use skeletons to make the app feel faster.
-   **Stress test your designs.** Use long text, short text, and missing data.

## Next Steps

Congratulations! You've completed the Design Track for Web.

You now understand:
- Visual design fundamentals
- Typography, colour, spacing, and layout
- Design tools and workflows
- Design systems and components
- UX principles and user-centred thinking

**Where to go next:**

If you came from engineering background:
→ Head to [Convergence: Motion and Interaction](../../convergence/web/01-motion-and-interaction/01-why-motion-matters.md) to merge your skills

If you're building engineering skills:
→ Head to [Engineering Track: HTML Fundamentals](../../engineering-track/web/01-html-fundamentals/01-what-is-html.md) to learn to build

If you're exploring mobile:
→ Check out the [iOS Design Track](../../ios/01-hig-fundamentals/01-ios-design-philosophy.md) or [Android Design Track](../../android/01-material-design/01-material-design-philosophy.md)
