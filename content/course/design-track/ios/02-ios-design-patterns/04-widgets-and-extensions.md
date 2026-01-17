# Widgets and Extensions

> **Quick Summary:** Your app's experience isn't limited to when it's open. Widgets, Lock Screen extensions, and Live Activities bring your most valuable content directly to the system surfaces users see hundreds of times a day.

## What You'll Learn

- Designing effective Home Screen widgets
- Constraints of Lock Screen widgets
- Creating dynamic Live Activities
- The "glanceable" design mindset

## Home Screen Widgets

Widgets are windows into your app's content, placed directly on the Home Screen alongside app icons. They come in three standard sizes (Small, Medium, Large), plus an Extra Large size for iPad.

### The Glanceable Mindset

A widget is not a mini-app. It's a dashboard. Users view their Home Screen for seconds at a time. If your widget requires interaction to be useful, or if the text is too dense to read in a glance, it fails its primary purpose.

**What works well:**
- **Current status:** Weather, stock prices, battery level.
- **Timely content:** Upcoming calendar events, reminders due today.
- **Personalised surfacing:** "On this day" photos, suggested playlists.

**What fails:**
- **Navigation menus:** Don't use a widget just to launch deep links.
- **Forms:** You can't type in a widget.
- **Scrollable content:** Widgets generally don't scroll. You show a snapshot, not a feed.

### Interactivity

With iOS 17, widgets gained interactivity. You can now toggle a todo item, play/pause music, or start a timer directly from the widget. However, this interaction must be immediate and lightweight. If an action requires confirmation or complex input, the widget should deep-link into the app instead.

## Lock Screen Widgets

Introduced in iOS 16, these are even more constrained. They sit below the clock on the Lock Screen, always visible when the phone is raised.

**Design Constraints:**
- **Monochrome:** They use a single colour (tinted by the user's wallpaper choice).
- **Tiny canvas:** You have circular slots (like Apple Watch complications) or small rectangular slots.
- **Legibility:** They must be readable at arm's length.

Think of these as "status indicators" rather than content containers. A fitness ring, a weather icon, or a next meeting time work perfectly. A news headline does not.

## Live Activities

Live Activities are a special class of notification that stays persistent on the Lock Screen (and in the Dynamic Island on supported devices). They are perfect for events with a defined start and end.

**Perfect Use Cases:**
- **Ridesharing:** "Driver arriving in 3 mins."
- **Food Delivery:** "Order picked up."
- **Sports:** "Q4 02:30 - Score 88-92."
- **Timers:** "15:00 remaining."

### Designing for the Island

On iPhone 14 Pro and newer, Live Activities inhabit the Dynamic Island. This area expands and contracts.

- **Compact State:** The default pill shape. You have a "leading" (left) and "trailing" (right) area. Show the most critical data here (e.g., the score of a game).
- **Expanded State:** When a user long-presses the Island, it expands to show more detail. This is where you can show the play-by-play or driver details.
- **Minimal State:** If multiple apps are using the Island, yours might be reduced to a tiny circle. Ensure your most vital icon is recognisable even at this scale.

## Best Practices

### Respect the System Aesthetic

Widgets sit right next to system apps. If your widget uses a wildly different corner radius, font size, or margin, it will look broken. Use standard SwiftUI padding and font styles to ensure your widget feels like a native part of the OS.

### Update Frequency

Widgets don't update in real-time (except for Live Activities). The system gives your widget a "budget" for updates to save battery. Design your content so it doesn't look stale if it's 15 minutes old. For things that *must* be second-by-second (like a timer), use a Live Activity, not a standard widget.

## Try It Yourself

### Exercise 1: The Widget Hierarchy

Take your app concept and design a **Small**, **Medium**, and **Large** widget.
- **Small:** Show *one* piece of data (e.g., "75°").
- **Medium:** Show that data plus context (e.g., "75°, High 82°, Low 60°").
- **Large:** Show the data, context, and a list of upcoming items (e.g., the 5-day forecast).

### Exercise 2: Live Activity Storyboard

Sketch the lifecycle of a Live Activity for a food delivery app.
1.  **Order Placed:** "Preparing your food" (Lock Screen)
2.  **Pickup:** "Driver at restaurant" (Dynamic Island Compact)
3.  **Delivery:** "Arriving in 2 mins" (Dynamic Island Expanded)
4.  **End:** Activity dismisses automatically.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-widgets-quiz",
  "type": "multiple-choice",
  "title": "Widgets and Extensions",
  "description": "Test your understanding of iOS widgets.",
  "difficulty": "medium",
  "question": "Which iOS surface allows for real-time, second-by-second updates?",
  "options": [
    {
      "id": "a",
      "text": "Home Screen Widgets",
      "isCorrect": false,
      "explanation": "Home Screen widgets update periodically on a system budget to save battery."
    },
    {
      "id": "b",
      "text": "Lock Screen Widgets",
      "isCorrect": false,
      "explanation": "Like Home Screen widgets, these update periodically."
    },
    {
      "id": "c",
      "text": "Live Activities",
      "isCorrect": true,
      "explanation": "Correct! Live Activities (on Lock Screen and Dynamic Island) are designed specifically for real-time events like timers, sports scores, and delivery tracking."
    },
    {
      "id": "d",
      "text": "App Library",
      "isCorrect": false,
      "explanation": "The App Library is just a list of apps."
    }
  ]
}
-->

## Key Takeaways

- **Home Screen Widgets** are for glanceable, timely content with limited interaction.
- **Lock Screen Widgets** are tiny, monochrome status indicators.
- **Live Activities** handle real-time, ephemeral events (delivery, sports).
- **Dynamic Island** integrates your Live Activity into the system status bar area.
- Don't try to cram your whole app into a widget—focus on value per pixel.

## Congratulations!

You've completed the iOS Design Patterns module!

Continue to [Designing for iOS: Designing iOS Apps in Figma](../03-designing-for-ios/01-designing-ios-apps-in-figma.md) →
