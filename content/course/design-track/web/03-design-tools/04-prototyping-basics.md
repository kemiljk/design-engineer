# Prototyping Basics

> **Quick Summary:** Prototypes make designs interactive. They turn static screens into clickable experiences that communicate ideas, test assumptions, and sell visions.

## What You'll Learn

By progressing through this lesson, you will understand why prototyping is a vital skill for Design Engineers and explore the various fidelity levels required for different testing phases. You will also learn to create interactive prototypes using triggers and actions within your design tools and develop effective methods for presenting and sharing your work with stakeholders.

## Why Prototype?

> *"If a picture is worth a thousand words, a prototype is worth a thousand meetings."* — Tom and David Kelley, IDEO

A static mockup is a promise; a prototype is a proof. Static screens cannot show how an interface *feels*. They don't show the transition from "Loading" to "Success." They don't reveal that a navigation flow is confusing or that a button is too hard to reach.

Prototypes bridge the gap between imagination and reality. They allow stakeholders to "play" with the product before a single line of code is written. For developers, a prototype answers questions that specs cannot ("How fast should this slide out?", "Does it push the content or overlay it?").

**Design Engineers have a superpower:** We can prototype in design tools (Figma) for speed, or in code (React/SwiftUI) for fidelity. This lesson focuses on the design tool approach—fast, low-cost, and essential for early validation.

## Fidelity Levels

Not all prototypes need to look like the final product. Choosing the right fidelity saves time.

<!-- visual-example: fidelity-comparison-demo -->

Prototypes range from low-fidelity digital sketches used to test initial flows without the distraction of visual polish, to high-fidelity versions that look and feel like a shipping application. Medium-fidelity prototypes serve as a sweet spot for usability testing by including layout and real text, while the high-fidelity final versions remove ambiguity during developer handoff and stakeholder presentations.

## Creating Prototypes

Prototyping in tools like Figma revolves around three concepts: Connections, Triggers, and Actions.

### Connections
You create a prototype by drawing a literal wire from one frame to another. This wire represents a path the user can take. If you connect a "Settings" button to the "Settings Screen," you've created a path.

### Triggers
The trigger is the event that starts the action.
Triggers define the event that starts an action, ranging from common clicks and taps to more specific interactions like dragging for carousels or swiping to delete. Desktop-specific prototypes often leverage hover triggers for tooltips and button states, while delayed triggers are used to automate transitions for elements like splash screens.

### Actions
The action is what happens when the trigger fires.
When a trigger fires, it can initiate various actions such as navigating to a new screen, opening a modal or dropdown via an overlay, or swapping one overlay for another. Prototypes can also use scroll actions to jump directly to specific sections on the same page.

## Animation and Transitions

Transitions are the glue between states.

Transitions provide the visual glue between states, using instant changes for tab switching, simple dissolves for standard navigation, and spatial "Push" animations to help users build a mental map of their movement through the application.

**Smart Animate:**
This is the magic wand. If you have a layer named `Card` on Screen A (small) and a layer named `Card` on Screen B (fullscreen), "Smart Animate" will automatically calculate the growth and movement between them. It creates complex, fluid animations without manual keyframing. Use this for state changes (like expanding a card or toggling a switch).

## Prototype Scope

Don't try to prototype the entire app at once. It becomes an unmaintainable mess of wires ("spaghetti code" for designers). Instead, scope your prototypes:

Focus your prototyping efforts on specific scopes, such as the "happy path" for selling a vision, detailed task flows for testing the robustness of complex interactions like checkout, or feature-specific prototypes to refine the feel of individual components.

## Presenting and Sharing

A prototype is a communication tool. How you share it matters.

Present your work effectively by using immersion modes that frame the interface in a device shell, mirroring the prototype onto real hardware to check touch targets, or recording narrated walk-throughs to explain your thinking for asynchronous reviews.

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

Prototypes are essential for simulating the user experience, with low-fidelity versions testing core concepts and high-fidelity versions refining specific details. By building interactivity through connections and triggers, and leveraging tools like Smart Animate and real-device testing, you can validate specific flows and ensure that every transition feels intuitive before moving to production.

## Next Steps

Continue to [Collaboration and Handoff](./05-collaboration-and-handoff.md) →
