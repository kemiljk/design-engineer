# Props and Component Communication

> **Quick Summary:** Props are how React components receive data. They flow down from parent to child, making components reusable and configurable.

## What You'll Learn

- How to pass data to components with props
- Destructuring props for cleaner code
- Default props and prop patterns
- The children prop for composition
- Component communication patterns

## What Are Props?

Props (short for "properties") are how you pass data to components. They're like function arguments. Try changing the props below to see how the component updates:

<!-- visual-example: props-flow-demo -->

```jsx
// Without props: static component
function Greeting() {
  return <h1>Hello, World!</h1>;
}

// With props: dynamic component
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Usage
<Greeting name="Sarah" />  // Renders: Hello, Sarah!
<Greeting name="Marcus" /> // Renders: Hello, Marcus!
```

Props make components reusable.

## Passing Props

Pass props like HTML attributes:

```jsx
function App() {
  return (
    <UserCard 
      name="Alex Chen"
      role="Design Engineer"
      avatar="/images/alex.jpg"
      verified={true}
      followers={1234}
    />
  );
}
```

**Prop types:**
- Strings: `name="Alex"` (quotes)
- Numbers: `followers={1234}` (curly braces)
- Booleans: `verified={true}` or just `verified` for true
- Objects: `style={{ color: 'blue' }}`
- Arrays: `items={['a', 'b', 'c']}`
- Functions: `onClick={handleClick}`

## Receiving Props

### The props Object

Components receive props as a single object:

```jsx
function UserCard(props) {
  return (
    <div className="user-card">
      <img src={props.avatar} alt={props.name} />
      <h2>{props.name}</h2>
      <p>{props.role}</p>
      <span>{props.followers} followers</span>
    </div>
  );
}
```

### Destructuring Props (Preferred)

Destructuring makes code cleaner:

```jsx
function UserCard({ name, role, avatar, followers }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <p>{role}</p>
      <span>{followers} followers</span>
    </div>
  );
}
```

Benefits:
- Clear which props the component uses
- Shorter code (no `props.` prefix)
- Easier to add defaults

## Default Props

Provide fallback values for optional props:

```jsx
function Button({ 
  label, 
  variant = 'primary',
  size = 'medium',
  disabled = false 
}) {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

// Uses defaults
<Button label="Submit" />

// Overrides defaults
<Button label="Cancel" variant="secondary" size="small" />
```

## The children Prop

`children` is a special prop for content between tags:

```jsx
function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

// Usage
<Card>
  <h2>Card Title</h2>
  <p>Card content goes here.</p>
  <Button label="Action" />
</Card>
```

This pattern enables powerful composition.

### Building Flexible Components

```jsx
function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <header className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>×</button>
        </header>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
}

// Usage: Any content works
<Modal title="Confirm Action" onClose={closeModal}>
  <p>Are you sure you want to delete this item?</p>
  <div className="button-group">
    <Button label="Cancel" onClick={closeModal} />
    <Button label="Delete" variant="danger" onClick={deleteItem} />
  </div>
</Modal>
```

## Props Are Read-Only

**Never modify props directly:**

```jsx
// ❌ Wrong: Mutating props
function BadComponent(props) {
  props.name = 'Changed'; // Don't do this!
  return <h1>{props.name}</h1>;
}

// ✅ Right: Props are read-only
function GoodComponent({ name }) {
  // Use state if you need to track changes
  return <h1>{name}</h1>;
}
```

Props flow down (parent → child). If a component needs to modify data, use state (next lesson).

## Passing Functions as Props

Components communicate upward through callback functions:

```jsx
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <input 
        type="checkbox" 
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build project', completed: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      ))}
    </ul>
  );
}
```

**The pattern:**
1. Parent defines the function
2. Parent passes function as prop
3. Child calls the function with data
4. Parent updates state

## Spreading Props

When passing many props, use spread:

```jsx
// Without spread
function UserProfile({ user }) {
  return (
    <UserCard
      name={user.name}
      avatar={user.avatar}
      role={user.role}
      followers={user.followers}
      verified={user.verified}
    />
  );
}

// With spread
function UserProfile({ user }) {
  return <UserCard {...user} />;
}
```

Use spread thoughtfully. It can make prop sources unclear.

## Prop Patterns

### Boolean Props

For true, you can omit the value:

```jsx
// These are equivalent
<Button disabled={true} />
<Button disabled />

// For false, you must be explicit
<Button disabled={false} />
```

### Conditional Props

