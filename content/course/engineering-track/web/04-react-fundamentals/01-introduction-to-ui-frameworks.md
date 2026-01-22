# Introduction to UI Frameworks

> **Quick Summary:** UI frameworks like React, Vue, and Svelte help you build complex interfaces more efficiently by managing state and updates automatically.

## What You'll Learn

- What UI frameworks are and the problems they solve
- Major players in the ecosystem (React, Vue, Svelte, Angular)
- How their underlying philosophies and approaches differ
- Why React dominates the industry and what it means for design engineers

## Beyond Vanilla JavaScript

In the previous module, you learned to manipulate the DOM directly with vanilla JavaScript. While this approach works perfectly well for simple interactions, it quickly becomes unwieldy as applications grow in complexity. Manual DOM updates require you to meticulously track every element that needs changing, and keeping the UI in sync with your application's state becomes a significant burden. Managing event listeners across dynamic content adds further complexity, and without built-in patterns, organising a large codebase can feel overwhelming. UI frameworks exist precisely to solve these problems.

## What UI Frameworks Do

At their core, UI frameworks provide:

### Declarative Rendering

Instead of imperatively updating the DOM, you describe what the UI should look like for a given state. The framework handles updates.

**Imperative (vanilla JS):**
```javascript
// You tell the browser exactly what to do
if (isLoggedIn) {
  userNameSpan.textContent = user.name;
  loginButton.style.display = 'none';
  logoutButton.style.display = 'block';
} else {
  userNameSpan.textContent = '';
  loginButton.style.display = 'block';
  logoutButton.style.display = 'none';
}
```

**Declarative (framework):**
```jsx
// You describe what should render
{isLoggedIn ? (
  <>
    <span>{user.name}</span>
    <button onClick={logout}>Log out</button>
  </>
) : (
  <button onClick={login}>Log in</button>
)}
```

### Component Architecture

Frameworks encourage building UIs as composable components, applying the same thinking you learned earlier with framework support.

### Automatic Updates

When state changes, frameworks efficiently update only what needs to change. No manual DOM manipulation required.

## The Major Frameworks

### React

Created by Facebook in 2013, React pioneered the component model that all modern frameworks now use.

**Philosophy:** UI is a function of state. Components are JavaScript functions that return markup (JSX).

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

**Key characteristics:**

React introduced JSX, an HTML-like syntax that lives directly within JavaScript. It relies on hooks for state and side effects, uses a virtual DOM for efficient updates, and remains largely unopinionated, allowing you to choose your own routing and state management solutions.

### Vue

Created by Evan You in 2014, Vue offers a more approachable learning curve with a familiar template syntax.

**Philosophy:** Progressive framework. Start simple, add complexity as needed.

```vue
<template>
  <button @click="count++">
    Clicked {{ count }} times
  </button>
</template>

<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>
```

**Key characteristics:**

Vue uses HTML-based templates with special directives for reactivity and organises code into single-file components (`.vue` files). Its reactive system automatically tracks dependencies, and it comes with more built-in features than React, making it feel more "batteries included" from the start.

### Svelte

Created by Rich Harris in 2016, Svelte takes a radically different approach.

**Philosophy:** Shift work from runtime to compile time. No virtual DOM.

```svelte
<script>
  let count = 0;
</script>

<button on:click={() => count++}>
  Clicked {count} times
</button>
```

**Key characteristics:**

Svelte compiles your code into highly optimised vanilla JavaScript, meaning there is no framework runtime shipped to the browser. This results in simpler syntax, less boilerplate, and significantly smaller bundle sizes, making it an excellent choice for performance-critical applications.

### Angular

Created by Google in 2016 (Angular 2+), Angular is a full-featured framework for enterprise applications.

**Philosophy:** Complete solution with everything included.

```typescript
@Component({
  selector: 'app-counter',
  template: `
    <button (click)="increment()">
      Clicked {{ count }} times
    </button>
  `
})
export class CounterComponent {
  count = 0;
  increment() { this.count++; }
}
```

**Key characteristics:**

Angular defaults to TypeScript and uses dependency injection as a core pattern. It incorporates RxJS for reactive programming and provides an opinionated structure and tooling that promotes consistency across large teams.

## Comparing Approaches

### The Same Component, Four Ways

Try it yourself. See how the same counter component is written in each framework:

<!-- visual-example: framework-comparison-demo -->

Here's a more complete example: a todo item with completion toggle.

**React:**
```jsx
function TodoItem({ todo, onToggle }) {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
    </li>
  );
}
```

**Vue:**
```vue
<template>
  <li :class="{ completed: todo.completed }">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="$emit('toggle', todo.id)"
    />
    <span>{{ todo.text }}</span>
  </li>
</template>

<script setup>
defineProps(['todo']);
defineEmits(['toggle']);
</script>
```

**Svelte:**
```svelte
<script>
  export let todo;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<li class:completed={todo.completed}>
  <input
    type="checkbox"
    checked={todo.completed}
    on:change={() => dispatch('toggle', todo.id)}
  />
  <span>{todo.text}</span>
</li>
```

