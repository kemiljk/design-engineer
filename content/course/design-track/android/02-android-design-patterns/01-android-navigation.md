# Android Navigation

> **Quick Summary:** Android navigation is defined by flexibility and the system Back gesture. Unlike iOS's strict hierarchy, Android apps must adapt to diverse form factors (phones, foldables, tablets) while providing predictable movement through primary and secondary destinations.

## What You'll Learn

- The core navigation components: Bottom Bar, Navigation Rail, and Drawer
- The crucial difference between "Back" and "Up"
- Managing hierarchies with the Navigation Component
- Designing for predictable flow

## Primary Navigation Structures

Android offers three main ways to handle top-level navigation, and your choice depends heavily on screen size and complexity.

### Bottom Navigation Bar

This is the standard for mobile apps. It holds **3 to 5 top-level destinations** that require direct access. The labels are persistent, and the active state is clearly highlighted. Bottom navigation implies that the destinations are peers—one isn't more important than another. It's excellent for thumb reachability on tall phones.

### Navigation Rail

On tablets, foldables, and landscape orientations, the bottom bar can waste vertical space. The Navigation Rail moves these destinations to a vertical column on the left edge. This is the responsive evolution of the bottom bar—same destinations, better placement for wide screens.

### Navigation Drawer

When you have **more than 5 destinations**, or when your destinations are secondary utilities rather than primary views, a Drawer is the standard pattern. It slides in from the left, capable of holding a long vertical list of items.

**Design Tip:** Avoid combining a Bottom Bar and a Drawer if possible. It splits the user's mental model of "where things are." If you must, ensure the Drawer contains only secondary items (Settings, About, Account) that don't compete with the primary flow.

## Secondary Navigation

### Tabs

Tabs organise related content at the same hierarchy level. Unlike bottom navigation, tabs are often context-specific (e.g., "Songs, Albums, Artists" within a Music Library screen).

Material Design tabs are versatile:
*   **Fixed Tabs:** All tabs are visible at once; ideal for 2-3 items.
*   **Scrollable Tabs:** For longer lists of categories; users can swipe the tab bar itself.

Critically, tabs on Android allow users to swipe the *content area* to switch tabs, a gesture not standard on iOS.

### The Top App Bar

The Top App Bar provides context. It displays the current screen title, the "Up" navigation icon (or the menu hamburger), and contextual actions (like Search or Filter) on the right.

## Back vs. Up: The Eternal Confusion

Android has two distinct concepts of "going back," and confusing them is the most common mistake designers make.

### The System Back

This is the gesture (swiping from the edge) or the physical button. It moves **backward in time**. It reverses the user's chronological history. If you opened App A, clicked a link to App B, and pressed Back, you return to App A.

### The Up Button

This is the arrow in the Top App Bar. It moves **upward in hierarchy**. It stays within your app. If you opened App A, clicked a link to App B's "Detail Screen", the Up button would take you to App B's "Main List"—even though you were never there.

**Why it matters:** If a user enters your app via a deep link (e.g., from a notification), pressing **Back** might exit the app (history is empty), but pressing **Up** should take them to the parent screen (hierarchy exists).

## Navigation Patterns

### Stack Navigation

The standard flow. You tap an item, a new screen slides in (or fades in). The new screen pushes onto the stack. Pressing back pops it off.

### Hub and Spoke

A central "Hub" (Dashboard) leads to distinct "Spokes" (features). Users typically return to the Hub to switch tasks. This is common in banking or utility apps.

### Lateral Navigation

Moving between sibling screens (like swiping through emails). This often conflicts with the system Back gesture, so visual cues (like pagination dots) are essential.

## Best Practices

### Preserve State

If a user scrolls down the "Home" tab, switches to "Profile," and switches back to "Home," their scroll position must be preserved. Resetting the state feels broken and frustrating.

### Deep Linking

Android handles intents heavily. Your navigation structure must handle a user "parachuting" into a deep detail screen. Always ensure they can navigate "Up" to safety.

## Try It Yourself

### Exercise 1: Responsive Navigation

Sketch a navigation scheme for a music app.
*   **Mobile:** Bottom Bar (Home, Search, Library).
*   **Tablet:** Navigation Rail.
*   **Drawer:** Settings, Account, Help.
*   How does the layout transition when you rotate the tablet?

### Exercise 2: The Deep Link Test

Imagine a user taps a notification for "New Message from Alice."
1.  They land on the **Message Detail** screen.
2.  They tap **Back**. Where do they go? (Ideally: Home screen or exit app, depending on history).
3.  They tap **Up**. Where do they go? (Must be: Inbox list).

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-navigation-quiz",
  "type": "multiple-choice",
  "title": "Android Navigation",
  "description": "Test your understanding of Android navigation patterns.",
  "difficulty": "medium",
  "question": "A user opens your app via a notification directly to a Detail screen. They have no previous history in the app session. What happens when they tap the 'Up' arrow in the Top App Bar?",
  "options": [
    {
      "id": "a",
      "text": "The app closes because there is no history",
      "isCorrect": false,
      "explanation": "That describes the System Back button in this scenario."
    },
    {
      "id": "b",
      "text": "They navigate to the parent screen (e.g., the List view), creating a synthetic back stack",
      "isCorrect": true,
      "explanation": "Correct! The Up button always navigates hierarchically to the parent screen, ensuring the user isn't stranded, even if they never visited the parent screen in this session."
    },
    {
      "id": "c",
      "text": "Nothing happens",
      "isCorrect": false,
      "explanation": "Broken navigation is never the answer."
    },
    {
      "id": "d",
      "text": "They go to the Android Home Screen",
      "isCorrect": false,
      "explanation": "Again, this describes System Back behaviour."
    }
  ]
}
-->

## Key Takeaways

-   **Bottom Navigation** for mobile; **Navigation Rail** for tablet/desktop.
-   **System Back** moves through history (time); **Up** moves through hierarchy (structure).
-   **Drawers** are for secondary/tertiary destinations, not primary flow.
-   **Deep links** require careful handling of the Up stack to prevent stranding users.

## Next Steps

Continue to [Android Components](./02-android-components.md) →
