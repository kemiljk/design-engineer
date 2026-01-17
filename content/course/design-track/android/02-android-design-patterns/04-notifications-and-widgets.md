# Notifications and Widgets

> **Quick Summary:** Great apps don't just wait to be opened; they reach out. Notifications and widgets are your primary tools for re-engagement, but they require a delicate touch. Abuse them, and users will disable them—or uninstall your app.

## What You'll Learn

- The psychology of good notifications
- Anatomy of standard and custom notifications
- Designing versatile Home Screen widgets
- Giving users control with Notification Channels

## The Art of the Notification

Notifications are an interruption. Your job is to ensure the value of the information outweighs the cost of the interruption.

**Good notifications** are:
- **Timely:** "Your driver has arrived." (Actionable now)
- **Personal:** "Alice commented on your photo." (About the user)
- **Actionable:** "Check-in for your flight." (Task-oriented)

**Bad notifications** are:
- **Vague:** "Check out what's new!" (Clickbait)
- **Passive:** "You haven't logged in for 3 days." (Guilt trip)
- **Marketing:** "10% off sale." (Unless explicitly opted-in)

### Notification Channels

Android gives users granular control via **Notification Channels**. You don't just "send notifications." You send them to a channel (e.g., "Messages," "Promotions," "System Alerts").

Users can turn off "Promotions" but keep "Messages" active. Design your app to respect this. If you lump everything into one channel and spam the user, they will block the entire app.

## Notification Anatomy

A standard notification isn't just text; it's a rich surface.

### The Header
Contains the App Icon, App Name, and Timestamp. This establishes trust and context.

### The Content Area
- **Title:** Short and punchy. "New Message" or "Flight Delayed."
- **Text:** The detail. "Alice: Hey, are we still on for lunch?"
- **Large Icon (Optional):** An avatar or thumbnail on the right. Essential for messaging apps to show *who* is talking.

### The Expanded View
Users can drag down on a notification to expand it. This is where you can show:
- **Big Picture Style:** A large photo preview.
- **Big Text Style:** The full email body.
- **Inbox Style:** A list of multiple new messages.

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
1.  Which ones were useful? Which were annoying?
2.  Did any offer inline actions (Reply, Delete)?
3.  How would you redesign the annoying ones to be useful (or would you remove them entirely)?

### Exercise 2: Widget States

Sketch a "Notes" widget.
1.  **Small State:** Shows the title of the most recent note.
2.  **Expanded State:** Shows a scrollable list of recent notes and a "New Note" button.
3.  **Empty State:** What does it look like if the user has no notes?

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
      "explanation": "Correct! Channels categorize notifications so users can fine-tune what they want to receive, reducing the likelihood of them blocking your app entirely."
    },
    {
      "id": "d",
      "text": "They make notifications appear in a different color",
      "isCorrect": false,
      "explanation": "Channels don't control color theming."
    }
  ]
}
-->

## Key Takeaways

- **Notifications are a privilege.** Deliver value, or get blocked.
- Use **Channels** to categorize your alerts.
- **Actions** make notifications powerful productivity tools.
- **Widgets** on Android can be scrollable and interactive; design for variable sizes.

## Congratulations!

You've completed the Android Design Patterns module!

Continue to [Designing for Android: Designing Android Apps in Figma](../03-designing-for-android/01-designing-android-apps-in-figma.md) →
