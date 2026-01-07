# Effects and Data Fetching

> **Quick Summary:** The `useEffect` hook lets you synchronise with external systems—fetch data, set up subscriptions, and manage side effects outside of React's rendering.

## What You'll Learn

- What effects are and when to use them
- The useEffect hook in detail
- The dependency array and its rules
- Fetching data from APIs
- Cleanup functions
- Common effect patterns

## What Are Effects?

Effects are operations that happen outside React's rendering cycle:

- Fetching data from an API
- Setting up event listeners
- Connecting to a WebSocket
- Updating the document title
- Measuring DOM elements
- Setting timers

These are "side effects"—they affect things beyond returning JSX.

## The useEffect Hook

`useEffect` runs after React renders your component. Watch the lifecycle in action:

<!-- visual-example: effect-lifecycle-demo -->

```jsx
import { useEffect, useState } from 'react';

function DocumentTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  });

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

**What happens:**
1. React renders the component
2. Browser paints the screen
3. useEffect runs
4. Document title updates

## The Dependency Array

The second argument controls when the effect runs:

### No Dependency Array

Runs after every render:

```jsx
useEffect(() => {
  console.log('Runs after every render');
});
```

### Empty Dependency Array

Runs only once, after initial render:

```jsx
useEffect(() => {
  console.log('Runs once on mount');
}, []);
```

### With Dependencies

Runs when dependencies change:

```jsx
useEffect(() => {
  console.log('Runs when count changes');
}, [count]);
```

### Understanding Dependencies

React compares dependency values between renders:

```jsx
function Example({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Runs when userId changes
    fetchUser(userId).then(setUser);
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

| Render | userId | Effect Runs? |
|--------|--------|--------------|
| 1st | 123 | Yes (initial) |
| 2nd | 123 | No (same value) |
| 3rd | 456 | Yes (changed) |

## Fetching Data

The most common use of useEffect:

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/users/${userId}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
      })
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### Async/Await in Effects

You can't make the effect function async directly, but you can define an async function inside:

```jsx
useEffect(() => {
  async function fetchData() {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  fetchData();
}, [userId]);
```

## Cleanup Functions

Effects can return a cleanup function that runs before the next effect or when the component unmounts:

```jsx
useEffect(() => {
  // Setup
  const handler = (e) => console.log('Key pressed:', e.key);
  window.addEventListener('keydown', handler);

  // Cleanup
  return () => {
    window.removeEventListener('keydown', handler);
  };
}, []);
```

### When Cleanup Runs

```jsx
useEffect(() => {
  console.log('Effect runs');
  return () => console.log('Cleanup runs');
}, [dependency]);

// 1. Initial render: "Effect runs"
// 2. Dependency changes: "Cleanup runs", then "Effect runs"
// 3. Component unmounts: "Cleanup runs"
```

### Common Cleanup Scenarios

**Subscriptions:**
```jsx
useEffect(() => {
  const unsubscribe = store.subscribe(handleChange);
  return () => unsubscribe();
}, []);
```

**Timers:**
```jsx
useEffect(() => {
  const intervalId = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);
  return () => clearInterval(intervalId);
}, []);
```

**Abort controllers (prevent race conditions):**
```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/users/${userId}`, { signal: controller.signal })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    });

  return () => controller.abort();
}, [userId]);
```

## Race Conditions

Without cleanup, fast navigation can cause bugs:

```jsx
// ❌ Bug: If userId changes quickly, old response might overwrite new
useEffect(() => {
  fetch(`/api/users/${userId}`)
    .then(res => res.json())
    .then(data => setUser(data));
}, [userId]);

// ✅ Fixed: Cancel stale requests
useEffect(() => {
  let cancelled = false;

  fetch(`/api/users/${userId}`)
    .then(res => res.json())
    .then(data => {
      if (!cancelled) {
        setUser(data);
      }
    });

  return () => {
    cancelled = true;
  };
}, [userId]);
```

## Common Patterns

### Update Document Title

```jsx
function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

// Usage
function Page() {
  useDocumentTitle('My Page Title');
  return <div>...</div>;
}
```

### Track Window Size

```jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
```

### Debounced Search

```jsx
function SearchInput() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      fetch(`/api/search?q=${query}`)
        .then(res => res.json())
        .then(data => setResults(data));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### LocalStorage Sync

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  // theme persists across page reloads
}
```

## Dependency Rules

### Include All Dependencies

React's exhaustive-deps rule catches missing dependencies:

```jsx
// ❌ Missing dependency
useEffect(() => {
  fetchUser(userId);
}, []); // userId is used but not listed

