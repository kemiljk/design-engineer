# Android Navigation

> **Quick Summary:** Android has distinct navigation patterns. Understanding them ensures your app feels native and intuitive.

## What You'll Learn

- Navigation components
- Back navigation behaviour
- Navigation patterns
- Combining navigation types

## Primary Navigation

### Bottom Navigation
For top-level destinations:
- 3-5 primary destinations
- Always visible
- Persists across screens
- Current location highlighted

### Navigation Drawer
For many destinations:
- Slides from left edge
- Accessed via hamburger icon
- Can organise into sections
- Often on larger screens

### Navigation Rail
For tablet/desktop:
- Vertical bar on left side
- Always visible
- Works with larger screens
- Labels optional

## Secondary Navigation

### Tabs
For related content at same level:
- Swipeable on mobile
- Fixed or scrollable
- Up to ~7 tabs visible
- Within a screen

### Top App Bar
Contextual navigation:
- Contains navigation icon (back, menu)
- Screen title
- Action icons
- Search integration

## Back Navigation

### System Back
Android's back button/gesture:
- Always available
- Returns to previous location
- Exits app from root
- Don't override unexpectedly

### Up Navigation
App bar back arrow:
- Navigates within app hierarchy
- More predictable than system back
- Matches app structure

### When They Differ
- System back: Where you came from
- Up: Where you are in hierarchy

Example: Deep link into detail → system back exits app, up goes to list.

## Navigation Patterns

### Stack Navigation
Most common pattern:
- Push screens onto stack
- Pop to go back
- Clear and predictable

### Lateral Navigation
Between peer screens:
- Tabs
- Bottom navigation
- Swipe gestures

### Hub and Spoke
Central screen with detail views:
- Dashboard to details
- Return to hub after action

## Combining Patterns

Typical app structure:
```text
Bottom Navigation
├── Home Tab
│   └── Stack Navigation
│       ├── Home Feed
│       └── Item Detail
├── Search Tab
│   └── Search Screen
│       └── Results Detail
├── Profile Tab
    └── Stack Navigation
        ├── Profile
        └── Settings
```

## Best Practices

### Do
- Keep primary destinations in bottom nav
- Preserve scroll position per destination
- Make back behaviour predictable
- Support gesture navigation

### Don't
- Hide navigation unnecessarily
- Override system back unexpectedly
- Use too many navigation types
- Create deep, confusing hierarchies

## Try It Yourself

### Exercise 1: Navigation Map

Map the navigation structure of your favourite Android app. What patterns does it use?

### Exercise 2: App Navigation

Design navigation for an app idea:
- What deserves bottom nav?
- What's secondary?
- How deep does it go?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-navigation-quiz",
  "type": "multiple-choice",
  "title": "Android Navigation",
  "description": "Test your understanding of Android navigation patterns.",
  "difficulty": "medium",
  "question": "What is the difference between the back button and the up button in Android navigation?",
  "options": [
    {
      "id": "a",
      "text": "They're the same—both go to the previous screen",
      "isCorrect": false,
      "explanation": "They have different behaviours depending on context."
    },
    {
      "id": "b",
      "text": "Back navigates through chronological history; Up navigates through app hierarchy",
      "isCorrect": true,
      "explanation": "Correct! The system back button follows your navigation history (can leave the app). The in-app up arrow goes to the parent screen in the app hierarchy."
    },
    {
      "id": "c",
      "text": "Up is for tablets, Back is for phones",
      "isCorrect": false,
      "explanation": "Both are used on all form factors."
    },
    {
      "id": "d",
      "text": "Up closes dialogs, Back doesn't",
      "isCorrect": false,
      "explanation": "Back typically dismisses dialogs too."
    }
  ]
}
-->

## Key Takeaways

- Bottom nav for primary destinations
- Drawer/rail for many destinations or larger screens
- System back vs. up navigation have different purposes
- Stack navigation is most common
- Keep hierarchy shallow and predictable

## Next Steps

Continue to [Android Components](./02-android-components.md) →
