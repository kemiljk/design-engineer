---
estimatedTime: 15
---

# Capstone: Setup & Architecture

> **Quick Summary:** Create your Android Studio project, add dependencies, define data models, and establish the project structure.

**Time Estimate:** 2-3 hours

## What You'll Learn

- Setting up an Android Studio project for Compose
- Adding essential dependencies
- Defining data models with Room
- Organising project files effectively

## Step 1: Create Android Studio Project

1. File → New → New Project
2. Empty Activity (Compose)
3. Language: Kotlin
4. Minimum SDK: API 26
5. Build configuration language: Kotlin DSL

## Step 2: Add Dependencies

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

## Step 3: Define Data Model

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
    
    val colour: Color
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

## Step 4: Project Organisation

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

## Checkpoint

Before moving on, verify:

- [ ] Android Studio project created with Compose
- [ ] Dependencies configured (Compose, Room, Navigation)
- [ ] Data models defined with Room annotations
- [ ] Project structure organised into logical packages
- [ ] App runs without errors

## Try It Yourself

1. Create the models for your chosen app type
2. Set up the folder structure
3. Run the app to ensure it builds
4. Create the Room database and DAO

## Next Steps

Continue to [Phase 2: Core Screens](./03-capstone-screens.md) →

