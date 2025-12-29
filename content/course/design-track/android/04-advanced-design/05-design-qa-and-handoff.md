# Design QA and Handoff for Android

> **Quick Summary:** Bridge the gap between design and implementation. Learn how to prepare your designs for Compose developers and ensure pixel-perfect results.

## What You'll Learn

- Preparing designs for handoff
- Compose-aware specifications
- Design QA process
- Effective designer-developer collaboration

<!-- illustration: design-handoff-flow -->

## Why Handoff Matters

Poor handoff leads to:
- **Visual inconsistencies** that erode quality
- **Wasted time** on back-and-forth
- **Frustrated teams** on both sides
- **Delayed releases** for fixes

Good handoff enables:
- Accurate implementation
- Faster development
- Better collaboration
- Higher quality products

## Preparing for Handoff

### Design File Organization

Structure your files clearly:

```
📁 Feature Name
  📁 Final Designs
    - Light Theme
    - Dark Theme
    - Dynamic Color variants
  📁 States
    - Loading
    - Empty
    - Error
    - Success
  📁 Size Variations
    - Compact
    - Medium  
    - Expanded
  📁 Components
    - Specs & Variants
  📄 Handoff Notes
```

### Naming Conventions

Use developer-friendly names:

**❌ Avoid:**
- "Frame 234"
- "Group Copy Copy"
- "Vector"

**✅ Use:**
- "PrimaryButton/Pressed"
- "ProductCard/Expanded"
- "BottomSheet/Handle"

### Match Compose Thinking
Structure layers like Compose hierarchy:
- Column, Row, Box groupings
- Modifier-based properties
- Composable component boundaries

## Compose-Aware Specifications

### Spacing Values

Use Material spacing scale:

| Name | Value | Use Case |
|------|-------|----------|
| 4dp | xs | Inline elements |
| 8dp | sm | Related items |
| 16dp | md | Section spacing |
| 24dp | lg | Major sections |
| 32dp | xl | Screen padding |

### Typography Mapping

Map to Material type scale:

| Design | Material | Compose |
|--------|----------|---------|
| Display Large | displayLarge | MaterialTheme.typography.displayLarge |
| Headline Medium | headlineMedium | MaterialTheme.typography.headlineMedium |
| Body Large | bodyLarge | MaterialTheme.typography.bodyLarge |
| Label Small | labelSmall | MaterialTheme.typography.labelSmall |

### Color Documentation

Use Material colour roles:

| Design Token | Compose Colour |
|--------------|----------------|
| Primary text | MaterialTheme.colorScheme.onSurface |
| Secondary text | MaterialTheme.colorScheme.onSurfaceVariant |
| Background | MaterialTheme.colorScheme.surface |
| Accent | MaterialTheme.colorScheme.primary |
| Error | MaterialTheme.colorScheme.error |

### Component Specifications

For each component, document:

**Visual Properties:**
- Shape (corner radius)
- Elevation (shadow)
- Border (width, color)
- Background (color role)

**Sizing:**
- Width (fixed, fill, wrap)
- Height (fixed, intrinsic)
- Min/Max constraints
- Padding (all sides)

**Content:**
- Text style
- Icon size
- Content arrangement
- Alignment

## Creating Spec Documents

### Screen Specifications

Include for each screen:

1. **Overview**
   - Screen purpose
   - Entry points
   - Window size class variations

2. **Layout Structure**
   - Component hierarchy
   - Scroll behaviour
   - Safe area handling

3. **Interactions**
   - Touch behaviors
   - Navigation actions
   - State changes

4. **Edge Cases**
   - Empty state
   - Loading state
   - Error state
   - Offline state

### Component Spec Template

```markdown
## Filled Button

### Visual
- Shape: RoundedCornerShape(100)
- Background: colorScheme.primary
- Elevation: 0dp (resting), 2dp (pressed)

### Sizing
- Height: 40dp
- Padding: 24dp horizontal, 0dp vertical
- Min Width: 64dp

### Typography
- Style: labelLarge
- Color: colorScheme.onPrimary

### States
- Enabled: Full opacity
- Disabled: 38% content opacity
- Pressed: StateLayerOpacity.Pressed overlay
- Focused: StateLayerOpacity.Focus overlay

### Accessibility
- Min touch target: 48dp
- Content description: Button text
- Role: Button
```

