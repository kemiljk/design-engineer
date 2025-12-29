# Notifications and Widgets

> **Quick Summary:** Notifications and widgets extend your app beyond its main interface. Design them to provide value without being intrusive.

## What You'll Learn

- Notification design principles
- Notification anatomy
- Home screen widgets
- Lock screen presence

## Notification Design

### Purpose
Notifications should be:
- **Timely:** Relevant right now
- **Personal:** About something the user cares about
- **Actionable:** User can do something

### When NOT to Notify
- Marketing messages disguised as notifications
- Information that can wait
- Events user didn't opt into
- Redundant information

## Notification Anatomy

### Collapsed View
- App icon
- Title (app name or short title)
- Text (primary message)
- Timestamp
- Small icon (optional)

### Expanded View
- Additional text
- Large image
- Action buttons
- Progress bar
- Custom layouts

### Notification Actions
- Up to 3 action buttons
- Text-only (no icons)
- Should be genuinely useful
- Examples: Reply, Archive, Mark as read

## Notification Categories

### Conversations
- Person-to-person messaging
- Shows conversation history
- Inline reply support
- Priority placement

### Alerts
- Important, time-sensitive
- Minimal, attention-getting
- System alerts, timers

### Status
- Ongoing background processes
- Music playback, downloads
- Lower priority
- Often dismissible

## Home Screen Widgets

### Purpose
At-a-glance information without opening app.

### Widget Sizes
Measured in grid cells (varies by launcher):
- Small: 2×1 cells
- Medium: 3×2 cells
- Large: 4×3 cells
- Resizable: User adjustable

### Design Principles
- **Glanceable:** Quick information scan
- **Useful:** Genuinely helpful
- **Current:** Show latest data
- **Tappable:** Deep link into app

### Widget Content
Good widget content:
- Weather conditions
- Upcoming events
- Progress tracking
- Quick actions
- Media controls

Poor widget content:
- Static advertisements
- Rarely changing information
- Overly complex UI

## Lock Screen

### Presence
- Notifications appear on lock screen
- Privacy sensitive content should be hideable
- Consider what's visible when locked

### Media Controls
- Now playing widget
- Playback controls
- Album art

## Try It Yourself

### Exercise 1: Notification Design

Design a notification for:
- A new message
- A completed download
- A reminder

Include collapsed and expanded states.

### Exercise 2: Widget Design

Design a widget for an app at three sizes:
- What shows at smallest?
- What's added at medium?
- How does large size help?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-notifications-quiz",
  "type": "multiple-choice",
  "title": "Notifications and Widgets",
  "description": "Test your understanding of Android notifications.",
  "difficulty": "medium",
  "question": "What are notification channels in Android and why are they important?",
  "options": [
    {
      "id": "a",
      "text": "Different visual styles for notifications",
      "isCorrect": false,
      "explanation": "Channels are about categorisation and user control, not visual style."
    },
    {
      "id": "b",
      "text": "Categories that let users control importance and behaviour of different notification types",
      "isCorrect": true,
      "explanation": "Correct! Channels group notifications by type (messages, promotions, updates). Users can customise sound, vibration, and importance per channel, or disable specific channels entirely."
    },
    {
      "id": "c",
      "text": "The communication protocol notifications use",
      "isCorrect": false,
      "explanation": "Channels are a UI/UX concept, not a technical protocol."
    },
    {
      "id": "d",
      "text": "They're only used for chat applications",
      "isCorrect": false,
      "explanation": "All apps should use channels to categorize their notifications."
    }
  ]
}
-->

## Key Takeaways

- Notifications should be timely, personal, actionable
- Keep notifications concise with useful actions
- Widgets provide glanceable, useful information
- Design for multiple sizes
- Consider privacy on lock screen

## Congratulations!

You've completed the Android Design Patterns module!

Continue to [Designing for Android: Designing Android Apps in Figma](../03-designing-for-android/01-designing-android-apps-in-figma.md) →
