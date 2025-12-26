# Prototyping Basics

> **Quick Summary:** Prototypes make designs interactive. They turn static screens into clickable experiences that communicate ideas, test assumptions, and sell visions.

## What You'll Learn

- Why prototyping matters for Design Engineers
- Types of prototypes and when to use each
- Creating interactive prototypes in design tools
- Presenting and sharing prototypes effectively

## Why Prototype?

Static mockups only go so far. They can't show:
- How navigation flows between screens
- How interactions feel
- What happens during state changes
- Whether a user journey makes sense

Prototypes bridge this gap. They're interactive simulations that make designs tangible before code is written.

### Prototypes Are Communication

For stakeholders: "This is what we're building"
For users: "Is this what you expected?"
For developers: "This is how it should behave"
For yourself: "Does this actually work?"

### Design Engineers and Prototyping

Design Engineers have a superpower: they can prototype in *either* design tools or code.

- **Design tool prototypes:** Fast for flows, screens, and basic interactions
- **Code prototypes:** Better for complex interactions, real data, and production evolution

This lesson covers design tool prototypes. Code prototyping is covered in the Convergence track.

## Fidelity Levels

Not all prototypes are created equal. Choose fidelity based on your goals:

### Low Fidelity

**What:** Paper sketches, wireframes, basic clickable screens
**Effort:** Minutes to hours
**Use for:** Early exploration, concept validation, user flow testing

Low-fi prototypes focus on structure and flow, not visual polish. They invite feedback ("this is rough") and are cheap to throw away.

### Medium Fidelity

**What:** Grayscale designs, basic interactions, realistic flows
**Effort:** Hours to days
**Use for:** User testing, stakeholder reviews, design iteration

Medium-fi balances speed with realism. Good for testing flows before investing in visual design.

### High Fidelity

**What:** Pixel-perfect designs, polished interactions, near-production feel
**Effort:** Days to weeks
**Use for:** Final validation, developer handoff, presentations

High-fi prototypes look like real products. They test whether the complete experience works.

## Prototype Scope

Beyond fidelity, decide what to prototype:

### Task Flow Prototype

Follow a specific user task:
- User lands on home page
- Searches for a product
- Views product details
- Adds to cart
- Proceeds to checkout

Focused and quick to build. Tests one journey.

### Feature Prototype

Show how a specific feature works:
- Filtering options
- Notification system
- Onboarding flow

Tests feature comprehension and usability.

### Comprehensive Prototype

Full app experience:
- All major screens connected
- Multiple user flows
- Edge cases handled

Time-intensive but provides complete picture.

## Creating Prototypes in Design Tools

Most design tools share similar prototyping concepts:

### Connections

Connect frames to create navigation:
1. Select an element (button, link, area)
2. Create a connection to another frame
3. The element becomes a "hotspot"

When viewing the prototype, clicking the hotspot navigates to the connected frame.

### Triggers

What starts the interaction:
- **On click/tap:** User clicks the element
- **On hover:** Mouse enters the element (desktop)
- **On drag:** User drags the element
- **While pressing:** While mouse/finger is down
- **After delay:** Automatically after time passes

### Actions

What happens when triggered:
- **Navigate to:** Go to another frame
- **Open overlay:** Show a frame on top
- **Close overlay:** Dismiss an overlay
- **Swap with:** Replace this component with another variant
- **Back:** Return to previous screen
- **Scroll to:** Scroll to a specific position

### Transitions

How the action animates:
- **Instant:** No animation
- **Dissolve:** Fade between states
- **Move in/out:** Slide in from direction
- **Push:** Push current screen out while bringing new in
- **Smart animate:** Animate matching elements

## Common Interaction Patterns

### Navigation

Menu items connect to their destination screens:
- Home → Home Screen
- About → About Screen
- Contact → Contact Screen

Use consistent transitions (push from right, dissolve, etc.)

### Buttons and CTAs

Primary actions navigate forward:
- "Get Started" → Sign Up Flow
- "Learn More" → Details Page
- "Submit" → Confirmation Screen

### Modals and Overlays

Overlays stack on top of the current screen:
- Trigger: Click "Settings"
- Action: Open overlay
- Position: Centered (or wherever appropriate)
- Background: Dim (if supported)

Close button action: Close overlay (returns to underneath)

### Tab Bars and Navigation

Multiple tabs connecting to different frames:
- Each tab links to its content frame
- Consider showing selected state

### Dropdown Menus

