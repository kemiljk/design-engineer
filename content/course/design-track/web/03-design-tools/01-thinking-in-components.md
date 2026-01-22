# Thinking in Components

> **Quick Summary:** Component thinking is the foundation of modern design and development. It's about breaking interfaces into reusable, composable pieces rather than painting static screens.

## What You'll Learn

- What components are and why they matter
- Using Atomic Design methodology to structure interfaces (atoms, molecules, organisms)
- How to identify and define components
- The critical relationship between design and production code

## The Component Mental Model

> *"We're not designing pages, we're designing systems of components."* — Stephen Hay

Traditional graphic design often treats a page as a single canvas. You paint a header, a sidebar, and a footer. If you need a second page, you start another painting.

Component-based design flips this model. You don't build pages; you build a kit of parts. A page is simply a temporary arrangement of these parts. A `Button` is a component. A `Card` is a component. A `Header` is a component composed of a `Logo` and a `Navigation` component.

This approach aligns design with engineering. When a developer looks at your design, they don't see a picture; they see a tree of functional blocks (like React or Vue components). Adopting this mental model bridges the gap between how things look and how they are built.

## Atomic Design

Brad Frost's **Atomic Design** methodology provides a powerful vocabulary for describing this hierarchy. It draws a parallel between UI construction and chemistry.

<!-- visual-example: atomic-design-demo -->
<!-- illustration: atomic-design -->

### Atoms
Atoms are the foundational building blocks of your interface. These elements cannot be broken down further without ceasing to be functional. Ideally, an atom corresponds to a single HTML tag.

Examples include a **Label**, an **Input**, or a **Button**. An atom by itself is rarely useful—a label floating in space means nothing—but it is the essential raw material for everything else.

### Molecules
Molecules are groups of atoms bonded together to perform a specific function. They do one thing and do it well.

Take a **Search Form**. It is composed of a `Label` atom, an `Input` atom, and a `Button` atom. Combined, they form a functional unit that can be dropped anywhere in the application.

Organisms act as complex UI components—such as a header containing a logo atom and navigation molecule—that form distinct, recognisable sections of an interface. At this level, components begin to appear as the specific, functional parts that users interact with on a webpage.

### Templates
Templates are page-level objects that place components into a layout and articulate the design's underlying content structure. They focus on the page's anatomy (grid, layout) rather than its specific content.

### Pages
Pages are specific instances of templates. This is where you pour real content into the structure to test its resilience. What happens if the headline is 50 words long? What if the user has no profile picture?

## Identifying Components

When you look at a mockup or a wireframe, how do you decide what should be a component?

Identifying components involves looking for repeated patterns that can be abstracted, ensuring each element is sufficiently encapsulated to exist independently. By focusing on variability, you can define a single component with multiple properties rather than creating separate unique instances.

## Component Properties

Components aren't static images; they are flexible tools. We define their flexibility through **properties** (often called "props").

Components are defined by their **variants**, such as primary or secondary styles, and their interactive **states** like hovered or disabled. Furthermore, they are shaped by the **content** poured into them—including text and imagery—and controlled via boolean **options** like `hasIcon` or `isDismissible`.

## Naming Components

Naming is one of the hardest parts of design systems. A good name is descriptive, consistent, and—crucially—aligned with code.

**Descriptive:** `PrimaryButton` is better than `BlueBox`. `UserCard` is better than `ProfileThing`.

**Consistent:** If you call it a `Toggle` in one place, don't call it a `Switch` in another. Decide on a pattern (`NounAdjective` vs `AdjectiveNoun`) and stick to it.

**Code Alignment:** If your engineers call the top bar a `Header`, don't name your layer `TopNav`. Use the same language. This reduces friction during handoff.

## From Design to Code

The ultimate goal of component thinking is a **1:1 mapping** between your design tool (Figma) and the codebase.

Ideally, your `Button` component in Figma has a property named `variant` with values `primary` and `secondary`. The React code should look exactly the same:

```jsx
<Button variant="primary">Click me</Button>
```

When this alignment exists, "handoff" becomes trivial. You aren't handing off a drawing; you are handing off a set of instructions using a shared language.

## Component Documentation

A component library without documentation is just a sticker sheet. To make components usable, you need to explain *how* and *why* to use them.

Document the **Purpose** (when to use this vs. something else), the **Anatomy** (what parts make it up), and the **Behavior** (what happens when I click it?). Good documentation turns a set of UI elements into a true Design System.

## Try It Yourself

### Exercise 1: Component Breakdown
Take a screenshot of a popular app like Instagram or Twitter. Print it out or put it in Figma. Draw boxes around the **Atoms** (icons, text), **Molecules** (post header, action bar), and **Organisms** (the entire feed post).

### Exercise 2: Defining Props
Imagine a "Notification Toast" component. List the properties it needs.
A notification toast component would typically require content properties for its title and message, variants for success or error states, and boolean options to determine if it is dismissible or includes an action button.

### Exercise 3: Naming
Rename the layers in your current design file to match a strict component naming convention, and then organise related components into groups like `Button/Primary` or `Button/Secondary`.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "atomic-design-quiz",
  "type": "multiple-choice",
  "title": "Atomic Design Hierarchy",
  "description": "Test your understanding of component hierarchy.",
  "difficulty": "medium",
  "question": "A search bar consisting of an input field and a search button would be classified as what in Atomic Design?",
  "options": [
    {
      "id": "a",
      "text": "An atom, because it's a single functional unit",
      "isCorrect": false,
      "explanation": "Atoms are the smallest possible units. They can't be broken down further. The search bar contains multiple elements."
    },
    {
      "id": "b",
      "text": "A molecule, because it's a group of atoms functioning together",
      "isCorrect": true,
      "explanation": "Correct! A molecule is a group of atoms (input + button) that work together as a single unit with a focused purpose."
    },
    {
      "id": "c",
      "text": "An organism, because it's a complex interactive component",
      "isCorrect": false,
      "explanation": "Organisms are more complex sections made of molecules and atoms, like a full navigation header."
    },
    {
      "id": "d",
      "text": "A template, because it appears on multiple pages",
      "isCorrect": false,
      "explanation": "Templates are page-level layouts showing how organisms combine, not reusable UI components."
    }
  ]
}
-->

## Key Takeaways

Components should be treated as the fundamental units of design, structured through Atomic Design principles into atoms, molecules, and organisms. By identifying reusable functionality and defining props rather than unique copies, you can align naming conventions with engineering to create a shared, systematic language.

## Next Steps

Continue to [Design Tool Fundamentals](./02-design-tool-fundamentals.md) →
