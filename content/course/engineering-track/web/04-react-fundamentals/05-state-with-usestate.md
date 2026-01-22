# State with useState

> **Quick Summary:** State is data that changes over time. The `useState` hook lets components remember and update values, triggering re-renders when state changes.

## What You'll Learn

- What state is and when to use it in React components
- The `useState` hook in detail
- How to update state correctly
- Key differences between state and props
- Common state management patterns

## What Is State?

State is data that can change during a component's lifetime. This includes things like a counter's current value, whether a modal is currently open, the values held by form inputs, data fetched from an API, or which tab is currently selected. When state changes, React automatically re-renders the component with the new values.

### State vs Props

| Props | State |
|-------|-------|
| Passed from parent | Owned by component |
| Read-only | Can be updated |
| Component can't change them | Component controls them |
| Think: function parameters | Think: component memory |

## The useState Hook

`useState` is a React hook that adds state to function components. Try the interactive counter to see state in action:

<!-- visual-example: state-counter-demo -->

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### Anatomy of useState

```jsx
const [value, setValue] = useState(initialValue);
```

The breakdown is as follows: `value` holds the current state value, `setValue` is a function used to update the state, and `initialValue` is the starting value which is only used on the very first render.

The `[value, setValue]` syntax is array destructuring. You can name these anything:

```jsx
const [count, setCount] = useState(0);
const [isOpen, setIsOpen] = useState(false);
const [user, setUser] = useState(null);
const [items, setItems] = useState([]);
```

## Updating State

### Basic Updates

Call the setter function with a new value:

```jsx
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}
```

### Functional Updates

When new state depends on previous state, use a function:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // ✅ Correct: Uses previous state
    setCount(prevCount => prevCount + 1);
  };

  const incrementThree = () => {
    // Each update uses the latest value
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+1</button>
      <button onClick={incrementThree}>+3</button>
    </div>
  );
}
```

**Why functional updates?**

State updates are batched and asynchronous. This can cause issues:

```jsx
// ❌ Bug: All three use the same stale count value
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
// Result: count only increases by 1

// ✅ Correct: Each uses the latest state
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
// Result: count increases by 3
```

## State with Objects

When state is an object, always create a new object:

```jsx
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  const updateName = (e) => {
    // ✅ Correct: Create new object with spread
    setUser({
      ...user,
      name: e.target.value
    });
  };

  // ❌ Wrong: Mutating state directly
  const badUpdate = (e) => {
    user.name = e.target.value; // Don't do this!
    setUser(user); // Won't trigger re-render
  };

  return (
    <form>
      <input 
        value={user.name}
        onChange={updateName}
        placeholder="Name"
      />
      <input 
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
    </form>
  );
}
```

### Nested Objects

For nested objects, spread at each level:

```jsx
const [settings, setSettings] = useState({
  theme: 'light',
  notifications: {
    email: true,
    push: false
  }
});

// Update nested property
const togglePush = () => {
  setSettings({
    ...settings,
    notifications: {
      ...settings.notifications,
      push: !settings.notifications.push
    }
  });
};
```

## State with Arrays

Arrays follow the same rule: create new arrays, don't mutate.

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);

  // Add item
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  // Remove item
  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Update item
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span 
            style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none' 
            }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text}
          </span>
          <button onClick={() => removeTodo(todo.id)}>×</button>
        </li>
      ))}
    </ul>
  );
}
```

### Common Array Operations

```jsx
// Add to end
setItems([...items, newItem]);

// Add to beginning
setItems([newItem, ...items]);

// Remove by index
setItems(items.filter((_, i) => i !== index));

// Remove by id
setItems(items.filter(item => item.id !== id));

// Update by id
setItems(items.map(item =>
  item.id === id ? { ...item, ...updates } : item
));

// Replace at index
setItems([
  ...items.slice(0, index),
  newItem,
  ...items.slice(index + 1)
]);
```

## Multiple State Variables

Use multiple `useState` calls for independent state:

