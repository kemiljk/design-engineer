# Capstone Project: Build a Complete Jetpack Compose App

> **Quick Summary:** Apply everything you've learned to build a complete, working Android app with Jetpack Compose, custom composables, proper state management, data persistence, and polished user experience.

## What You'll Learn

- How to synthesize all Compose skills into a cohesive app
- Building custom, reusable composable components
- Implementing proper state management with ViewModel
- Persisting data with Room or DataStore
- Creating accessible, polished interfaces

## Project Overview

This capstone brings together everything from the Android Engineering Track: Kotlin basics, Compose fundamentals, and building interfaces. You'll build a complete, functional Android app that demonstrates professional-level Compose development.

**Why this project?** A working Compose app showcases:
- Kotlin language proficiency
- Jetpack Compose UI composition
- State management understanding
- Data persistence skills
- UI/UX implementation ability

**Time Estimate:** 10-15 hours

## What You'll Create

By the end of this capstone, you'll have:

1. **Working Compose App**
   - 3-5 fully functional screens
   - Real data and state
   - Persistence across launches

2. **Custom Composables**
   - Reusable UI components
   - Custom modifiers
   - Consistent Material 3 styling

3. **Proper Architecture**
   - ViewModel state management
   - Repository pattern
   - Clean data flow

4. **Polish & Accessibility**
   - TalkBack support
   - Dynamic Type support
   - Material motion

5. **GitHub Repository**
   - Clean code organisation
   - Comprehensive README
   - (Optional) Play Store deployment

## The Brief: Choose Your App

Select one of these app types, or propose your own:

### Option A: Task Manager
A productivity app for managing tasks:
- **Features:** Create/edit/delete tasks, mark complete, organise by category, due dates
- **Key Screens:** Task list, task detail/edit, category management, settings
- **Challenge:** Task state management, filtering, sorting

### Option B: Expense Tracker
A personal finance app:
- **Features:** Log expenses, categorise, view summaries, budgets
- **Key Screens:** Expense list, add expense, category summary, settings
- **Challenge:** Data aggregation, charts/visualisation

### Option C: Notes App
A note-taking application:
- **Features:** Create/edit/delete notes, organise in folders, search, markdown support
- **Key Screens:** Note list, note editor, folder management, search
- **Challenge:** Rich text handling, search implementation

### Option D: Habit Tracker
An app for building habits:
- **Features:** Define habits, track daily completion, streaks, statistics
- **Key Screens:** Today view, habit list, habit detail/stats, add/edit habit
- **Challenge:** Date handling, streak calculation, visualisation

## Phase 1: Project Setup & Architecture (2-3 hours)

### Step 1: Create Android Studio Project
```
1. File → New → New Project
2. Empty Activity (Compose)
3. Language: Kotlin
4. Minimum SDK: API 26
5. Build configuration language: Kotlin DSL
```

### Step 2: Add Dependencies

```kotlin
// build.gradle.kts (app)
dependencies {
    // Compose BOM
    implementation(platform("androidx.compose:compose-bom:2024.02.00"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    
    // ViewModel
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0")
    implementation("androidx.lifecycle:lifecycle-runtime-compose:2.7.0")
    
    // Navigation
    implementation("androidx.navigation:navigation-compose:2.7.7")
    
    // Room
    implementation("androidx.room:room-runtime:2.6.1")
    implementation("androidx.room:room-ktx:2.6.1")
    ksp("androidx.room:room-compiler:2.6.1")
    
    // DataStore
    implementation("androidx.datastore:datastore-preferences:1.0.0")
}
```

### Step 3: Define Data Model

Example for Task Manager:

```kotlin
// data/model/Task.kt
@Entity(tableName = "tasks")
data class Task(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val title: String,
    val details: String = "",
    val isComplete: Boolean = false,
    val dueDate: Long? = null,
    val priority: Priority = Priority.MEDIUM,
    val createdAt: Long = System.currentTimeMillis(),
    val categoryId: Long? = null
)

enum class Priority {
    LOW, MEDIUM, HIGH;
    
    val label: String
        get() = name.lowercase().replaceFirstChar { it.uppercase() }
    
    val color: Color
        get() = when (this) {
            LOW -> Color(0xFF4CAF50)
            MEDIUM -> Color(0xFFFF9800)
            HIGH -> Color(0xFFF44336)
        }
}

@Entity(tableName = "categories")
data class Category(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String,
    val icon: String = "label"
)
```

