# State with useState

> **Quick Summary:** State is data that changes over time. The `useState` hook lets components remember and update values, triggering re-renders when state changes.

## What You'll Learn

- What state is and when to use it
- The useState hook in detail
- Updating state correctly
- State vs props
- Common state patterns

## What Is State?

State is data that can change during a component's lifetime:

- A counter's current value
- Whether a modal is open
- Form input values
- Fetched data from an API
- Which tab is selected

When state changes, React re-renders the component with the new values.

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

- **`value`**: The current state value
- **`setValue`**: Function to update the state
- **`initialValue`**: The starting value (only used on first render)

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

When state changes, React:
1. Calls your component function again
2. Generates new JSX
3. Compares with previous JSX
4. Updates only what changed in the DOM

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
1. State holds the value
2. Input displays the state value
3. onChange updates state
4. Component re-renders with new value

## Building a Complete Example

Let's build an interactive task manager:

```jsx
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
```

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

## Try It Yourself

### Exercise 1: Like Counter

Build a component with:
- A heart icon button
- A like count
- Click to toggle liked state
- Liked state changes the heart colour

### Exercise 2: Tab Component

Create a tabbed interface:
- Array of tab labels
- Currently selected tab in state
- Content changes based on selection

### Exercise 3: Shopping Cart

Build a mini shopping cart:
- List of products with "Add to Cart" buttons
- Cart shows added items with quantities
- Can increment/decrement quantities
- Shows total price

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

- State is component memory that persists across renders
- `useState` returns `[value, setValue]` pair
- Always create new objects/arrays; never mutate state directly
- Use functional updates when new state depends on previous state
- Controlled components tie input values to state
- Keep state minimal; derive values when possible
- Lift state up when multiple components need to share it

## Next Steps

Continue to [Effects and Data Fetching](./06-effects-and-data-fetching.md) →
