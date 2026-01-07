# Navigation Paradigms

> **Quick Summary:** iOS provides distinct navigation patterns for different use cases. Choosing the right one is fundamental to good app structure.

## What You'll Learn

- Tab bar navigation
- Navigation stacks
- Modal presentations
- When to use each pattern

## Tab Bar Navigation

For apps with distinct, parallel sections:

### When to Use
- 3-5 top-level destinations
- Frequently accessed sections
- Independent content areas

### Characteristics
- Always visible at screen bottom
- Preserves state per tab
- Each tab has its own navigation stack
- Tapping current tab goes to root

### Best Practices
- Use clear, recognizable icons
- Keep labels short
- Highlight selected state
- Don't hide the tab bar in top-level views

## Navigation Stack

For hierarchical content:

### When to Use
- Drilling into detail from a list
- Multi-step flows
- Related content at increasing specificity

### Characteristics
- Push/pop animations
- Back button always available
- Navigation bar at top
- Title reflects current location

### Best Practices
- Use large titles for top-level views
- Standard titles for detail views
- Back button shows previous title
- Don't break the back button

## Modal Presentations

For focused tasks and interruptions:

### Presentation Styles

**Sheet (Default)**
- Slides up from bottom
- Can be dismissed by swiping down
- Parent view visible behind
- Good for most modal content

**Full Screen**
- Covers entire screen
- Requires explicit dismissal
- For immersive experiences
- Use sparingly

**Popover**
- Floats near source element
- On iPad: actual popover
- On iPhone: typically becomes sheet
- For contextual actions

### When to Use Modals
- Self-contained tasks
- Interrupting workflows
- Requiring user decision
- Preventing navigation elsewhere

### When NOT to Use Modals
- Regular navigation
- Content browsing
- Frequent actions

## Combining Patterns

Most apps combine multiple patterns:

```text
App (Tab Bar)
├── Home Tab
│   └── Navigation Stack
│       ├── Home List
│       └── Item Detail
├── Search Tab
│   └── Search Interface
├── Profile Tab
│   └── Navigation Stack
│       ├── Profile
│       └── Settings
│           └── Modal: Edit Profile
```

## Try It Yourself

### Exercise 1: Pattern Analysis

Open your most-used apps. Map their navigation structure:
- What patterns do they use?
- How do patterns combine?
- What feels natural?

### Exercise 2: App Structure

Plan the navigation for an app idea:
- What deserves tab bar space?
- Where are navigation stacks needed?
- What should be modal?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-navigation-quiz",
  "type": "multiple-choice",
  "title": "iOS Navigation",
  "description": "Test your understanding of iOS navigation patterns.",
  "difficulty": "medium",
  "question": "When should you use a Tab Bar vs a hierarchical Navigation Controller in iOS?",
  "options": [
    {
      "id": "a",
      "text": "Tab bars are deprecated in favour of navigation controllers",
      "isCorrect": false,
      "explanation": "Tab bars are still a core iOS pattern for apps with distinct sections."
    },
    {
      "id": "b",
      "text": "Tab bars for parallel, equally important sections; navigation controllers for hierarchical drilling down",
      "isCorrect": true,
      "explanation": "Correct! Tab bars let users switch between independent sections (like Music: Library, Browse, Search). Navigation controllers handle depth (Artists → Albums → Songs)."
    },
    {
      "id": "c",
      "text": "Tab bars for more than 3 sections, navigation for fewer",
      "isCorrect": false,
      "explanation": "The choice is about content relationship, not number of sections."
    },
    {
      "id": "d",
      "text": "Always use navigation controllers with a hamburger menu",
      "isCorrect": false,
      "explanation": "iOS avoids hamburger menus—tab bars are the standard for top-level navigation."
    }
  ]
}
-->

## Key Takeaways

- Tab bars: parallel top-level sections
- Navigation stacks: hierarchical content
- Modals: focused, interruptive tasks
- Most apps combine multiple patterns
- Respect user expectations for each

## Next Steps

Continue to [iOS Typography](./03-ios-typography.md) →