### Step 4: Project Organization

```
app/src/main/java/com/yourpackage/
├── MainActivity.kt
├── data/
│   ├── model/
│   │   ├── Task.kt
│   │   └── Category.kt
│   ├── local/
│   │   ├── AppDatabase.kt
│   │   └── TaskDao.kt
│   └── repository/
│       └── TaskRepository.kt
├── ui/
│   ├── theme/
│   │   ├── Theme.kt
│   │   ├── Color.kt
│   │   └── Type.kt
│   ├── components/
│   │   ├── TaskCard.kt
│   │   └── PriorityBadge.kt
│   ├── screens/
│   │   ├── tasklist/
│   │   │   ├── TaskListScreen.kt
│   │   │   └── TaskListViewModel.kt
│   │   ├── taskdetail/
│   │   │   └── TaskDetailScreen.kt
│   │   └── settings/
│   │       └── SettingsScreen.kt
│   └── navigation/
│       └── AppNavigation.kt
└── di/ (optional)
    └── AppModule.kt
```

### Checkpoint
✓ Android Studio project created
✓ Dependencies configured
✓ Data models defined
✓ Project structure organised

## Phase 2: Core Screens (3-4 hours)

### Screen 1: Main List View

```kotlin
@Composable
fun TaskListScreen(
    viewModel: TaskListViewModel = viewModel(),
    onNavigateToDetail: (Long) -> Unit,
    onNavigateToSettings: () -> Unit
) {
    val tasks by viewModel.tasks.collectAsStateWithLifecycle()
    val searchQuery by viewModel.searchQuery.collectAsStateWithLifecycle()
    var showAddDialog by remember { mutableStateOf(false) }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Tasks") },
                actions = {
                    IconButton(onClick = onNavigateToSettings) {
                        Icon(Icons.Default.Settings, "Settings")
                    }
                }
            )
        },
        floatingActionButton = {
            FloatingActionButton(onClick = { showAddDialog = true }) {
                Icon(Icons.Default.Add, "Add task")
            }
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            SearchBar(
                query = searchQuery,
                onQueryChange = viewModel::updateSearchQuery,
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp)
            )
            
            LazyColumn(
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(tasks, key = { it.id }) { task ->
                    TaskCard(
                        task = task,
                        onToggleComplete = { viewModel.toggleComplete(task) },
                        onClick = { onNavigateToDetail(task.id) },
                        modifier = Modifier.animateItem()
                    )
                }
            }
        }
    }
    
    if (showAddDialog) {
        AddTaskDialog(
            onDismiss = { showAddDialog = false },
            onConfirm = { title, priority ->
                viewModel.addTask(title, priority)
                showAddDialog = false
            }
        )
    }
}
```

### Screen 2: Detail View

```kotlin
@Composable
fun TaskDetailScreen(
    taskId: Long,
    viewModel: TaskDetailViewModel = viewModel(),
    onNavigateBack: () -> Unit
) {
    val task by viewModel.task.collectAsStateWithLifecycle()
    
    LaunchedEffect(taskId) {
        viewModel.loadTask(taskId)
    }
    
    task?.let { currentTask ->
        Scaffold(
            topBar = {
                TopAppBar(
                    title = { Text("Edit Task") },
                    navigationIcon = {
                        IconButton(onClick = onNavigateBack) {
                            Icon(Icons.AutoMirrored.Filled.ArrowBack, "Back")
                        }
                    },
                    actions = {
                        IconButton(onClick = { 
                            viewModel.deleteTask()
                            onNavigateBack()
                        }) {
                            Icon(Icons.Default.Delete, "Delete")
                        }
                    }
                )
            }
        ) { padding ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(padding)
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                OutlinedTextField(
                    value = currentTask.title,
                    onValueChange = { viewModel.updateTitle(it) },
                    label = { Text("Title") },
                    modifier = Modifier.fillMaxWidth()
                )
                
                OutlinedTextField(
                    value = currentTask.details,
                    onValueChange = { viewModel.updateDetails(it) },
                    label = { Text("Details") },
                    modifier = Modifier.fillMaxWidth(),
                    minLines = 3
                )
                
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Checkbox(
                        checked = currentTask.isComplete,
                        onCheckedChange = { viewModel.toggleComplete() }
                    )
                    Text("Mark as complete")
                }
                
                Text("Priority", style = MaterialTheme.typography.labelLarge)
                Row(
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Priority.entries.forEach { priority ->
                        FilterChip(
                            selected = currentTask.priority == priority,
                            onClick = { viewModel.updatePriority(priority) },
                            label = { Text(priority.label) }
                        )
                    }
                }
            }
        }
    }
}
```

