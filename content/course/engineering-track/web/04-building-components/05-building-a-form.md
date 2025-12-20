# Building a Form

> **Quick Summary:** Forms are how users input data. Building accessible, validated forms is essential for any interactive application.

## What You'll Learn

- Accessible form structure
- Input styling and states
- Client-side validation
- Error handling and display

## Form Structure

<!-- illustration: form-validation-states -->

```html
<form class="form" novalidate>
  <div class="form__group">
    <label for="email" class="form__label">
      Email address
      <span class="form__required" aria-hidden="true">*</span>
    </label>
    <input
      type="email"
      id="email"
      name="email"
      class="form__input"
      required
      aria-describedby="email-error"
    />
    <span id="email-error" class="form__error" role="alert"></span>
  </div>

  <button type="submit" class="button">Submit</button>
</form>
```

## Form Styles

```css
.form__group {
  margin-bottom: 1.5rem;
}

.form__label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form__required {
  color: var(--color-error);
}

.form__input {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-neutral-300);
  border-radius: 0.375rem;
  font: inherit;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

.form__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.form__input--error {
  border-color: var(--color-error);
}

.form__input--error:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

.form__error {
  display: block;
  margin-top: 0.5rem;
  color: var(--color-error);
  font-size: 0.875rem;
}

.form__error:empty {
  display: none;
}
```

## Validation JavaScript

```javascript
class FormValidator {
  constructor(form) {
    this.form = form;
    this.errors = new Map();

    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
    this.form.querySelectorAll("input").forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => this.clearError(input));
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const inputs = this.form.querySelectorAll("input[required]");
    let isValid = true;

    inputs.forEach((input) => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      this.submitForm();
    }
  }

  validateField(input) {
    const value = input.value.trim();
    let error = "";

    if (input.required && !value) {
      error = "This field is required";
    } else if (input.type === "email" && value && !this.isValidEmail(value)) {
      error = "Please enter a valid email";
    }

    if (error) {
      this.showError(input, error);
      return false;
    } else {
      this.clearError(input);
      return true;
    }
  }

  showError(input, message) {
    input.classList.add("form__input--error");
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) errorEl.textContent = message;
  }

  clearError(input) {
    input.classList.remove("form__input--error");
    const errorEl = document.getElementById(`${input.id}-error`);
    if (errorEl) errorEl.textContent = "";
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
```

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "form-component-quiz",
  "type": "multiple-choice",
  "title": "Building Form Components",
  "description": "Test your understanding of form validation.",
  "difficulty": "medium",
  "question": "When should you show form validation errors to users?",
  "options": [
    {
      "id": "a",
      "text": "As soon as they start typing in a field",
      "isCorrect": false,
      "explanation": "Showing errors before the user finishes is frustrating—let them complete their input first."
    },
    {
      "id": "b",
      "text": "Only after form submission fails",
      "isCorrect": false,
      "explanation": "This can be frustrating—users prefer earlier feedback on individual fields."
    },
    {
      "id": "c",
      "text": "On blur (leaving the field) or after the field was previously marked invalid",
      "isCorrect": true,
      "explanation": "Correct! Validate on blur for first-time errors (after user finishes), then on change for already-invalid fields (so they see it's fixed). This balances helpfulness with non-intrusiveness."
    },
    {
      "id": "d",
      "text": "Never show errors—just disable the submit button",
      "isCorrect": false,
      "explanation": "Users need to know what's wrong to fix it—disabled buttons without explanation are frustrating."
    }
  ]
}
-->

## Key Takeaways

- Always associate labels with inputs
- Use `novalidate` to implement custom validation
- Show errors near the relevant field
- Use `role="alert"` for error messages
- Validate on blur, clear on input
- Provide clear, helpful error messages

## Next Steps

Continue to [Patterns and Composition](./06-patterns-and-composition.md) →
