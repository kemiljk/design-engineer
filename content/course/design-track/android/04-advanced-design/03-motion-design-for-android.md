# Motion Design for Android

> **Quick Summary:** Motion in Material Design creates meaning. Learn how to design animations that guide users and bring your Android app to life.

## What You'll Learn

- Material motion principles
- Shared element transitions
- Container transforms
- Designing for Reduce Animations

<!-- illustration: material-motion-system -->

## Material Motion Principles

### Motion is Meaningful
Every animation should:
- **Inform:** Show relationships
- **Focus:** Direct attention
- **Express:** Reflect brand personality
- **Guide:** Lead users through flows

### The Four Principles

**1. Informative**
Motion shows how elements relate:
- Parent-child relationships
- Cause and effect
- Spatial navigation

**2. Focused**
Motion guides attention:
- Highlight important changes
- Reduce cognitive load
- One animation at a time

**3. Expressive**
Motion reflects personality:
- Brand character
- Emotional tone
- Appropriate energy

**4. Coherent**
Motion is consistent:
- Predictable patterns
- Logical movements
- Unified timing

## Material Motion Patterns

### Container Transform
Elements morph from one state to another:

**Use for:**
- Card to detail view
- FAB to full screen
- List item to detail

**Characteristics:**
- Shared boundary expands/contracts
- Content fades and scales
- Maintains spatial relationship

### Shared Axis
Elements move along a spatial axis:

**Horizontal (X):**
- Tab switching
- Onboarding pages
- Carousel navigation

**Vertical (Y):**
- Parent-child navigation
- Expandable sections
- Bottom sheets

**Z-Axis (Depth):**
- Dialogs appearing
- Menus opening
- Content stacking

### Fade Through
Sequential fade out then in:

**Use for:**
- Unrelated content changes
- Tab content switching
- Sign-in state changes

**Characteristics:**
- Current content fades out
- New content fades in
- Brief overlap period

### Fade
Simple opacity change:

**Use for:**
- Subtle state changes
- Toolbar icons
- Background elements

## Timing and Easing

### Standard Durations
Material Design timing:

| Type | Duration | Use Case |
|------|----------|----------|
| Small | 100ms | Icon changes, ripples |
| Medium | 250ms | Cards, chips |
| Large | 300ms | Sheets, dialogs |
| Complex | 375ms+ | Full-screen transitions |

### Easing Curves

**Standard (default):**
- Accelerate then decelerate
- Use for most transitions
- Feels natural and smooth

**Emphasized:**
- Dramatic deceleration
- Use for entering elements
- Creates anticipation

**Linear:**
- Constant speed
- Use for color/opacity only
- Avoid for movement

### Material Easing Values
```
Standard: cubic-bezier(0.2, 0, 0, 1)
Emphasized: cubic-bezier(0.05, 0.7, 0.1, 1)
EmphasizedDecelerate: cubic-bezier(0.05, 0.7, 0.1, 1)
EmphasizedAccelerate: cubic-bezier(0.3, 0, 0.8, 0.15)
```

## Designing Transitions

### FAB to Full Screen
Classic Material transition:

1. FAB begins as source
2. Container expands with easing
3. Content fades in during expansion
4. Final state fills screen

**Specs:**
- Duration: 300ms
- Easing: Emphasized
- Content fade: Start at 50% of duration

### List to Detail
Container transform pattern:

1. List item acts as container
2. Expands to fill screen
3. Content morphs smoothly
4. Back reverses the animation

**Key elements:**
- Shared image scales
- Title repositions
- Background color carries through

### Bottom Sheet
Vertical axis transition:

1. Sheet slides up from bottom
2. Scrim fades in behind
3. Content immediately visible
4. Dismiss: reverse animation

**Specs:**
- Duration: 250ms
- Easing: Standard
- Scrim: 32% black

## Documenting Motion

### Motion Specs Format
Include in handoff:

```markdown
## Card Expansion

**Type:** Container Transform
**Duration:** 300ms
**Easing:** Emphasized

**Sequence:**
1. Card container expands (0-300ms)
2. Source content fades out (0-100ms)
3. Target content fades in (150-300ms)

**Shared Elements:**
- Card background
- Hero image
- Title text
```

### Creating Motion Prototypes

**In Figma:**
- Use Smart Animate
- Create start/end frames
- Set transition type
- Preview the flow

**In ProtoPie:**
- More precise control
- Physics-based springs
- Conditional logic
- Better for complex motion

## Reduce Animations

### Respecting User Preference
When animations are reduced:
- Skip decorative motion
- Use instant transitions
- Keep functional feedback
- Maintain usability

### What to Keep
Even with Reduce Animations:
- Loading indicators
- Progress feedback
- Error shake (simplified)
- Essential state changes

### What to Remove
- Decorative flourishes
- Complex choreography
- Parallax effects
- Auto-playing animations

### Implementation Approach
```kotlin
if (isReduceMotionEnabled) {
    // Instant transition
} else {
    // Full animation
}
```

## Try It Yourself

### Exercise 1: Pattern Identification

Open 3 Google apps. For each transition:
1. Identify the pattern used
2. Estimate the duration
3. Note what information it conveys

### Exercise 2: Transition Design

Design a card-to-detail transition:
1. Create card layout (start state)
2. Create detail layout (end state)
3. Identify shared elements
4. Document the motion spec

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-motion-quiz",
  "type": "multiple-choice",
  "title": "Material Motion",
  "description": "Test your understanding of Android motion design.",
  "difficulty": "medium",
  "question": "Which Material motion pattern should you use when a card expands to show its full detail view?",
  "options": [
    {
      "id": "a",
      "text": "Fade Through",
      "isCorrect": false,
      "explanation": "Fade Through is for unrelated content changes, not for showing relationships."
    },
    {
      "id": "b",
      "text": "Container Transform",
      "isCorrect": true,
      "explanation": "Correct! Container Transform creates a visual connection between the card and its detail view by morphing one into the other, maintaining spatial relationship."
    },
    {
      "id": "c",
      "text": "Shared Axis (X)",
      "isCorrect": false,
      "explanation": "Shared Axis X is for peer navigation like tabs, not for card expansion."
    },
    {
      "id": "d",
      "text": "Fade",
      "isCorrect": false,
      "explanation": "Simple fade doesn't show the spatial relationship between card and detail."
    }
  ]
}
-->

## Key Takeaways

- Material motion has four principles: informative, focused, expressive, coherent
- Container Transform connects related views
- Shared Axis shows navigation relationships
- Standard transitions are around 250-300ms
- Always support Reduce Animations preference

## Next Steps

Continue to [Designing for Device Variety](./04-designing-for-device-variety.md) →
