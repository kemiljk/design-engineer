# Usability Heuristics

> **Quick Summary:** Heuristics are mental shortcuts. In design, they are a checklist of ten principles that, when followed, eliminate 90% of common usability problems. They turn "this feels wrong" into "this violates heuristic #4."

## The Science of "Good" Design

Why do some interfaces feel intuitive while others feel broken? It's not magic. In 1994, Jakob Nielsen distilled decades of usability research into ten general principles. These aren't laws of physics, but they are incredibly reliable predictors of user success.

## The 10 Heuristics

### 1. Visibility of System Status
**The principle:** The system should always keep users informed about what is going on, through appropriate feedback within a reasonable time.

**In practice:** If a user clicks "Upload," don't just sit there. Show a spinner. If it takes longer than a second, show a progress bar. If they are logged in, show their avatar in the corner. Uncertainty causes anxiety; feedback builds trust.

### 2. Match Between System and Real World
**The principle:** The system should speak the users' language, with words, phrases, and concepts familiar to the user, rather than system-oriented terms.

**In practice:** Don't say "Index 0" when you mean "First Item." Use metaphors that map to physical objects—folders, trash cans, shopping carts. If you are designing for stock traders, use their jargon ("Bull," "Bear"). If you are designing for everyone else, use plain English.

### 3. User Control and Freedom
**The principle:** Users often choose system functions by mistake and will need a clearly marked "emergency exit" to leave the unwanted state without having to go through an extended dialogue.

**In practice:** Every modal needs a close button. Every destructive action needs an Undo. Users explore software by clicking things; if they feel trapped, they will leave. Give them a safe way back.

### 4. Consistency and Standards
**The principle:** Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform conventions.

**In practice:** If you use a magnifying glass icon for "Search" on one page, don't use it for "Zoom" on another. If iOS users expect a "Back" swipe, don't hijack that gesture for something else. Innovation is great, but not for basic navigation. Jakob's Law states: "Users spend most of their time on other sites." They expect your site to work like the ones they already know.

### 5. Error Prevention
**The principle:** Even better than good error messages is a careful design which prevents a problem from occurring in the first place.

**In practice:** Don't let a user type letters into a phone number field. Don't let them click "Submit" if the form is empty. Use sensible defaults. If a delete action is permanent, ask for confirmation. The best error message is the one you never have to show.

### 6. Recognition Rather Than Recall
**The principle:** Minimize the user's memory load by making objects, actions, and options visible. The user should not have to remember information from one part of the dialogue to another.

**In practice:** Humans are bad at remembering things. Don't make them remember a product code from the previous screen; show it to them. Use a "Recently Viewed" list so they don't have to search again. Show the search term they just typed. Recognition (seeing it) is cognitively cheaper than recall (remembering it).

### 7. Flexibility and Efficiency of Use
**The principle:** Accelerators—unseen by the novice user—may often speed up the interaction for the expert user such that the system can cater to both inexperienced and experienced users.

**In practice:** Novices use menus; experts use keyboard shortcuts (`Cmd+C`, `Cmd+V`). Novices click "Next" five times; experts want a "Skip to End" button. Good design has a low floor (easy to learn) but a high ceiling (fast to master).

### 8. Aesthetic and Minimalist Design
**The principle:** Dialogues should not contain information which is irrelevant or rarely needed. Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.

**In practice:** This isn't about flat design or white space. It's about signal-to-noise ratio. If a screen has 50 elements, the user sees nothing. Remove everything that doesn't support the user's current goal. If it's not helping, it's hurting.

### 9. Help Users Recognize, Diagnose, and Recover from Errors
**The principle:** Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution.

**In practice:**
*   **Bad:** "Error 500: Internal Server Error."
*   **Good:** "We couldn't save your changes because of a connection issue. Please check your internet and try again."
*   **Formula:** What happened + Why it happened + How to fix it.

### 10. Help and Documentation
**The principle:** Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation. Any such information should be easy to search, focused on the user's task, list concrete steps to be carried out, and not be too large.

**In practice:** Contextual help is best. Don't force them to read a manual. Use tooltips for complex settings. Offer a "Quick Start" guide. If a feature is complex enough to require a manual, consider simplifying the feature first.

## Conducting a Heuristic Evaluation

You don't need a lab or 50 users to find usability problems. You can do a "Heuristic Evaluation" yourself in an afternoon.

1.  **Select the Flow:** Choose a critical path (e.g., "Sign Up" or "Checkout").
2.  **Walk the Path:** Go through it step-by-step, acting as a user.
3.  **Check the List:** At every screen, ask: "Does this violate any of the 10 heuristics?"
4.  **Rate Severity:**
    *   **0:** No problem.
    *   **1:** Cosmetic problem only.
    *   **2:** Minor usability problem (fix if time permits).
    *   **3:** Major usability problem (important to fix).
    *   **4:** Usability catastrophe (imperative to fix).

## Try It Yourself

### Exercise 1: The Audit
Open an app you find frustrating (we all have one). Pick one screen. Go through the 10 heuristics. Can you pinpoint exactly *why* it's frustrating? (e.g., "I can't tell if it saved my changes" -> Violation of #1 Visibility of System Status).

### Exercise 2: Error Message Rewrite
Find a technical error message ("Invalid Input"). Rewrite it to follow Heuristic #9 (Plain language + specific problem + solution).

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
      "explanation": "Visibility of system status is about keeping users informed about what's happening, not about labelling consistency."
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

-   **Heuristics are tools, not laws.** Use them to identify likely problems, but trust user testing for the final verdict.
-   **Consistency (#4) is powerful.** It reduces learning time.
-   **Error prevention (#5) beats error handling.** Stop the mistake before it happens.
-   **Recognition (#6) beats recall.** Don't make users memorize things.

## Next Steps

Continue to [Designing for Edge Cases](./05-designing-for-edge-cases.md) →
