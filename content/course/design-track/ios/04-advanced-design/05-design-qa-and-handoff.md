# Design QA and Handoff for iOS

> **Quick Summary:** Great design doesn't end with the mockup. Learn how to ensure your iOS designs are implemented correctly and how to collaborate effectively with SwiftUI developers.

## What You'll Learn

- Preparing designs for handoff
- SwiftUI-aware specifications
- Design QA process
- Effective designer-developer collaboration

<!-- illustration: design-handoff-flow -->

## Why Handoff Matters

The gap between design and implementation:
- **Visual discrepancies** frustrate everyone
- **Missing specs** cause delays
- **Poor communication** leads to rework
- **QA catches** what prevention could solve

## Preparing for Handoff

### Design File Organization

Structure your files for clarity:

```
📁 Screen Name
  📁 Final Designs
    - Light Mode
    - Dark Mode
    - Accessibility Sizes
  📁 States & Variations
    - Loading
    - Empty
    - Error
  📁 Interactions
    - Button States
    - Transitions
  📄 Specs & Notes
```

### Naming Conventions

Use developer-friendly names:

**❌ Avoid:**
- "Rectangle 47"
- "Group Copy 3"
- "unnamed"

**✅ Use:**
- "PrimaryButton/Pressed"
- "UserCard/Header"
- "NavigationBar/Title"

### Component Structure

Match SwiftUI thinking:
- Group related elements (VStack, HStack)
- Name layers after SwiftUI views
- Use Auto Layout (like SwiftUI stacks)
- Mark reusable components

## SwiftUI-Aware Specifications

### Spacing Values

Use the iOS spacing scale:

| Token | Value | Use Case |
|-------|-------|----------|
| xs | 4pt | Inline spacing |
| sm | 8pt | Related elements |
| md | 16pt | Section spacing |
| lg | 24pt | Major sections |
| xl | 32pt | Screen padding |

### Typography Specs

Map to iOS text styles:

| Design Name | iOS Style | Size/Weight |
|-------------|-----------|-------------|
| Title | .title | 28pt/Bold |
| Headline | .headline | 17pt/Semibold |
| Body | .body | 17pt/Regular |
| Caption | .caption | 12pt/Regular |

### Color Documentation

Provide semantic colour mapping:

| Design Token | SwiftUI Colour |
|--------------|----------------|
| Label Primary | Color.primary |
| Label Secondary | Color.secondary |
| Background | Color(UIColor.systemBackground) |
| Accent | Color.accentColor |

### Component Specs

For each component, document:

**Visual Properties:**
- Corner radius
- Border width and color
- Shadow (color, offset, blur, spread)
- Background color/gradient

**Layout Properties:**
- Padding (top, bottom, leading, trailing)
- Fixed vs. flexible sizing
- Minimum/maximum constraints
- Alignment rules

**Interactive Properties:**
- Touch target size
- Pressed state
- Disabled state
- Focused state (for keyboard/pointer)

## Creating a Spec Document

### Essential Information

For each screen, include:

1. **Screen Overview**
   - Purpose and context
   - User flow position
   - Platform variations

2. **Layout Specifications**
   - Safe area handling
   - Scroll behaviour
   - Orientation support

3. **Component List**
   - All components used
   - States for each
   - Interaction behaviors

4. **Edge Cases**
   - Empty states
   - Loading states
   - Error states
   - Truncation behaviour

### Example Component Spec

```markdown
## Primary Button

### Visual
- Background: AccentColor
- Corner Radius: 12pt
- Padding: 16pt horizontal, 14pt vertical

### Typography
- Font: SF Pro Semibold, 17pt
- Color: White

### States
- Normal: Full opacity
- Pressed: 85% opacity, scale 0.98
- Disabled: 50% opacity

### Accessibility
- Touch Target: 44pt minimum height
- Label: Button text
- Hint: None required
- Traits: .button
```

## Design QA Process

### Pre-Development Review

Before handoff, verify:
- [ ] All states designed (loading, empty, error)
- [ ] Both appearances (light/dark mode)
- [ ] Accessibility sizes tested
- [ ] All text is real content (no lorem ipsum)
- [ ] Edge cases considered

### During Development

