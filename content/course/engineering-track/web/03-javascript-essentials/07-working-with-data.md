# Working with Data

> **Quick Summary:** Most web apps need to fetch, display, and manipulate data. Understanding async JavaScript and the Fetch API is essential.

## What You'll Learn

- Fundamental concepts of asynchronous javascript
- Managing future values using promises and `async`/`await` syntax
- Using the fetch api to make http requests
- Working effectively with json data and implementing error handling

## Synchronous vs Asynchronous

### Synchronous

Code runs line by line, blocking until complete:

```javascript
console.log('First');
console.log('Second');
console.log('Third');
// Output: First, Second, Third
```

### Asynchronous

Code can start, let other code run, and finish later:

```javascript
console.log('First');
setTimeout(() => console.log('Second'), 1000);
console.log('Third');
// Output: First, Third, Second
```

Network requests, timers, and file operations are asynchronous.

## Callbacks

The original async pattern:

```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: 'Alice' };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log(data.name);  // "Alice" after 1 second
});
```

### Callback Hell

Callbacks can nest deeply:

```javascript
fetchUser(userId, (user) => {
  fetchPosts(user.id, (posts) => {
    fetchComments(posts[0].id, (comments) => {
      // Deeply nested, hard to read
    });
  });
});
```

Promises solve this.

## Promises

A Promise represents a future value:

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!');
    // or reject('Error!');
  }, 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

### Promise States

A Promise always exists in one of three states: pending, which is the initial state before any outcome; fulfilled, which indicates that the operation has completed successfully; or rejected, meaning the operation has failed. By chaining promises with `.then()` and `.catch()`, you can handle these different outcomes cleanly and avoid the complexities of deeply nested callbacks.

### Chaining Promises

```javascript
fetchUser()
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(error => console.error(error));
```

Much cleaner than nested callbacks.

## Async/Await

Modern syntax that makes async code look synchronous:

```javascript
async function getData() {
  try {
    const user = await fetchUser();
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    console.log(comments);
  } catch (error) {
    console.error(error);
  }
}
```

### Rules

When using `async` and `await`, it is important to remember that `await` can only be used inside functions declared with the `async` keyword. The `await` expression pauses the execution of the function until the returned promise is resolved, and since `async` functions always return a promise themselves, they can easily be integrated into larger asynchronous workflows.

### Parallel Execution

```javascript
// Sequential (slow)
const user = await fetchUser();
const posts = await fetchPosts();

// Parallel (fast)
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts()
]);
```

## The Fetch API

Modern way to make HTTP requests:

### Basic GET Request

```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### With Async/Await

```javascript
async function getData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

### Checking Response Status

```javascript
async function getData() {
  const response = await fetch('https://api.example.com/data');
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}
```

### POST Request

```javascript
async function createUser(userData) {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  return response.json();
}
```

### Other HTTP Methods

```javascript
// PUT
fetch(url, { method: 'PUT', body: JSON.stringify(data) });

// DELETE
fetch(url, { method: 'DELETE' });

// PATCH
fetch(url, { method: 'PATCH', body: JSON.stringify(data) });
```

## Working with JSON

### Parsing JSON

```javascript
const jsonString = '{"name": "Alice", "age": 30}';
const object = JSON.parse(jsonString);
console.log(object.name);  // "Alice"
```

### Creating JSON

```javascript
const object = { name: 'Alice', age: 30 };
const jsonString = JSON.stringify(object);
console.log(jsonString);  // '{"name":"Alice","age":30}'

// Pretty print
JSON.stringify(object, null, 2);
```

## Error Handling

### Try/Catch with Async

```javascript
async function fetchData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    // Return fallback or re-throw
    return null;
  }
}
```

### Handling Different Error Types

```javascript
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      console.error('Network error');
    } else if (error instanceof SyntaxError) {
      // JSON parse error
      console.error('Invalid JSON');
    } else {
      console.error('Unknown error:', error);
    }
  }
}
```

## Practical Patterns

### Loading States

```javascript
async function loadData() {
  const loadingEl = document.querySelector('.loading');
  const contentEl = document.querySelector('.content');
  const errorEl = document.querySelector('.error');
  
  loadingEl.hidden = false;
  errorEl.hidden = true;
  
  try {
    const data = await fetchData();
    renderContent(data);
  } catch (error) {
    errorEl.textContent = 'Failed to load data';
    errorEl.hidden = false;
  } finally {
    loadingEl.hidden = true;
  }
}
```

### Caching Responses

```javascript
const cache = new Map();

async function fetchWithCache(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }
  
  const response = await fetch(url);
  const data = await response.json();
  cache.set(url, data);
  return data;
}
```

### Retry Logic

```javascript
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}
```

## Local Storage

Store data in the browser:

```javascript
// Save
localStorage.setItem('user', JSON.stringify({ name: 'Alice' }));

// Load
const user = JSON.parse(localStorage.getItem('user'));

// Remove
localStorage.removeItem('user');

// Clear all
localStorage.clear();
```

**Note:** Local storage only stores strings—use JSON for objects.

## Try It Yourself

### Exercise 1: User Fetcher

Practise using the Fetch API by retrieving and displaying user information from the JSONPlaceholder API. Your implementation should include clear loading indicators and robust error handling to ensure a smooth user experience even when network issues occur.

### Exercise 2: Search with Debounce

Develop a search input that dynamically fetches results as the user types. You should implement a debounce function to wait at least 300 milliseconds after typing stops before making a request, and ensure that your interface clearly displays the loading state and subsequent results.

### Exercise 3: Todo App with Persistence

Create a basic todo application that stores all tasks in the browser's `localStorage`. Your application should allow users to add, remove, and toggle tasks, ensuring that all data persists correctly even after the page is refreshed.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "js-data-quiz",
  "type": "multiple-choice",
  "title": "Working with Data",
  "description": "Test your understanding of async JavaScript.",
  "difficulty": "medium",
  "question": "What does 'await' do in an async function?",
  "options": [
    {
      "id": "a",
      "text": "It blocks the entire page until the promise resolves",
      "isCorrect": false,
      "explanation": "await pauses the async function, not the entire page—other code continues running."
    },
    {
      "id": "b",
      "text": "It pauses the async function until the promise settles, making async code read like sync code",
      "isCorrect": true,
      "explanation": "Correct! await pauses execution of that function until the promise resolves, letting you write sequential-looking code that's actually async."
    },
    {
      "id": "c",
      "text": "It converts a callback function to a promise",
      "isCorrect": false,
      "explanation": "await works with existing promises. It doesn't create them from callbacks."
    },
    {
      "id": "d",
      "text": "It's just an alias for .then()",
      "isCorrect": false,
      "explanation": "await is syntactic sugar that makes code more readable, but it's not exactly the same as .then()."
    }
  ]
}
-->

## Key Takeaways

- Asynchronous JavaScript allows you to perform time-consuming tasks without blocking the user interface
- By mastering promises and `async`/`await`, you can write clean, readable code that handles data effectively
- Utilise `localStorage` for simple data persistence within the browser

## Next Steps

Continue to [Destructuring and Spread](./08-destructuring-and-spread.md) →
