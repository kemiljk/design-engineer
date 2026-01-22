# Forms and Inputs

> **Quick Summary:** Forms are how users input data on the web—understanding HTML form elements is essential for building accessible, usable interfaces.

## What You'll Learn

- Fundamental structure of the form element and submission methods
- Wide range of input types and when to use them
- Critical roles of labels, fieldsets, and accessibility features
- Basics of form validation for robust, user-friendly interfaces

## The Form Element

Forms wrap input elements and handle submission:

```html
<form action="/submit" method="post">
  <!-- inputs go here -->
  <button type="submit">Submit</button>
</form>
```

### Form Attributes

**action:** Where to send the data (URL)
**method:** How to send it:
- `get` — Data in URL (for searches, filters)
- `post` — Data in request body (for sensitive data, creating resources)

### Form Without Traditional Submission

Modern apps often handle forms with JavaScript:

```html
<form id="contact-form">
  <!-- inputs -->
  <button type="submit">Send</button>
</form>

<script>
  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Handle with JavaScript
  });
</script>
```

## Input Types

The `<input>` element is incredibly versatile—its `type` attribute changes its behaviour entirely.

### Text Inputs

**Basic text:**
```html
<input type="text" name="username">
```

**Email (with validation):**
```html
<input type="email" name="email">
```
Shows email keyboard on mobile, validates format.

**Password (obscured):**
```html
<input type="password" name="password">
```

**URL:**
```html
<input type="url" name="website">
```

**Telephone:**
```html
<input type="tel" name="phone">
```
Shows phone keyboard on mobile (no validation—formats vary).

**Search:**
```html
<input type="search" name="query">
```
May show search-specific UI (clear button).

### Numeric Inputs

**Number:**
```html
<input type="number" name="quantity" min="1" max="100" step="1">
```

**Range (slider):**
```html
<input type="range" name="volume" min="0" max="100" value="50">
```

### Date and Time

**Date:**
```html
<input type="date" name="birthday">
```

**Time:**
```html
<input type="time" name="appointment">
```

**Datetime-local:**
```html
<input type="datetime-local" name="meeting">
```

**Month:**
```html
<input type="month" name="birth-month">
```

### Selection Inputs

**Checkbox (multiple selections):**
```html
<input type="checkbox" name="interests" value="design" id="design">
<label for="design">Design</label>

<input type="checkbox" name="interests" value="code" id="code">
<label for="code">Code</label>
```

**Radio (single selection):**
```html
<input type="radio" name="plan" value="free" id="plan-free">
<label for="plan-free">Free</label>

<input type="radio" name="plan" value="pro" id="plan-pro">
<label for="plan-pro">Pro</label>
```

Radio buttons with the same `name` form a group—only one can be selected.

### File Input

```html
<input type="file" name="document" accept=".pdf,.doc,.docx">
```

**Multiple files:**
```html
<input type="file" name="photos" multiple accept="image/*">
```

### Hidden Input

Data to submit that users don't see:

```html
<input type="hidden" name="user_id" value="123">
```

### Special Buttons

```html
<input type="submit" value="Submit Form">
<input type="reset" value="Clear Form">
```

Prefer `<button>` elements instead—more flexible:

```html
<button type="submit">Submit Form</button>
<button type="reset">Clear Form</button>
<button type="button">Just a Button</button>
```

## Textarea

For multi-line text:

```html
<textarea name="message" rows="4" cols="50">
Default text here
</textarea>
```

## Select Dropdown

```html
<select name="country">
  <option value="">Select a country</option>
  <option value="us">United States</option>
  <option value="uk">United Kingdom</option>
  <option value="ca">Canada</option>
</select>
```

**With option groups:**
```html
<select name="car">
  <optgroup label="Swedish Cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
  </optgroup>
  <optgroup label="German Cars">
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </optgroup>
</select>
```

**Multiple selection:**
```html
<select name="skills" multiple>
  <option value="html">HTML</option>
  <option value="css">CSS</option>
  <option value="js">JavaScript</option>
</select>
```

## Labels

Labels associate text with inputs—critical for accessibility:

```html
<label for="email">Email address</label>
<input type="email" id="email" name="email">
```

The `for` attribute matches the input's `id`.

**Wrapping approach:**
```html
<label>
  Email address
  <input type="email" name="email">
</label>
```

This implicitly associates the label.

### Why Labels Matter

Using labels correctly provides significant benefits, such as allowing users to click the label text to focus or activate the associated input and ensuring that screen readers announce the label clearly when the input is focused. Furthermore, proper labelling is a fundamental requirement for accessibility compliance, making it an essential practice for every form you build.

**Always use labels.** Never rely on placeholder alone.

## Placeholder vs Label

**Placeholder:** Hint text inside the input that disappears when typing.

```html
<input type="email" placeholder="name@example.com">
```

**Label:** Persistent text describing the field.

```html
<label for="email">Email</label>
<input type="email" id="email" placeholder="name@example.com">
```

**Use both.** Placeholders provide examples; labels describe the field.

## Fieldsets and Legends

Group related fields:

```html
<fieldset>
  <legend>Shipping Address</legend>
  
  <label for="street">Street</label>
  <input type="text" id="street" name="street">
  
  <label for="city">City</label>
  <input type="text" id="city" name="city">
</fieldset>
```

