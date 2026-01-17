# Designing for Android Device Variety

> **Quick Summary:** Android runs on phones, tablets, foldables, TVs, and watches. Learn how to create adaptive designs that shine on every screen.

## What You'll Learn

- Understanding Android device landscape
- Designing for window size classes
- Adapting layouts for foldables
- Wear OS considerations

<!-- illustration: android-device-family -->

## The Android Device Landscape

Android is an operating system that refuses to be contained by a single form factor. It powers over 2 billion active devices, ranging from 4-inch budget phones to massive 12-inch tablets, from watches on your wrist to televisions in your living room.

For a designer, this variety is both a challenge and an opportunity. You cannot simply design a "mobile" screen and a "desktop" screen. Instead, you must design a responsive system that flows like water into whatever container the user holds.

### Device Categories

While there are thousands of unique devices, they generally fall into three bucket sizes based on their width:

| Category | Width Range | Examples |
|----------|-------------|----------|
| Compact | < 600dp | Most phones in portrait mode |
| Medium | 600-840dp | Small tablets, unfolded foldables |
| Expanded | > 840dp | Large tablets, desktop mode |

## Window Size Classes

To manage this diversity without going insane, Google introduced **Window Size Classes**. Rather than targeting specific devices (like "Pixel 7" or "Samsung Galaxy Tab"), you design for three standardized breakpoints: Compact, Medium, and Expanded.

### Compact Width (< 600dp)
This is the standard phone experience. Space is at a premium. Layouts here almost always use a single column. Navigation typically lives at the bottom of the screen (Bottom Navigation Bar) so it remains reachable with a thumb. When content is deep, you rely on stacking views—tapping an item replaces the current screen with a detail view.

### Medium Width (600-840dp)
This class captures small tablets and foldables. Here, you have enough horizontal space to start breaking out of the single column. You might introduce a Navigation Rail on the left side to save vertical space. This is the "awkward teenage phase" of layout—sometimes a stretched phone layout works, but often you need to be more intentional, perhaps showing a list and a detail view side-by-side if the content is sparse.

### Expanded Width (> 840dp)
On large tablets and desktop environments, you have an abundance of space. A single column of text here looks ridiculous—lines become too long to read comfortably. Expanded layouts demand a multi-pane approach. You might have a permanent Navigation Drawer, a list of items, and a detailed view all visible at once. Dialogs float in the center rather than taking up the full screen.

## Designing Adaptive Layouts

### The List-Detail Pattern
The most powerful tool for adapting content is the List-Detail pattern.

On **Compact** screens, the list and the detail are separate destinations. The user taps an email in a list, and the app navigates to the email body.

On **Medium and Expanded** screens, these two views sit side-by-side. The list remains visible on the left, and the detail view updates on the right. This allows users to triage information much faster—they can switch between emails without constantly navigating back and forth.

### Navigation Adaptation
Your navigation structure should morph to fit the device posture:

- **Compact:** Use a **Bottom Navigation Bar**. It's thumb-friendly and maximizes vertical content space.
- **Medium:** Switch to a **Navigation Rail**. This vertical strip on the left takes advantage of the wider screen and prevents the bottom bar from stretching uncomfortably wide.
- **Expanded:** Upgrade to a **Navigation Drawer**. This permanent panel can show full labels and hierarchy, utilizing the ample screen real estate.

### Content Reflow
Content shouldn't just stretch; it should reflow. A grid of cards might show one column on a phone, two on a foldable, and four on a tablet. Hero images that span the full width on a phone might become constrained side-elements on a tablet to prevent them from dominating the viewport.

## Designing for Foldables

Foldables introduce a new dimension to responsive design: physical posture. These devices can be phones, tablets, or something in between, all within seconds.

### Hinge Awareness
The defining feature of a foldable is the hinge. When the device is flat, the hinge is invisible. But when folded, it becomes a physical divider. Your layout must be "hinge-aware." Never place critical UI elements (like a button or a face in a video) directly under the hinge area, as interaction will be difficult and visibility compromised.

### Tabletop Posture
When a foldable is bent at 90 degrees and placed on a surface, it enters Tabletop mode. This is perfect for hands-free tasks. Imagine a video calling app: the top half (facing the user) shows the video feed, while the bottom half (flat on the table) houses the controls. It feels like a mini-laptop.