Check implementation against design:
- [ ] Spacing matches spec
- [ ] Typography is correct
- [ ] Colors match exactly
- [ ] Animations feel right
- [ ] Touch targets are adequate

### QA Checklist

**Visual Accuracy:**
- [ ] Colors match design (sample with color picker)
- [ ] Spacing is correct (measure with ruler)
- [ ] Typography matches (size, weight, line height)
- [ ] Icons are correct size and weight
- [ ] Shadows and borders are accurate

**Responsive Behavior:**
- [ ] Works on smallest iPhone (SE)
- [ ] Works on largest iPhone (Pro Max)
- [ ] Landscape orientation (if supported)
- [ ] iPad layout (if supported)

**Accessibility:**
- [ ] VoiceOver reads correctly
- [ ] Focus order is logical
- [ ] Dynamic Type works
- [ ] Increase Contrast works
- [ ] Reduce Motion respected

**Edge Cases:**
- [ ] Long text truncates properly
- [ ] Empty state displays
- [ ] Loading state shows
- [ ] Error handling works

## Designer-Developer Collaboration

### Shared Language

Learn basic SwiftUI concepts:
- Views and modifiers
- Stacks (HStack, VStack, ZStack)
- State and binding
- Environment values

### Communication Tips

**In Spec Documents:**
- Use precise measurements (points, not pixels)
- Reference iOS system styles when possible
- Include rationale for decisions
- Link to relevant HIG sections

**In Discussions:**
- Be open to technical constraints
- Explain the "why" behind designs
- Ask about implementation challenges
- Collaborate on solutions

### Feedback Loops

Establish regular touchpoints:
- **Kickoff:** Review designs together
- **Check-ins:** Weekly or per-feature
- **QA Sessions:** Before release
- **Retrospective:** What worked, what didn't

## Tools for Handoff

### Design Tools
- **Figma:** Dev Mode, Auto Layout
- **Sketch:** Linked Libraries, Measure
- **Zeplin:** Automated specs

### Communication
- Comment threads in design files
- Dedicated Slack channel
- Shared documentation (Notion, Confluence)

### Version Control
- Link designs to GitHub issues
- Reference design versions in PRs
- Archive old versions for reference

## Try It Yourself

### Exercise 1: Spec a Component

Choose a component from your design:
1. Document all visual properties
2. List all states and variations
3. Write accessibility requirements
4. Create a spec in markdown format

### Exercise 2: QA Walkthrough

Take an implemented screen:
1. Compare side-by-side with design
2. Note all discrepancies
3. Prioritise issues (P1, P2, P3)
4. Document with screenshots

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-handoff-quiz",
  "type": "multiple-choice",
  "title": "Design QA and Handoff",
  "description": "Test your understanding of the handoff process.",
  "difficulty": "medium",
  "question": "When specifying typography for iOS handoff, what should you reference to ensure consistent implementation?",
  "options": [
    {
      "id": "a",
      "text": "Generic font names like 'Sans Serif Bold 17px'",
      "isCorrect": false,
      "explanation": "Generic names don't help developers implement the correct iOS text style."
    },
    {
      "id": "b",
      "text": "iOS text styles like .headline, .body, or .caption",
      "isCorrect": true,
      "explanation": "Correct! Referencing iOS text styles ensures developers use the system styles that support Dynamic Type and maintain platform consistency."
    },
    {
      "id": "c",
      "text": "Only the pixel size of the text",
      "isCorrect": false,
      "explanation": "Pixel size alone misses important information like weight, style, and Dynamic Type behaviour."
    },
    {
      "id": "d",
      "text": "Screenshots of the text without measurements",
      "isCorrect": false,
      "explanation": "Screenshots don't provide the precise specifications developers need."
    }
  ]
}
-->

## Key Takeaways

- Organize design files with developer-friendly naming
- Specify values using iOS conventions and scales
- Document all states, appearances, and edge cases
- Establish a clear QA checklist
- Build collaborative relationships with developers

## Module Complete! 🎉

You've completed the Advanced Design module for iOS. You now have the skills to:
- Design accessible iOS experiences
- Create beautiful dark mode designs
- Use motion effectively
- Adapt designs across Apple devices
- Collaborate with SwiftUI developers

Return to [Course Home](/course) or continue with another track →