```jsx
function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Each piece of state is independent
  // ...
}
```

**When to use one object vs multiple variables:**

```jsx
// Multiple variables: Independent values
const [name, setName] = useState('');
const [email, setEmail] = useState('');

// Single object: Related values that change together
const [position, setPosition] = useState({ x: 0, y: 0 });
```

## Lazy Initialisation

For expensive initial values, pass a function:

```jsx
// ❌ Runs on every render
const [data, setData] = useState(expensiveComputation());

// ✅ Runs only on first render
const [data, setData] = useState(() => expensiveComputation());
```

Example:

```jsx
function Editor() {
  // localStorage is only read once
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem('draft');
    return saved ? JSON.parse(saved) : '';
  });

  // ...
}
```

## State and Rendering

When state changes, React calls your component function again to generate new JSX, compares it with the previous output, and then updates only the parts of the DOM that have actually changed.

```jsx
function Example() {
  console.log('Component rendered');
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
// "Component rendered" logs on every click
```

## Controlled Components

Form inputs in React are typically "controlled", meaning their value is driven by state:

```jsx
function SearchInput() {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
```

**The controlled component pattern:**

The pattern is straightforward: state holds the value, the input element displays that value, the `onChange` event updates the state, and the component re-renders to reflect the new value.

## Building a Complete Example

Let's build an interactive task manager. Try it out first, then we'll walk through building it step by step:

<!-- visual-example: task-manager-demo -->

### Setting Up

If you don't have a React project yet, create one with Vite:

```bash
npm create vite@latest task-manager -- --template react
cd task-manager
npm install
npm run dev
```

Your project structure will look like this:

```text
task-manager/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── TaskManager.jsx    ← Create this
│   ├── TaskManager.css    ← Create this
│   └── main.jsx
└── package.json
```

### Step 1: Create the Component

Create a new file `src/TaskManager.jsx`:

```jsx
// src/TaskManager.jsx
import { useState } from 'react';
import './TaskManager.css';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask, completed: false }
    ]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="task-manager">
      <h1>Tasks</h1>

      <form onSubmit={addTask}>
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
        />
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>×</button>
          </li>
        ))}
      </ul>

      <p className="count">{activeCount} tasks remaining</p>
    </div>
  );
}

export default TaskManager;
```