### Screen 3: Settings

```kotlin
@Composable
fun SettingsScreen(
    viewModel: SettingsViewModel = viewModel(),
    onNavigateBack: () -> Unit
) {
    val settings by viewModel.settings.collectAsStateWithLifecycle()
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Settings") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.AutoMirrored.Filled.ArrowBack, "Back")
                    }
                }
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            item {
                ListItem(
                    headlineContent = { Text("Default Priority") },
                    supportingContent = { Text(settings.defaultPriority.label) },
                    trailingContent = {
                        // Priority dropdown
                    }
                )
            }
            
            item {
                ListItem(
                    headlineContent = { Text("Show Completed Tasks") },
                    trailingContent = {
                        Switch(
                            checked = settings.showCompleted,
                            onCheckedChange = viewModel::setShowCompleted
                        )
                    }
                )
            }
            
            item {
                ListItem(
                    headlineContent = { Text("Version") },
                    supportingContent = { Text("1.0.0") }
                )
            }
        }
    }
}
```

### Checkpoint
✓ Main list view with state
✓ Detail/edit view
✓ Settings view
✓ Navigation between screens

## Phase 3: Custom Composables (2-3 hours)

### Custom Card Component

```kotlin
@Composable
fun TaskCard(
    task: Task,
    onToggleComplete: () -> Unit,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    Card(
        onClick = onClick,
        modifier = modifier.fillMaxWidth()
    ) {
        Row(
            modifier = Modifier
                .padding(16.dp)
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            IconButton(
                onClick = onToggleComplete,
                modifier = Modifier.semantics {
                    contentDescription = if (task.isComplete) {
                        "Mark ${task.title} as incomplete"
                    } else {
                        "Mark ${task.title} as complete"
                    }
                }
            ) {
                Icon(
                    imageVector = if (task.isComplete) {
                        Icons.Default.CheckCircle
                    } else {
                        Icons.Default.RadioButtonUnchecked
                    },
                    contentDescription = null,
                    tint = if (task.isComplete) {
                        MaterialTheme.colorScheme.primary
                    } else {
                        MaterialTheme.colorScheme.outline
                    }
                )
            }
            
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = task.title,
                    style = MaterialTheme.typography.bodyLarge,
                    textDecoration = if (task.isComplete) {
                        TextDecoration.LineThrough
                    } else null,
                    color = if (task.isComplete) {
                        MaterialTheme.colorScheme.outline
                    } else {
                        MaterialTheme.colorScheme.onSurface
                    }
                )
                
                task.dueDate?.let { dueDate ->
                    Text(
                        text = formatDate(dueDate),
                        style = MaterialTheme.typography.bodySmall,
                        color = MaterialTheme.colorScheme.onSurfaceVariant
                    )
                }
            }
            
            PriorityBadge(priority = task.priority)
        }
    }
}
```

### Custom Badge Component

```kotlin
@Composable
fun PriorityBadge(
    priority: Priority,
    modifier: Modifier = Modifier
) {
    Surface(
        color = priority.color.copy(alpha = 0.15f),
        shape = MaterialTheme.shapes.small,
        modifier = modifier
    ) {
        Text(
            text = priority.label,
            style = MaterialTheme.typography.labelSmall,
            color = priority.color,
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 4.dp)
        )
    }
}
```

### Empty State Component

```kotlin
@Composable
fun EmptyState(
    title: String,
    message: String,
    icon: ImageVector,
    action: (() -> Unit)? = null,
    actionLabel: String? = null,
    modifier: Modifier = Modifier
) {
    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(32.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Icon(
            imageVector = icon,
            contentDescription = null,
            modifier = Modifier.size(64.dp),
            tint = MaterialTheme.colorScheme.outline
        )
        
        Text(
            text = title,
            style = MaterialTheme.typography.titleLarge,
            textAlign = TextAlign.Center
        )
        
        Text(
            text = message,
            style = MaterialTheme.typography.bodyMedium,
            color = MaterialTheme.colorScheme.onSurfaceVariant,
            textAlign = TextAlign.Center
        )
        
        if (action != null && actionLabel != null) {
            Button(onClick = action) {
                Text(actionLabel)
            }
        }
    }
}
```

### Custom Modifier Extensions

