# Motion Design Principles for iOS

> **Quick Summary:** Motion on iOS isn't decoration—it's communication. Learn how to design animations that feel natural and enhance the user experience.

## What You'll Learn

- iOS motion philosophy
- Spring animations and physics
- When and how to animate
- Designing for Reduce Motion

<!-- illustration: ios-spring-animation -->

## The iOS Motion Philosophy

### Motion as Communication
Every animation should serve a purpose:
- **Orientation:** Where am I?
- **Continuity:** Where did that come from?
- **Feedback:** Did my action work?
- **Delight:** Make it feel good

### Physics-Based Motion
iOS animations feel real because they follow physics:
- Objects have mass and momentum
- Movements ease in and out naturally
- Nothing starts or stops abruptly
- Spring dynamics create organic feel

## Spring Animations

### Why Springs?
Traditional easing curves feel artificial:
- Linear: Robotic
- Ease-in-out: Predictable
- Springs: Natural and responsive

### Spring Parameters

**Damping:**
- Low damping = bouncy
- High damping = smooth settle
- iOS typically uses 0.7-1.0

**Stiffness:**
- High = snappy response
- Low = lazy, gentle movement
- Adjust based on element size

**Mass:**
- Heavier objects move slower
- Lighter objects respond quickly
- Usually kept at 1.0

### Common iOS Spring Presets

| Animation | Duration | Damping | Feel |
|-----------|----------|---------|------|
| Quick response | 0.25s | 0.9 | Snappy |
| Standard | 0.35s | 0.85 | Balanced |
| Gentle | 0.5s | 0.75 | Relaxed |
| Bouncy | 0.4s | 0.6 | Playful |

## When to Animate

### Always Animate
- **Transitions:** Screen changes
- **State changes:** Button states, toggles
- **Feedback:** Success, error, loading
- **Reveals:** Content appearing

### Consider Carefully
- **Decorative:** Fun but may annoy
- **Loops:** Can be distracting
- **Complex:** May impact performance

### Never Animate
- **Critical information:** Don't delay
- **Repeated actions:** Gets tedious
- **When user chose Reduce Motion**

## Types of iOS Animations

### Navigation Transitions
Standard push/pop:
- New screen slides in from right
- Old screen slides left with slight scale
- Duration: ~0.35 seconds
- Spring damping: ~0.85

### Modal Presentations
Sheet-style modals:
- Slides up from bottom
- Background scales down slightly
- Interactive dismiss with spring back

### Micro-interactions
Small, purposeful animations:
- Button press: subtle scale (0.95)
- Toggle switch: spring-based slide
- Checkmark: path animation
- Like button: bounce effect

### Loading States
Keep users informed:
- Skeleton screens (preferred)
- Spinner as last resort
- Progress bars for known duration

## Designing Animations in Figma

### Prototyping Motion
1. Use Smart Animate for simple transitions
2. Create component variants for states
3. Specify spring settings when possible
4. Include timing specifications

### Documenting for Developers
Include in your specs:
- Duration in seconds
- Spring damping ratio
- Delay if applicable
- Interaction trigger

Example spec:

| Property | Value |
|----------|-------|
| Animation | Card expansion |
| Trigger | Tap |
| Duration | 0.35s |
| Spring damping | 0.85 |
| Curve | Spring |

## Designing for Reduce Motion

### Respecting User Preference
When Reduce Motion is enabled:
- Replace zooms with fades
- Replace slides with crossfades
- Remove parallax effects
- Simplify complex sequences

### What to Keep
Even with Reduce Motion:
- Necessary feedback (loading)
- Essential state changes
- Very subtle transitions
- Functional animations

### What to Remove
- Decorative animations
- Auto-playing animations
- Complex choreography
- Parallax and physics effects

## Motion Audit Checklist

For each animation, ask:
- [ ] Does it communicate something?
- [ ] Does it use spring physics?
- [ ] Is it interruptible?
- [ ] Does it respect Reduce Motion?
- [ ] Is the timing appropriate?
- [ ] Does it enhance, not distract?

## Try It Yourself

### Exercise 1: Animation Inventory

Open 3 Apple apps and note:
1. What triggers each animation?
2. How long does it last?
3. Does it bounce or settle smoothly?
4. What purpose does it serve?

### Exercise 2: Spring Parameters

In your design tool or code:
1. Create a simple moving element
2. Try different damping values (0.5, 0.75, 0.9)
3. Try different durations (0.25s, 0.35s, 0.5s)
4. Find the combination that feels right

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-motion-quiz",
  "type": "multiple-choice",
  "title": "iOS Motion Design",
  "description": "Test your understanding of motion design principles.",
  "difficulty": "medium",
  "question": "What happens to your animations when a user enables 'Reduce Motion' in iOS settings?",
  "options": [
    {
      "id": "a",
      "text": "All animations are completely disabled",
      "isCorrect": false,
      "explanation": "Reduce Motion doesn't disable all animations—essential feedback animations should still work."
    },
    {
      "id": "b",
      "text": "Animations play at half speed",
      "isCorrect": false,
      "explanation": "Reduce Motion doesn't slow animations. It changes or removes them."
    },
    {
      "id": "c",
      "text": "Complex motions should be replaced with simpler alternatives like crossfades",
      "isCorrect": true,
      "explanation": "Correct! When Reduce Motion is enabled, designers should replace zooms, slides, and bounces with simple crossfades while keeping essential feedback."
    },
    {
      "id": "d",
      "text": "Only the app's custom animations are affected",
      "isCorrect": false,
      "explanation": "System animations are also simplified when Reduce Motion is enabled."
    }
  ]
}
-->

## Key Takeaways

- iOS motion uses spring physics for natural feel
- Every animation should serve a communication purpose
- Standard spring damping is around 0.7-0.9
- Always provide alternatives for Reduce Motion
- Document animation specs for developers

## Next Steps

Continue to [Designing Across Devices](./04-designing-across-devices.md) →
