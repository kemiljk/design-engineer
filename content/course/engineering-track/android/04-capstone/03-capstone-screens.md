---
estimatedTime: 20
---

# Capstone: Core Screens

> **Quick Summary:** Build the main screens of your app with Compose, ViewModel, and proper navigation.

**Time Estimate:** 3-4 hours

## What You'll Learn

- Building list screens with LazyColumn
- Navigation patterns with Navigation Compose
- Form-based screens with Material 3
- Settings screens with DataStore

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

- [ ] Main list view displays data with ViewModel
- [ ] Search and filtering work correctly
- [ ] Detail/edit view updates data
- [ ] Create dialog/screen adds new items
- [ ] Navigation between screens works
- [ ] Settings persist with DataStore

## Try It Yourself

1. Build all screens for your app
2. Test navigation flow between screens
3. Verify data persistence works
4. Test search and filtering

## Next Steps

Continue to [Phase 3: Custom Composables](./04-capstone-composables.md) →

