# Usability Heuristics

> **Quick Summary:** Usability heuristics are time-tested principles for evaluating and improving interface design. Think of them as a checklist for catching common usability issues.

## What You'll Learn

- Nielsen's 10 Usability Heuristics
- How to apply each heuristic
- Conducting heuristic evaluations
- Balancing heuristics with other considerations

## What Are Usability Heuristics?

Heuristics are rules of thumb. Usability heuristics are established principles that predict usability problems.

Jakob Nielsen's 10 Usability Heuristics (1994) remain the most influential framework. They're not laws, but guidelines that catch common issues.

## The 10 Heuristics

### 1. Visibility of System Status

The system should always keep users informed about what is going on, through appropriate feedback within reasonable time.

**In practice:**
- Loading indicators for operations
- Progress bars for multi-step processes
- Confirmation messages after actions
- Current state visibility (logged in, selected, etc.)

**Questions to ask:**
- Does the user know what's happening?
- Is there feedback for their action?
- Do they know the current state?

### 2. Match Between System and Real World

The system should speak the users' language, with words, phrases, and concepts familiar to the user, rather than system-oriented terms.

**In practice:**
- Use everyday language, not jargon
- Follow real-world conventions (calendar shows weeks)
- Use familiar metaphors
- Organize information in natural, logical order

**Questions to ask:**
- Would a non-technical user understand this?
- Does the organisation match user expectations?
- Are terms familiar to users (not just the team)?

### 3. User Control and Freedom

Users often choose system functions by mistake and will need a clearly marked "emergency exit" to leave the unwanted state without having to go through an extended dialogue.

**In practice:**
- Undo functionality
- Cancel buttons on dialogs
- Clear back navigation
- Easy escape from modals
- Don't trap users in flows

**Questions to ask:**
- Can users exit at any point?
- Can they undo mistakes?
- Are they ever trapped?

### 4. Consistency and Standards

Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform conventions.

**In practice:**
- Consistent terminology throughout
- Same action = same result everywhere
- Follow platform conventions
- Consistent visual treatment for similar elements

**Questions to ask:**
- Are similar things styled and labeled consistently?
- Does it follow platform conventions?
- Would this surprise users based on expectations?

### 5. Error Prevention

Even better than good error messages is a careful design which prevents a problem from occurring in the first place.

**In practice:**
- Disable invalid actions
- Confirmation for destructive operations
- Sensible defaults
- Constraints that prevent invalid input
- Warnings before point of no return

**Questions to ask:**
- What could go wrong?
- Can we prevent it through design?
- Are destructive actions protected?

### 6. Recognition Rather Than Recall

Minimize the user's memory load by making objects, actions, and options visible. The user should not have to remember information from one part of the dialogue to another.

