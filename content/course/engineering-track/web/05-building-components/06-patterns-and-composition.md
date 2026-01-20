# Patterns and Composition

> **Quick Summary:** Effective components follow patterns that enable composition, flexibility, and maintainability. React's component model makes these patterns natural.

## What You'll Learn

In this lesson, we will explore component composition patterns in React, specifically focusing on the `children` prop and slots. You will learn about compound components and how they share state, understand render props and custom hooks, and discover best practices for designing robust component APIs.

## Composition Over Inheritance

React favours composition over inheritance. Instead of creating specialised components through extending base classes, compose simple components:

```jsx
// ✅ Composition - flexible and explicit
<Card>
  <CardHeader>
    <Avatar src={user.avatar} />
    <CardTitle>{user.name}</CardTitle>
  </CardHeader>
  <CardBody>{user.bio}</CardBody>
</Card>

// ❌ Specialised component - rigid, hidden structure
<ProfileCard 
  avatar={user.avatar}
  title={user.name}
  content={user.bio}
/>
```

Composition is preferred over specialized components because it allows you to see exactly what is being rendered, makes each piece reusable in other contexts, and ensures that adding new features does not unnecessarily bloat the component's API.

## The Children Prop

React's `children` prop is composition in action:

```jsx
function Card({ children }) {
  return <article className="card">{children}</article>;
}

// Usage - anything goes inside
<Card>
  <h2>Title</h2>
  <p>Content</p>
  <Button>Action</Button>
</Card>
```

### Multiple Slots via Props

For multiple content areas, use named props:

```jsx
function Card({ header, children, footer }) {
  return (
    <article className="card">
      {header && <div className="card__header">{header}</div>}
      <div className="card__body">{children}</div>
      {footer && <div className="card__footer">{footer}</div>}
    </article>
  );
}

// Usage
<Card
  header={<h2>Card Title</h2>}
  footer={<Button>Save</Button>}
>
  <p>Main content goes in children</p>
</Card>
```

## Compound Components

Components that work together, sharing implicit state through React Context:

<!-- visual-example: tabs-demo -->

```jsx
// Tabs implementation
import { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tabs__list" role="tablist">{children}</div>;
}

function Tab({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  
  return (
    <button
      role="tab"
      aria-selected={activeTab === value}
      className={`tabs__tab ${activeTab === value ? 'tabs__tab--active' : ''}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

function TabPanel({ value, children }) {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== value) return null;
  
  return (
    <div role="tabpanel" className="tabs__panel">
      {children}
    </div>
  );
}

// Usage - clean, declarative API
<Tabs defaultValue="details">
  <TabList>
    <Tab value="details">Details</Tab>
    <Tab value="reviews">Reviews</Tab>
    <Tab value="related">Related</Tab>
  </TabList>
  
  <TabPanel value="details">
    <ProductDetails />
  </TabPanel>
  <TabPanel value="reviews">
    <Reviews />
  </TabPanel>
  <TabPanel value="related">
    <RelatedProducts />
  </TabPanel>
</Tabs>
```

The parent (`Tabs`) manages state; children read from context. Consumers get a flexible, declarative API.

## Render Props

Give consumers control over rendering:

```jsx
function List({ items, renderItem }) {
  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={item.id ?? index} className="list__item">
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

// Usage - you control how items render
<List
  items={users}
  renderItem={(user) => (
    <div className="user">
      <Avatar src={user.avatar} />
      <span>{user.name}</span>
    </div>
  )}
/>
```

### Modern Alternative: Children as Function

```jsx
function DataFetcher({ url, children }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  return children({ data, loading });
}

// Usage
<DataFetcher url="/api/user">
  {({ data, loading }) => (
    loading ? <Spinner /> : <UserProfile user={data} />
  )}
</DataFetcher>
```

Custom hooks have largely replaced render props for sharing logic. They are generally preferred when the goal is to share logic rather than entire UI structures, as they result in cleaner and more readable code.

## API Design Principles

### Minimal Required Props

Only require what's essential:

```jsx
// ✅ Good - children is the only requirement
<Button>Click me</Button>

// ❌ Bad - too many required props
<Button 
  label="Click me" 
  size="medium" 
  variant="primary" 
  type="button"
  onClick={handleClick}
/>
```

### Sensible Defaults

```jsx
function Button({ 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  children,
  ...props
}) {
  return (
    <button 
      type={type}
      className={`button button--${variant} button--${size}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

// Works with minimal props
<Button onClick={save}>Save</Button>

// Or fully configured
<Button variant="danger" size="large" onClick={remove}>Delete</Button>
```

### Spread Props for Flexibility

Pass through native attributes:

```jsx
function Input({ label, error, ...props }) {
  return (
    <div className="form-field">
      <label>{label}</label>
      <input {...props} />  {/* Native props pass through */}
      {error && <span className="error">{error}</span>}
    </div>
  );
}

// All native input props work
<Input 
  label="Email"
  type="email"
  placeholder="you@example.com"
  required
  autoComplete="email"
/>
```

### Consistent Naming Conventions

Across your component library:

```jsx
// Event handlers: onX
onClick, onSubmit, onChange, onBlur

// Boolean states: isX or present
isOpen, isLoading, disabled, required

// Variants: variant="x" or dedicated props
variant="primary" | variant="secondary"
// or
<Button primary>  // shorthand boolean

// Sizes: size="x"
size="small" | size="medium" | size="large"
```

### TypeScript for Self-Documenting APIs

```tsx
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
}

// IDE shows exactly what's allowed
<Button variant="primary" size="large">Save</Button>
```

## Forwarding Refs

For components that wrap native elements:

```jsx
import { forwardRef } from 'react';

const Button = forwardRef(function Button({ children, ...props }, ref) {
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
});

// Now parent can access the DOM element
function Form() {
  const submitRef = useRef();
  
  useEffect(() => {
    submitRef.current.focus();
  }, []);
  
  return <Button ref={submitRef}>Submit</Button>;
}
```

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "composition-quiz",
  "type": "multiple-choice",
  "title": "Component Composition",
  "description": "Test your understanding of composition patterns.",
  "difficulty": "medium",
  "question": "What is the 'compound component' pattern?",
  "options": [
    {
      "id": "a",
      "text": "Components that use multiple CSS classes",
      "isCorrect": false,
      "explanation": "Compound components are about component structure, not CSS."
    },
    {
      "id": "b",
      "text": "Related components that share implicit state through a parent context",
      "isCorrect": true,
      "explanation": "Correct! Compound components work together (like Select + SelectOption) sharing state through context, allowing flexible composition while maintaining coordinated behaviour."
    },
    {
      "id": "c",
      "text": "Components that can accept any type of children",
      "isCorrect": false,
      "explanation": "That's flexible children props, not specifically compound components."
    },
    {
      "id": "d",
      "text": "Components with both light and dark mode variants",
      "isCorrect": false,
      "explanation": "Theming is unrelated to the compound component pattern."
    }
  ]
}
-->

## Key Takeaways

In summary, you should prefer composition over specialised components and use `children` along with named props to create flexible content slots. Compound components are excellent for sharing state through React Context, while custom hooks have largely replaced render props for logic sharing. Aim to design minimal APIs with sensible defaults and use the spread operator (`...props`) to forward native attributes. Finally, leverage TypeScript for self-documenting APIs and use `forwardRef` when wrapping native elements.

## Next Steps

You've completed the Building Components module!

Continue to [Design Systems in Code: Tokens in Code](../06-design-systems-in-code/01-tokens-in-code.md) →