```kotlin
fun Modifier.shimmer(): Modifier = composed {
    var size by remember { mutableStateOf(IntSize.Zero) }
    val transition = rememberInfiniteTransition()
    val startOffsetX by transition.animateFloat(
        initialValue = -2 * size.width.toFloat(),
        targetValue = 2 * size.width.toFloat(),
        animationSpec = infiniteRepeatable(
            animation = tween(1000)
        )
    )
    
    background(
        brush = Brush.linearGradient(
            colors = listOf(
                Color.LightGray.copy(alpha = 0.6f),
                Color.LightGray.copy(alpha = 0.2f),
                Color.LightGray.copy(alpha = 0.6f),
            ),
            start = Offset(startOffsetX, 0f),
            end = Offset(startOffsetX + size.width.toFloat(), size.height.toFloat())
        )
    )
    .onGloballyPositioned { size = it.size }
}
```

### Checkpoint
✓ TaskCard component
✓ PriorityBadge component
✓ EmptyState component
✓ Custom modifiers
✓ Components are reusable

## Phase 4: Polish & Accessibility (2-3 hours)

### Step 1: Accessibility Semantics

```kotlin
// Add to interactive elements
Modifier.semantics {
    contentDescription = "Task: ${task.title}, ${task.priority.label} priority"
    if (task.isComplete) {
        stateDescription = "Completed"
    }
}

// Custom actions
Modifier.semantics {
    customActions = listOf(
        CustomAccessibilityAction("Delete") {
            onDelete()
            true
        },
        CustomAccessibilityAction("Toggle complete") {
            onToggleComplete()
            true
        }
    )
}
```

### Step 2: Dynamic Text Support

```kotlin
// Use Material typography (scales automatically)
Text(
    text = task.title,
    style = MaterialTheme.typography.bodyLarge
)

// Avoid fixed text sizes
// ❌ fontSize = 16.sp
// ✅ style = MaterialTheme.typography.bodyLarge
```

### Step 3: TalkBack Optimization

```kotlin
// Group related elements
Row(
    modifier = Modifier.semantics(mergeDescendants = true) { }
) {
    Icon(Icons.Default.Calendar, null)
    Text(formatDate(dueDate))
}

// Clear content descriptions
IconButton(
    onClick = onToggleComplete,
    modifier = Modifier.semantics {
        contentDescription = if (task.isComplete) {
            "Mark as incomplete"
        } else {
            "Mark as complete"
        }
    }
) {
    // ...
}
```

### Step 4: Material Motion

```kotlin
// Shared element transitions
SharedTransitionLayout {
    AnimatedContent(targetState = screen) { target ->
        when (target) {
            is Screen.List -> TaskListScreen(
                onTaskClick = { task ->
                    Modifier.sharedElement(
                        rememberSharedContentState(key = "task-${task.id}"),
                        animatedVisibilityScope = this
                    )
                }
            )
            is Screen.Detail -> TaskDetailScreen(
                modifier = Modifier.sharedElement(
                    rememberSharedContentState(key = "task-${target.taskId}"),
                    animatedVisibilityScope = this
                )
            )
        }
    }
}

// List animations
LazyColumn {
    items(tasks, key = { it.id }) { task ->
        TaskCard(
            task = task,
            modifier = Modifier.animateItem(
                fadeInSpec = tween(300),
                fadeOutSpec = tween(300)
            )
        )
    }
}

// State transitions
val completedAlpha by animateFloatAsState(
    targetValue = if (task.isComplete) 0.5f else 1f,
    animationSpec = tween(200)
)
```

### Step 5: Error Handling

```kotlin
@Composable
fun TaskListScreen(viewModel: TaskListViewModel = viewModel()) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    
    when (val state = uiState) {
        is UiState.Loading -> LoadingIndicator()
        is UiState.Error -> ErrorMessage(
            message = state.message,
            onRetry = viewModel::retry
        )
        is UiState.Success -> TaskList(tasks = state.tasks)
    }
}

sealed interface UiState {
    data object Loading : UiState
    data class Error(val message: String) : UiState
    data class Success(val tasks: List<Task>) : UiState
}
```

### Checkpoint
✓ Accessibility semantics added
✓ Dynamic text supported
✓ TalkBack optimised
✓ Material motion implemented
✓ Error handling in place

## Phase 5: Finalization (1-2 hours)

### Step 1: App Icon
Create an adaptive icon in `res/mipmap-anydpi-v26/`.