### Book Mode
Holding a foldable like a book offers a natural reading experience. You can treat the screen as two distinct pages—left and right—mimicking the physical affordance of a paperback. This is excellent for reading apps or comparison views.

## Designing for Wear OS

Designing for the wrist is an exercise in extreme restraint. A user glances at their watch for 2-5 seconds, usually while moving.

### Glanceable First
If a user has to scroll to understand what's happening, the design has failed. Wear OS interfaces must be high-contrast (for outdoor visibility) and focused on a single piece of information. Text should be large, and buttons should be massive (minimum 48dp) to accommodate clumsy taps on a moving target.

### Wear OS Patterns

**Tiles** are swipeable widgets that live to the right of the watch face. They provide instant access to data—weather, fitness progress, or next calendar event. They are not apps; they are shortcuts.

**Complications** are tiny UI elements embedded directly into the watch face. They show bite-sized data like battery life or step count.

**Notifications** are the lifeblood of the watch. They should be actionable. A message notification shouldn't just say "New Message"; it should offer quick replies or a dictation button so the user can respond without pulling out their phone.

## Design File Organization

When managing designs for multiple form factors, organization is key. Avoid creating entirely separate files for Phone and Tablet, as they will drift out of sync. Instead, group them by feature.

```text
📁 App Name
  📁 Feature: Home
    - Compact (Phone)
    - Medium (Foldable/Tablet)
    - Expanded (Large Tablet)
  📁 Feature: Profile
    - Compact
    - Expanded
  📁 Wear OS
    - Tiles
    - App Screens
  📁 Shared Components
    - Adaptive Cards
    - Navigation Elements
```

## Testing Across Devices

You cannot design for Android solely on a generic "360x800" frame. You must test the extremes.

**Emulators:** Android Studio provides resizable emulators that let you drag the corner of the window to switch between phone, tablet, and desktop modes instantly. This is the fastest way to check your layout logic.

**Physical Devices:** Nothing replaces the feel of a real device. A button that looks clickable on a monitor might be unreachable on a real tablet. A font that looks readable might be too small on a watch face in direct sunlight. If you can, test on at least one small phone and one tablet.

## Try It Yourself

### Exercise 1: Size Class Audit

Take the main screen of an app you are designing.
1.  **Compact:** Design it for a standard phone.
2.  **Medium:** Adapt it for a small tablet. Do you keep the bottom nav or switch to a rail? Does the content expand or reflow?
3.  **Expanded:** Design it for a desktop-class screen. Can you introduce a list-detail view?

### Exercise 2: Foldable Consideration

Imagine a cooking app. Design the "Recipe View" for a foldable device in **Tabletop Mode**.
- What goes on the top screen (facing the chef)?
- What goes on the bottom screen (flat on the counter)?
- How does this help a user whose hands are covered in flour?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-devices-quiz",
  "type": "multiple-choice",
  "title": "Designing for Device Variety",
  "description": "Test your understanding of adaptive Android design.",
  "difficulty": "medium",
  "question": "What navigation pattern typically replaces a bottom navigation bar on an expanded-width Android device?",
  "options": [
    {
      "id": "a",
      "text": "A larger bottom navigation bar",
      "isCorrect": false,
      "explanation": "Simply enlarging the bottom bar wastes screen space on larger devices."
    },
    {
      "id": "b",
      "text": "A navigation drawer that's always visible",
      "isCorrect": true,
      "explanation": "Correct! On expanded-width devices (>840dp), Material Design recommends a permanent navigation drawer that takes advantage of the extra screen space."
    },
    {
      "id": "c",
      "text": "Gesture-only navigation",
      "isCorrect": false,
      "explanation": "Removing visible navigation reduces discoverability."
    },
    {
      "id": "d",
      "text": "Top app bar with navigation tabs",
      "isCorrect": false,
      "explanation": "While possible, the navigation drawer is the recommended pattern for expanded layouts."
    }
  ]
}
-->

## Key Takeaways

- Android design isn't about fixed sizes; it's about adaptive window size classes.
- Navigation should evolve from Bottom Bar to Rail to Drawer as screens get wider.
- Foldables offer unique postures (Tabletop, Book) that change how users interact with content.
- Wear OS requires a "glanceable" mindset—maximum info in minimum time.
- Test your designs on resizable emulators to ensure they flow like water.

## Next Steps

Continue to [Design QA and Handoff](./05-design-qa-and-handoff.md) →
