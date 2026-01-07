# Hooks Patterns and Best Practices

> **Quick Summary:** Beyond useState and useEffect, React provides additional hooks for performance, context, and refs. Understanding these patterns unlocks more powerful component designs.

## What You'll Learn

- Additional React hooks: useRef, useContext, useMemo, useCallback
- Custom hooks for reusable logic
- Rules of hooks
- Performance optimisation patterns
- Common mistakes and how to avoid them

## Quick Hooks Reference

| Hook | Purpose |
|------|---------|
| useState | State management |
| useEffect | Side effects and synchronisation |
| useRef | Mutable refs, DOM access |
| useContext | Share state without prop drilling |
| useMemo | Memoize expensive calculations |
| useCallback | Memoize functions |
| useReducer | Complex state logic |

Compare how different hooks behave:

<!-- visual-example: hooks-comparison-demo -->

## useRef: Mutable References

`useRef` creates a mutable object that persists across renders:

```jsx
const ref = useRef(initialValue);
// ref.current holds the value
```

### Accessing DOM Elements

```jsx
function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

### Storing Mutable Values

Unlike state, changing a ref doesn't trigger re-render:

```jsx
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null);

  const start = () => {
    intervalRef.current = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

### Tracking Previous Values

```jsx
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// Usage
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}, Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

## useContext: Avoiding Prop Drilling

Context shares state across many components without passing props through every level:

### Creating Context

```jsx
import { createContext, useContext, useState } from 'react';

// Create the context
const ThemeContext = createContext(null);

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for consuming
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### Using Context

```jsx
// Wrap your app
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  );
}

// Access anywhere in the tree
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}

function Card() {
  const { theme } = useTheme();

  return (
    <div className={`card card-${theme}`}>
      Content
    </div>
  );
}
```

### When to Use Context

**Good uses:**
- Theme (light/dark mode)
- Current user authentication
- Locale/language settings
- UI state (sidebar open, modal visible)

**Avoid for:**
- Frequently changing data (causes many re-renders)
- Data that only a few components need
- Everything (not a replacement for all state)

## useMemo: Memoizing Calculations

`useMemo` caches expensive calculations:

```jsx
function FilteredList({ items, filter }) {
  // Without useMemo: Runs on every render
  // const filteredItems = items.filter(item => item.category === filter);

  // With useMemo: Only runs when items or filter change
  const filteredItems = useMemo(() => {
    return items.filter(item => item.category === filter);
  }, [items, filter]);

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### When to Use useMemo

Use it for:
- Expensive calculations (sorting large arrays, complex filtering)
- Creating objects/arrays passed to optimised children
- Values that shouldn't change reference unnecessarily

Don't overuse it—the memoization itself has a cost.

## useCallback: Memoizing Functions

`useCallback` returns a memoized function:

```jsx
function TodoList({ todos, onToggle }) {
  // Without useCallback: New function every render
  // const handleToggle = (id) => onToggle(id);

  // With useCallback: Same function reference
  const handleToggle = useCallback((id) => {
    onToggle(id);
  }, [onToggle]);

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
        />
      ))}
    </ul>
  );
}
```

### useCallback vs useMemo

```jsx
// These are equivalent
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

const memoizedCallback = useMemo(() => {
  return () => doSomething(a, b);
}, [a, b]);
```

Use `useCallback` for functions, `useMemo` for values.

## useReducer: Complex State

For state with complex update logic:

```jsx
import { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    case 'set':
      return { count: action.payload };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'set', payload: 10 })}>
        Set to 10
      </button>
    </div>
  );
}
```

### When to Use useReducer

- Multiple related state values
- Next state depends on previous state
- Complex update logic
- You want to pass `dispatch` down instead of callbacks

## Custom Hooks

Extract reusable logic into custom hooks:

### useToggle

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle];
}

// Usage
function Modal() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <div>
      <button onClick={toggleOpen}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      {isOpen && <div className="modal">Modal content</div>}
    </div>
  );
}
```

### useFetch

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error('Failed to fetch');
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserProfile({ userId }) {
  const { data: user, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <h1>{user.name}</h1>;
}
```

### useDebounce

```jsx
function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

// Usage
function Search() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const { data: results } = useFetch(
    debouncedQuery ? `/api/search?q=${debouncedQuery}` : null
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      {results && <SearchResults results={results} />}
    </div>
  );
}
```

### useMediaQuery

```jsx
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

// Usage
function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}
```

## Rules of Hooks

React has strict rules for hooks:

### 1. Only Call Hooks at the Top Level

```jsx
// ❌ Wrong: Inside condition
function Bad({ showExtra }) {
  const [name, setName] = useState('');
  
  if (showExtra) {
    const [extra, setExtra] = useState(''); // Error!
  }
}

