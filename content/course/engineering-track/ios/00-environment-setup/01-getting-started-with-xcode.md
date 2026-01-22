# Getting Started with Xcode

> **Quick Summary:** Xcode is Apple's integrated development environment (IDE) for building iOS, macOS, watchOS, and tvOS apps. Setting it up properly is essential before you can bring your designs to life on Apple platforms.

## Version Requirements

This course is tested with the following versions (January 2026):

| Tool | Minimum Version | Recommended |
|------|-----------------|-------------|
| **macOS** | 15 (Sequoia) | 26 or latest |
| **Xcode** | 16.0 | 26 (latest) |
| **Swift** | 6.0 | Latest |
| **iOS SDK** | 18.0 | 26 |

**Note:** Xcode only runs on Mac. Windows and Linux users cannot build iOS apps natively.

**What's New in iOS 26:** This version introduces **Liquid Glass**, Apple's new design language featuring translucent, depth-aware materials that respond dynamically to content and context. We'll cover Liquid Glass principles throughout the iOS design and SwiftUI sections.

## What You'll Learn

- During this module, you will learn exactly what Xcode is
- why it remains a mandatory requirement for Apple platform development
- why it remains a mandatory requirement for Apple platform development

## Go Beyond Vibe Coding

If you've been using AI tools to generate SwiftUI code—prompting and hoping for the best—you've probably hit a wall. Maybe the code compiles but you don't understand it. Maybe you can't debug issues or customise behaviour. Maybe you feel like an imposter.

That's Vibe Coding. And whilst it's a valid starting point, to truly own your work—to build iOS apps with intention and ship with confidence—you need to understand Swift and SwiftUI properly.

**This track teaches you real iOS engineering skills.** Not just copying and pasting, but genuinely understanding how to build native Apple interfaces. Xcode is where that journey begins.

## What Is Xcode?

Xcode is Apple's official development environment. It's where you:

Xcode serves as the central hub where you will write your Swift and SwiftUI code while previewing your designs in real-time. It provides the essential tools to test your applications on both simulators and real devices, and ultimately allows you to build and submit your finished apps to the App Store.

Unlike web development, where you can choose from many editors, iOS development requires Xcode. It's not optional—Apple's tools, frameworks, and simulators are bundled inside it.

### Why Designers Should Learn Xcode

Even if you're primarily a designer, understanding Xcode helps you:

Even for those primarily focused on design, mastering Xcode allows you to prototype directly in SwiftUI to see exactly how your designs behave in a live environment. It provides a deeper understanding of technical constraints, improves collaboration by allowing you to speak the same language as iOS developers, and empowers you to ship real side projects without requiring external engineering assistance.

## System Requirements

Before installing, ensure your Mac meets the requirements:

Before you begin the installation, ensure that your Mac is running macOS 14 (Sonoma) or later and that you have at least 35GB of free storage space available. While 8GB of RAM is the absolute minimum requirement, 16GB is highly recommended for a smooth experience, and while both Apple Silicon and Intel processors are supported, you will find that Apple Silicon offers significantly faster performance.

**Important:** Xcode only runs on Mac. If you're on Windows or Linux, you cannot build iOS apps natively. Consider cloud-based solutions or a Mac for iOS development.

## Installing Xcode

### Method 1: App Store (Recommended)

The simplest approach:

1. Open the **App Store** on your Mac
2. Search for "Xcode"
3. Click **Get** → **Install**
4. Wait (it's a large download—12GB+)

This method ensures you get the latest stable version and automatic updates.

### Method 2: Apple Developer Website

For specific versions:

1. Go to [developer.apple.com/xcode](https://developer.apple.com/xcode)
2. Sign in with your Apple ID
3. Download the version you need

You don't need a paid developer account to download Xcode—a free Apple ID works.

### Method 3: Command Line (Fastest for CLI Tools Only)

If you only need command-line tools (for certain development workflows):

```bash
xcode-select --install
```

This installs compilers and tools without the full Xcode IDE. You'll likely need the full Xcode eventually.

## First Launch

After installation, open Xcode from your Applications folder or Spotlight (⌘ + Space, type "Xcode").

### Accept the License

On first launch, you'll need to:

1. Accept the license agreement
2. Enter your Mac password to install additional components

This downloads simulators and finalises the installation.

### Install Simulators

Xcode prompts you to install iOS simulators. At minimum, install:

When prompt by Xcode, ensure you install the latest iOS simulator for current device testing, alongside at least one older iOS version to verify backward compatibility. You can always manage your installed simulators later through the Platforms section in the Xcode settings.

You can manage simulators later via **Xcode → Settings → Platforms**.

## The Xcode Interface

Xcode's interface can be overwhelming at first. Let's break it down:

### Main Areas

The Navigator area in the left panel serves as your primary file browser for the project while also housing search functions, issue tracking, and breakpoints; you can toggle its visibility at any time using the ⌘ + 0 shortcut.

The Editor in the centre is your primary workspace for writing code, offering multiple modes such as source view, the layout canvas, and the assistant editor to help streamline your development.

In the right panel, you'll find the Inspector, which provides detailed properties for both files and views, including attributes and connections; this panel can be toggled using ⌘ + Option + 0.

The Debug Area at the bottom of the interface contains your console output and variable inspection tools, and you can quickly show or hide it with the ⌘ + Shift + Y command.

Finally, the Toolbar at the top provides essential Run and Stop buttons, a scheme selector for targeting specific devices, and a status display to keep you informed of the project's state.

### Essential Shortcuts

| Shortcut | Action |
|----------|--------|
| ⌘ + R | Run the app |
| ⌘ + . | Stop the app |
| ⌘ + B | Build (compile) |
| ⌘ + Shift + K | Clean build |
| ⌘ + 0 | Toggle navigator |
| ⌘ + Option + 0 | Toggle inspector |
| ⌘ + Shift + O | Quick open (find files) |
| ⌘ + Click | Jump to definition |

## Creating Your First Project

Let's create a simple SwiftUI project:

1. **Open Xcode**
2. **Create a new project:**
   - Click **Create a new Xcode project**
   - Or: **File → New → Project** (⌘ + Shift + N)

3. **Choose a template:**
   - Select **iOS** at the top
   - Choose **App**
   - Click **Next**

4. **Configure the project:**
   - **Product Name:** My First App
   - **Team:** Your Apple ID (or None)
   - **Organization Identifier:** com.yourname
   - **Interface:** SwiftUI
   - **Language:** Swift
   - Click **Next**

5. **Choose a location:**
   - Select where to save (Desktop is fine for now)
   - Optionally create a Git repository
   - Click **Create**

## Understanding the Project Structure

Your new project contains:

```text
My First App/
├── My First App.xcodeproj   ← Project file (don't edit manually)
├── My First App/
│   ├── My_First_AppApp.swift ← App entry point
│   ├── ContentView.swift     ← Your main view
│   ├── Assets.xcassets       ← Images and colours
│   └── Preview Content/      ← Preview assets
└── My First AppTests/        ← Unit tests
```

### Key Files

**My_First_AppApp.swift**
```swift
@main
struct My_First_AppApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

This defines your app's entry point—what launches first.

**ContentView.swift**
```swift
struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("Hello, world!")
        }
        .padding()
    }
}
```

This is your first view. We'll learn SwiftUI syntax later—for now, know that this creates the interface.

## Running Your App

1. Select a simulator from the toolbar (e.g., "iPhone 15 Pro")
2. Click the **Play** button (or press ⌘ + R)
3. Wait for the simulator to launch

The iOS Simulator opens, and your app appears with "Hello, world!"

Congratulations—you've just run your first iOS app!

### Using the Simulator

The simulator provides a highly accurate representation of a real iPhone, allowing you to click to tap, drag to scroll, and use ⌘ + Shift + H to return to the home screen. You can also press ⌘ + 1, 2, or 3 to change the device scale and use ⌘ + K to toggle the software keyboard as needed.

## SwiftUI Previews

One of SwiftUI's best features is live previews. In `ContentView.swift`:

1. Look at the right side of the editor
2. You should see the **Canvas** with a preview
3. Click **Resume** if it's paused

The preview updates as you edit code—no need to run the full app.

### Enabling the Canvas

If you don't see the preview:

1. **Editor → Canvas** (or ⌘ + Option + Enter)
2. Make sure you have a `#Preview` block in your file

## Try It Yourself

### Exercise 1: Modify the View

In `ContentView.swift`, change the text:

```swift
Text("Hello, Design Engineer!")
```

Watch the preview update instantly.

### Exercise 2: Add More Elements

Try adding another text element:

```swift
struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "paintbrush.fill")
                .imageScale(.large)
                .foregroundStyle(.purple)
            Text("Design")
                .font(.largeTitle)
                .bold()
            Text("meets Engineering")
                .foregroundStyle(.secondary)
        }
        .padding()
    }
}
```

### Exercise 3: Run on Simulator

Run your modified app on the simulator. Notice how the preview and simulator show the same result.

## Troubleshooting Common Issues

### "No Such Module" Error

The first build often shows errors. Try:

1. **Product → Clean Build Folder** (⌘ + Shift + K)
2. Wait, then build again (⌘ + B)

### Simulator Won't Launch

If your simulator fails to launch, first ensure that all required Xcode components have been installed correctly. You can manage your devices through the "Devices and Simulators" window or simply try targeting a different simulator device to rule out configuration issues.

### Preview Not Updating

If your preview isn't updating, click the Resume button in the canvas and check for any red compile error indicators in your code. You can also manually trigger a refresh by navigating to the Editor menu and selecting Refresh Canvas within the Canvas submenu.

### "Signing Requires a Development Team"

For running on simulators, you don't need a team. For physical devices:

1. **Xcode → Settings → Accounts**
2. Add your Apple ID
3. Select it as your team in project settings

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "xcode-intro-quiz",
  "type": "multiple-choice",
  "title": "Xcode Basics",
  "description": "Test your understanding of the Xcode environment.",
  "difficulty": "easy",
  "question": "What keyboard shortcut runs your app in Xcode?",
  "options": [
    {
      "id": "a",
      "text": "⌘ + B",
      "isCorrect": false,
      "explanation": "⌘ + B builds (compiles) the project but doesn't run it."
    },
    {
      "id": "b",
      "text": "⌘ + R",
      "isCorrect": true,
      "explanation": "Correct! ⌘ + R (Run) builds and launches your app on the selected simulator or device."
    },
    {
      "id": "c",
      "text": "⌘ + .",
      "isCorrect": false,
      "explanation": "⌘ + . stops a running app."
    },
    {
      "id": "d",
      "text": "⌘ + Shift + O",
      "isCorrect": false,
      "explanation": "⌘ + Shift + O opens the quick file finder."
    }
  ]
}
-->

## Key Takeaways

- downloading it from the App Store provides the most straightforward setup experience
- downloading it from the App Store provides the most straightforward setup experience
- The interface is cleverly divided into navigators on the left, an editor in the centre
- inspectors on the right to keep your tools organised
- inspectors on the right to keep your tools organised
- ⌘ + . to stop it ⌘ + . to stop it

## Next Steps

Continue to [Understanding Swift Basics](./02-understanding-swift-basics.md) →
