# Installing Tools

> **Quick Summary:** Learn how to install the essential tools for web development using package managers. We'll set up Homebrew (Mac) or Chocolatey (Windows), Node.js, and npm, which form the foundation for modern web projects.

## Version Requirements

This course is tested with the following versions (January 2026). Newer versions should work fine:

| Tool | Minimum Version | Recommended |
|------|-----------------|-------------|
| **Node.js** | 18.x (LTS) | 22.x (Current LTS) |
| **npm** | 9.x | 10.x |
| **Git** | 2.30+ | Latest |
| **Homebrew** (Mac) | 4.x | Latest |
| **VS Code** | 1.80+ | Latest |

## What You'll Learn

- What package managers are and why they're essential
- How to install Homebrew on Mac or Chocolatey on Windows
- How to set up Node.js and npm
- Differences between global and local packages
- How to install your first development tools

## The Package Manager Concept

A package manager is like an App Store for developer tools, accessed through the terminal.

A package manager simplifies the installation process by allowing you to bypass the traditional manual steps of opening a browser, searching for software, and running individual installers. Instead of clicking through numerous installation prompts, you can simply type a single command such as `brew install node` to have the manager handle everything from downloading and installing to managing future updates automatically.

The package manager handles everything: downloading, installing, and managing updates.

### Why This Matters

As a design engineer, you'll need many tools: Node.js, Git, code formatters, image optimisers, and more. Package managers make installing and updating these tools trivial.

## Installing a System Package Manager

### Mac: Homebrew

Homebrew is the standard package manager for Mac. Nearly every developer uses it.

**Install Homebrew:**

Open Terminal and paste this command:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Press Enter and follow the prompts. You may need to enter your Mac password.

After installation, the script will show you additional commands to run. **Follow these instructions.** They add Homebrew to your path so you can use the `brew` command.

**Verify it worked:**

```bash
brew --version
```

You should see something like `Homebrew 4.x.x`.

### Windows: Chocolatey

Chocolatey is the equivalent for Windows.

**Install Chocolatey:**

1. Open PowerShell as Administrator (right-click → Run as Administrator)
2. Run:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

**Verify it worked:**

```powershell
choco --version
```

### Alternative for Windows: winget

Windows 11 includes `winget` by default:

```powershell
winget --version
```

If available, you can use this instead of Chocolatey.

## Installing Node.js

Node.js is a JavaScript runtime that lets you run JavaScript outside of browsers. It's essential for modern web development, even if you're primarily using HTML, CSS, and basic JavaScript.

### Why Designers Need Node.js

As a designer, you will find Node.js indispensable for running modern build tools, compilers, and image optimisers. It enables the use of development servers for live previews whilst you code and is a prerequisite for popular frameworks like React and Next.js. Furthermore, many design-to-code tools and the npm package manager itself rely on Node to function effectively within your development environment.

### Installing Node.js

**Mac (with Homebrew):**

```bash
brew install node
```

**Windows (with Chocolatey):**

```powershell
choco install nodejs
```

**Windows (with winget):**

```powershell
winget install OpenJS.NodeJS
```

**Verify installation:**

```bash
node --version
```

You should see something like `v22.x.x` (or `v20.x.x` for maintenance LTS).

```bash
npm --version
```

You should see the npm version too.

### Understanding Node Versions

Node.js has multiple versions. The important ones:

Node.js offers two primary version streams: the Long Term Support (LTS) version, which is stable and recommended for most users, and the Current version, which features the latest updates but may contain bugs. For most learning purposes, the LTS version is excellent, and both Homebrew and Chocolatey will install this stable version by default.

For learning, LTS is perfect. Homebrew and Chocolatey install the latest LTS by default.

### Optional: Node Version Manager

If you work on multiple projects requiring different Node versions, install a version manager:

**Mac/Linux - nvm:**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

**Windows - nvm-windows:**

Download from https://github.com/coreybutler/nvm-windows

With nvm, you can switch versions:

```bash
nvm install 20
nvm use 20
```

For now, the standard installation is fine. You can add nvm later if needed.

## Understanding npm

npm (Node Package Manager) comes bundled with Node.js. It serves two purposes:

1. **A registry:** A massive collection of open-source packages
2. **A tool:** Commands to install and manage packages

### Global vs Local Packages

**Global packages** are installed once and available everywhere:

```bash
npm install -g create-react-app
```

The `-g` flag means global. You can now run `create-react-app` from any folder.

**Local packages** are installed per project:

```bash
npm install tailwindcss
```

This creates a `node_modules` folder in your project with the package.

### When to Use Which

Global packages are typically reserved for CLI tools that you use across multiple projects, though this practice is becoming increasingly rare. Modern development favours local packages, as they are installed per project and listed in your `package.json`, allowing anyone to easily recreate your exact setup.

Modern practice favours local packages. They're listed in `package.json` so anyone can recreate your setup.

## Essential Tools to Install

Let's install a few tools you'll use as a design engineer:

### Git

Version control for your code. Essential.

**Mac:**

```bash
brew install git
```

**Windows:**

```powershell
choco install git
```

**Verify:**

```bash
git --version
```

### Visual Studio Code (Optional)

If you don't have a code editor yet:

**Mac:**

```bash
brew install --cask visual-studio-code
```

**Windows:**

```powershell
choco install vscode
```

The `--cask` flag on Mac is for graphical applications.

### Useful npm Global Packages

These are optional but helpful:

```bash
# Better directory listings
npm install -g tree-cli

# HTTP server for quick previews
npm install -g serve

# Check for outdated packages
npm install -g npm-check
```

## Updating Your Tools

Package managers make updates easy:

**Homebrew (Mac):**

```bash
brew update          # Update Homebrew itself
brew upgrade         # Upgrade all packages
brew upgrade node    # Upgrade specific package
```

**Chocolatey (Windows):**

```powershell
choco upgrade all    # Upgrade everything
choco upgrade nodejs # Upgrade specific package
```

**npm global packages:**

```bash
npm update -g
```

## Troubleshooting Common Issues

### "Command not found"

This usually means the tool isn't in your PATH. After installing Homebrew or Node, you may need to:

1. Close and reopen your terminal
2. Or run the PATH commands shown during installation

### Permission Errors

If npm gives permission errors:

**Don't use `sudo npm`**. Instead, configure npm to use a different directory:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
```

Then add to your shell profile (`~/.zshrc` on Mac):

```bash
export PATH=~/.npm-global/bin:$PATH
```

### Slow Installations

npm can be slow. Consider using **Bun** (a significantly faster alternative):

```bash
# Mac
brew install oven-sh/bun/bun

# Windows
powershell -c "irm bun.sh/install.ps1 | iex"
```

Then use `bun install` instead of `npm install`. Bun isn't just a package manager—it's also a fast JavaScript runtime that can replace Node.js for many tasks.

## Try It Yourself

### Exercise 1: Verify Your Setup

Run these commands and confirm you get version numbers:

```bash
brew --version  # or choco --version on Windows
node --version
npm --version
git --version
```

### Exercise 2: Install a Global Tool

Install the `serve` package globally:

```bash
npm install -g serve
```

Create a simple HTML file:

```bash
mkdir ~/Desktop/test-server && cd ~/Desktop/test-server
echo "<h1>Hello from my server!</h1>" > index.html
```

Start the server:

```bash
serve
```

Open the URL shown (usually http://localhost:3000) in your browser. Press **Ctrl + C** to stop the server.

### Exercise 3: Explore npm

Search for packages:

```bash
npm search tailwind
```

View package information:

```bash
npm info tailwindcss
```

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "installing-tools-quiz",
  "type": "multiple-choice",
  "title": "Package Management",
  "description": "Test your understanding of package managers and installation.",
  "difficulty": "easy",
  "question": "What's the difference between 'npm install tailwindcss' and 'npm install -g tailwindcss'?",
  "options": [
    {
      "id": "a",
      "text": "The -g version is faster",
      "isCorrect": false,
      "explanation": "The -g flag doesn't affect speed."
    },
    {
      "id": "b",
      "text": "The -g version installs globally, available in any project; without -g, it installs locally in the current project",
      "isCorrect": true,
      "explanation": "Correct! Global (-g) packages are installed system-wide, while local packages are installed in the project's node_modules folder."
    },
    {
      "id": "c",
      "text": "The -g version installs a different version of the package",
      "isCorrect": false,
      "explanation": "The -g flag affects location, not version."
    },
    {
      "id": "d",
      "text": "There's no difference",
      "isCorrect": false,
      "explanation": "There's an important difference in where the package is installed."
    }
  ]
}
-->

## Key Takeaways

- Keep your system tidy by regularly updating your tools with `brew upgrade` or `choco upgrade`
- Most installation issues can often be resolved by simply restarting your terminal

## Next Steps

Continue to [Your First Project](./04-your-first-project.md) →