### Step 2: Splash Screen
Configure splash screen in `themes.xml`:

```xml
<style name="Theme.App.Starting" parent="Theme.SplashScreen">
    <item name="windowSplashScreenBackground">@color/splash_background</item>
    <item name="windowSplashScreenAnimatedIcon">@drawable/splash_icon</item>
    <item name="postSplashScreenTheme">@style/Theme.App</item>
</style>
```

### Step 3: README

```markdown
# Task Manager

A Jetpack Compose task management app demonstrating modern Android development.

## Features
- Create, edit, delete tasks
- Organize by priority
- Set due dates
- Mark tasks complete
- Search tasks
- Dark mode support
- TalkBack accessible

## Architecture
- Jetpack Compose for UI
- ViewModel for state management
- Room for persistence
- Kotlin Coroutines & Flow

## Requirements
- Android 8.0+ (API 26)
- Android Studio Hedgehog+

## Installation
1. Clone the repository
2. Open in Android Studio
3. Build and run

## Screenshots
[Add screenshots]
```

### Step 4: GitHub Repository
- Initialize git
- Create .gitignore
- Push to GitHub

### Step 5: (Optional) Play Store
- Create Play Console app
- Configure signing
- Generate release bundle
- Submit for review

### Checkpoint
✓ App icon created
✓ Splash screen configured
✓ README complete
✓ GitHub repo created
✓ (Optional) Play Store deployed

## Submission Checklist

Your capstone should include:

- [ ] **Working App**
  - [ ] 3-5 functional screens
  - [ ] Real data, not mock data
  - [ ] Data persists across launches

- [ ] **Custom Composables**
  - [ ] At least 3 reusable components
  - [ ] Custom modifiers
  - [ ] Consistent Material 3 styling

- [ ] **State Management**
  - [ ] ViewModel for UI state
  - [ ] StateFlow/collectAsState patterns
  - [ ] Clean data flow

- [ ] **Data Persistence**
  - [ ] Room or DataStore
  - [ ] Data survives app restart
  - [ ] Proper repository pattern

- [ ] **Accessibility**
  - [ ] TalkBack descriptions
  - [ ] Dynamic text support
  - [ ] Sufficient contrast

- [ ] **Code Quality**
  - [ ] Clean organisation
  - [ ] No warnings
  - [ ] README documentation

- [ ] **GitHub Repository**
  - [ ] Public repo with code
  - [ ] Comprehensive README

## Evaluation Criteria

| Criteria | Developing | Proficient | Excellent |
|----------|-----------|------------|-----------|
| **Compose Proficiency** | Basic composables, some issues | Clean Compose, proper patterns | Elegant, idiomatic Compose |
| **Code Organization** | Code works, messy structure | Clean separation, good naming | Excellent architecture |
| **State Management** | State works, some issues | Proper ViewModel patterns | Optimal state architecture |
| **UI Polish** | Basic UI, functional | Clean Material 3 UI | Beautiful, delightful experience |
| **Accessibility** | Not considered | Semantics present | Fully accessible, great TalkBack |
| **Persistence** | Data saves but fragile | Reliable persistence | Robust, handles edge cases |

## Examples for Inspiration

Study these open-source Compose apps:

**Task/Productivity:**
- Google Tasks (study behaviour)
- Todoist (study interaction design)

**Reference Apps:**
- Now in Android (Google)
- Jetpack Compose samples
- Android Architecture Blueprints

## Tips for Success

1. **Start with data.** Model your data before UI.
2. **Use previews.** Compose previews speed up development.
3. **Extract composables.** When functions get big, break them up.
4. **Test on device.** Emulator misses performance issues.
5. **Add accessibility early.** Harder to retrofit.
6. **Commit often.** Small commits make debugging easier.

## What's Next

Congratulations on completing the Android Engineering Track capstone!

This project demonstrates:
- Kotlin language proficiency
- Jetpack Compose UI composition
- State management understanding
- Data persistence capability

**Portfolio Tip:** A working Android app is a strong portfolio piece. Consider:
- Recording a demo video
- Writing about your architecture decisions
- Deploying to Play Store for real distribution
- Publishing source code with clean documentation

**Continue your journey:**
- → [Android Convergence Track](/course/convergence/android) — Add animations and polish
- → [Android Design Track](/course/design-track/android) — Strengthen design skills
- → [iOS Engineering Track](/course/engineering-track/ios) — Learn SwiftUI
