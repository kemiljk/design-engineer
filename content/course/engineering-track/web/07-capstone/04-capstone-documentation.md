---
estimatedTime: 15
---

# Capstone: Documentation

> **Quick Summary:** Create interactive documentation that makes your component library easy to use and understand.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Structuring documentation for developer experience
- Creating live component examples
- Writing clear API documentation
- Adding interactive features like theme switching

## Step 1: Documentation Site Structure

Create the foundation:

```html
<!-- docs/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Component Library</title>
  <link rel="stylesheet" href="../src/index.css">
  <link rel="stylesheet" href="docs.css">
</head>
<body>
  <nav class="docs-nav">
    <h1>Component Library</h1>
    <ul>
      <li><a href="#getting-started">Getting Started</a></li>
      <li><a href="#tokens">Design Tokens</a></li>
      <li><a href="#button">Button</a></li>
      <li><a href="#input">Input</a></li>
      <!-- Add all components -->
    </ul>
  </nav>
  
  <main class="docs-content">
    <section id="getting-started">
      <h2>Getting Started</h2>
      <h3>Installation</h3>
      <pre><code>npm install my-component-library</code></pre>
      
      <h3>Usage</h3>
      <pre><code>@import 'my-component-library';</code></pre>
    </section>
    
    <section id="button">
      <h2>Button</h2>
      <p>Buttons trigger actions or navigation.</p>
      
      <h3>Examples</h3>
      <div class="example">
        <div class="example-preview">
          <button class="btn btn--primary">Primary</button>
          <button class="btn btn--secondary">Secondary</button>
          <button class="btn btn--ghost">Ghost</button>
        </div>
        <pre class="example-code"><code>&lt;button class="btn btn--primary"&gt;Primary&lt;/button&gt;</code></pre>
      </div>
      
      <h3>Variants</h3>
      <!-- Document each variant with examples -->
      
      <h3>Sizes</h3>
      <!-- Document each size -->
      
      <h3>States</h3>
      <!-- Document each state -->
      
      <h3>Accessibility</h3>
      <ul>
        <li>Use <code>&lt;button&gt;</code> for actions</li>
        <li>Use <code>&lt;a&gt;</code> for navigation</li>
        <li>Always provide accessible names</li>
      </ul>
    </section>
    
    <!-- Repeat for each component -->
  </main>
</body>
</html>
```

## Step 2: Per-Component Documentation

For each component, document:

### Purpose
What the component is for and when to use it.

### Examples
Visual examples with corresponding code:

```html
<div class="example">
  <div class="example-preview">
    <!-- Live component -->
  </div>
  <pre class="example-code">
    <code><!-- HTML code --></code>
  </pre>
</div>
```

### API Reference
All available classes/variants:

| Class | Description |
|-------|-------------|
| `.btn` | Base button styles |
| `.btn--primary` | Primary variant |
| `.btn--secondary` | Secondary variant |
| `.btn--sm` | Small size |
| `.btn--lg` | Large size |

### States
All possible states (default, hover, focus, active, disabled).

### Accessibility Notes
Key a11y considerations:
- Keyboard behaviour
- Screen reader announcements
- ARIA attributes required

### Do's and Don'ts
Usage guidelines to prevent misuse.

## Step 3: Interactive Features

### Theme Switcher

```javascript
// docs/docs.js
const themeToggle = document.querySelector('[data-theme-toggle]');

themeToggle?.addEventListener('click', () => {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
});
```

### Code Copy Buttons

```javascript
document.querySelectorAll('.example-code').forEach(block => {
  const button = document.createElement('button');
  button.className = 'copy-btn';
  button.textContent = 'Copy';
  
  button.addEventListener('click', async () => {
    const code = block.querySelector('code').textContent;
    await navigator.clipboard.writeText(code);
    button.textContent = 'Copied!';
    setTimeout(() => button.textContent = 'Copy', 2000);
  });
  
  block.appendChild(button);
});
```

### Optional Enhancements

- Live playground for experimenting with variants
- Responsive preview at different viewport sizes
- Search functionality
- Version selector

## Checkpoint

Before moving on, verify:

- [ ] Documentation site structure is logical
- [ ] Getting started guide is clear
- [ ] All components have documentation pages
- [ ] Each component has:
  - [ ] Purpose description
  - [ ] Live examples with code
  - [ ] API reference table
  - [ ] States documented
  - [ ] Accessibility notes
- [ ] Code examples are copyable
- [ ] Theme switcher works

## Try It Yourself

Review your documentation:

1. Read through as if you've never seen the library
2. Can you understand how to install and use it?
3. Can you find information about each component quickly?
4. Are the code examples clear and copy-able?
5. Test the theme switcher

## Next Steps

Continue to [Phase 4: Deployment](./05-capstone-deployment.md) →