// ✅ Correct: All hooks at top
function Good({ showExtra }) {
  const [name, setName] = useState('');
  const [extra, setExtra] = useState('');
  // Use extra conditionally in the JSX instead
}
```

### 2. Only Call Hooks in React Functions

```jsx
// ❌ Wrong: In regular function
function getData() {
  const [data, setData] = useState(null); // Error!
}

// ✅ Correct: In React component
function DataComponent() {
  const [data, setData] = useState(null);
}

// ✅ Correct: In custom hook (starts with "use")
function useData() {
  const [data, setData] = useState(null);
  return data;
}
```

### Why These Rules?

React tracks hooks by call order. Conditions or loops would break this tracking.

## Performance Patterns

### Avoid Unnecessary Re-renders

```jsx
// ❌ Creates new object every render
<User user={{ name, email }} />

// ✅ Memoize if User is optimised
const userObj = useMemo(() => ({ name, email }), [name, email]);
<User user={userObj} />
```

### Memo for Pure Components

```jsx
import { memo } from 'react';

// Only re-renders if props change
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // Expensive rendering
  return <div>{/* ... */}</div>;
});
```

### Lazy Initialisation

```jsx
// ❌ Runs on every render
const [state, setState] = useState(expensiveComputation());

// ✅ Only runs once
const [state, setState] = useState(() => expensiveComputation());
```

## Common Mistakes

### Forgetting Dependencies

```jsx
// ❌ Missing dependency causes stale closure
useEffect(() => {
  fetchUser(userId);
}, []); // userId changes but effect doesn't re-run

// ✅ Include all dependencies
useEffect(() => {
  fetchUser(userId);
}, [userId]);
```

### Infinite Loops

```jsx
// ❌ Object created every render triggers effect
useEffect(() => {
  doSomething();
}, [{ id: 1 }]); // New object reference every time!

// ✅ Use primitive or memoized value
useEffect(() => {
  doSomething();
}, [id]);
```

### Overusing State

```jsx
// ❌ Unnecessary state
const [fullName, setFullName] = useState('');
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);

// ✅ Just calculate it
const fullName = `${firstName} ${lastName}`;
```

## Try It Yourself

### Exercise 1: useLocalStorage Hook

Create a `useLocalStorage` hook that:
- Stores value in localStorage
- Syncs with localStorage on changes
- Handles JSON serialisation
- Has a fallback for SSR

### Exercise 2: Click Outside Hook

Build `useClickOutside` that:
- Takes a ref and callback
- Calls callback when clicking outside the ref element
- Cleans up event listener

### Exercise 3: Theme Context

Create a complete theme system:
- ThemeContext with light/dark themes
- useTheme hook
- Theme toggle component
- Persistence in localStorage

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "hooks-patterns-quiz",
  "type": "multiple-choice",
  "title": "Hooks Patterns",
  "description": "Test your understanding of advanced hooks.",
  "difficulty": "medium",
  "question": "When should you use useCallback?",
  "options": [
    {
      "id": "a",
      "text": "Always, for every function in a component",
      "isCorrect": false,
      "explanation": "Overusing useCallback adds overhead. Use it when needed for optimisation."
    },
    {
      "id": "b",
      "text": "When passing callbacks to optimised child components or using in dependency arrays",
      "isCorrect": true,
      "explanation": "Correct! useCallback prevents unnecessary re-renders in memo'd children and avoids infinite loops when functions are in dependency arrays."
    },
    {
      "id": "c",
      "text": "Instead of regular functions",
      "isCorrect": false,
      "explanation": "Regular functions are fine when you don't need stable references."
    },
    {
      "id": "d",
      "text": "Only with async functions",
      "isCorrect": false,
      "explanation": "useCallback works with any function, not just async ones."
    }
  ]
}
-->

## Key Takeaways

- `useRef` stores mutable values and accesses DOM elements without triggering re-renders
- `useContext` shares state globally, avoiding prop drilling
- `useMemo` caches expensive calculations; `useCallback` caches functions
- `useReducer` handles complex state with reducer pattern
- Custom hooks extract and share stateful logic between components
- Follow the Rules of Hooks: top-level only, React functions only
- Don't over-optimise—measure before adding memoization
- Name custom hooks starting with "use" so React knows they're hooks

## What's Next?

You now have a solid foundation in React. The next module covers building real components and putting these patterns into practice.

Continue to [Building Components](../05-building-components/01-component-thinking.md) →
