# Capstone Project: Build a Complete SwiftUI Feature

> **Quick Summary:** Apply everything you've learned to build a complete, working SwiftUI app with custom components, proper state management, data persistence, and polished user experience.

## What You'll Learn

- How to synthesize all SwiftUI skills into a cohesive app
- Building custom, reusable view components
- Implementing proper state management patterns
- Persisting data with SwiftData or UserDefaults
- Creating accessible, polished interfaces

## Project Overview

This capstone brings together everything from the iOS Engineering Track: Swift basics, SwiftUI fundamentals, and building interfaces. You'll build a complete, functional iOS app that demonstrates professional-level SwiftUI development.

**Why this project?** A working SwiftUI app showcases:
- Swift language proficiency
- SwiftUI view composition
- State management understanding
- Data persistence skills
- UI/UX implementation ability

**Time Estimate:** 10-15 hours

## What You'll Create

By the end of this capstone, you'll have:

1. **Working SwiftUI App**
   - 3-5 fully functional screens
   - Real data and state
   - Persistence across launches

2. **Custom Components**
   - Reusable view components
   - Custom view modifiers
   - Consistent styling

3. **Proper Architecture**
   - Clean state management
   - Data layer separation
   - Observable patterns

4. **Polish & Accessibility**
   - VoiceOver support
   - Dynamic Type support
   - Refined interactions

5. **GitHub Repository**
   - Clean code organization
   - Comprehensive README
   - (Optional) TestFlight deployment

## The Brief: Choose Your App

Select one of these app types, or propose your own:

### Option A: Task Manager
A productivity app for managing tasks:
- **Features:** Create/edit/delete tasks, mark complete, organize by list/category, due dates
- **Key Screens:** Task list, task detail/edit, list management, settings
- **Challenge:** Task state management, filtering, sorting

### Option B: Expense Tracker
A personal finance app:
- **Features:** Log expenses, categorize, view summaries, budgets
- **Key Screens:** Expense list, add expense, category summary, settings
- **Challenge:** Data aggregation, charts/visualization

### Option C: Notes App
A note-taking application:
- **Features:** Create/edit/delete notes, organize in folders, search, markdown support
- **Key Screens:** Note list, note editor, folder management, search
- **Challenge:** Rich text handling, search implementation

### Option D: Habit Tracker
An app for building habits:
- **Features:** Define habits, track daily completion, streaks, statistics
- **Key Screens:** Today view, habit list, habit detail/stats, add/edit habit
- **Challenge:** Date handling, streak calculation, visualization

## Phase 1: Project Setup & Architecture (2-3 hours)

### Step 1: Create Xcode Project
```
1. File → New → Project
2. iOS → App
3. Interface: SwiftUI
4. Language: Swift
5. Storage: SwiftData (or Core Data)
```

### Step 2: Define Data Model

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

### Step 3: App Structure

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

### Step 4: Project Organization

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

### Checkpoint
✓ Xcode project created
✓ Data models defined
✓ Project structure organized
✓ SwiftData configured

## Phase 2: Core Screens (3-4 hours)

### Screen 1: Main List View

```swift
struct TaskListView: View {
    @Environment(\.modelContext) private var modelContext
    @Query(sort: \Task.createdAt, order: .reverse) private var tasks: [Task]
    
    @State private var showingAddTask = false
    @State private var searchText = ""
    
    var filteredTasks: [Task] {
        if searchText.isEmpty {
            return tasks
        }
        return tasks.filter { $0.title.localizedCaseInsensitiveContains(searchText) }
    }
    
    var body: some View {
        NavigationStack {
            List {
                ForEach(filteredTasks) { task in
                    NavigationLink(value: task) {
                        TaskRow(task: task)
                    }
                }
                .onDelete(perform: deleteTasks)
            }
            .navigationTitle("Tasks")
            .searchable(text: $searchText, prompt: "Search tasks")
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button {
                        showingAddTask = true
                    } label: {
                        Image(systemName: "plus")
                    }
                }
            }
            .navigationDestination(for: Task.self) { task in
                TaskDetailView(task: task)
            }
            .sheet(isPresented: $showingAddTask) {
                AddTaskView()
            }
        }
    }
    
    private func deleteTasks(at offsets: IndexSet) {
        for index in offsets {
            modelContext.delete(filteredTasks[index])
        }
    }
}
```

