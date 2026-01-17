# Navigation Paradigms

> **Quick Summary:** iOS provides distinct navigation patterns for different use cases. Choosing the right one is fundamental to good app structure.

## What You'll Learn

- Tab bar navigation
- Navigation stacks
- Modal presentations
- When to use each pattern

## Tab Bar Navigation

The tab bar is the foundation of most iOS apps. It appears at the bottom of the screen and provides the ability to switch quickly between different sections of an app.

### When to Use a Tab Bar

Use a tab bar when your app has three to five distinct top-level destinations. This pattern works best for sections that users access frequently and independently of one another. For example, the Music app uses tabs to separate the Library, Listen Now, and Search sections. This flattened hierarchy lets users switch contexts without losing their place in each section.

### Characteristics

Tab bars remain visible at the bottom of the screen in most top-level views. Critically, a tab bar maintains the state of each tab. If a user drills down into a navigation stack in the first tab, switches to the second tab, and then returns to the first, they should find themselves exactly where they left off. Tapping the active tab's icon again is a standard shortcut to pop back to the root view of that stack.

### Best Practices

Select clear, recognisable icons for your tabs and pair them with short, descriptive labels. The system automatically highlights the selected state, but you should ensure your icons read well in both filled (active) and outlined (inactive) states. Avoid hiding the tab bar in top-level views, as this disorients users who rely on it as their primary anchor.

## Navigation Stack

While tab bars handle lateral navigation, the navigation stack handles depth. This is the hierarchical flow where users drill down into content.

### Drilling Down

Navigation stacks are perfect for moving from a high-level list to specific details. When a user taps an item in a list, a new view pushes onto the stack from the right. This animation reinforces the mental model of moving "forward" or "deeper" into the content.

### The Navigation Bar

The navigation bar sits at the top of the screen and provides the primary way to navigate back up the stack. It displays the title of the current view and, most importantly, a back button labeled with the title of the previous view. This breadcrumb trail is essential for keeping users oriented.

### Best Practices

Use large titles for your top-level views to establish context, and transition to standard (inline) titles as users drill deeper. Never remove or disable the back button unless you are in a specific modal context; breaking the ability to go back is a major usability failure.

## Modal Presentations

Modals are designed for focused tasks and temporary interruptions. A modal view slides up to cover the current context, demanding the user's attention until a specific task is completed or abandoned.

### Presentation Styles

**Sheets** are the default modal style on iOS. They slide up from the bottom, covering most of the screen but leaving the parent view slightly visible in the background. This visual cue reminds the user that they haven't left their current context; they've just paused it. Sheets can be dismissed by swiping down, making them fluid and easy to exit.

**Full-screen covers** take over the entire display. These should be reserved for immersive experiences where you want to minimize distractions, such as editing a photo or watching a video. Because they hide the parent view entirely, they require an explicit "Done" or "Close" button to dismiss.

**Popovers** appear as floating cards anchored to a specific element. On iPad, they point to the button that triggered them. On iPhone, they typically adapt to become standard sheets. These are best for contextual actions or settings related to a specific item.

### When to Use Modals

Use a modal when you need the user to complete a self-contained task, such as creating a new post, editing a profile, or signing up. They are also appropriate for ensuring a user makes a decision before proceeding.

Avoid using modals for regular navigation. If a user is just browsing content, they should not have to constantly dismiss sheets to move forward. Frequent actions should be inline or part of the navigation stack.

## Combining Patterns

Most robust applications combine these patterns to create a complete navigation structure. A common architecture uses a Tab Bar for the main sections, with each tab containing its own Navigation Stack. Modals are then used sparingly within those stacks for specific tasks.

For example:
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

Open your most-used apps and map their navigation structure. Note which sections use a tab bar and where navigation stacks take over. Identify when a modal is used—is it for a creation task or a setting? Ask yourself if the transition feels natural or jarring.

### Exercise 2: App Structure

Plan the navigation for a simple app idea. Decide which three or four features deserve space on the tab bar. Sketch out the hierarchy for one of those tabs, showing how deep the navigation stack goes. Finally, identify one task that requires a modal presentation.

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

- Use **Tab Bars** to organize parallel, top-level sections of your app.
- Use **Navigation Stacks** to let users drill down into hierarchical content.
- Use **Modals** for focused, self-contained tasks that interrupt the main flow.
- Good architecture usually combines all three patterns to create a fluid experience.

## Next Steps

Continue to [iOS Typography](./03-ios-typography.md) →
