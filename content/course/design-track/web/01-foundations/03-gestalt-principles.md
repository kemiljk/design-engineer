# Gestalt Principles

> **Quick Summary:** Gestalt principles explain how humans perceive visual information. Understanding them lets you design interfaces that work with the brain, not against it.

## What You'll Learn

- What Gestalt psychology is and why it matters for design
- The seven key Gestalt principles
- How to apply these principles in UI design
- Common patterns that leverage Gestalt principles

## The Psychology of Perception

> *"The whole is other than the sum of its parts."* — Kurt Koffka

Gestalt is a German word meaning "form" or "shape." Gestalt psychology, developed in the early 20th century, studies how humans perceive patterns and organise visual information.

The core insight: **The brain doesn't see individual elements. It sees relationships and wholes.**

When you look at a interface, you don't consciously process each pixel. Your brain automatically groups, connects, and interprets elements based on predictable patterns. Gestalt principles describe these patterns.

Understanding these principles helps you design interfaces that feel natural and intuitive. Violating them creates interfaces that feel confusing, even if users can't articulate why.

## The Seven Principles

### 1. Proximity

<!-- illustration: gestalt-proximity -->

Elements that are close together are perceived as a group.

**How it works:**
Your brain assumes that nearby items are related. This happens automatically, without conscious thought.

**In UI design:**
- Group related form fields by reducing space between them
- Separate distinct sections by increasing space
- Create logical groupings without needing boxes or dividers

**Example:**
A navigation menu with items spaced evenly feels like a unified group. If one item has extra space on either side, it feels separate, intentionally or not.

### 2. Similarity

Elements that look similar are perceived as related.

<!-- visual-example: gestalt-similarity-demo -->

**How it works:**
Similarity can be in colour, shape, size, texture, or any visual attribute. Similar items feel like they belong together.

**In UI design:**
- Use consistent styling for elements with the same function (all buttons look alike)
- Differentiate element types through visual treatment (links look different from buttons)
- Group related items by giving them shared visual properties

**Example:**
In a data table, alternating row colours create perceived groups of two rows each. Using different colours for different data types creates category groupings.

### 3. Continuity

The eye follows smooth paths and lines, even when interrupted.

<!-- visual-example: gestalt-continuity-demo -->

**How it works:**
When elements are arranged along a line or curve, we perceive them as related and follow the path. The eye prefers continuous lines over sharp breaks.

**In UI design:**
- Align elements to create implicit lines that guide the eye
- Use progress indicators and step flows that lead users forward
- Create visual flow through intentional arrangement

**Example:**
A horizontal timeline creates continuity. Users naturally follow it from left to right. A progress bar draws the eye along its length.

### 4. Closure

The brain completes incomplete shapes, perceiving them as whole.

<!-- visual-example: gestalt-closure-demo -->

<!-- illustration: closure-principle -->

**How it works:**
You don't need to show every detail. The brain fills in gaps and sees complete forms even when parts are missing.

**In UI design:**
- Crop images or content to imply there's more (carousel peek)
- Use partial shapes and outlines that users mentally complete
- Show "load more" patterns that suggest additional content

**Example:**
A card that extends past the screen edge implies scrollability. Users understand there's more content even though they can't see it.

### 5. Common Region

Elements within the same bounded area are perceived as a group.

<!-- visual-example: gestalt-common-region-demo -->

**How it works:**
A border, background colour, or other visual container creates a region. Everything inside feels related.

**In UI design:**
- Use cards to group related content
- Apply background colours to sections
- Add borders or dividers to create separation

**Example:**
A card component groups an image, title, description, and button. Without the card boundary, these elements might not feel related.

### 6. Figure-Ground

We perceive elements as either foreground (figure) or background (ground).

<!-- visual-example: gestalt-figure-ground-demo -->

<!-- illustration: figure-ground -->

**How it works:**
The brain separates what's important (figure) from what's not (ground). This creates depth and focus.

**In UI design:**
- Use modals and overlays that dim the background
- Create depth through shadows and layering
- Ensure foreground elements clearly stand out from backgrounds

**Example:**
A modal dialog darkens the page behind it. The modal becomes the figure; the page becomes the ground. Focus shifts naturally.

### 7. Common Fate

Elements that move together are perceived as grouped.

**How it works:**
Motion creates relationship. Things that animate in sync feel like they belong together.