Conditionally add props with logical AND:

```jsx
<input
  type="text"
  {...(error && { 'aria-invalid': true })}
  {...(required && { required: true })}
/>
```

Or with ternary for className patterns:

```jsx
<button className={`btn ${isActive ? 'btn-active' : ''}`}>
  Click me
</button>
```

### Render Props

Pass a function that returns JSX:

```jsx
function List({ items, renderItem }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
<List 
  items={users}
  renderItem={(user) => (
    <div>
      <strong>{user.name}</strong>
      <span>{user.email}</span>
    </div>
  )}
/>
```

This pattern provides flexibility for how items render.

## Component Composition Example

Let's build a complete card system using props:

```jsx
// Base card component
function Card({ children, className = '' }) {
  return (
    <article className={`card ${className}`}>
      {children}
    </article>
  );
}

// Card subcomponents
function CardImage({ src, alt }) {
  return <img className="card-image" src={src} alt={alt} />;
}

function CardContent({ children }) {
  return <div className="card-content">{children}</div>;
}

function CardTitle({ children }) {
  return <h2 className="card-title">{children}</h2>;
}

function CardDescription({ children }) {
  return <p className="card-description">{children}</p>;
}

function CardActions({ children }) {
  return <div className="card-actions">{children}</div>;
}

// Usage: Flexible composition
function ProductCard({ product, onAddToCart }) {
  return (
    <Card>
      <CardImage src={product.image} alt={product.name} />
      <CardContent>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
        <p className="price">£{product.price}</p>
        <CardActions>
          <Button 
            label="Add to Cart" 
            onClick={() => onAddToCart(product)}
          />
        </CardActions>
      </CardContent>
    </Card>
  );
}

function BlogCard({ post, onReadMore }) {
  return (
    <Card className="blog-card">
      <CardImage src={post.coverImage} alt={post.title} />
      <CardContent>
        <span className="category">{post.category}</span>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.excerpt}</CardDescription>
        <CardActions>
          <Button 
            label="Read More" 
            variant="text"
            onClick={() => onReadMore(post.slug)}
          />
        </CardActions>
      </CardContent>
    </Card>
  );
}
```

The same building blocks create different card types.

## TypeScript Props (Preview)

In TypeScript, you define prop types:

```tsx
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
}

function Button({ 
  label, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick 
}: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
```

TypeScript catches errors at compile time and provides excellent autocomplete.

## Try It Yourself

### Exercise 1: Configurable Button

Create a `Button` component that accepts:
- `label` (required): Button text
- `variant`: 'primary', 'secondary', 'outline'
- `size`: 'small', 'medium', 'large'
- `fullWidth`: Boolean for full-width styling
- `onClick`: Click handler

### Exercise 2: Alert Component

Build an `Alert` component with:
- `type`: 'info', 'success', 'warning', 'error'
- `title`: Optional title
- `children`: Alert content
- `onDismiss`: Optional close handler

### Exercise 3: Avatar with Fallback

Create an `Avatar` component:
- Shows an image if `src` provided
- Shows initials from `name` if no image
- Accepts `size` prop for different sizes
- Has optional `status` indicator (online/offline)

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "props-quiz",
  "type": "multiple-choice",
  "title": "Props and Components",
  "description": "Test your understanding of React props.",
  "difficulty": "easy",
  "question": "How do child components communicate data back to parent components?",
  "options": [
    {
      "id": "a",
      "text": "By modifying props directly",
      "isCorrect": false,
      "explanation": "Props are read-only. Never modify props directly."
    },
    {
      "id": "b",
      "text": "By calling callback functions passed as props",
      "isCorrect": true,
      "explanation": "Correct! Parents pass functions as props, children call those functions with data. This is how data flows 'up' in React."
    },
    {
      "id": "c",
      "text": "By using global variables",
      "isCorrect": false,
      "explanation": "Global variables break React's unidirectional data flow and make bugs hard to track."
    },
    {
      "id": "d",
      "text": "Children cannot communicate with parents",
      "isCorrect": false,
      "explanation": "Children communicate via callback functions, a core React pattern."
    }
  ]
}
-->

## Key Takeaways

- Props are how components receive data from parents
- Use destructuring for cleaner prop access
- Provide default values for optional props
- `children` enables powerful composition patterns
- Props are read-only; never mutate them
- Pass functions as props for child-to-parent communication
- Component composition creates flexible, reusable systems

## Next Steps

Continue to [State with useState](./05-state-with-usestate.md) →
