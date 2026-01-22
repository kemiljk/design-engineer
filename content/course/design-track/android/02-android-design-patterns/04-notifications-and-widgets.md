# Notifications and Widgets

> **Quick Summary:** Great apps don't just wait to be opened; they reach out. Notifications and widgets are your primary tools for re-engagement, but they require a delicate touch. Abuse them, and users will disable them—or uninstall your app.

## What You'll Learn

- Psychology behind effective notification design
- Anatomy of standard and custom notification surfaces
- How to build versatile Home Screen widgets
- Giving users granular control using Notification Channels

## The Art of the Notification

Notifications are an interruption. Your job is to ensure the value of the information outweighs the cost of the interruption.

**Good notifications** are:
Effective notifications provide value through **timely** arrival and **personal** relevance, driving **actionable** tasks like flight check-ins or replying to comments. Avoid notifications that are vague, passive, or purely promotional unless the user has explicitly opted in.

### Notification Channels

Android gives users granular control via **Notification Channels**. You don't just "send notifications." You send them to a channel (e.g., "Messages," "Promotions," "System Alerts").

Users can turn off "Promotions" but keep "Messages" active. Design your app to respect this. If you lump everything into one channel and spam the user, they will block the entire app.

## Notification Anatomy

A standard notification isn't just text; it's a rich surface.

### The Header
Contains the App Icon, App Name, and Timestamp. This establishes trust and context.

### The Content Area
The content area includes a punchy **Title**, descriptive **Text**, and an optional **Large Icon** or avatar to identify the source.

### The Expanded View
Users can drag down on a notification to expand it. This is where you can show:
Expanded views allow users to see more detail through **Big Picture**, **Big Text**, or **Inbox** styles.

### Actions
You can add up to three action buttons at the bottom (e.g., "Reply," "Archive," "Mark as Read"). These are powerful because they let users complete tasks *without opening the app*.

## Home Screen Widgets

Widgets on Android are mini-applications on the home screen. They are more interactive than iOS widgets.

### Resizability
Unlike iOS's fixed sizes, Android widgets are often resizable by the user. Your design must adapt fluidly. A widget might start as a **2x1** tile showing just a weather icon, but if the user stretches it to **4x4**, it should reveal a weekly forecast and a radar map.

### Interactivity
Android widgets support basic interactions. Users can scroll through lists (like an email inbox) or tap buttons (like play/pause on a media player) directly on the home screen.

### Updates
Widgets update periodically (usually every 30+ minutes) to save battery. Do not use widgets for second-by-second countdowns unless you are using a foreground service (like a media player), which has a higher battery cost.

## Try It Yourself

### Exercise 1: The Notification Audit

Look at the last 5 notifications you received on your phone.
Review the last five notifications you received and identify which ones were genuinely useful versus those that were simply annoying. Look for any that offered inline actions like replying or deleting, and consider how you would either redesign the disruptive alerts to provide more value or determine if they should be removed entirely.

### Exercise 2: Widget States

Sketch a "Notes" widget.
Sketch a "Notes" widget that adapts across three distinct states. At its smallest size, it should only show the title of the most recent note, while the expanded view should reveal a scrollable list of recent entries and a "New Note" button. Finally, consider the empty state and decide exactly how the widget appears when the user has no notes saved.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-notifications-quiz",
  "type": "multiple-choice",
  "title": "Notifications and Widgets",
  "description": "Test your understanding of Android notifications.",
  "difficulty": "medium",
  "question": "What is the primary benefit of Android Notification Channels?",
  "options": [
    {
      "id": "a",
      "text": "They allow developers to send unlimited notifications without permission",
      "isCorrect": false,
      "explanation": "Permission is always required (Android 13+)."
    },
    {
      "id": "b",
      "text": "They create a dedicated visual feed within the app",
      "isCorrect": false,
      "explanation": "Channels affect system notifications, not in-app feeds."
    },
    {
      "id": "c",
      "text": "They empower users to disable specific types of notifications (like Marketing) while keeping important ones (like Messages)",
      "isCorrect": true,
      "explanation": "Correct! Channels categorise notifications so users can fine-tune what they want to receive, reducing the likelihood of them blocking your app entirely."
    },
    {
      "id": "d",
      "text": "They make notifications appear in a different color",
      "isCorrect": false,
      "explanation": "Channels don't control colour theming."
    }
  ]
}
-->

## Key Takeaways

Treat notifications as a privilege by ensuring every alert delivers genuine value to the user and is correctly categorised through system channels. By including powerful inline actions, you can transform notifications into productive micro-interfaces, while designing interactive and scrollable widgets that adapt to variable home screen sizes provides another layer of utility and re-engagement.

## Congratulations!

You've completed the Android Design Patterns module!

Continue to [Designing for Android: Designing Android Apps in Figma](../03-designing-for-android/01-designing-android-apps-in-figma.md) →
