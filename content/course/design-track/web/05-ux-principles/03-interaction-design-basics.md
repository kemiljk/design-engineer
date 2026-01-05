# Interaction Design Basics

> **Quick Summary:** Interaction design is how users interact with interfaces: the actions they take, the feedback they receive, and the flows they navigate.

## What You'll Learn

- Core concepts of interaction design
- Affordances, signifiers, and feedback
- Designing for different input methods
- Managing state and flow

## What is Interaction Design?

Interaction design (IxD) defines:
- What actions are possible
- How actions are performed
- What happens in response
- How users know what to do

If information architecture is the blueprint, interaction design is the operating manual.

## Affordances

> *"The real problem with the interface is that it is an interface."* — Don Norman

An affordance is what an object allows you to do.

<!-- visual-example: affordances-signifiers-demo -->

<!-- illustration: affordance-signifier -->

A physical button affords pressing. A handle affords pulling. A knob affords turning.

In digital interfaces, affordances aren't physical. They're perceived through visual and behavioural cues.

### Perceived Affordances

Users perceive affordances through:
- **Visual appearance:** Raised surfaces look pressable
- **Familiar patterns:** Underlined blue text looks clickable
- **Cursor changes:** Pointer cursor indicates clickability
- **Behavior:** Hovering reveals interactive possibilities

### False Affordances

When something looks interactive but isn't:
- Text styled like links but non-clickable
- Buttons that don't respond
- Images that look like sliders but aren't

False affordances confuse and frustrate users.

<!-- illustration: false-hidden-affordances -->

### Hidden Affordances

When something is interactive but doesn't look it:
- Clickable images without indication
- Swipe gestures without visual hints
- Hidden menus

Hidden affordances require discovery. Sometimes that's good (progressive disclosure), but it's often problematic (buried features).

## Signifiers

Signifiers indicate how to interact with affordances.

**Affordance:** Button can be pressed
**Signifier:** Button has a raised appearance, changes on hover

### Common Signifiers

- **Cursor changes:** Pointer for clickable, text cursor for editable
- **Visual treatment:** Underlines, colours, shadows
- **Icons:** Hamburger menu, chevrons, plus signs
- **Labels:** "Click here," "Tap to edit"
- **Animations:** Pulse to draw attention

### Signifier Strength

Match signifier strength to importance:
- Primary action: Strong signifiers (colour, size, position)
- Secondary action: Moderate signifiers
- Tertiary action: Subtle signifiers

Not everything should scream for attention.

<!-- illustration: signifier-strength -->

## Feedback

Feedback tells users what happened in response to their action.

### Why Feedback Matters

Without feedback, users don't know if:
- Their action was received
- The system is processing
- The action succeeded or failed
- What happened as a result

Feedback closes the interaction loop.

<!-- visual-example: interaction-feedback-demo -->

<!-- illustration: feedback-loop -->

### Types of Feedback

**Visual feedback:**
- Color changes (button pressed)
- Animation (submission processing)
- Content changes (new item appears)
- Progress indicators (loading bar)

**Audio feedback:**
- Click sounds
- Success/error sounds
- Notification sounds

**Haptic feedback (mobile/wearables):**
- Vibration on tap
- Haptic confirmation

### Immediate vs. Delayed Feedback

**Immediate:** Response within 100ms feels instant. Button states, hover effects.

**Acknowledged:** For 100ms-1s operations, show immediate acknowledgment while processing. Spinner appears instantly, result follows.

**Progress:** For 1s+ operations, show progress. Loading bars, step indicators.

### Feedback for Errors

Error feedback should:
- Be noticeable (but not aggressive)
- Explain what went wrong
- Suggest how to fix it
- Appear near the problem

"Something went wrong" is bad. "Email address is invalid—check for typos" is better.

## Input Patterns

### Click/Tap

The fundamental interaction:
- Clear tap targets (44px minimum for touch)
- Visual feedback on press
- Consistent behaviour across similar elements

<!-- illustration: touch-target-sizes -->

### Hover (Desktop)

Preview and exploration:
- Reveal additional options
- Show tooltips
- Preview content

Remember: Hover doesn't exist on touch devices. Don't require it.

### Focus (Keyboard)

Navigation via keyboard:
- Visible focus indicator
- Logical tab order
- Keyboard shortcuts for power users

Essential for accessibility.

### Drag and Drop

Moving and reordering:
- Clear draggable indicators
- Drop zone feedback
- Undo capability

### Gesture (Touch)

Touch-specific interactions:
- Swipe (dismiss, reveal actions)
- Pinch (zoom)
- Long press (context menu)

