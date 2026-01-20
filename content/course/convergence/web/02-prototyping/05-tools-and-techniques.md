# Tools and Techniques

> **Quick Summary:** The right tool depends on what you're prototyping and how quickly you need it. Master multiple approaches for maximum flexibility.

## What You'll Learn

During this lesson, you will master the various categories of prototyping tools—from design software to code sandboxes—and learn exactly when to deploy each approach for maximum impact. We'll explore essential speed techniques, including the use of boilerplates and component libraries, and examine how to build a personal, production-ready prototyping toolkit that allows you to move from idea to interactive model in record time.

## Tool Categories

### Design Tools (Figma, Sketch, etc.)
- **Best for:** Visual exploration, clickable mockups
- **Speed:** Fast for static, medium for interactive
- **Fidelity:** Medium to high visual, low interaction

### Code Sandboxes (CodePen, CodeSandbox)
- **Best for:** Quick interaction tests, shareable experiments
- **Speed:** Very fast setup
- **Fidelity:** High interaction, variable visual

### Local Development
- **Best for:** Complex interactions, real data
- **Speed:** Slower setup, faster iteration once running
- **Fidelity:** Production-level possible

### No-Code Tools (Framer, Webflow)
- **Best for:** Marketing pages, quick landing pages
- **Speed:** Fast for certain use cases
- **Fidelity:** High visual, medium interaction

## Choosing Your Tool

| Need | Best Tool |
|------|-----------|
| Test a flow | Figma prototype |
| Test an interaction | CodeSandbox |
| Test with real data | Local dev |
| Impress stakeholders | Polished code prototype |
| Explore many options | Paper/Figma |
| Validate technical feasibility | Code |

## Speed Techniques

### Templates and Boilerplates
Keep starter templates ready:
```bash
# Quick React prototype
npx create-react-app my-prototype --template typescript
```

Or maintain your own minimal starter with your preferred setup.

### Component Libraries
Don't rebuild basics:
```bash
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
```

Style existing components rather than building from scratch.

### Placeholder Everything
```jsx
// Don't wait for real content
<img src="https://picsum.photos/400/300" alt="Placeholder" />
<p>{faker.lorem.paragraph()}</p>
```

### AI Assistance
Use AI to generate boilerplate, placeholder content, and even basic components.

## Hybrid Approaches

### Design + Code
1. Rough layout in Figma (10 min)
2. Build structure in code (20 min)
3. Iterate in code (ongoing)

### Code-First with Design Polish
1. Build functional prototype
2. Screenshot into Figma
3. Polish visual design
4. Implement polish in code

## Building Your Toolkit

Essential skills:
- [ ] HTML/CSS fluency
- [ ] Basic JavaScript
- [ ] One design tool (Figma recommended)
- [ ] One component library
- [ ] Deployment (Vercel/Netlify for instant sharing)

Nice to have:
- [ ] Animation library (Motion/GSAP)
- [ ] Data mocking tools
- [ ] Screen recording (Loom)

## Try It Yourself

### Exercise 1: Tool Comparison

Take one concept and prototype it three ways:
- Figma clickable prototype
- CodePen minimal implementation
- Local development environment

Compare speed, fidelity, and learning from each.

### Exercise 2: Toolkit Setup

Create your ideal prototype starter:
- Boilerplate code
- Favourite libraries installed
- Common components ready
- Deploy script configured

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "prototyping-tools-quiz",
  "type": "multiple-choice",
  "title": "Prototyping Tools",
  "description": "Test your understanding of choosing prototyping tools.",
  "difficulty": "easy",
  "question": "When should you use design tool prototyping vs code prototyping?",
  "options": [
    {
      "id": "a",
      "text": "Always code—design tool prototypes are limited",
      "isCorrect": false,
      "explanation": "Design tool prototypes are faster for simple flows and don't require development."
    },
    {
      "id": "b",
      "text": "Design tools for simple flows and visual exploration; code for complex interactions, real data, and production potential",
      "isCorrect": true,
      "explanation": "Correct! Choose based on the question you're answering. Simple navigation? Design tool. Complex state or real data? Code."
    },
    {
      "id": "c",
      "text": "Design tools for designers, code for engineers",
      "isCorrect": false,
      "explanation": "Design Engineers use both—it's about choosing the right tool for the task."
    },
    {
      "id": "d",
      "text": "Whatever tool you're most comfortable with",
      "isCorrect": false,
      "explanation": "Comfort matters, but capabilities matter more—use the right tool for the job."
    }
  ]
}
-->

## Key Takeaways

Mastering a variety of prototyping tools allows you to choose the fastest method to answer a specific design or technical question, whether through a quick Figma flow or a high-fidelity code sandbox. Speed comes from preparation—having a personal toolkit of templates, libraries, and deployment scripts ready for instant use. Ultimately, the best tool is the one that facilitates the fastest cycle of iteration and learning for your specific project needs.

## Congratulations!

You've completed the Prototyping module!

Continue to [Accessibility: Accessibility Foundations](../03-accessibility/01-accessibility-foundations.md) →
