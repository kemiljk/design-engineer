# Component API Design

> **Quick Summary:** Good component APIs are intuitive, consistent, and flexible—making components easy to use correctly and hard to use incorrectly.

## What You'll Learn

- In this lesson, we will focus on designing effective component props
- implementing various variant implementing various variant and modifier patterns
- You will learn about consistent API conventions
- explore a range of developer experience considerations to ensure your components are intuitive
- explore a range of developer experience considerations to ensure your components are intuitive
- easy to use easy to use

## Props Design Principles

### Required vs Optional

```javascript
// Only require essentials
function Button({ 
  children,           // Required - needs content
  variant = 'primary', // Optional - has default
  size = 'medium',    // Optional - has default
  disabled = false,   // Optional - has default
  onClick            // Optional - not always needed
}) { }
```

### Variants Pattern

```javascript
// Use variant prop for distinct variations
<Button variant="primary" />
<Button variant="secondary" />
<Button variant="ghost" />
<Button variant="danger" />
```

### Size Pattern

```javascript
// Consistent size names across components
<Button size="sm" />
<Input size="sm" />
<Avatar size="sm" />

<Button size="md" />  // default
<Button size="lg" />
```

### Boolean Props for States

```javascript
// Boolean props for on/off states
<Button disabled />
<Button loading />
<Input error />
<Card elevated />
```

## Naming Conventions

### Consistent Patterns

```javascript
// Event handlers: on + Event
onClick
onChange
onSubmit
onFocus

// State booleans: is + State or no prefix
isLoading / loading
isDisabled / disabled
isOpen / open

// Render customisation
renderItem
renderHeader
leftIcon
rightIcon
```

## Composition Support

### Children Prop

```javascript
// Flexible content
<Card>
  <CardTitle>Title</CardTitle>
  <CardContent>Any content here</CardContent>
</Card>
```

### Slot Props

```javascript
// Named slots
<Card
  header={<CardHeader />}
  footer={<CardFooter />}
>
  Body content
</Card>
```

### Render Props

```javascript
// Full control over rendering
<List
  items={items}
  renderItem={(item) => <CustomItem {...item} />}
/>
```

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "component-api-quiz",
  "type": "multiple-choice",
  "title": "Component API Design",
  "description": "Test your understanding of designing component interfaces.",
  "difficulty": "medium",
  "question": "What makes a good component API?",
  "options": [
    {
      "id": "a",
      "text": "Maximum flexibility with props for every possible variation",
      "isCorrect": false,
      "explanation": "Too many props creates a confusing, bloated API that's hard to use correctly."
    },
    {
      "id": "b",
      "text": "Sensible defaults, predictable prop names, and just enough flexibility for real use cases",
      "isCorrect": true,
      "explanation": "Correct! Good APIs work with minimal props, use consistent naming, and balance flexibility with simplicity—covering real needs without over-engineering."
    },
    {
      "id": "c",
      "text": "Requiring all props so users explicitly set everything",
      "isCorrect": false,
      "explanation": "This creates verbose, repetitive code. Defaults make common cases easy."
    },
    {
      "id": "d",
      "text": "Using objects for all props to reduce prop count",
      "isCorrect": false,
      "explanation": "Prop shape depends on the use case—sometimes flat props are clearer."
    }
  ]
}
-->

## Key Takeaways

- To recap, your component APIs should only require essential props
- provide sensible defaults for everything else provide sensible defaults for everything else
- Use consistent naming conventions across all components in your library
- ensure you support composition through the use of children
- ensure you support composition through the use of children and slots
- Finally, always document your API clearly to help other developers use your components effectively

## Next Steps

Continue to [Documentation for Devs](./04-documentation-for-devs.md) →
