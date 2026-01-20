# Building a Form

> **Quick Summary:** Forms collect user input. SwiftUI provides specialised form views that automatically style content appropriately.

## What You'll Learn

During this module, you will learn to use form containers effectively and explore a variety of input types available in SwiftUI. We'll examine robust validation patterns and walk through the essential techniques for managing focus and keyboard handling to provide a smooth data entry experience.

## Basic Form

```swift
struct ProfileForm: View {
    @State private var name = ""
    @State private var email = ""
    @State private var notificationsOn = true
    
    var body: some View {
        Form {
            Section("Personal Information") {
                TextField("Name", text: $name)
                TextField("Email", text: $email)
                    .textContentType(.emailAddress)
                    .keyboardType(.emailAddress)
                    .autocapitalization(.none)
            }
            
            Section("Preferences") {
                Toggle("Notifications", isOn: $notificationsOn)
            }
            
            Section {
                Button("Save") {
                    saveProfile()
                }
            }
        }
    }
}
```

## Input Types

### Text Fields
```swift
TextField("Username", text: $username)
    .textContentType(.username)

SecureField("Password", text: $password)
    .textContentType(.password)

TextEditor(text: $bio)
    .frame(height: 100)
```

### Pickers
```swift
Picker("Category", selection: $category) {
    ForEach(categories, id: \.self) { cat in
        Text(cat)
    }
}

DatePicker("Birthday", selection: $birthday, displayedComponents: .date)
```

### Toggles and Steppers
```swift
Toggle("Enable Feature", isOn: $isEnabled)

Stepper("Quantity: \(quantity)", value: $quantity, in: 1...10)

Slider(value: $volume, in: 0...100)
```

## Validation

```swift
struct ValidatedForm: View {
    @State private var email = ""
    @State private var showError = false
    
    var isValidEmail: Bool {
        email.contains("@") && email.contains(".")
    }
    
    var body: some View {
        Form {
            TextField("Email", text: $email)
                .textContentType(.emailAddress)
            
            if showError && !isValidEmail {
                Text("Please enter a valid email")
                    .foregroundStyle(.red)
                    .font(.caption)
            }
            
            Button("Submit") {
                showError = true
                if isValidEmail {
                    submit()
                }
            }
            .disabled(!isValidEmail && showError)
        }
    }
}
```

## Focus Management

```swift
struct FocusForm: View {
    @State private var username = ""
    @State private var password = ""
    @FocusState private var focusedField: Field?
    
    enum Field {
        case username, password
    }
    
    var body: some View {
        Form {
            TextField("Username", text: $username)
                .focused($focusedField, equals: .username)
                .submitLabel(.next)
                .onSubmit {
                    focusedField = .password
                }
            
            SecureField("Password", text: $password)
                .focused($focusedField, equals: .password)
                .submitLabel(.done)
                .onSubmit {
                    login()
                }
        }
    }
}
```

## Try It Yourself

### Exercise 1: Registration Form

Build a registration form with:
Practise your form design skills by building a registration form that includes fields for name, email, and password. You should also incorporate a toggle for terms acceptance and implement validation logic for all fields before enabling the final submit button.

### Exercise 2: Settings Form

Create a settings form:
Create a comprehensive settings form organised into grouped sections and utilizing various input types like pickers and toggles. Ensure you include clear actions for saving changes or cancelling the operation to maintain a predictable user experience.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "swiftui-form-quiz",
  "type": "multiple-choice",
  "title": "Building a Form",
  "description": "Test your understanding of SwiftUI forms.",
  "difficulty": "medium",
  "question": "What does the Form container provide in SwiftUI?",
  "options": [
    {
      "id": "a",
      "text": "Just visual grouping of text fields",
      "isCorrect": false,
      "explanation": "Form provides much more than grouping."
    },
    {
      "id": "b",
      "text": "Grouped styling, proper sections, keyboard handling, and platform-appropriate appearance",
      "isCorrect": true,
      "explanation": "Correct! Form automatically styles contents with grouped table appearance, handles keyboard avoidance, and provides native form UX. Contents get section styling automatically."
    },
    {
      "id": "c",
      "text": "Automatic form validation",
      "isCorrect": false,
      "explanation": "You still need to implement validation logic yourself."
    },
    {
      "id": "d",
      "text": "Network submission functionality",
      "isCorrect": false,
      "explanation": "Form is for UI. You handle data submission separately."
    }
  ]
}
-->

## Key Takeaways

To build high-quality user entry interfaces, you should leverage the `Form` component to provide automatic, platform-appropriate styling and use `Section` to logically group related content. Always specify the correct text content types for each input field and use `@FocusState` to manage keyboard focus efficiently. Finally, ensure you implement thorough validation for all data before allowing submission to maintain data integrity.

## Next Steps

Continue to [Custom Components](./05-custom-components.md) →
