# Building a Form

> **Quick Summary:** Forms are how users input data. Building accessible, validated forms is essential for any interactive application.

## What You'll Learn

- Accessible form structure
- Input styling and states
- Client-side validation
- Error handling and display

## Form Structure

<!-- visual-example: form-demo -->

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

---

## React Version

React forms use **controlled components** where form state lives in React:

### Basic Form with Controlled Inputs

```jsx
// ContactForm.jsx
import { useState } from 'react';

function ContactForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <FormField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      <FormField
        label="Message"
        name="message"
        as="textarea"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
        required
      />

      <Button type="submit" loading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}
```

### Reusable FormField Component

```jsx
// FormField.jsx
function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required,
  as = 'input',
  ...props
}) {
  const Component = as;
  const inputId = `field-${name}`;
  const errorId = `${name}-error`;

  return (
    <div className="form__group">
      <label htmlFor={inputId} className="form__label">
        {label}
        {required && <span className="form__required" aria-hidden="true">*</span>}
      </label>

      <Component
        id={inputId}
        name={name}
        type={as === 'input' ? type : undefined}
        value={value}
        onChange={onChange}
        className={`form__input ${error ? 'form__input--error' : ''}`}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      />

      {error && (
        <span id={errorId} className="form__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default FormField;
```

### Custom Form Hook

Extract form logic into a reusable hook:

```jsx
// useForm.js
import { useState, useCallback } from 'react';

function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
    }
  }, [values, validate]);

  const handleSubmit = useCallback((onSubmit) => async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce(
      (acc, key) => ({ ...acc, [key]: true }), {}
    );
    setTouched(allTouched);

    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length > 0) return;
    }

    await onSubmit(values);
  }, [values, validate]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}

export default useForm;
```

### Using the Hook

```jsx
function SignupForm() {
  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = 'Email is required';
    if (!values.password) errors.password = 'Password is required';
    if (values.password.length < 8) errors.password = 'Password must be 8+ characters';
    return errors;
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm(
    { email: '', password: '' },
    validate
  );

  const onSubmit = async (data) => {
    await api.signup(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && errors.email}
        required
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password && errors.password}
        required
      />

      <Button type="submit">Sign Up</Button>
    </form>
  );
}
```

### TypeScript Version

```tsx
// types.ts
interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
  as?: 'input' | 'textarea' | 'select';
}

// useForm.ts
interface UseFormReturn<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (onSubmit: (values: T) => Promise<void>) => (e: React.FormEvent) => void;
  reset: () => void;
}

function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  validate?: (values: T) => Partial<Record<keyof T, string>>
): UseFormReturn<T> {
  // ... implementation
}
```

### Controlled vs. Uncontrolled

React offers two approaches:

**Controlled** (recommended): React state is the source of truth
```jsx
<input value={formData.email} onChange={handleChange} />
```

**Uncontrolled components** rely on the DOM to handle form data. Instead of using an event handler for every state update, you use a **ref** to get the value from the DOM when you need it (e.g., when the form is submitted). This is closer to traditional HTML.
```jsx
const emailRef = useRef();
// Access: emailRef.current.value
<input ref={emailRef} defaultValue="" />
```

Use controlled components for validation, conditional rendering, and complex forms. Use uncontrolled for simple forms or performance-critical scenarios.

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
      "text": "Never show errors, just disable the submit button",
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
- React controlled components keep state in React
- Custom hooks like `useForm` encapsulate validation logic
- Reusable FormField components reduce repetition
- TypeScript adds type safety to form data

## Next Steps

Continue to [Patterns and Composition](./06-patterns-and-composition.md) →