### Screen 2: Detail View

```swift
struct TaskDetailView: View {
    @Bindable var task: Task
    @Environment(\.dismiss) private var dismiss
    
    var body: some View {
        Form {
            Section("Task") {
                TextField("Title", text: $task.title)
                TextField("Details", text: $task.details, axis: .vertical)
                    .lineLimit(3...6)
            }
            
            Section("Properties") {
                Toggle("Complete", isOn: $task.isComplete)
                
                Picker("Priority", selection: $task.priority) {
                    ForEach(Priority.allCases, id: \.self) { priority in
                        Text(priority.label).tag(priority)
                    }
                }
                
                DatePicker(
                    "Due Date",
                    selection: Binding(
                        get: { task.dueDate ?? Date() },
                        set: { task.dueDate = $0 }
                    ),
                    displayedComponents: [.date, .hourAndMinute]
                )
            }
        }
        .navigationTitle("Edit Task")
        .navigationBarTitleDisplayMode(.inline)
    }
}
```

### Screen 3: Create/Add View

```swift
struct AddTaskView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(\.dismiss) private var dismiss
    
    @State private var title = ""
    @State private var details = ""
    @State private var priority = Priority.medium
    @State private var hasDueDate = false
    @State private var dueDate = Date()
    
    var body: some View {
        NavigationStack {
            Form {
                Section("Task") {
                    TextField("Title", text: $title)
                    TextField("Details", text: $details, axis: .vertical)
                        .lineLimit(3...6)
                }
                
                Section("Properties") {
                    Picker("Priority", selection: $priority) {
                        ForEach(Priority.allCases, id: \.self) { priority in
                            Text(priority.label).tag(priority)
                        }
                    }
                    
                    Toggle("Set Due Date", isOn: $hasDueDate)
                    
                    if hasDueDate {
                        DatePicker(
                            "Due Date",
                            selection: $dueDate,
                            displayedComponents: [.date, .hourAndMinute]
                        )
                    }
                }
            }
            .navigationTitle("New Task")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Add") {
                        addTask()
                    }
                    .disabled(title.isEmpty)
                }
            }
        }
    }
    
    private func addTask() {
        let task = Task(
            title: title,
            details: details,
            priority: priority,
            dueDate: hasDueDate ? dueDate : nil
        )
        modelContext.insert(task)
        dismiss()
    }
}
```

### Screen 4: Settings

```swift
struct SettingsView: View {
    @AppStorage("defaultPriority") private var defaultPriority = Priority.medium.rawValue
    @AppStorage("showCompletedTasks") private var showCompletedTasks = true
    
    var body: some View {
        Form {
            Section("Defaults") {
                Picker("Default Priority", selection: $defaultPriority) {
                    ForEach(Priority.allCases, id: \.rawValue) { priority in
                        Text(priority.label).tag(priority.rawValue)
                    }
                }
            }
            
            Section("Display") {
                Toggle("Show Completed Tasks", isOn: $showCompletedTasks)
            }
            
            Section("About") {
                HStack {
                    Text("Version")
                    Spacer()
                    Text("1.0.0")
                        .foregroundStyle(.secondary)
                }
            }
        }
        .navigationTitle("Settings")
    }
}
```

### Checkpoint
✓ Main list view with data binding
✓ Detail/edit view
✓ Create view with form
✓ Settings view
✓ Navigation between screens

## Phase 3: Custom Components (2-3 hours)

### Custom Row Component

```swift
struct TaskRow: View {
    let task: Task
    
    var body: some View {
        HStack(spacing: 12) {
            Image(systemName: task.isComplete ? "checkmark.circle.fill" : "circle")
                .foregroundStyle(task.isComplete ? .green : .secondary)
                .imageScale(.large)
            
            VStack(alignment: .leading, spacing: 4) {
                Text(task.title)
                    .strikethrough(task.isComplete)
                    .foregroundStyle(task.isComplete ? .secondary : .primary)
                
                if let dueDate = task.dueDate {
                    Label(dueDate.formatted(date: .abbreviated, time: .shortened), systemImage: "calendar")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
            
            Spacer()
            
            PriorityBadge(priority: task.priority)
        }
        .contentShape(Rectangle())
        .accessibilityElement(children: .combine)
        .accessibilityLabel(accessibilityLabel)
    }
    
    private var accessibilityLabel: String {
        var label = task.title
        label += task.isComplete ? ", completed" : ""
        label += ", \(task.priority.label) priority"
        if let dueDate = task.dueDate {
            label += ", due \(dueDate.formatted(date: .abbreviated, time: .shortened))"
        }
        return label
    }
}
```

