---
estimatedTime: 20
---

# Capstone: Core Screens

> **Quick Summary:** Build the main screens of your app with Compose, ViewModel, and proper navigation.

**Time Estimate:** 3-4 hours

## What You'll Learn

- During this module, you will learn to build complex list screens using LazyColumn
- master the implementation of type-safe navigation patterns
- master the implementation of type-safe navigation patterns
- We'll examine how to create functional form-based screens with Material 3 components
- integrate persistent settings using DataStore integrate persistent settings using DataStore

## Screen 1: Main List View

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

## Screen 2: Detail View

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
                
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Checkbox(
                        checked = currentTask.isComplete,
                        onCheckedChange = { viewModel.toggleComplete() }
                    )
                    Text("Mark as complete")
                }
                
                Text("Priority", style = MaterialTheme.typography.labelLarge)
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
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

## Screen 3: Settings

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
                    supportingContent = { Text(settings.defaultPriority.label) }
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

## Checkpoint

Before moving on, verify:

Before proceeding, confirm that your main list view correctly displays data using a ViewModel and that the integrated search and filtering logic works as expected. Verify that the detail view allows for data updates and that create screens successfully add new entries. Finally, ensure that navigation flows smoothly between every screen and that all settings persist correctly through your DataStore implementation.

## Try It Yourself

Get started by building all the core screens for your application and thoroughly testing the navigation flow between them. Once the interface is complete, verify that your data persistence is reliable and that all search or filtering functions behave correctly under various conditions.

## Next Steps

Continue to [Phase 3: Custom Composables](./04-capstone-composables.md) →