// ✅ All dependencies listed
useEffect(() => {
  fetchUser(userId);
}, [userId]);
```

### Functions as Dependencies

Functions can cause infinite loops:

```jsx
// ❌ Bug: fetchData is recreated each render
function Component({ userId }) {
  const fetchData = () => fetch(`/api/users/${userId}`);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // New function every render = infinite loop
}

// ✅ Fix: Move function inside effect
function Component({ userId }) {
  useEffect(() => {
    const fetchData = () => fetch(`/api/users/${userId}`);
    fetchData();
  }, [userId]);
}

// ✅ Or: Use useCallback (covered in next lesson)
```

### Objects as Dependencies

Same issue with objects:

```jsx
// ❌ Bug: New object every render
useEffect(() => {
  // ...
}, [{ id: userId }]); // Always "different"

// ✅ Fix: Use primitive values
useEffect(() => {
  // ...
}, [userId]);
```

## When NOT to Use useEffect

Effects are for synchronisation with external systems. Some things don't need effects:

### Transforming Data

```jsx
// ❌ Unnecessary effect
const [items, setItems] = useState([]);
const [filteredItems, setFilteredItems] = useState([]);

useEffect(() => {
  setFilteredItems(items.filter(item => item.active));
}, [items]);

// ✅ Just calculate during render
const [items, setItems] = useState([]);
const filteredItems = items.filter(item => item.active);
```

### Responding to Events

```jsx
// ❌ Effect for event response
useEffect(() => {
  if (submitted) {
    submitForm();
  }
}, [submitted]);

// ✅ Handle in the event handler
const handleSubmit = () => {
  submitForm();
};
```

### Initialising State from Props

```jsx
// ❌ Effect to sync prop to state
useEffect(() => {
  setLocalValue(propValue);
}, [propValue]);

// ✅ Use the prop directly or use a key
<Component key={propValue} initialValue={propValue} />
```

## Complete Example: Data Fetching Component

```jsx
function PostList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/posts?page=${page}`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();

        setPosts(prev => page === 1 ? data.posts : [...prev, ...data.posts]);
        setHasMore(data.hasMore);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();

    return () => controller.abort();
  }, [page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(p => p + 1);
    }
  };

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
        <button onClick={() => setPage(1)}>Retry</button>
      </div>
    );
  }

  return (
    <div>
      <ul className="post-list">
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>

      {loading && <p>Loading...</p>}

      {hasMore && !loading && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
}
```

## Try It Yourself

### Exercise 1: Clock Component

Create a clock that:
- Displays current time
- Updates every second
- Cleans up the interval on unmount

### Exercise 2: API Data Display

Build a component that:
- Fetches data from a public API (e.g., JSONPlaceholder)
- Shows loading state
- Handles errors gracefully
- Re-fetches when a prop changes

### Exercise 3: Scroll Position

Track scroll position:
- Add scroll event listener in effect
- Update state with scroll position
- Show "Back to Top" button when scrolled down
- Clean up listener properly

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "useeffect-quiz",
  "type": "multiple-choice",
  "title": "Understanding useEffect",
  "description": "Test your knowledge of React effects.",
  "difficulty": "medium",
  "question": "When does a cleanup function run?",
  "options": [
    {
      "id": "a",
      "text": "Only when the component unmounts",
      "isCorrect": false,
      "explanation": "Cleanup runs on unmount, but also before re-running the effect."
    },
    {
      "id": "b",
      "text": "Before every effect run and when the component unmounts",
      "isCorrect": true,
      "explanation": "Correct! Cleanup runs before the effect re-runs (when dependencies change) and when the component unmounts. This ensures proper cleanup of previous subscriptions, timers, etc."
    },
    {
      "id": "c",
      "text": "After every render",
      "isCorrect": false,
      "explanation": "Cleanup doesn't run after render—it runs before re-running the effect."
    },
    {
      "id": "d",
      "text": "Only when dependencies change",
      "isCorrect": false,
      "explanation": "Cleanup also runs on unmount, not just when dependencies change."
    }
  ]
}
-->

## Key Takeaways

- useEffect runs after render for side effects (data fetching, subscriptions, DOM mutations)
- The dependency array controls when effects run
- Empty array `[]` means run once; no array means run every render
- Cleanup functions prevent memory leaks and race conditions
- Include all dependencies used in the effect
- Don't use effects for things that can be calculated during render
- Always handle loading and error states when fetching data

## Next Steps

Continue to [Hooks Patterns](./07-hooks-patterns.md) →
