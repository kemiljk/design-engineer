# Building a Form

> **Quick Summary:** Forms collect user input using TextField, pickers, and other input components. Material 3 provides styled, accessible form elements.

## What You'll Learn

- TextField variants
- Form state management
- Validation
- Form submission

## TextField

```kotlin
var text by remember { mutableStateOf("") }

TextField(
    value = text,
    onValueChange = { text = it },
    label = { Text("Label") },
    placeholder = { Text("Placeholder") }
)

// Outlined variant
OutlinedTextField(
    value = text,
    onValueChange = { text = it },
    label = { Text("Email") }
)
```

### TextField Configuration
```kotlin
OutlinedTextField(
    value = email,
    onValueChange = { email = it },
    label = { Text("Email") },
    leadingIcon = { Icon(Icons.Default.Email, contentDescription = null) },
    keyboardOptions = KeyboardOptions(
        keyboardType = KeyboardType.Email,
        imeAction = ImeAction.Next
    ),
    keyboardActions = KeyboardActions(
        onNext = { focusManager.moveFocus(FocusDirection.Down) }
    ),
    singleLine = true,
    isError = emailError != null,
    supportingText = emailError?.let { { Text(it) } }
)
```

## Form State

```kotlin
data class FormState(
    val name: String = "",
    val email: String = "",
    val password: String = ""
)

@Composable
fun RegistrationForm() {
    var formState by remember { mutableStateOf(FormState()) }
    var errors by remember { mutableStateOf(mapOf<String, String>()) }
    
    Column(modifier = Modifier.padding(16.dp)) {
        OutlinedTextField(
            value = formState.name,
            onValueChange = { formState = formState.copy(name = it) },
            label = { Text("Name") },
            isError = errors.containsKey("name"),
            supportingText = errors["name"]?.let { { Text(it) } },
            modifier = Modifier.fillMaxWidth()
        )
        
        Spacer(Modifier.height(8.dp))
        
        OutlinedTextField(
            value = formState.email,
            onValueChange = { formState = formState.copy(email = it) },
            label = { Text("Email") },
            isError = errors.containsKey("email"),
            supportingText = errors["email"]?.let { { Text(it) } },
            modifier = Modifier.fillMaxWidth()
        )
        
        // ... more fields
        
        Button(
            onClick = { submitForm(formState) },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Submit")
        }
    }
}
```

## Validation

```kotlin
fun validateForm(state: FormState): Map<String, String> {
    val errors = mutableMapOf<String, String>()
    
    if (state.name.isBlank()) {
        errors["name"] = "Name is required"
    }
    
    if (!state.email.contains("@")) {
        errors["email"] = "Invalid email address"
    }
    
    if (state.password.length < 8) {
        errors["password"] = "Password must be at least 8 characters"
    }
    
    return errors
}
```

## Pickers and Selectors

```kotlin
// Switch
var enabled by remember { mutableStateOf(false) }
Row(
    modifier = Modifier.fillMaxWidth(),
    horizontalArrangement = Arrangement.SpaceBetween,
    verticalAlignment = Alignment.CenterVertically
) {
    Text("Enable notifications")
    Switch(checked = enabled, onCheckedChange = { enabled = it })
}

// Dropdown
var expanded by remember { mutableStateOf(false) }
ExposedDropdownMenuBox(
    expanded = expanded,
    onExpandedChange = { expanded = it }
) {
    OutlinedTextField(
        value = selectedOption,
        onValueChange = {},
        readOnly = true,
        trailingIcon = { ExposedDropdownMenuDefaults.TrailingIcon(expanded) },
        modifier = Modifier.menuAnchor()
    )
    ExposedDropdownMenu(
        expanded = expanded,
        onDismissRequest = { expanded = false }
    ) {
        options.forEach { option ->
            DropdownMenuItem(
                text = { Text(option) },
                onClick = {
                    selectedOption = option
                    expanded = false
                }
            )
        }
    }
}
```

## Try It Yourself

### Exercise 1: Login Form

Create a login form with:
- Email and password fields
- Remember me checkbox
- Submit button
- Validation

### Exercise 2: Profile Editor

Build a profile form:
- Text fields
- Dropdown for country
- Date picker
- Save button with loading state

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "compose-form-quiz",
  "type": "multiple-choice",
  "title": "Building a Form",
  "description": "Test your understanding of Compose forms.",
  "difficulty": "medium",
  "question": "How do you properly handle text input in Compose?",
  "options": [
    {
      "id": "a",
      "text": "TextField manages its own internal state",
      "isCorrect": false,
      "explanation": "Compose TextFields follow the state hoisting pattern."
    },
    {
      "id": "b",
      "text": "Hoist state: pass value and onValueChange, storing state in a parent composable or ViewModel",
      "isCorrect": true,
      "explanation": "Correct! TextField(value = text, onValueChange = { text = it }) gives you control over validation, formatting, and state management."
    },
    {
      "id": "c",
      "text": "Use findViewById like in Views",
      "isCorrect": false,
      "explanation": "Compose doesn't use View IDs—it's declarative."
    },
    {
      "id": "d",
      "text": "TextFields can only display static text",
      "isCorrect": false,
      "explanation": "TextFields are fully interactive input components."
    }
  ]
}
-->

## Key Takeaways

- OutlinedTextField for most form fields
- Use keyboard options for appropriate keyboards
- Validate and show errors with supportingText
- Focus management improves UX
- Keep form state in a data class

## Next Steps

Continue to [Custom Composables](./05-custom-composables.md) →
