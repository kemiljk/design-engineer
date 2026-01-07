# Setting Up Your Development Workflow

> **Quick Summary:** A smooth development workflow makes building iOS apps enjoyable. Learn how to configure Xcode, set up previews effectively, and establish habits that will serve you throughout your design engineering journey.

## What You'll Learn

- Configuring Xcode for productivity
- Effective use of SwiftUI previews
- Managing simulators
- Version control with Git
- Recommended tools and extensions

## Configuring Xcode

### Theme and Appearance

Customise Xcode's appearance:

1. **Xcode → Settings** (⌘ + ,)
2. Select **Themes**
3. Choose a theme or customise colours

Popular options:
- **Default (Dark):** Easy on the eyes
- **Civic:** High contrast
- **Classic (Light):** Traditional look

### Text Editing Preferences

Under **Settings → Text Editing**:

**Editing:**
- ✅ Line numbers (shows line numbers in editor)
- ✅ Code folding ribbon (collapse code blocks)
- ✅ Highlight instances of selected symbol

**Indentation:**
- ✅ Prefer indent using: Spaces
- Tab width: 4
- Indent width: 4

### Font and Size

Under **Settings → Themes → [Your Theme]**:

- Click on **Source Editor**
- Choose a font (SF Mono, Menlo, or JetBrains Mono are popular)
- Set a comfortable size (13-15pt is common)

## SwiftUI Preview Mastery

Previews are your superpower as a design engineer—use them effectively.

### Canvas Modes

The preview canvas has several modes:

**Selectable (default):** Click elements to select and inspect them.

**Live:** Interact with the preview—tap buttons, scroll lists.

**Variants:** See multiple configurations side by side.

Toggle with the controls at the bottom of the canvas.

### Multiple Previews

See different states simultaneously:

```swift
#Preview {
    ContentView()
}

#Preview("Dark Mode") {
    ContentView()
        .preferredColorScheme(.dark)
}

#Preview("Large Text") {
    ContentView()
        .environment(\.dynamicTypeSize, .accessibility1)
}
```

### Device Variants

Preview on different devices:

```swift
#Preview {
    ContentView()
        .previewDevice("iPhone SE (3rd generation)")
}

#Preview {
    ContentView()
        .previewDevice("iPhone 15 Pro Max")
}
```

### Preview Layout

Control the preview size:

```swift
#Preview {
    MyComponent()
        .previewLayout(.sizeThatFits)  // Fits content
        .padding()
}
```

### Keeping Previews Fast

Slow previews kill productivity. Tips:

1. **Keep preview data minimal:** Don't load real data
2. **Use mock data:** Create simple static examples
3. **Preview components in isolation:** Don't preview entire screens unnecessarily
4. **Pause when not needed:** Click "Pause" when focusing on code

## Managing Simulators

### Opening the Simulator

From Xcode:
- Select a device in the toolbar
- Press ⌘ + R to run

Or open directly:
- **Xcode → Open Developer Tool → Simulator**

### Essential Simulator Shortcuts

| Shortcut | Action |
|----------|--------|
| ⌘ + Shift + H | Home button |
| ⌘ + Shift + A | Toggle appearance (light/dark) |
| ⌘ + K | Toggle software keyboard |
| ⌘ + S | Take screenshot |
| ⌘ + R | Record video |
| ⌘ + 1/2/3 | Window size presets |

### Simulator Features

**Rotate:** Hardware → Rotate Left/Right (⌘ + ← / →)

**Shake Gesture:** Device → Shake

**Location Simulation:** Features → Location → Custom Location

**Slow Animations:** Debug → Slow Animations

### Managing Multiple Simulators

**Window → Devices and Simulators** (⌘ + Shift + 2):

- Add new simulator types
- Delete unused simulators
- View device logs

### Running on Multiple Simulators

You can have multiple simulators open:

1. Run on iPhone 15 Pro
2. Change the scheme to iPhone SE
3. Run again (don't stop the first)

Both simulators run your app simultaneously.

## Version Control with Git

### Xcode's Built-in Git Support

Xcode has integrated Git support:

**Source Control Navigator** (⌘ + 2):
- View branches
- See commit history
- Review changes

**Commit Changes:**
- **Source Control → Commit** (⌘ + Option + C)
- Review changes, add a message, commit

### Recommended: Use Terminal or Git Client

While Xcode's Git integration works, many developers prefer:

**Terminal:**
```bash
cd ~/Desktop/MyProject
git status
git add .
git commit -m "Add profile screen"
```

**Git Clients:**
- **Fork:** Free, visual, powerful
- **Tower:** Paid, polished interface
- **GitHub Desktop:** Free, simple

### Basic Git Workflow

```bash
# Check status
git status

# Stage all changes
git add .

# Commit with message
git commit -m "Implement navigation"

# Push to remote
git push origin main
```

### Creating a .gitignore

Exclude unnecessary files:

```text
# Xcode
*.xcuserstate
xcuserdata/
DerivedData/

# SwiftPM
.build/
.swiftpm/

# OS files
.DS_Store
```

## Recommended Tools

### SF Symbols App

Essential for finding system icons:

1. Download from [developer.apple.com/sf-symbols](https://developer.apple.com/sf-symbols)
2. Browse 5,000+ icons
3. Copy names directly into your code

```swift
Image(systemName: "star.fill")
```

### Developer Documentation

**Xcode → Help → Developer Documentation** (⌘ + Shift + 0)

Or visit [developer.apple.com/documentation](https://developer.apple.com/documentation)

### Quick Look

Select any SwiftUI view in code and press **Space** for a quick preview.

### Code Snippets

Create reusable code snippets:

1. Select code you use often
2. Right-click → **Create Code Snippet**
3. Give it a name and shortcut
4. Type the shortcut, press Tab to insert

Example: Create a snippet for a basic view structure.

## Productivity Tips

### Quick Open

**⌘ + Shift + O** opens any file instantly. Start typing the filename—it's faster than navigating.

### Jump to Definition

**⌘ + Click** on any symbol to see its definition. Essential for understanding how things work.

### Find and Replace

**⌘ + F:** Find in file
**⌘ + Shift + F:** Find in project
**⌘ + Option + F:** Find and replace

### Multiple Cursors

**Control + Shift + Click** to add cursors. Edit multiple lines at once.

### Editor Split

**View → Editor → Add Editor Right** (or Bottom)

Work with two files side by side.

### Canvas on Second Monitor

Drag the preview canvas to a second monitor for maximum code space.

## Project Organisation

### Folder Structure

Organise your project sensibly:

```text
MyApp/
├── App/
│   └── MyAppApp.swift
├── Views/
│   ├── ContentView.swift
│   ├── HomeView.swift
│   └── ProfileView.swift
├── Components/
│   ├── Button.swift
│   └── Card.swift
├── Models/
│   └── User.swift
└── Resources/
    └── Assets.xcassets
```

### Creating Groups

In Xcode's Project Navigator:
- Right-click → **New Group**
- Drag files to organise

Groups in Xcode correspond to folders on disk (by default).

### Naming Conventions

- **Views:** Suffix with `View` (ProfileView, SettingsView)
- **Models:** Name directly (User, Product)
- **Components:** Descriptive names (PrimaryButton, ProfileCard)

## Try It Yourself

### Exercise 1: Customise Xcode

1. Change your theme to Dark mode
2. Enable line numbers
3. Set your preferred font and size

### Exercise 2: Create Multiple Previews

Create a view with previews for:
- Light mode
- Dark mode
- Large Dynamic Type

```swift
struct MyView: View {
    var body: some View {
        Text("Hello, World!")
            .padding()
    }
}

#Preview("Light") {
    MyView()
}

#Preview("Dark") {
    MyView()
        .preferredColorScheme(.dark)
}

#Preview("Large Text") {
    MyView()
        .environment(\.dynamicTypeSize, .xxxLarge)
}
```

### Exercise 3: Set Up Git

1. Create a new Xcode project
2. Ensure "Create Git repository" is checked
3. Make some changes
4. Commit using Source Control → Commit

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "workflow-setup-quiz",
  "type": "multiple-choice",
  "title": "Development Workflow",
  "description": "Test your understanding of Xcode workflow setup.",
  "difficulty": "easy",
  "question": "What's the keyboard shortcut to quickly open any file in Xcode?",
  "options": [
    {
      "id": "a",
      "text": "⌘ + O",
      "isCorrect": false,
      "explanation": "⌘ + O opens files via a file browser dialog."
    },
    {
      "id": "b",
      "text": "⌘ + Shift + O",
      "isCorrect": true,
      "explanation": "Correct! Quick Open lets you type a filename and jump straight to it."
    },
    {
      "id": "c",
      "text": "⌘ + F",
      "isCorrect": false,
      "explanation": "⌘ + F opens the find bar for searching within a file."
    },
    {
      "id": "d",
      "text": "⌘ + P",
      "isCorrect": false,
      "explanation": "⌘ + P opens the print dialog."
    }
  ]
}
-->

## Key Takeaways

- Customise Xcode's theme and settings for comfort
- Use multiple previews to see different states simultaneously
- Learn simulator shortcuts for efficient testing
- Set up Git from the start—version control is essential
- Organise projects with clear folder structures
- Master Quick Open (⌘ + Shift + O) for navigation

## Environment Complete!

You now have a fully configured iOS development environment:

✅ Xcode installed and configured  
✅ Swift fundamentals understood  
✅ Preview workflow established  
✅ Simulators ready  
✅ Version control set up  

You're ready to start designing and building iOS interfaces!

## Next Steps

Continue to [Introduction to Swift](../01-swift-basics/01-introduction-to-swift.md) →
