# Designing for Edge Cases

> **Quick Summary:** Edge cases—empty states, errors, extremes—are where products break. Designing for them separates polished products from frustrating ones.

## What You'll Learn

- Common edge cases and why they matter
- Designing empty states effectively
- Handling errors gracefully
- Managing loading states
- Dealing with content extremes

## The Edge Case Problem

Designers naturally focus on the happy path—the ideal scenario where everything works perfectly. But users spend significant time in edge cases:

- First-time use (nothing to show yet)
- Errors (something went wrong)
- Loading (waiting for data)
- Content extremes (too much or too little)
- Permission states (can't do something)

Products that handle edge cases well feel polished and trustworthy. Products that don't feel broken.

## Empty States

Empty states occur when there's no content to display.

<!-- illustration: empty-state-anatomy -->

### When Empty States Happen

- **First use:** User hasn't created anything yet
- **No results:** Search or filter returns nothing
- **Cleared content:** User deleted everything
- **Permission lack:** User can't see content
- **No activity:** Nothing has happened yet

### Empty State Anatomy

Good empty states include:

**1. What:** Explain the situation
> "No projects yet"

**2. Why:** Provide context
> "You haven't created any projects"

**3. What next:** Guide to action
> "Create your first project to get started"

**4. Action:** Provide the means
> [Create Project] button

### Empty State Principles

**Be helpful, not apologetic.** "No data found 😞" is unhelpful. "No matching results—try different filters" is actionable.

**Educate when appropriate.** First-use empty states can explain features.

**Maintain visual quality.** Empty states are still part of the product experience.

**Don't be annoying.** If users will see this state frequently, keep it subtle.

### Examples

**First-use:**
```
Welcome to Inbox!
You'll see messages here once you receive them.
In the meantime, why not send your first message?

[Send a Message]
```

**No results:**
```
No matches found
Try adjusting your search or filters.

[Clear Filters]
```

**No activity:**
```
All quiet...
No activity in the last 7 days.
```

## Error States

Errors happen. Good design handles them gracefully.

### Error Types

**Validation errors:** User input is invalid
**System errors:** Server failed, network issues
**Permission errors:** Not authorized
**Not found errors:** Resource doesn't exist
**Timeout errors:** Operation took too long

### Error Message Principles

**Be clear:** Explain what went wrong in plain language.
- ✗ "Error 422"
- ✓ "Email address is invalid"

**Be specific:** Tell users exactly what's wrong.
- ✗ "There was a problem"
- ✓ "Password must be at least 8 characters"

**Be helpful:** Suggest how to fix it.
- ✗ "Invalid input"
- ✓ "Enter a valid email address, like name@example.com"

**Be positioned:** Show errors near the problem.
- Form errors next to fields
- Page errors at the top
- Action errors near the action

**Be appropriately alarming:** Match severity to importance.
- Validation: Subtle, near field
- Payment failed: More prominent
- Data loss risk: Very prominent

### Error State Design

Visual treatment matters:
- Use color thoughtfully (red isn't always necessary)
- Include icons for scanability
- Don't overuse bold/caps
- Keep actionable when possible

### Error Prevention vs. Error Handling

Prevention is better than handling:
- Disable impossible actions
- Constrain inputs to valid values
- Confirm destructive operations
- Warn before problems

But when errors happen anyway, handle them well.

## Loading States

Loading states appear while waiting for data or processing.

<!-- illustration: loading-duration -->

### Loading Duration Guidelines

**< 100ms:** No indicator needed. Feels instant.

**100ms - 1s:** Show subtle feedback. Spinner, progress indicator.

**1s - 10s:** Show clear progress. Progress bar, skeleton screens.

**> 10s:** Keep user informed. Percentage, time estimate, background option.

### Loading Patterns

**Spinners:** Simple, universal, but uninformative.

**Progress bars:** Show completion percentage. Better for known durations.

**Skeleton screens:** Show layout structure while loading content. Feels faster.

**Progressive loading:** Show what you have while loading more.

**Optimistic UI:** Show expected result immediately, update if wrong.

### Loading State Principles

**Show something fast.** Even if content takes time, show structure immediately.

**Indicate progress.** If possible, show how much remains.

**Keep users oriented.** Don't blank the screen unnecessarily.

**Allow cancellation.** For long operations, let users abandon.

**Handle failure.** Loading can fail—design for that too.

### Skeleton Screens

Skeleton screens show content layout while data loads:
- Gray shapes where content will appear
- Maintains page structure
- Feels faster than empty space + spinner
- Reduces layout shift when content loads

## Content Extremes

Content doesn't always fit nicely. Plan for extremes.

### Long Content

What if text is longer than expected?

**Truncation:** Cut off with ellipsis
- Good for: Lists, cards, previews
- Risk: Important info hidden

**Wrapping:** Let text flow to multiple lines
- Good for: Full content, descriptions
- Risk: Layout breaks, uneven rows

**Scroll:** Contain in scrollable area
- Good for: Fixed-height regions
- Risk: Content buried, missed

**Expansion:** Show more on demand
- Good for: Variable importance
- Risk: Extra interaction required

<!-- illustration: content-extremes -->

### Short Content

What if there's less content than expected?

- Cards that look empty
- Tables with one row
- Charts with one data point
- Names that are one character

Design with minimum viable content in mind.

### Missing Content

What if expected content is missing?

- Avatar without photo
- User without name
- Product without image
- Article without body

Default gracefully:
- Initials for missing avatars
- "Untitled" for missing titles
- Placeholder images

### Numerical Extremes

- Zero items
- One item (singular vs. plural)
- 99+ (badges, counts)
- Very large numbers (formatting, abbreviation)
- Negative numbers (if possible)

## Permission States

Users can't always do everything.

### Permission Scenarios

- **Not logged in:** Feature requires authentication
- **Not authorized:** Feature requires different role
- **Not available:** Feature locked, trial expired
- **Not applicable:** Feature doesn't apply to this item

### Handling Permissions

**Hide vs. disable vs. explain:**
- **Hide:** Removes clutter but users don't know it exists
- **Disable:** Shows existence but can frustrate
- **Explain:** Helps but adds visual complexity

<!-- illustration: permission-states -->

Context determines the right approach.

**Explain why:** If showing disabled/locked state, explain how to unlock.
> "Upgrade to Pro to export reports"

**Provide path forward:** Don't just say no—offer next steps.
> "Sign in to save your progress" [Sign In]

## The Edge Case Checklist

For each feature/component, consider:

**Empty states:**
- [ ] First use (never had content)
- [ ] No results (search/filter returned nothing)
- [ ] Cleared (content was removed)

**Errors:**
- [ ] Validation errors (invalid input)
- [ ] System errors (server/network failure)
- [ ] Permission errors (not authorized)

**Loading:**
- [ ] Initial load (page/view)
- [ ] Action processing (form submission)
- [ ] Refresh (pulling new data)

**Content:**
- [ ] Minimum content (very short/few)
- [ ] Maximum content (very long/many)
- [ ] Missing content (expected but absent)

**Permissions:**
- [ ] Not authenticated
- [ ] Wrong role/permissions
- [ ] Feature locked/unavailable

## Try It Yourself

### Exercise 1: Empty State Design

Design empty states for:
1. A to-do list with no tasks
2. A search with no results
3. A social feed with no activity

Include: explanation, guidance, and action.

### Exercise 2: Error Message Rewrite

Find 5 error messages in products you use. Rewrite each to be:
- Clear about what happened
- Specific about the problem
- Helpful about how to fix it

### Exercise 3: Edge Case Inventory

For a feature you're working on:
1. List all possible edge cases using the checklist
2. Prioritise by likelihood and impact
3. Design the top 3 most important edge cases

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

- Edge cases are where products often break—they deserve design attention
- Empty states should explain, guide, and enable action
- Error messages should be clear, specific, and helpful
- Loading states should appear appropriate to duration
- Design for content extremes: too long, too short, missing
- Handle permission states with explanation and next steps
- Use the edge case checklist to ensure coverage

## Next Steps

Congratulations! You've completed the Design Track for Web.

You now understand:
- Visual design fundamentals
- Typography, color, spacing, and layout
- Design tools and workflows
- Design systems and components
- UX principles and user-centered thinking

**Where to go next:**

If you came from engineering background:
→ Head to [Convergence: Motion and Interaction](../../convergence/web/01-motion-and-interaction/01-why-motion-matters.md) to merge your skills

If you're building engineering skills:
→ Head to [Engineering Track: HTML Fundamentals](../../engineering-track/web/01-html-fundamentals/01-what-is-html.md) to learn to build

If you're exploring mobile:
→ Check out the [iOS Design Track](../../ios/01-hig-fundamentals/01-ios-design-philosophy.md) or [Android Design Track](../../android/01-material-design/01-material-design-philosophy.md)