**In practice:**
- Visible options rather than commands to remember
- Recently used items
- Search suggestions
- Contextual help
- Visible labels (don't rely solely on icons)

**Questions to ask:**
- Does the user need to remember something?
- Are options visible or hidden?
- Is help available in context?

### 7. Flexibility and Efficiency of Use

Accelerators (unseen by the novice user) may often speed up the interaction for the expert user such that the system can cater to both inexperienced and experienced users.

**In practice:**
- Keyboard shortcuts
- Customizable workflows
- Shortcuts for frequent actions
- Power user features that don't complicate basic use

**Questions to ask:**
- Can experts work faster?
- Are there shortcuts for common tasks?
- Is the basic experience still simple?

### 8. Aesthetic and Minimalist Design

Dialogues should not contain information which is irrelevant or rarely needed. Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.

**In practice:**
- Remove unnecessary elements
- Prioritize important information
- Progressive disclosure for complexity
- Clean, focused interfaces

**Questions to ask:**
- Is everything here necessary?
- What could be removed?
- What's competing for attention?

### 9. Help Users Recognize, Diagnose, and Recover from Errors

Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution.

**In practice:**
- Clear, human-readable error messages
- Specific about what went wrong
- Helpful about how to fix it
- Positioned near the problem

**Questions to ask:**
- Would a user understand this error?
- Does it explain what went wrong?
- Does it suggest how to fix it?

### 10. Help and Documentation

Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation. Any such information should be easy to search, focused on the user's task, list concrete steps to be carried out, and not be too large.

**In practice:**
- Contextual help (tooltips, info icons)
- Searchable documentation
- Task-focused tutorials
- Progressive onboarding

**Questions to ask:**
- Is help available when needed?
- Is it findable?
- Is it actually helpful?

## Conducting Heuristic Evaluation

Heuristic evaluation is a fast, cheap usability inspection method.

### The Process

1. **Define scope:** What are you evaluating? (Whole app? Single flow? Component?)

2. **Walk through as user:** Go through the interface attempting real tasks.

3. **Note issues:** For each problem, identify:
   - What's the issue?
   - Which heuristic(s) does it violate?
   - How severe is it?

4. **Rate severity:**
   - 0: Not a usability problem
   - 1: Cosmetic only. Fix if time.
   - 2: Minor. Causes delay, low priority.
   - 3: Major. Causes significant issues, important to fix.
   - 4: Catastrophic. Blocks users, must fix.

5. **Compile findings:** Group by severity or heuristic.

6. **Prioritize fixes:** Address highest severity first.

### Tips for Evaluation

- **Multiple evaluators:** 3-5 evaluators find more issues than one
- **Independent first:** Evaluate independently before discussing
- **Be specific:** "Button is confusing" → "Submit button doesn't indicate what will be submitted"
- **Include positive notes:** What works well? Don't only critique.
- **Consider context:** A violation might be justified in your context

### Limitations

Heuristic evaluation is useful but incomplete:
- Evaluators aren't real users
- Can't discover all issues
- Subjective interpretation
- Better at finding problems than solutions

Combine with usability testing for comprehensive evaluation.

## Balancing Heuristics

Heuristics sometimes conflict:

**Consistency vs. Optimization:** Standard pattern might be less efficient for specific use case.

**Minimalism vs. Visibility:** Hiding options simplifies but requires recall.

**Error prevention vs. Freedom:** Confirmations prevent errors but slow users down.

Use judgment. Heuristics are guidelines, not rules. Context determines the right balance.

## Try It Yourself

### Exercise 1: Quick Evaluation

Pick a website or app. Spend 15 minutes evaluating against the 10 heuristics:
1. For each heuristic, note one example of adherence and one violation
2. Rate the severity of violations
3. Prioritize the top 3 issues to fix

### Exercise 2: Error Message Audit

Find 5 error messages in products you use:
1. Does each follow heuristic #9? (Plain language, specific, suggests solution)
2. Rewrite any that don't

### Exercise 3: Flexibility Analysis

For a product you use regularly:
1. List all keyboard shortcuts you know
2. What frequent actions don't have shortcuts?
3. How could the product better serve expert users without complicating basic use?

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "usability-heuristics-quiz",
  "type": "multiple-choice",
  "title": "Nielsen's Heuristics",
  "description": "Test your knowledge of usability heuristics.",
  "difficulty": "medium",
  "question": "Which heuristic is being violated when a product uses different labels for the same action (e.g., 'Save' in one place, 'Apply' in another)?",
  "options": [
    {
      "id": "a",
      "text": "Visibility of system status",
      "isCorrect": false,
      "explanation": "Visibility of system status is about keeping users informed about what's happening, not about labeling consistency."
    },
    {
      "id": "b",
      "text": "Match between system and real world",
      "isCorrect": false,
      "explanation": "This heuristic is about using familiar language and concepts, not about internal consistency."
    },
    {
      "id": "c",
      "text": "Consistency and standards",
      "isCorrect": true,
      "explanation": "Correct! Heuristic #4 states that users shouldn't have to wonder whether different words mean the same thing. Consistent terminology throughout reduces confusion."
    },
    {
      "id": "d",
      "text": "Recognition rather than recall",
      "isCorrect": false,
      "explanation": "While related to memory, this heuristic is more about making options visible rather than label consistency."
    }
  ]
}
-->

## Key Takeaways

The 10 heuristics:
1. Visibility of system status
2. Match between system and real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognise, diagnose, and recover from errors
10. Help and documentation

- Heuristic evaluation is fast and cheap for finding usability issues
- Rate severity to prioritise fixes
- Heuristics can conflict. Use judgement.
- Combine with user testing for complete evaluation

## Next Steps

Continue to [Designing for Edge Cases](./05-designing-for-edge-cases.md) →
