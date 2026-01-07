# Designing for Android Device Variety

> **Quick Summary:** Android runs on phones, tablets, foldables, TVs, and watches. Learn how to create adaptive designs that shine on every screen.

## What You'll Learn

- Understanding Android device landscape
- Designing for window size classes
- Adapting layouts for foldables
- Wear OS considerations

<!-- illustration: android-device-family -->

## The Android Device Landscape

### Why Device Variety Matters
Android is everywhere:
- **2+ billion** active devices
- Phones from 4" to 7"
- Tablets up to 12"
- Foldables with unique forms
- Wear OS watches
- Android TV
- Chromebooks

### Device Categories

| Category | Width Range | Examples |
|----------|-------------|----------|
| Compact | < 600dp | Most phones |
| Medium | 600-840dp | Small tablets, foldables |
| Expanded | > 840dp | Large tablets, desktop |

## Window Size Classes

### The New Responsive System
Replace fixed breakpoints with:
- **Compact:** Single-pane layouts
- **Medium:** Optional two-pane
- **Expanded:** Multi-pane required

### Compact Width (< 600dp)
Most phone screens:
- Single column layout
- Bottom navigation bar
- Full-width components
- Navigation drawer (hidden)

### Medium Width (600-840dp)
Small tablets, unfolded phones:
- Navigation rail option
- List-detail layouts
- Wider content margins
- Optional second pane

### Expanded Width (> 840dp)
Large tablets, desktop:
- Permanent navigation drawer
- Three-pane layouts
- Multiple content columns
- Floating dialogs

## Designing Adaptive Layouts

### List-Detail Pattern
Most common adaptive layout:

**Compact:**
- List view fills screen
- Tap navigates to detail
- Back returns to list

**Medium/Expanded:**
- List in left pane
- Detail in right pane
- Selection updates detail

### Navigation Adaptation

| Size Class | Navigation Type |
|------------|-----------------|
| Compact | Bottom navigation bar |
| Medium | Navigation rail |
| Expanded | Navigation drawer |

### Content Reflow
Content should reflow intelligently:

**Single column → Two columns:**
- Cards stack vertically → Grid
- Full-width images → Constrained
- Edge-to-edge → Margins

## Designing for Foldables

### Unique Considerations
Foldables introduce:
- **Hinge awareness:** Content across the fold
- **Multiple postures:** Flat, tent, tabletop
- **Seamless transition:** Fold/unfold continuity
- **Dual screen:** Separate displays

### Fold-Aware Design
When screen spans the hinge:
- Avoid placing critical UI on fold
- Use fold as natural divider
- Consider tabletop mode
- Test with emulators

### Tabletop Posture
Phone folded at 90°:
- Upper half: Content viewing
- Lower half: Controls
- Think laptop-like use
- Video calling natural fit

### Book Mode
Foldable in portrait, partially folded:
- Like holding a book
- Left page / right page
- Reading experience
- Comparison views

## Designing for Wear OS

### Glanceable First
Watch interfaces must be:
- **Instant understanding** (2-5 seconds)
- **Minimal content** (one focus)
- **High contrast** (outdoor use)
- **Large targets** (48dp minimum)

### Watch Screen Sizes
- Small: 192×192 dp (40mm)
- Large: 227×227 dp (45mm)
- Round or square displays

### Wear OS Patterns

**Tiles:**
- Swipeable information cards
- Quick glance data
- One tap to app

**Complications:**
- Small data on watch face
- Icon, text, or range
- Tap for more detail

**Notifications:**
- Actionable from wrist
- Simple responses
- Quick dismissal

### What Works on Watch
- ✅ Quick status checks
- ✅ Simple confirmations
- ✅ Health/fitness tracking
- ✅ Notifications
- ✅ Media controls

### What Doesn't Work
- ❌ Long text reading
- ❌ Complex data entry
- ❌ Detailed analysis
- ❌ Multi-step workflows

## Design File Organization

### Structure for Multiple Form Factors

```text
📁 App Name
  📁 Compact (Phone)
    - Home
    - List
    - Detail
  📁 Medium (Small Tablet)
    - Home
    - List-Detail Combined
  📁 Expanded (Large Tablet)
    - Home
    - Three-Pane Layout
  📁 Wear OS
    - Tile
    - Main Screen
    - Complication
  📁 Shared Components
    - Buttons
    - Cards
    - List Items
```

### Component Variants
Create components that adapt:
- Card: Compact vs. expanded padding
- Navigation: Bar vs. rail vs. drawer
- Lists: Full-width vs. constrained

## Testing Across Devices

### Essential Test Devices
At minimum, test on:
- Small phone (360dp width)
- Large phone (412dp width)
- Tablet (800dp+ width)
- Foldable emulator

### Android Studio Tools
- Device Manager emulators
- Resizable emulator
- Foldable posture emulation
- Wear OS emulator

### Physical Device Testing
Nothing replaces real devices:
- Touch target accuracy
- Real-world viewing
- Performance reality
- Gesture feel

## Try It Yourself

### Exercise 1: Size Class Audit

Take your main screen:
1. Design for Compact (phone)
2. Adapt for Medium (show list-detail)
3. Adapt for Expanded (add navigation drawer)
4. Compare the three versions

### Exercise 2: Foldable Consideration

For a video app:
1. Design normal phone view
2. Design tabletop posture view
3. What goes above the fold?
4. What controls go below?

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

- Use window size classes (compact, medium, expanded)
- Adapt navigation: bar → rail → drawer
- Design fold-aware layouts for foldables
- Keep Wear OS designs glanceable and minimal
- Test across real device variety

## Next Steps

Continue to [Design QA and Handoff](./05-design-qa-and-handoff.md) →