### Custom Badge Component

```swift
struct PriorityBadge: View {
    let priority: Priority
    
    var body: some View {
        Text(priority.label)
            .font(.caption2)
            .fontWeight(.medium)
            .padding(.horizontal, 8)
            .padding(.vertical, 4)
            .background(priority.color.opacity(0.15))
            .foregroundStyle(priority.color)
            .clipShape(Capsule())
    }
}
```

### Custom View Modifiers

```swift
struct CardStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding()
            .background(.background)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .shadow(color: .black.opacity(0.1), radius: 4, y: 2)
    }
}

extension View {
    func cardStyle() -> some View {
        modifier(CardStyle())
    }
}

struct PrimaryButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .fontWeight(.semibold)
            .foregroundStyle(.white)
            .padding(.horizontal, 24)
            .padding(.vertical, 12)
            .background(.blue)
            .clipShape(RoundedRectangle(cornerRadius: 10))
            .opacity(configuration.isPressed ? 0.8 : 1)
            .scaleEffect(configuration.isPressed ? 0.98 : 1)
            .animation(.easeInOut(duration: 0.1), value: configuration.isPressed)
    }
}
```

### Empty State Component

```swift
struct EmptyStateView: View {
    let title: String
    let message: String
    let systemImage: String
    var action: (() -> Void)?
    var actionLabel: String?
    
    var body: some View {
        ContentUnavailableView {
            Label(title, systemImage: systemImage)
        } description: {
            Text(message)
        } actions: {
            if let action, let actionLabel {
                Button(actionLabel, action: action)
                    .buttonStyle(.borderedProminent)
            }
        }
    }
}
```

### Checkpoint
✓ TaskRow component
✓ PriorityBadge component
✓ Custom view modifiers
✓ Empty state component
✓ Components are reusable

## Phase 4: Polish & Accessibility (2-3 hours)

### Step 1: Accessibility Labels

```swift
// Add to interactive elements
Button {
    task.isComplete.toggle()
} label: {
    Image(systemName: task.isComplete ? "checkmark.circle.fill" : "circle")
}
.accessibilityLabel(task.isComplete ? "Mark as incomplete" : "Mark as complete")
.accessibilityHint("Double-tap to toggle completion")
```

### Step 2: Dynamic Type Support

```swift
// Use system fonts and avoid fixed sizes
Text(task.title)
    .font(.body)  // Scales with Dynamic Type

// For custom sizes, use relative scaling
@ScaledMetric var iconSize: CGFloat = 24

Image(systemName: "checkmark")
    .font(.system(size: iconSize))
```

### Step 3: VoiceOver Optimization

```swift
// Combine related elements
HStack {
    Image(systemName: "calendar")
    Text(date.formatted())
}
.accessibilityElement(children: .combine)

// Custom actions
.accessibilityAction(named: "Delete") {
    deleteTask()
}
```

### Step 4: Animations

```swift
// List animations
.animation(.default, value: tasks)

// Toggle animations
withAnimation(.spring(response: 0.3, dampingFraction: 0.7)) {
    task.isComplete.toggle()
}

// Custom transitions
.transition(.asymmetric(
    insertion: .scale.combined(with: .opacity),
    removal: .opacity
))
```

### Step 5: Error Handling

```swift
struct TaskListView: View {
    @State private var errorMessage: String?
    @State private var showingError = false
    
    var body: some View {
        // ... view content ...
        .alert("Error", isPresented: $showingError) {
            Button("OK") { }
        } message: {
            Text(errorMessage ?? "An unknown error occurred")
        }
    }
}
```

### Checkpoint
✓ Accessibility labels added
✓ Dynamic Type supported
✓ VoiceOver optimized
✓ Smooth animations
✓ Error handling in place

## Phase 5: Finalization (1-2 hours)

### Step 1: App Icon
Create an app icon in Xcode's Asset Catalog.

