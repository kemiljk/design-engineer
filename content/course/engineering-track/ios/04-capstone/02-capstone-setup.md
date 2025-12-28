---
estimatedTime: 15
---

# Capstone: Setup & Architecture

> **Quick Summary:** Create your Xcode project, define data models, and establish the project structure.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Setting up an Xcode project for SwiftUI
- Defining data models with SwiftData
- Organising project files effectively
- Configuring the app entry point

## Step 1: Create Xcode Project

1. File → New → Project
2. iOS → App
3. Interface: SwiftUI
4. Language: Swift
5. Storage: SwiftData

## Step 2: Define Data Model

Example for Task Manager:

```swift
import SwiftData

@Model
final class Task {
    var title: String
    var details: String
    var isComplete: Bool
    var dueDate: Date?
    var priority: Priority
    var createdAt: Date
    var list: TaskList?
    
    init(
        title: String,
        details: String = "",
        isComplete: Bool = false,
        dueDate: Date? = nil,
        priority: Priority = .medium
    ) {
        self.title = title
        self.details = details
        self.isComplete = isComplete
        self.dueDate = dueDate
        self.priority = priority
        self.createdAt = Date()
    }
}

enum Priority: Int, Codable, CaseIterable {
    case low, medium, high
    
    var label: String {
        switch self {
        case .low: return "Low"
        case .medium: return "Medium"
        case .high: return "High"
        }
    }
    
    var color: Color {
        switch self {
        case .low: return .green
        case .medium: return .orange
        case .high: return .red
        }
    }
}

@Model
final class TaskList {
    var name: String
    var icon: String
    var tasks: [Task]
    
    init(name: String, icon: String = "list.bullet") {
        self.name = name
        self.icon = icon
        self.tasks = []
    }
}
```

## Step 3: App Structure

Configure the app entry point:

```swift
@main
struct TaskManagerApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: [Task.self, TaskList.self])
    }
}
```

## Step 4: Project Organisation

Organise your files:

```
YourApp/
├── App/
│   └── YourApp.swift
├── Models/
│   ├── Task.swift
│   └── TaskList.swift
├── Views/
│   ├── Main/
│   │   ├── ContentView.swift
│   │   └── TaskListView.swift
│   ├── Components/
│   │   ├── TaskRow.swift
│   │   └── PriorityBadge.swift
│   └── Screens/
│       ├── TaskDetailView.swift
│       └── SettingsView.swift
├── ViewModels/ (if using MVVM)
└── Utilities/
    └── Extensions.swift
```

## Checkpoint

Before moving on, verify:

- [ ] Xcode project created with SwiftUI
- [ ] Data models defined with SwiftData
- [ ] Project structure organised into logical folders
- [ ] SwiftData container configured in App struct
- [ ] App runs without errors

## Try It Yourself

1. Create the models for your chosen app type
2. Set up the folder structure
3. Run the app to ensure it builds
4. Add some sample data to test persistence

## Next Steps

Continue to [Phase 2: Core Screens](./03-capstone-screens.md) →

