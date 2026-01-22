# Accessibility Foundations

> **Quick Summary:** Accessibility ensures everyone can use your interface—it's not optional, it's essential. And it often improves the experience for everyone.

## What You'll Learn

- What accessibility means and why it matters
- The curb cut effect and how accessibility benefits everyone
- Types of disabilities and how they affect web use
- Core accessibility principles and standards

## What Is Accessibility?

> *"The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect."* — Tim Berners-Lee

Web accessibility (often abbreviated as **a11y**) is the inclusive practice of ensuring there are no barriers that prevent interaction with, or access to, websites on the World Wide Web by people with physical disabilities, situational disabilities, and socio-economic restrictions on bandwidth and speed.

It involves designing for:
*   **Visual impairments:** Blindness, low vision, colour blindness.
*   **Motor impairments:** Limited fine motor control, tremors, inability to use a mouse.
*   **Hearing impairments:** Deafness, hard of hearing.
*   **Cognitive differences:** ADHD, dyslexia, autism, memory limitations.

## The Curb Cut Effect

Accessibility is not a zero-sum game. Features designed for people with disabilities often benefit everyone. This is known as the **Curb Cut Effect**.

Curb cuts (the ramps at street corners) were originally created for wheelchair users. But they also help:
*   Parents pushing strollers.
*   Travelers pulling wheeled luggage.
*   Cyclists entering the pavement safely.
*   Delivery workers with hand trucks.

Similarly, **Video Captions** were designed for the deaf, but they are used by people in noisy bars, quiet libraries, or those learning a new language. **High Contrast** modes help people with low vision, but also people using their phones in bright sunlight.

## Who Benefits?

Accessibility supports a spectrum of needs:

1.  **Permanent:** A person who is blind.
2.  **Temporary:** A person with a broken arm (who can't use a mouse for 6 weeks).
3.  **Situational:** A person holding a baby (who needs to navigate with one hand).

By designing for the permanent constraint, you solve for the temporary and situational ones for free.

## Design Engineer Responsibility

As a Design Engineer, you bridge the gap between intent and implementation. You are the last line of defence for accessibility.

### In Design
Your decisions in Figma determine the baseline accessibility of the product.
*   **Colour Contrast:** Ensuring text is legible against its background.
*   **Touch Targets:** Making buttons large enough to tap (minimum 44px).
*   **Visual Hierarchy:** Using size and spacing to guide the eye logically.
*   **Focus States:** Designing clear indicators for keyboard users.

### In Code
Your implementation ensures that the visual design translates into a machine-readable structure.
*   **Semantic HTML:** Using `<button>` instead of `<div onclick="...">`.
*   **ARIA Labels:** Providing text alternatives for icons (`aria-label="Close"`).
*   **Keyboard Navigation:** Ensuring the Tab key moves through the page in a logical order.
*   **Focus Management:** Moving the focus to a modal when it opens, and trapping it there.

## Assistive Technologies

Users access the web using diverse tools. Understanding them helps you build better products.

*   **Screen Readers:** Software that reads the screen content aloud (e.g., VoiceOver, NVDA, JAWS). It relies entirely on the semantic structure of your HTML.
*   **Switch Devices:** Buttons or sip-and-puff devices that allow users with limited motor control to navigate by scanning through interactive elements.
*   **Screen Magnifiers:** Tools that zoom in on portions of the screen. They require high-resolution assets and responsive layouts that don't break when zoomed to 200% or 400%.
*   **Voice Control:** Software that allows users to navigate and type using voice commands.

## WCAG Guidelines

The **Web Content Accessibility Guidelines (WCAG)** are the international standard for web accessibility. They are organised into three levels of conformance:

*   **Level A:** Essential accessibility features. Without these, the site is unusable for many.
*   **Level AA:** The global standard for most public websites and legal requirements. It addresses the most common barriers.
*   **Level AAA:** The highest standard, often required for specialised government or healthcare sites.

**WCAG 2.2** is the current standard, focusing on four principles (POUR):
1.  **Perceivable:** Information must be presentable to users in ways they can perceive (sight, sound, touch).
2.  **Operable:** User interface components and navigation must be operable (keyboard accessible, no keyboard traps).
3.  **Understandable:** Information and the operation of the user interface must be understandable (predictable patterns, clear error messages).
4.  **Robust:** Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "a11y-foundations-quiz",
  "type": "multiple-choice",
  "title": "Accessibility Foundations",
  "description": "Test your understanding of web accessibility basics.",
  "difficulty": "easy",
  "question": "Why is accessibility important beyond legal compliance?",
  "options": [
    {
      "id": "a",
      "text": "It only matters for government websites",
      "isCorrect": false,
      "explanation": "Accessibility benefits all users on all websites."
    },
    {
      "id": "b",
      "text": "It improves usability for everyone, including situational disabilities like bright sunlight or broken arms",
      "isCorrect": true,
      "explanation": "Correct! Accessibility features help users in many situations, not just permanent disabilities. Captions help in noisy environments, keyboard navigation helps with a broken mouse, etc."
    },
    {
      "id": "c",
      "text": "It's only relevant for older users",
      "isCorrect": false,
      "explanation": "Disabilities and situational impairments affect users of all ages."
    },
    {
      "id": "d",
      "text": "Accessible sites load faster",
      "isCorrect": false,
      "explanation": "While clean code can help performance, accessibility and performance are separate concerns."
    }
  ]
}
-->

## Key Takeaways

- Accessibility is about universality and inclusion, ensuring that the web is open to everyone regardless of specific abilities or constraints
- Remember the **curb cut effect**: features designed for people with disabilities often improve the experience for everyone
- As a design engineer, you control both the visual aspects (like contrast and hierarchy) and the technical implementation (via HTML and ARIA), so look to **WCAG** as your rulebook and **POUR** (Perceivable, Operable, Understandable, Robust) as your guiding philosophy

## Next Steps

Continue to [Semantic HTML for A11y](./02-semantic-html-for-a11y.md) →
