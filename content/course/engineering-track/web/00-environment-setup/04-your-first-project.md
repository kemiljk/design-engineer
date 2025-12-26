# Your First Project

> **Quick Summary:** Put everything together by creating your first web project from the terminal. We'll initialise a project, install dependencies, and run a development server. This is the real workflow of a design engineer.

## What You'll Learn

- How to initialise a new project with npm
- Understanding `package.json`
- Installing project dependencies
- Running development scripts
- The typical project workflow

## Creating a Project

Let's create a real project using everything we've learned.

### Step 1: Create the Project Folder

```bash
cd ~/Desktop
mkdir my-first-project
cd my-first-project
```

### Step 2: Initialise npm

Every modern web project has a `package.json` file. Create one:

```bash
npm init -y
```

The `-y` flag accepts all defaults. You'll see output like:

```json
{
  "name": "my-first-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

This file tracks your project's metadata and dependencies.

### Step 3: Create Project Structure

```bash
mkdir src
touch src/index.html src/styles.css
```

### Step 4: Add Some Content

Open the project in your code editor. If you have VS Code:

```bash
code .
```

Edit `src/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Project</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <main>
    <h1>Hello, Design Engineer!</h1>
    <p>You built this from the terminal.</p>
  </main>
</body>
</html>
```

Edit `src/styles.css`:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

main {
  text-align: center;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.25rem;
  opacity: 0.9;
}
```

## Adding a Development Server

To preview your site with live reloading, let's add a development server.

### Install a Dev Server

```bash
npm install --save-dev live-server
```

The `--save-dev` flag marks this as a development dependency, something you need while building, but not in production.

Check your `package.json`. You'll see a new section:

```json
{
  "devDependencies": {
    "live-server": "^1.2.2"
  }
}
```

### Add a Script

Edit `package.json` to add a start script:

```json
{
  "name": "my-first-project",
  "version": "1.0.0",
  "scripts": {
    "start": "live-server src"
  },
  "devDependencies": {
    "live-server": "^1.2.2"
  }
}
```

### Run the Server

```bash
npm start
```

Your browser will open automatically to `http://localhost:8080`. 

Try editing your HTML or CSS. The browser refreshes automatically. This is the live development workflow you'll use constantly.

Press **Ctrl + C** in the terminal to stop the server.

## Understanding package.json

Let's break down this important file:

```json
{
  "name": "my-first-project",
  "version": "1.0.0",
  "scripts": {
    "start": "live-server src",
    "build": "echo 'Building...'"
  },
  "dependencies": {
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "live-server": "^1.2.2"
  }
}
```

### Key Sections

**name & version:** Identify your project.

**scripts:** Custom commands you can run with `npm run [script-name]`. The `start` script is special: you can run it with just `npm start`.

**dependencies:** Packages your project needs to run (in production).

**devDependencies:** Packages only needed during development.

### Common Scripts

Most projects have scripts like:

```json
{
  "scripts": {
    "start": "...",
    "dev": "...",
    "build": "...",
    "test": "..."
  }
}
```

Run them with `npm run dev`, `npm run build`, etc.

## The node_modules Folder

When you ran `npm install`, a `node_modules` folder appeared. This contains:

- The packages you installed
- All packages those packages depend on
- A lot of files

**Never edit files in node_modules.** They're managed by npm.

**Never commit node_modules to Git.** It's huge and can be recreated. Add it to `.gitignore`:

```bash
echo "node_modules" > .gitignore
```

### Recreating node_modules

If you delete `node_modules` or clone a project, restore dependencies with:

```bash
npm install
```

npm reads `package.json` and downloads everything.

## Installing Specific Packages

As you build projects, you'll add more packages:

```bash
# Install and save to dependencies
npm install package-name

# Install and save to devDependencies
npm install --save-dev package-name

# Install a specific version
npm install package-name@1.2.3

# Install multiple packages
npm install package-one package-two
```

### Popular Packages for Design Engineers

You might explore:

- **tailwindcss:** Utility-first CSS framework
- **sass:** CSS preprocessor
- **prettier:** Code formatter
- **eslint:** Code quality tool

Don't install these now. We'll cover them in detail later. Just know they're available.

## Project Workflow Summary

Here's the typical workflow you'll follow:

1. **Create project:**
   ```bash
   mkdir project-name && cd project-name
   npm init -y
   ```

2. **Install dependencies:**
   ```bash
   npm install needed-packages
   npm install --save-dev dev-tools
   ```

3. **Run development server:**
   ```bash
   npm start
   # or
   npm run dev
   ```

4. **Edit code** → Browser auto-refreshes

5. **Build for production** (when ready):
   ```bash
   npm run build
   ```

## A More Realistic Example: Vite

Let's create a project using Vite, a popular modern build tool:

```bash
cd ~/Desktop
npm create vite@latest my-vite-project
```

When prompted:
- Select "Vanilla" (plain JavaScript)
- Select "JavaScript"

Then:

```bash
cd my-vite-project
npm install
npm run dev
```

Vite gives you:
- Lightning-fast hot reload
- Modern JavaScript support
- Optimised production builds

Open `http://localhost:5173` to see your project. This is how most real projects start.

## Try It Yourself

### Exercise 1: Modify Your Project

In `my-first-project`:

1. Add a button to `index.html`
2. Style it in `styles.css`
3. Watch the browser update automatically

### Exercise 2: Add Another Script

In `package.json`, add a script that runs `live-server` with a custom port:

```json
{
  "scripts": {
    "start": "live-server src",
    "dev": "live-server src --port=3000"
  }
}
```

Run it with `npm run dev`.

### Exercise 3: Create a Vite Project

Follow the Vite example above. Explore the generated files:

- `index.html` in the root
- `main.js` with JavaScript
- `vite.config.js` (if present)

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "first-project-quiz",
  "type": "multiple-choice",
  "title": "Project Setup",
  "description": "Test your understanding of project initialisation.",
  "difficulty": "medium",
  "question": "You've cloned a project from GitHub. The first command you should run is:",
  "options": [
    {
      "id": "a",
      "text": "npm start",
      "isCorrect": false,
      "explanation": "This might fail because dependencies aren't installed yet."
    },
    {
      "id": "b",
      "text": "npm run build",
      "isCorrect": false,
      "explanation": "Build scripts usually require dependencies to be installed first."
    },
    {
      "id": "c",
      "text": "npm install",
      "isCorrect": true,
      "explanation": "Correct! npm install reads package.json and downloads all required dependencies before you can run any scripts."
    },
    {
      "id": "d",
      "text": "npm init",
      "isCorrect": false,
      "explanation": "npm init creates a new package.json. The cloned project already has one."
    }
  ]
}
-->

## Key Takeaways

- `npm init` creates `package.json` for your project
- Install packages with `npm install package-name`
- Use `--save-dev` for development-only tools
- Scripts in `package.json` define common commands
- `node_modules` is auto-generated. Don't commit it.
- `npm install` recreates dependencies from `package.json`

## Environment Complete!

Congratulations! You've set up a complete web development environment:

✅ Terminal basics mastered  
✅ Package managers installed  
✅ Node.js and npm ready  
✅ First project created and running  

You're ready to start building. The terminal that once seemed intimidating is now a powerful tool in your toolkit.

## Next Steps

Continue to [What is HTML?](../01-html-fundamentals/01-what-is-html.md) →