Using component variants:
1. Default state: Menu closed
2. Open state: Menu visible
3. Click trigger swaps to open state
4. Clicking option navigates to destination

### Form Flow

Multi-step forms:
- Step 1 → "Next" → Step 2
- Step 2 → "Next" → Step 3
- Step 3 → "Submit" → Confirmation

Include "Back" connections for navigation.

## Smart Animate

Smart animate (or similar features) automatically animates between states where:
- Elements have the same name
- Elements exist in both frames
- Properties change (position, size, colour, opacity)

This creates smooth transitions without defining every animation manually.

### Example: Card Expansion

Frame 1: Card collapsed (small, shows title only)
Frame 2: Card expanded (large, shows full content)

Name the card layer the same in both frames. Smart animate handles the growth animation.

### Limitations

Smart animate is magic but not perfect:
- Works best with simple property changes
- Complex animations may need code
- Some properties don't animate well

## Presenting Prototypes

A prototype is only useful if people can experience it.

### Presentation Mode

Design tools have presentation/play mode:
- Full-screen display
- Interactive hotspots work
- No editing UI visible

Use this for stakeholder demos and user testing.

### Sharing Links

Generate shareable links:
- Anyone with the link can view
- Set permissions (view only vs. comment)
- Consider password protection for sensitive projects

### Device Previews

Some tools offer device preview apps:
- View on real phones/tablets
- Test touch interactions
- More realistic experience

### Recording

Record prototype walkthroughs:
- For async stakeholder review
- For documentation
- For social sharing

## User Testing with Prototypes

Prototypes enable testing before building:

### Set Up the Test

1. Define what you're testing (flow, comprehension, preference)
2. Prepare the prototype (remove dead ends)
3. Write task scenarios ("You want to change your password...")
4. Recruit participants

### During the Test

1. Explain this is a test of the design, not them
2. Ask them to think aloud
3. Observe without guiding
4. Note where they struggle or succeed

### After the Test

1. Identify patterns across participants
2. Document issues and insights
3. Prioritize fixes
4. Iterate and retest

## Try It Yourself

### Exercise 1: Simple Navigation

Create a 3-screen prototype:
1. Home screen with two navigation buttons
2. About screen with back button
3. Contact screen with back button

Connect all navigation. Test in presentation mode.

### Exercise 2: Modal Interaction

Create a modal flow:
1. Main screen with "Settings" button
2. Settings modal that overlays the screen
3. Close button that dismisses the modal

Use overlay action (not navigate).

### Exercise 3: Multi-State Component

Create a dropdown menu:
1. Closed state (just the trigger button)
2. Open state (trigger + menu options)
3. Clicking trigger opens menu
4. Clicking option closes menu

Use component variants and swap interactions.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "prototyping-fidelity-quiz",
  "type": "multiple-choice",
  "title": "Prototype Fidelity",
  "description": "Test your understanding of when to use different prototype fidelities.",
  "difficulty": "medium",
  "question": "You need to quickly validate whether a new checkout flow makes sense to users. Which prototype fidelity is most appropriate?",
  "options": [
    {
      "id": "a",
      "text": "High fidelity, because users need to see the final design to give accurate feedback",
      "isCorrect": false,
      "explanation": "High fidelity takes days to weeks and may cause users to focus on visual details instead of the flow."
    },
    {
      "id": "b",
      "text": "Low or medium fidelity to focus on structure and flow, not visual polish",
      "isCorrect": true,
      "explanation": "Correct! Low/medium fidelity prototypes are quick to build (hours) and help users focus on the flow rather than visual details. They also invite more honest feedback."
    },
    {
      "id": "c",
      "text": "No prototype, just show static mockups and explain the flow verbally",
      "isCorrect": false,
      "explanation": "Static mockups can't show how navigation flows between screens or whether the journey makes sense."
    },
    {
      "id": "d",
      "text": "Skip prototyping and build the feature in code first, then test",
      "isCorrect": false,
      "explanation": "Building in code before validating the flow is expensive. Changes are much harder to make."
    }
  ]
}
-->

## Key Takeaways

- Prototypes make designs interactive and testable
- Choose fidelity (low, medium, high) based on goals
- Design tool prototypes use connections, triggers, actions, and transitions
- Common patterns: navigation, modals, tabs, dropdowns, forms
- Smart animate creates smooth transitions automatically
- Share prototypes via presentation mode and links
- Use prototypes for user testing before building

## Next Steps

Continue to [Collaboration and Handoff](./05-collaboration-and-handoff.md) →
