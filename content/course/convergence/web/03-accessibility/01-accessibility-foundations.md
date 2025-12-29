# Accessibility Foundations

> **Quick Summary:** Accessibility ensures everyone can use your interface—it's not optional, it's essential. And it often improves the experience for everyone.

## What You'll Learn

- What accessibility means and why it matters
- Who benefits from accessibility
- The business and legal case
- Accessibility as a Design Engineering practice

## What Is Accessibility?

> *"The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect."* — Tim Berners-Lee

Web accessibility (a11y) means designing and building interfaces that work for everyone, including people with:
- **Visual impairments:** Blindness, low vision, colour blindness
- **Motor impairments:** Limited fine motor control, inability to use mouse
- **Hearing impairments:** Deafness, hard of hearing
- **Cognitive differences:** ADHD, dyslexia, autism

## Who Benefits?

Accessibility helps more people than you might think:
- Permanent disabilities
- Temporary impairments (broken arm, eye infection)
- Situational limitations (bright sunlight, loud environment, one-handed)
- Aging-related changes
- Slow internet connections

When you design for accessibility, you often improve the experience for everyone.

## The Curb Cut Effect

Curb cuts (ramps in sidewalks) were designed for wheelchairs. They also help:
- Parents with strollers
- Delivery workers with carts
- Travelers with luggage
- Anyone with temporary mobility issues

Web accessibility features have similar benefits. Captions help in noisy environments. Keyboard navigation helps power users. High contrast helps in sunlight.

## Design Engineer Responsibility

As a Design Engineer, you touch both design and code, the two areas where accessibility is determined:

### In Design
- Color contrast
- Touch target sizes
- Visual hierarchy
- Focus indication

### In Code
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management

You're positioned to catch accessibility issues before they ship and implement accessible solutions.

## WCAG Guidelines

The Web Content Accessibility Guidelines (WCAG) define success criteria at three levels:
- **A:** Minimum accessibility
- **AA:** Target for most sites (legal requirement in many places)
- **AAA:** Enhanced accessibility

WCAG 2.2 (released October 2023) is the current version, adding important criteria for mobile accessibility, cognitive accessibility, and users with low vision.

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
      "explanation": "Accessibility and performance are separate concerns."
    }
  ]
}
-->

## Key Takeaways

- Accessibility benefits everyone, not just those with disabilities
- Design Engineers influence accessibility in both design and code
- WCAG provides concrete standards to follow
- Accessibility is a professional responsibility

## Next Steps

Continue to [Semantic HTML for A11y](./02-semantic-html-for-a11y.md) →