Note the key parts:
- **Line 2**: Import `useState` from React
- **Line 3**: Import the CSS file (we'll create this next)
- **Line 108**: Export the component so other files can use it

### Step 2: Add the Styles

Create `src/TaskManager.css`:

```css
/* Task Manager Styles */
.task-manager {
  max-width: 400px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
}

.task-manager h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.task-manager form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.task-manager input[type="text"] {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.875rem;
}

.task-manager input[type="text"]:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.task-manager button {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
}

.task-manager button:hover {
  background: #2563eb;
}

.filters {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
  padding: 0.25rem;
  background: #f3f4f6;
  border-radius: 8px;
}

.filters button {
  flex: 1;
  padding: 0.375rem 0.75rem;
  background: transparent;
  color: #6b7280;
  font-size: 0.75rem;
}

.filters button:hover {
  color: #111827;
}

.filters button.active {
  background: white;
  color: #111827;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
}

.task-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.task-list li.completed span {
  text-decoration: line-through;
  color: #9ca3af;
}

.task-list input[type="checkbox"] {
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
}

.task-list span {
  flex: 1;
  font-size: 0.875rem;
}

.task-list li button {
  padding: 0.25rem 0.5rem;
  background: transparent;
  color: #9ca3af;
  font-size: 1rem;
  opacity: 0;
  transition: opacity 0.15s;
}

.task-list li:hover button {
  opacity: 1;
}

.task-list li button:hover {
  color: #ef4444;
  background: transparent;
}

.count {
  font-size: 0.75rem;
  color: #6b7280;
}
```

### Step 3: Use It in Your App

Update `src/App.jsx` to import and render the TaskManager:

```jsx
// src/App.jsx
import TaskManager from './TaskManager';

function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <TaskManager />
    </div>
  );
}

export default App;
```

Now run `npm run dev` and open http://localhost:5173 to see your task manager in action!

### How It All Connects

1. **main.jsx** renders `App` into the DOM
2. **App.jsx** imports and renders `TaskManager`
3. **TaskManager.jsx** imports `useState` from React and its styles
4. **TaskManager.css** provides the visual styling

The `useState` hook doesn't need installing - it comes with React, which Vite already set up for you when you chose the React template.

## State Design Tips

### Keep State Minimal

Only store what you need. Derive other values:

```jsx
// ❌ Storing derived data
const [items, setItems] = useState([]);
const [itemCount, setItemCount] = useState(0);
const [hasItems, setHasItems] = useState(false);

// ✅ Derive from source state
const [items, setItems] = useState([]);
const itemCount = items.length;
const hasItems = items.length > 0;
```

### Lift State Up

When components need to share state, lift it to their common ancestor:

```jsx
// State shared between siblings
function App() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      <List 
        selectedId={selectedId} 
        onSelect={setSelectedId} 
      />
      <Detail selectedId={selectedId} />
    </div>
  );
}
```

### Avoid Redundant State

Don't sync state that could be props:

```jsx
// ❌ Copying props to state
function BadComponent({ name }) {
  const [localName, setLocalName] = useState(name);
  // Now localName and name can get out of sync!
}

// ✅ Use props directly
function GoodComponent({ name }) {
  // Use name prop directly
  return <h1>{name}</h1>;
}
```

### Exercise 1: Like Counter

Build a simple "like" component featuring a heart icon button and a display of the current like count. Clicking the button should toggle the liked state, changing the heart's colour to reflect whether the post is currently liked.

### Exercise 2: Tab Component

Create a tabbed interface where an array of tab labels is rendered as buttons. Keep the currently selected tab in state, and ensure that the content area below the tabs updates dynamically based on the user's selection.

### Exercise 3: Shopping Cart

Build a mini shopping cart that displays a list of products, each with an "Add to Cart" button. The cart area should show added items with their quantities, allow increment and decrement adjustments, and display the calculated total price.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "usestate-quiz",
  "type": "multiple-choice",
  "title": "Understanding useState",
  "description": "Test your knowledge of React state.",
  "difficulty": "medium",
  "question": "Why should you use setCount(prev => prev + 1) instead of setCount(count + 1) when updating based on previous state?",
  "options": [
    {
      "id": "a",
      "text": "The functional form is faster",
      "isCorrect": false,
      "explanation": "Performance is the same. The benefit is correctness."
    },
    {
      "id": "b",
      "text": "State updates are batched and asynchronous, so count might be stale",
      "isCorrect": true,
      "explanation": "Correct! React batches state updates for performance. When you call setCount(count + 1) multiple times, each uses the same stale value. The functional form always receives the latest state."
    },
    {
      "id": "c",
      "text": "The functional form is required in React 18+",
      "isCorrect": false,
      "explanation": "Both forms work. The functional form is preferred when the new value depends on the previous value."
    },
    {
      "id": "d",
      "text": "It makes the code more readable",
      "isCorrect": false,
      "explanation": "Readability is subjective. The functional form prevents bugs with stale closures."
    }
  ]
}
-->

## Key Takeaways

- To recap, state is the component's memory that persists across renders
- The `useState` hook returns a `[value, setValue]` pair that you use to read and update this memory
- It is essential to always create new objects and arrays rather than mutating existing state directly
- When your new state value depends on the previous one, prefer functional updates
- Controlled components tie input values directly to state
- you should always keep your state minimal by deriving computed values where possible
- you should always keep your state minimal by deriving computed values where possible
- When multiple components need to share state, you should lift it up to their common ancestor

## Next Steps

Continue to [Effects and Data Fetching](./06-effects-and-data-fetching.md) →