**For radio/checkbox groups:**
```html
<fieldset>
  <legend>Select your plan</legend>
  
  <input type="radio" name="plan" value="free" id="free">
  <label for="free">Free</label>
  
  <input type="radio" name="plan" value="pro" id="pro">
  <label for="pro">Pro</label>
</fieldset>
```

The legend provides an accessible group label.

## Input Attributes

**required:** Must be filled before submission
```html
<input type="email" required>
```

**disabled:** Cannot be interacted with
```html
<input type="text" disabled>
```

**readonly:** Can be read but not edited
```html
<input type="text" readonly value="Cannot change">
```

**autofocus:** Focuses on page load
```html
<input type="text" autofocus>
```

**autocomplete:** Hints for browser autofill
```html
<input type="email" autocomplete="email">
<input type="text" autocomplete="name">
<input type="text" autocomplete="address-line1">
```

**pattern:** Regex validation
```html
<input type="text" pattern="[0-9]{5}" title="Five digit zip code">
```

**min, max, step:** For numeric inputs
```html
<input type="number" min="0" max="100" step="5">
```

**minlength, maxlength:** For text inputs
```html
<input type="text" minlength="3" maxlength="20">
```

## Form Accessibility

To ensure your forms are fully accessible, every input must have a clearly defined accessible name. Whilst using the `<label>` element is the preferred method for most scenarios, you can also leverage the `aria-label` or `aria-labelledby` attributes to provide the necessary context for users of assistive technologies.

### Error Messages

Connect errors to inputs:

```html
<label for="email">Email</label>
<input type="email" id="email" aria-describedby="email-error">
<span id="email-error" role="alert">Please enter a valid email</span>
```

### Required Fields

Indicate required fields clearly:

```html
<label for="email">
  Email <span aria-hidden="true">*</span>
  <span class="sr-only">(required)</span>
</label>
<input type="email" id="email" required>
```

## Complete Form Example

```html
<form action="/contact" method="post">
  <fieldset>
    <legend>Contact Information</legend>
    
    <div class="form-group">
      <label for="name">Name <span aria-hidden="true">*</span></label>
      <input type="text" id="name" name="name" required autocomplete="name">
    </div>
    
    <div class="form-group">
      <label for="email">Email <span aria-hidden="true">*</span></label>
      <input type="email" id="email" name="email" required autocomplete="email">
    </div>
    
    <div class="form-group">
      <label for="phone">Phone</label>
      <input type="tel" id="phone" name="phone" autocomplete="tel">
    </div>
  </fieldset>
  
  <fieldset>
    <legend>Your Message</legend>
    
    <div class="form-group">
      <label for="subject">Subject</label>
      <select id="subject" name="subject">
        <option value="">Select a subject</option>
        <option value="sales">Sales inquiry</option>
        <option value="support">Support</option>
        <option value="other">Other</option>
      </select>
    </div>
    
    <div class="form-group">
      <label for="message">Message <span aria-hidden="true">*</span></label>
      <textarea id="message" name="message" rows="5" required></textarea>
    </div>
  </fieldset>
  
  <button type="submit">Send Message</button>
</form>
```

## Try It Yourself

### Exercise 1: Contact Form

Build a contact form with:
- Name, email (required)
- Subject dropdown
- Message textarea
- Submit button

Use proper labels and accessibility attributes.

### Exercise 2: Registration Form

Create a registration form with:
- Email and password
- Password confirmation
- Terms checkbox
- Plan selection (radio buttons)
- Proper fieldset grouping

### Exercise 3: Input Exploration

Create a test page with every input type. Test on:
- Desktop browser
- Mobile device (check keyboard types)
- With a screen reader (check label announcements)

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "html-forms-quiz",
  "type": "multiple-choice",
  "title": "Form Accessibility",
  "description": "Test your understanding of accessible form design.",
  "difficulty": "medium",
  "question": "What is required to make form inputs accessible to screen reader users?",
  "options": [
    {
      "id": "a",
      "text": "Add a placeholder attribute with descriptive text",
      "isCorrect": false,
      "explanation": "Placeholders disappear when typing and aren't reliably announced by screen readers—they're not sufficient labels."
    },
    {
      "id": "b",
      "text": "Use a <label> element associated with the input via 'for' attribute or wrapping",
      "isCorrect": true,
      "explanation": "Correct! Labels provide accessible names for inputs. Use 'for' matching the input's 'id', or wrap the input inside the label element."
    },
    {
      "id": "c",
      "text": "Add a title attribute to the input",
      "isCorrect": false,
      "explanation": "Title attributes aren't reliably accessible—labels are the standard solution."
    },
    {
      "id": "d",
      "text": "Just use clear input names—screen readers will figure it out",
      "isCorrect": false,
      "explanation": "The 'name' attribute is for form submission, not for screen reader announcements."
    }
  ]
}
-->

## Key Takeaways

- Always specify `method` and `action` attributes on your form elements
- Use the most specific input type for each field's semantic meaning
- Always prioritise the use of `<label>` elements for accessibility
- Remember that placeholders should only supplement rather than replace descriptive labels
- For more complex forms, group related fields using `<fieldset>` and `<legend>`
- Leverage attributes like `required` and `autocomplete` to enhance the user experience and make forms more informative for all users

## Next Steps

Continue to [Media Elements](./06-media-elements.md) →