Gestures are powerful but discoverable—provide hints.

### Text Input

Typing content:
- Clear input fields
- Appropriate keyboard types (email, phone)
- Inline validation
- Auto-formatting (phone numbers, credit cards)

### Selection

Choosing from options:
- Radio buttons (single choice)
- Checkboxes (multiple choice)
- Dropdowns (many options)
- Segmented controls (visible options)

Match selection pattern to the choice type.

## State Management

Interfaces exist in states. Interaction design defines transitions between states.

### Common Component States

- Default
- Hover
- Focus
- Active/Pressed
- Disabled
- Loading
- Error
- Success

### Page/Screen States

- Empty (no data)
- Loading (fetching data)
- Partial (some data, more loading)
- Complete (all data loaded)
- Error (fetch failed)

### User Flow States

- Not started
- In progress
- Paused
- Completed
- Abandoned

Design for all states, not just the happy path.

## Flow Design

Flow is the sequence of interactions to accomplish a task.

### Good Flow Characteristics

**Clear entry point:** Users know where to start.

**Progressive disclosure:** Show what's needed now, reveal more as needed.

**Logical progression:** Steps follow expected order.

**Clear progress:** Users know where they are in the flow.

**Flexible exit:** Users can pause, save, go back, or cancel.

**Clear completion:** Users know when they're done.

### Reducing Friction

Friction is anything that slows users down:
- Extra clicks
- Confusing choices
- Unnecessary fields
- Slow responses

Remove friction for common tasks. Add friction for dangerous ones (confirmation dialogs).

### Preventing Errors

Design to prevent errors:
- Disable impossible actions
- Suggest valid inputs
- Constrain to valid options
- Warn before destructive actions

Prevention beats correction.

## Micro-interactions

Micro-interactions are small, single-purpose interactions:
- Toggle switch animation
- Like button response
- Pull-to-refresh
- Character counter

### Anatomy of Micro-interaction

1. **Trigger:** User action or system event
2. **Rules:** What happens in response
3. **Feedback:** Visual, audio, or haptic response
4. **Loops/Modes:** Repeated or changing behaviour

### Why Micro-interactions Matter

They:
- Provide immediate feedback
- Add personality and polish
- Guide users through flows
- Make interactions feel responsive

Small details, big impact.

## Try It Yourself

### Exercise 1: Affordance Audit

For a form you've designed or encountered:
1. List every interactive element
2. What signifies each element's interactivity?
3. What feedback does each provide?
4. Identify any false or hidden affordances

### Exercise 2: State Mapping

For a common component (button, input field, card):
1. List all possible states
2. Design the appearance for each state
3. Map transitions between states (what causes each)

### Exercise 3: Flow Improvement

Take a common flow (checkout, signup, settings change):
1. Map the current steps
2. Identify friction points
3. Propose improvements
4. Consider error states

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "interaction-design-quiz",
  "type": "multiple-choice",
  "title": "Affordances and Signifiers",
  "description": "Test your understanding of interaction design concepts.",
  "difficulty": "medium",
  "question": "What is the difference between an affordance and a signifier?",
  "options": [
    {
      "id": "a",
      "text": "Affordances are for designers, signifiers are for developers",
      "isCorrect": false,
      "explanation": "Both concepts are about user experience, not team roles."
    },
    {
      "id": "b",
      "text": "An affordance is what you CAN do; a signifier indicates HOW to do it",
      "isCorrect": true,
      "explanation": "Correct! A button affords pressing (the action possible). Its raised appearance, hover state, and cursor change are signifiers that indicate it's pressable."
    },
    {
      "id": "c",
      "text": "Affordances are visual, signifiers are behavioural",
      "isCorrect": false,
      "explanation": "Actually, it's somewhat the opposite—signifiers are the visual/behavioural cues that indicate affordances."
    },
    {
      "id": "d",
      "text": "They mean the same thing but affordance is the older term",
      "isCorrect": false,
      "explanation": "They're distinct concepts with different meanings and applications."
    }
  ]
}
-->

## Key Takeaways

- Interaction design defines actions, feedback, and flows
- Affordances are what you can do; signifiers indicate how
- Feedback closes the interaction loop—users need to know what happened
- Design for various inputs: click, hover, focus, drag, gesture, text, selection
- Manage state transitions for components, pages, and flows
- Good flows have clear progression, feedback, and flexibility
- Micro-interactions add polish and responsiveness

## Next Steps

Continue to [Usability Heuristics](./04-usability-heuristics.md) →
