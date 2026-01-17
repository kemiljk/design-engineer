# Android Navigation

> **Quick Summary:** Android navigation is defined by flexibility and the system Back gesture. Unlike iOS's strict hierarchy, Android apps must adapt to diverse form factors (phones, foldables, tablets) while providing predictable movement through primary and secondary destinations.

## What You'll Learn

- The core navigation components: Bottom Bar, Navigation Rail, and Drawer
- The crucial difference between "Back" and "Up"
- Managing hierarchies with the Navigation Component
- Designing for predictable flow

## Primary Navigation Structures

Android offers three main ways to handle top-level navigation. Your choice depends heavily on screen size and the complexity of your application.

### Bottom Navigation Bar

This is the standard for mobile apps on portrait screens. It holds three to five top-level destinations that require direct access. The labels are persistent, and the active state is clearly highlighted. Bottom navigation implies that the destinations are peers—one isn't more important than another. It's excellent for thumb reachability on tall phones.

### Navigation Rail

On tablets, foldables, and landscape orientations, the bottom bar can waste vertical space. The Navigation Rail moves these destinations to a vertical column on the left edge. This is the responsive evolution of the bottom bar—it uses the same destinations but places them better for wide screens, allowing the content to expand.

### Navigation Drawer

When you have more than five destinations, or when your destinations are secondary utilities rather than primary views, a Drawer is the standard pattern. It slides in from the left and can hold a long vertical list of items.

**Design Tip:** Avoid combining a Bottom Bar and a Drawer if possible. It splits the user's mental model of "where things are." If you must use both, ensure the Drawer contains only secondary items (Settings, About, Account) that don't compete with the primary flow in the Bottom Bar.

## Secondary Navigation

### Tabs

Tabs organise related content at the same hierarchy level. Unlike bottom navigation, tabs are often context-specific, such as "Songs, Albums, Artists" within a Music Library screen.

Material Design tabs are versatile. **Fixed Tabs** display all tabs at once and are ideal for groups of two or three items. **Scrollable Tabs** work better for longer lists of categories, allowing users to swipe the tab bar itself. Critically, tabs on Android allow users to swipe the *content area* to switch tabs, a gesture that adds fluid interactivity not found in standard iOS tabs.

### The Top App Bar

The Top App Bar provides context and control. It displays the current screen title, the "Up" navigation icon (or the menu hamburger), and contextual actions (like Search or Filter) on the right. It anchors the user in the hierarchy.

## Back vs. Up: The Eternal Confusion

Android has two distinct concepts of "going back," and confusing them is a common mistake.

### The System Back

This is the gesture (swiping from the edge) or the physical button. It moves **backward in time**, reversing the user's chronological history. If you opened App A, clicked a link to App B, and pressed Back, you return to App A. It undoes the last action or navigation.

### The Up Button

This is the arrow in the Top App Bar. It moves **upward in hierarchy**, staying within your app's structure. If you opened App A, clicked a link to App B's "Detail Screen", the Up button would take you to App B's "Main List"—even though you were never there.

**Why it matters:** If a user enters your app via a deep link (e.g., from a notification), pressing **Back** might exit the app because their history is empty. However, pressing **Up** should take them to the parent screen, ensuring they are not stranded.

## Navigation Patterns

### Stack Navigation

This is the standard flow. You tap an item, and a new screen slides or fades in, pushing onto the stack. Pressing back pops it off. It mimics a physical pile of cards.

### Hub and Spoke

A central "Hub" (Dashboard) leads to distinct "Spokes" (features). Users typically return to the Hub to switch tasks. This pattern is common in banking or utility apps where tasks are distinct and separate.

### Lateral Navigation

Moving between sibling screens, like swiping through emails, is lateral navigation. This often conflicts with the system Back gesture, so you must provide clear visual cues—like pagination dots or tabs—to indicate that swiping changes the content, not the history.

## Best Practices

### Preserve State

If a user scrolls down the "Home" tab, switches to "Profile," and then switches back to "Home," their scroll position must be preserved. Resetting the state breaks the illusion of a persistent space and frustrates users.

### Deep Linking

Android handles intents heavily. Your navigation structure must handle a user "parachuting" into a deep detail screen from a notification or another app. Always ensure they can navigate "Up" to safety, even if they didn't start at your home screen.

## Try It Yourself

### Exercise 1: Responsive Navigation

Sketch a navigation scheme for a music app. Define how it adapts across devices:
- **Mobile:** Use a Bottom Bar for Home, Search, and Library.
- **Tablet:** Switch to a Navigation Rail.
- **Drawer:** Use this for secondary items like Settings, Account, and Help.
- **Transition:** Draw how the layout shifts when you rotate a tablet from portrait to landscape.

### Exercise 2: The Deep Link Test

Imagine a user taps a notification for "New Message from Alice."
1.  They land on the **Message Detail** screen.
2.  They tap **Back**. Ideally, they go to the Home screen or exit the app, depending on their previous history.
3.  They tap **Up**. They must go to the **Inbox List**, preserving the app's hierarchy.

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

- Use **Bottom Navigation** for mobile and **Navigation Rail** for tablet/desktop.
- Remember that **System Back** moves through history (time) while **Up** moves through hierarchy (structure).
- Reserve **Drawers** for secondary destinations, not the primary flow.
- Handle **deep links** carefully by managing the Up stack to prevent stranding users.

## Next Steps

Continue to [Android Components](./02-android-components.md) →
