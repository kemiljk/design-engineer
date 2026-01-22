---
estimatedTime: 15
---

# Capstone: Setup & Architecture

> **Quick Summary:** Create your Xcode project, define data models, and establish the project structure.

**Time Estimate:** 2-3 hours

## What You'll Learn

- How to properly set up an Xcode project for SwiftUI
- How to define robust data models using SwiftData
- Effective ways to organise your project files
- How to configure the main app entry point

## Step 1: Create Xcode Project

To begin, create a new Xcode project by navigating to **File** → **New** → **Project** and selecting the **iOS App** template. Ensure that you choose **SwiftUI** for the interface and **Swift** as the primary language, while also selecting **SwiftData** for the storage mechanism.

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

```text
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

Before proceeding to the next phase, verify that your Xcode project has been correctly created with SwiftUI and that your data models are fully defined using SwiftData. You should also ensure that your project structure is organised into logical folders and that the SwiftData container is properly configured in your main App struct, resulting in an application that runs without any errors.

## Try It Yourself

Finalise your project setup by creating the necessary data models for your chosen application type and establishing a clean folder structure. Once these elements are in place, run the application to ensure it builds successfully and add some sample data to verify that your persistence layer is functioning as expected.

## Next Steps

Continue to [Phase 2: Core Screens](./03-capstone-screens.md) →