## Design QA Process

### Pre-Development Checklist

Before handing off:
- [ ] All states designed
- [ ] Both themes complete
- [ ] All size classes covered
- [ ] Accessibility reviewed
- [ ] Real content used (no lorem ipsum)
- [ ] Motion specified
- [ ] Edge cases documented

### During Development

Review implementations for:
- [ ] Visual accuracy
- [ ] Interaction correctness
- [ ] Animation timing
- [ ] Accessibility compliance

### QA Verification Checklist

**Visual Accuracy:**
- [ ] Colors match theme roles
- [ ] Spacing follows scale
- [ ] Typography is correct
- [ ] Icons are right size
- [ ] Shapes match spec
- [ ] Elevation is appropriate

**Responsive Behavior:**
- [ ] Compact layout works
- [ ] Medium layout adapts
- [ ] Expanded layout uses space
- [ ] Orientation changes handled

**Theme Support:**
- [ ] Light theme correct
- [ ] Dark theme correct
- [ ] Dynamic color adapts
- [ ] High contrast works

**Accessibility:**
- [ ] TalkBack navigable
- [ ] Content descriptions present
- [ ] Touch targets adequate
- [ ] Font scaling works

## Designer-Developer Collaboration

### Learn Compose Basics

Understanding helps communication:
- **Composables:** UI functions
- **Modifiers:** Styling chain
- **State:** UI data management
- **Theming:** Color/type systems

### Communication Best Practices

**In Specs:**
- Use dp, not px
- Reference Material tokens
- Include rationale
- Link to documentation

**In Reviews:**
- Be specific about issues
- Provide visual comparison
- Prioritise feedback (P1/P2/P3)
- Acknowledge constraints

### Regular Touchpoints

1. **Kickoff:** Walk through designs
2. **Check-ins:** Review progress
3. **QA Sessions:** Detailed review
4. **Retrospective:** Improve process

## Tools for Handoff

### Design Tools
- **Figma:** Dev Mode, component props
- **Material Theme Builder:** Token export
- **Relay for Figma:** Direct Compose generation

### Documentation
- Design tokens as JSON
- Confluence/Notion specs
- Storybook for components

### Feedback Loops
- Figma comments
- GitHub issue linking
- Slack design-dev channel

## Try It Yourself

### Exercise 1: Spec a Card Component

Create a complete spec:
1. List all visual properties
2. Define all states
3. Document sizes and spacing
4. Note accessibility requirements

### Exercise 2: QA Review

Compare implementation to design:
1. Screenshot side by side
2. List all differences
3. Categorize by severity
4. Write clear feedback

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "android-handoff-quiz",
  "type": "multiple-choice",
  "title": "Design QA and Handoff",
  "description": "Test your understanding of Android design handoff.",
  "difficulty": "medium",
  "question": "When specifying colors for Android handoff, what should you reference to ensure proper theme support?",
  "options": [
    {
      "id": "a",
      "text": "Hex color values like #6750A4",
      "isCorrect": false,
      "explanation": "Hard-coded hex values don't adapt to dark theme or dynamic color."
    },
    {
      "id": "b",
      "text": "Material color scheme roles like colorScheme.primary",
      "isCorrect": true,
      "explanation": "Correct! Using Material color roles ensures colors automatically adapt to light/dark themes and support dynamic color from the user's wallpaper."
    },
    {
      "id": "c",
      "text": "RGB values for precision",
      "isCorrect": false,
      "explanation": "RGB values, like hex, don't adapt to theme changes."
    },
    {
      "id": "d",
      "text": "Color names like 'blue' or 'purple'",
      "isCorrect": false,
      "explanation": "Vague color names don't provide the precision needed for implementation."
    }
  ]
}
-->

## Key Takeaways

- Organize files with clear naming conventions
- Use Material spacing, typography, and color tokens
- Document all states, themes, and size classes
- Establish clear QA checklists
- Build collaborative processes with developers

## Module Complete! 🎉

You've completed the Advanced Design module for Android. You now have skills to:
- Design accessible Android experiences
- Create adaptive dark mode and dynamic color designs
- Use Material motion effectively
- Design for phones, tablets, foldables, and watches
- Collaborate with Compose developers

Return to [Course Home](/course) or continue with another track →
