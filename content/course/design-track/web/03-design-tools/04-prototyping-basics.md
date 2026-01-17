# Prototyping Basics

> **Quick Summary:** Prototypes make designs interactive. They turn static screens into clickable experiences that communicate ideas, test assumptions, and sell visions.

## What You'll Learn

- Why prototyping matters for Design Engineers
- Types of prototypes and when to use each
- Creating interactive prototypes in design tools
- Presenting and sharing prototypes effectively

## Why Prototype?

> *"If a picture is worth a thousand words, a prototype is worth a thousand meetings."* — Tom and David Kelley, IDEO

A static mockup is a promise; a prototype is a proof. Static screens cannot show how an interface *feels*. They don't show the transition from "Loading" to "Success." They don't reveal that a navigation flow is confusing or that a button is too hard to reach.

Prototypes bridge the gap between imagination and reality. They allow stakeholders to "play" with the product before a single line of code is written. For developers, a prototype answers questions that specs cannot ("How fast should this slide out?", "Does it push the content or overlay it?").

**Design Engineers have a superpower:** We can prototype in design tools (Figma) for speed, or in code (React/SwiftUI) for fidelity. This lesson focuses on the design tool approach—fast, low-cost, and essential for early validation.

## Fidelity Levels

Not all prototypes need to look like the final product. Choosing the right fidelity saves time.

<!-- visual-example: fidelity-comparison-demo -->

**Low Fidelity (Lo-Fi):**
These are digital sketches. Gray boxes, squiggly lines for text, and simple click-throughs. Use these to test the *flow*. Does the user know to click "Checkout" after adding an item? If the flow is broken, beautiful buttons won't fix it. Lo-fi prototypes invite honest feedback because they don't look precious.

**Medium Fidelity (Mid-Fi):**
Here we have layout, real text, and basic components, but maybe no color or images. This is the sweet spot for usability testing. Users can read and interact without getting distracted by "I don't like that shade of blue."

**High Fidelity (Hi-Fi):**
This looks and feels like the shipping app. It uses the design system, real imagery, and polished animations. Use this for stakeholder presentations and developer handoff. It removes ambiguity about the final result.

## Creating Prototypes

Prototyping in tools like Figma revolves around three concepts: Connections, Triggers, and Actions.

### Connections
You create a prototype by drawing a literal wire from one frame to another. This wire represents a path the user can take. If you connect a "Settings" button to the "Settings Screen," you've created a path.

### Triggers
The trigger is the event that starts the action.
- **On Click / Tap:** The most common. The user taps a button.
- **On Drag:** Good for carousels or swipe-to-delete actions.
- **While Hovering:** Essential for desktop interactions (tooltips, button states).
- **After Delay:** Useful for splash screens that automatically transition to the home screen.

### Actions
The action is what happens when the trigger fires.
- **Navigate To:** Standard screen transition. Replaces the current view.
- **Open Overlay:** Puts a frame *on top* of the current view. Perfect for modals, dropdowns, and dialogs.
- **Swap Overlay:** Replaces one overlay with another (e.g., switching from a "Menu" to a "Sub-menu").
- **Scroll To:** Jumps to a specific section on the same page.

## Animation and Transitions

Transitions are the glue between states.

**Instant:** No animation. Good for tab switching or web-like navigation.
**Dissolve:** A simple fade. Good for standard app navigation.
**Move In / Push:** Simulates spatial movement. Use "Push" (slide left) when moving forward in a flow, and "Push" (slide right) when going back. This helps users build a mental map of where they are.

**Smart Animate:**
This is the magic wand. If you have a layer named `Card` on Screen A (small) and a layer named `Card` on Screen B (fullscreen), "Smart Animate" will automatically calculate the growth and movement between them. It creates complex, fluid animations without manual keyframing. Use this for state changes (like expanding a card or toggling a switch).

## Prototype Scope

Don't try to prototype the entire app at once. It becomes an unmaintainable mess of wires ("spaghetti code" for designers). Instead, scope your prototypes:

**The Happy Path:**
Prototype the ideal user journey. "User logs in, finds a song, and plays it." Ignore the error states and settings menus. This is for selling the vision.

**The Task Flow:**
Focus on a specific, complex interaction. "The Checkout Flow" or "The Sign-Up Flow." Include error states and edge cases here to test robustness.

**The Feature Prototype:**
Prototype just one component, like a complex filter mechanism, to see if the interactions feel right.

## Presenting and Sharing

A prototype is a communication tool. How you share it matters.

**Presentation Mode:**
Use this for demos. It hides the UI of the design tool and frames the prototype in a device shell (like an iPhone frame). It immerses the viewer in the experience.

**Mirroring:**
There is no substitute for holding the device. Use apps like Figma Mirror to run the prototype on your actual phone. Buttons that look big enough on a monitor often feel tiny under a thumb.

**Recording:**
Sometimes, you can't be there to demo it. Record a screencast of you walking through the prototype. Narrate your thinking: "Here, the user taps X, and expects Y..."

## Try It Yourself

### Exercise 1: The Simple Flow
Create three screens: Home, Details, and Profile. Link them up using a standard Bottom Navigation Bar. Use "Dissolve" for the transition. Does it feel like a real app?

### Exercise 2: The Modal
Create a "Delete" button. When clicked, it should open a confirmation dialog. Use "Open Overlay" so the background dims but stays visible. Make the "Cancel" button close the overlay.

### Exercise 3: Smart Animate
Create a toggle switch.
- Frame 1: Switch is OFF (gray circle on the left).
- Frame 2: Switch is ON (green circle on the right).
- Connect them with "On Click" and "Smart Animate." Watch how the circle slides smoothly across.

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

- Prototypes simulate the experience of using a product.
- **Low-fi** tests concepts; **Hi-fi** tests details.
- Use **Connections, Triggers, and Actions** to build interactivity.
- **Smart Animate** is powerful for state transitions but requires consistent layer naming.
- Always test your prototype on a real device to check touch targets and readability.
- Scope your prototypes to specific flows rather than building a "mega-app."

## Next Steps

Continue to [Collaboration and Handoff](./05-collaboration-and-handoff.md) →