**Angular:**
```typescript
@Component({
  selector: 'todo-item',
  template: `
    <li [class.completed]="todo.completed">
      <input
        type="checkbox"
        [checked]="todo.completed"
        (change)="toggle.emit(todo.id)"
      />
      <span>{{ todo.text }}</span>
    </li>
  `
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggle = new EventEmitter<string>();
}
```

### Philosophy Differences

| Aspect | React | Vue | Svelte | Angular |
|--------|-------|-----|--------|---------|
| **Template** | JSX (JS) | HTML-based | HTML-based | HTML-based |
| **Reactivity** | Explicit (hooks) | Automatic (refs) | Automatic (assignment) | Zone.js / Signals |
| **Learning curve** | Moderate | Gentle | Gentle | Steep |
| **Bundle size** | ~40KB | ~30KB | ~2KB | ~100KB+ |
| **Ecosystem** | Massive | Large | Growing | Large |
| **Backing** | Meta | Independent | Independent | Google |

**Choose React when** you want maximum job opportunities, need the largest ecosystem of libraries, are building large and complex applications, or your team already has React experience.

**Choose Vue when** you prefer HTML-based templates, want a gentler learning curve, appreciate a more opinionated structure, or are working on smaller to medium-sized projects.

**Choose Svelte when** bundle size is critical, you want the simplest possible syntax, are building performance-critical UIs, or enjoy trying innovative approaches.

**Choose Angular when** you are building enterprise applications, want everything included out of the box, your team is comfortable with TypeScript and OOP, or consistency across a large team is paramount.

## Why React Dominates

Despite excellent alternatives, React holds the largest market share. Here's why:

### Job Market

React skills are the most sought-after in frontend development:
- More React job listings than all other frameworks combined
- Higher average salaries for React developers
- Required at most major tech companies

### Ecosystem

React's ecosystem is unmatched:
- Thousands of component libraries
- Mature solutions for every problem
- Extensive documentation and tutorials
- Large community for support

### Transferable Skills

React concepts transfer everywhere:
- React Native for mobile apps
- Electron apps use React
- Many frameworks are React-compatible
- Component thinking applies to all frameworks

### Industry Adoption

Major companies use React:
- Facebook/Meta (creator)
- Netflix
- DuckDuckGo
- Airbnb
- Twitter/X
- Uber

### Stability and Investment

React isn't going anywhere:
- Backed by Meta (Facebook)
- Continuous development since 2013
- Massive community investment
- Migration paths for breaking changes

## Framework-Agnostic Skills

Regardless of which framework you ultimately choose, certain fundamental skills will transfer across all of them. These include component thinking, which involves breaking UIs into reusable pieces; state management, which is understanding how data flows through your application; props and events, the patterns for communication between components; lifecycle awareness, knowing when things initialise, update, and are destroyed; and performance optimisation, avoiding unnecessary re-renders. Master these concepts well, and switching between frameworks becomes a straightforward exercise.

## Try It Yourself

### Exercise 1: Explore the Ecosystem

Visit the official sites for each framework:
- [React](https://react.dev)
- [Vue](https://vuejs.org)
- [Svelte](https://svelte.dev)
- [Angular](https://angular.dev)

Note differences in:
- Documentation style
- Getting started experience
- Playground/tutorial quality

### Exercise 2: Job Market Research

Search for frontend developer jobs in your area. Count:
- How many mention React
- How many mention Vue
- How many mention Svelte
- How many mention Angular

### Exercise 3: Syntax Comparison

Look at the todo item examples above. For each framework, identify:
- How is the class conditionally applied?
- How are props received?
- How are events emitted to the parent?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "frameworks-intro-quiz",
  "type": "multiple-choice",
  "title": "UI Frameworks Fundamentals",
  "description": "Test your understanding of UI frameworks.",
  "difficulty": "easy",
  "question": "What is the main advantage of declarative rendering in UI frameworks?",
  "options": [
    {
      "id": "a",
      "text": "It makes websites load faster",
      "isCorrect": false,
      "explanation": "Declarative rendering doesn't inherently improve load times."
    },
    {
      "id": "b",
      "text": "You describe what the UI should look like, and the framework handles DOM updates",
      "isCorrect": true,
      "explanation": "Correct! Declarative rendering lets you focus on describing UI state rather than manually updating the DOM. The framework efficiently determines and applies the necessary changes."
    },
    {
      "id": "c",
      "text": "It eliminates the need for CSS",
      "isCorrect": false,
      "explanation": "CSS is still required for styling in all frameworks."
    },
    {
      "id": "d",
      "text": "It allows you to skip learning JavaScript",
      "isCorrect": false,
      "explanation": "All UI frameworks require JavaScript knowledge. Understanding JS fundamentals is essential."
    }
  ]
}
-->

## Key Takeaways

- To recap, UI frameworks automate the management of state and DOM updates, freeing you from tedious manual synchronisation
- While React, Vue, Svelte, and Angular are the major players, each comes with its own unique philosophy and set of tradeoffs
- Widespread industry adoption means learning these frameworks provides transferable skills
- The core concepts of components, state, and props are universal across modern frameworks

## Next Steps

Continue to [Why React?](./02-why-react.md) →