### Step 2: Launch Screen
Configure launch screen in Info.plist or use SwiftUI.

### Step 3: README
Create comprehensive documentation:

```markdown
# Task Manager

A SwiftUI task management app demonstrating modern iOS development patterns.

## Features
- Create, edit, delete tasks
- Organize by priority
- Set due dates
- Mark tasks complete
- Search tasks
- Dark mode support
- VoiceOver accessible

## Architecture
- SwiftUI for UI
- SwiftData for persistence
- MVVM-inspired structure

## Requirements
- iOS 17.0+ (iOS 18.0+ recommended)
- Xcode 15+ (Xcode 16+ recommended)

## Installation
1. Clone the repository
2. Open `TaskManager.xcodeproj`
3. Build and run

## Screenshots
[Add screenshots]
```

### Step 4: GitHub Repository
- Initialize git
- Create .gitignore
- Push to GitHub

### Step 5: (Optional) TestFlight
- Create App Store Connect app
- Configure signing
- Archive and upload
- Invite testers

### Checkpoint
✓ App icon created
✓ Launch screen configured
✓ README complete
✓ GitHub repo created
✓ (Optional) TestFlight deployed

## Submission Checklist

Your capstone should include:

- [ ] **Working App**
  - [ ] 3-5 functional screens
  - [ ] Real data, not mock data
  - [ ] Data persists across launches

- [ ] **Custom Components**
  - [ ] At least 3 reusable components
  - [ ] Custom view modifiers
  - [ ] Consistent styling

- [ ] **State Management**
  - [ ] Proper use of @State, @Binding
  - [ ] @Observable or @Query patterns
  - [ ] Clean data flow

- [ ] **Data Persistence**
  - [ ] SwiftData or UserDefaults
  - [ ] Data survives app restart
  - [ ] Proper model relationships

- [ ] **Accessibility**
  - [ ] VoiceOver labels
  - [ ] Dynamic Type support
  - [ ] Sufficient contrast

- [ ] **Code Quality**
  - [ ] Clean organization
  - [ ] No warnings
  - [ ] README documentation

- [ ] **GitHub Repository**
  - [ ] Public repo with code
  - [ ] Comprehensive README

## Evaluation Criteria

| Criteria | Developing | Proficient | Excellent |
|----------|-----------|------------|-----------|
| **SwiftUI Proficiency** | Basic views, some issues | Clean SwiftUI, proper patterns | Elegant, idiomatic SwiftUI throughout |
| **Code Organization** | Code works, messy structure | Clean separation, good naming | Excellent architecture, reusable |
| **State Management** | State works, some prop drilling | Proper state patterns | Optimal state architecture |
| **UI Polish** | Basic UI, functional | Clean, consistent UI | Beautiful, delightful experience |
| **Accessibility** | Not considered | Labels present, decent support | Fully accessible, great VoiceOver |
| **Persistence** | Data saves but fragile | Reliable persistence | Robust, handles edge cases |

## Examples for Inspiration

Study these open-source SwiftUI apps:

**Task/Productivity:**
- Apple Reminders (study behavior)
- Things 3 (study interaction design)

**Reference Apps:**
- Apple's SwiftUI tutorials
- Hacking with Swift examples
- Stanford CS193p projects

## Tips for Success

1. **Start with data.** Model your data before UI.
2. **Use previews.** SwiftUI previews speed up development.
3. **Extract components.** When views get big, break them up.
4. **Test on device.** Simulator misses performance issues.
5. **Add accessibility early.** Harder to retrofit.
6. **Commit often.** Small commits make debugging easier.

## What's Next

Congratulations on completing the iOS Engineering Track capstone!

This project demonstrates:
- Swift language proficiency
- SwiftUI view composition skills
- State management understanding
- Data persistence capability

**Portfolio Tip:** A working iOS app is a strong portfolio piece. Consider:
- Recording a demo video
- Writing about your architecture decisions
- Deploying to TestFlight for real testing
- Publishing source code with clean documentation

**Continue your journey:**
- → [iOS Convergence Track](/course/convergence/ios) — Add animations and polish
- → [iOS Design Track](/course/design-track/ios) — Strengthen design skills
- → [Android Engineering Track](/course/engineering-track/android) — Learn Compose
