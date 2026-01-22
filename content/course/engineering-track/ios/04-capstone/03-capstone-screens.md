---
estimatedTime: 20
---

# Capstone: Core Screens

> **Quick Summary:** Build the main screens of your app with proper navigation and data binding.

**Time Estimate:** 3-4 hours

## What You'll Learn

- How to build efficient list views with SwiftUI
- How to implement robust navigation patterns using `NavigationStack`
- How to create form-based views for data entry

## Screen 1: Main List View

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

## Screen 2: Detail View

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

## Screen 3: Create/Add View

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
                    Button("Cancel") { dismiss() }
                }
                ToolbarItem(placement: .confirmationAction) {
                    Button("Add") { addTask() }
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

## Screen 4: Settings

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

## Checkpoint

Before moving on, verify:

Before proceeding, verify that your main list view correctly displays data retrieved from SwiftData and that both search and filtering functionalities are working as intended. You should also ensure that your detail and edit views accurately update the underlying data, the create view successfully adds new items, and that all navigation between screens and settings persistence via `AppStorage` are functioning reliably.

## Try It Yourself

Finalise your core application by building all four essential screens and thoroughly testing the navigation flow between them. Verify that your data persistence layer is working correctly and that the search and filtering features provide an accurate and responsive user experience.

## Next Steps

Continue to [Phase 3: Custom Components](./04-capstone-components.md) →