**In UI design:**
- Animate related elements together
- Use staggered animations to show hierarchy
- Group expandable/collapsible content through shared motion

**Example:**
When a dropdown opens, all menu items animate together. This shared motion reinforces that they're related choices.

## Practical Applications

### Navigation Design

Navigation uses multiple Gestalt principles:
- **Proximity**: Menu items spaced evenly feel unified
- **Similarity**: All nav items share styling
- **Continuity**: Horizontal or vertical alignment creates flow
- **Figure-ground**: Active states make current location stand out

### Form Design

Well-designed forms apply:
- **Proximity**: Related fields grouped together
- **Common region**: Fieldsets with visual boundaries
- **Similarity**: Consistent input styling
- **Closure**: Partial field visibility suggests scrolling

### Dashboard Design

Dashboards rely heavily on:
- **Common region**: Cards separate different data types
- **Proximity**: Related metrics grouped
- **Similarity**: Consistent chart styling
- **Figure-ground**: Key metrics highlighted

### Error States

Error messaging uses:
- **Common region**: Error message near the problematic field
- **Similarity**: All errors styled consistently (red, icon)
- **Figure-ground**: Errors stand out from normal content

## Gestalt Conflicts

Sometimes principles conflict. When they do, some override others:

**Common region often wins.** If items are in the same box, they're grouped even if they're not close together.

**Similarity can override proximity.** Items of the same colour might feel grouped even if physically separated.

**Strong closure overrides many principles.** A clear boundary creates a powerful grouping.

When designing, be intentional about which principles you're applying and ensure they're working together, not fighting.

## Anti-Patterns to Avoid

**False proximity:** Elements that look related but aren't (misleading grouping)

**Broken similarity:** Elements that should be related but look different (inconsistent styling)

**Interrupted continuity:** Lines or flows that break unexpectedly (jarring navigation)

**Confusing figure-ground:** Unclear what's foreground vs. background (muddy hierarchy)

## Try It Yourself

### Exercise 1: Principle Hunting

Open a web app you use daily. Find examples of each Gestalt principle:
1. Where does proximity create grouping?
2. What elements share similarity?
3. Where does continuity guide your eye?
4. What incomplete shapes does your brain complete?
5. Where does common region create boundaries?
6. How does figure-ground create depth?

### Exercise 2: Principle Application

Sketch a settings page with:
- Account settings (name, email, password)
- Notification preferences (email, push, SMS)
- Privacy settings (profile visibility, data sharing)

Apply Gestalt principles to make the three sections clear without using headers. How can grouping alone communicate organisation?

### Exercise 3: Breaking Principles

Take a simple interface you've designed or built. Deliberately break one Gestalt principle. What happens to the usability? How does it feel?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "gestalt-principles-quiz",
  "type": "multiple-choice",
  "title": "Gestalt Principles",
  "description": "Check your understanding of how humans perceive visual information.",
  "difficulty": "medium",
  "question": "A modal dialog darkens the page behind it. Which Gestalt principle is this applying?",
  "options": [
    {
      "id": "a",
      "text": "Proximity",
      "isCorrect": false,
      "explanation": "Proximity groups nearby elements. It doesn't relate to foreground/background separation."
    },
    {
      "id": "b",
      "text": "Common Region",
      "isCorrect": false,
      "explanation": "Common Region groups elements within the same bounded area, but the modal effect is about depth, not containment."
    },
    {
      "id": "c",
      "text": "Figure-Ground",
      "isCorrect": true,
      "explanation": "Correct! Figure-Ground separates foreground from background. The modal becomes the figure while the dimmed page becomes the ground, naturally shifting user focus."
    },
    {
      "id": "d",
      "text": "Closure",
      "isCorrect": false,
      "explanation": "Closure is about the brain completing incomplete shapes, not about depth perception."
    }
  ]
}
-->

## Key Takeaways

- Gestalt principles explain how humans naturally perceive visual information
- Proximity groups nearby elements; similarity groups like elements
- Continuity guides the eye; closure completes incomplete shapes
- Common region creates boundaries; figure-ground creates depth
- Common fate groups elements that move together
- These principles can conflict. Be intentional about which you prioritise.
- Designs that work with these principles feel intuitive; those that fight them feel confusing

## Next Steps

Continue to [Designing with Intention](./04-designing-with-intention.md) →
