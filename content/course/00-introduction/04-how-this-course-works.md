---
estimatedTime: 10
---

# How This Course Works

> **Quick Summary:** This lesson explains the course structure, how to navigate between lessons, and how to get the most from your learning experience.

## What You'll Learn

- The structure of lessons and modules
- How to navigate the course
- Tips for effective learning
- How to track your progress

## Course Organization

The course is organised into three main sections, each with platform-specific content:

```
├── Introduction (you are here)
│
├── Design Track
│   ├── Web
│   ├── iOS
│   └── Android
│
├── Engineering Track
│   ├── Web
│   ├── iOS
│   └── Android
│
└── Convergence
    ├── Web
    ├── iOS
    └── Android
```

Within each track and platform, content is organised into **modules** (major topics) and **lessons** (individual units within a topic).

For example, the Web Engineering Track:
- **Module 1: HTML Fundamentals** → 6 lessons
- **Module 2: CSS Mastery** → 8 lessons
- **Module 3: JavaScript Essentials** → 8 lessons
- **Module 4: Building Components** → 6 lessons
- **Module 5: Design Systems in Code** → 5 lessons

## Lesson Structure

Every lesson follows a consistent format:

### Quick Summary
A one-line takeaway at the top. If you're reviewing or skimming, this tells you what the lesson covers.

### What You'll Learn
Bullet points of outcomes. After completing the lesson, you should be able to do these things.

### Main Content
The core teaching, broken into digestible sections. This includes:
- Explanations of concepts
- Code examples (for engineering lessons)
- Visual examples (for design lessons)
- Real-world context and applications

### Try It Yourself
Hands-on exercises. This is where learning happens. Reading about design won't make you a designer; designing will. Reading about code won't make you an engineer; coding will.

Don't skip these.

### Key Takeaways
A summary of main points. Good for review and reference.

### Next Steps
Links to continue your journey—usually the next lesson, but sometimes related lessons in other tracks.

## Navigation Approaches

There are two main ways to move through the course:

### Linear Progression (Recommended for Beginners)

Work through lessons in order within your chosen track:
1. Complete all lessons in Module 1
2. Move to Module 2
3. Continue through all modules
4. Proceed to the next track

This ensures you build foundational knowledge before tackling advanced topics.

### Topic-Based Exploration (For Experienced Learners)

If you already have skills in some areas, jump to what you need:
- Skip lessons covering concepts you know
- Jump into specific topics
- Cross-reference between tracks when relevant

Be honest with yourself. If a lesson's "What You'll Learn" includes things you can't confidently do, work through it.

## Cross-Track Learning

Many concepts appear in both the Design and Engineering tracks, approached from different angles:

| Concept | Design Track | Engineering Track |
|---------|--------------|-------------------|
| Components | Designing reusable UI elements | Building reusable UI elements |
| Typography | Choosing and pairing fonts | Implementing type systems in code |
| Colour | Building palettes and systems | Implementing theming |
| Layout | Grid systems and composition | Flexbox, Grid, and layout code |
| Motion | Animation principles | Animation implementation |

When you encounter a concept in one track, consider exploring it in the other. Understanding both perspectives is what makes a Design Engineer.

## Progress Tracking

### The Course Plan

The `/content/course/_meta/COURSE-PLAN.md` file contains:
- A complete outline of all modules and lessons
- Checkboxes for tracking completion
- Cross-references between related content

Use this as your roadmap. Mark lessons complete as you finish them.

### Self-Assessment

At the start of each module, assess what you already know. At the end, assess what you've learned. The gap between these tells you the value you're getting.

### Building Evidence

The best way to track progress is to build. As you complete exercises:
- Save your work in a dedicated folder
- Screenshot design exercises
- Commit code exercises to a repository
- Note insights and questions

By the end, you'll have a collection of work that demonstrates your skills—useful for portfolios and job applications.

## Tips for Effective Learning

### Space Your Learning

Spaced repetition beats cramming. Instead of marathon sessions:
- Study for 30-60 minutes at a time
- Take breaks between lessons
- Review previous lessons before starting new ones
- Sleep on complex concepts

### Teach What You Learn

The best way to solidify understanding is to explain it to someone else. After each lesson:
- Summarise the main points in your own words
- Explain a concept to a friend or colleague
- Write a blog post or tweet about what you learned

If you can't explain it simply, you don't understand it well enough.

### Embrace Confusion

Feeling confused is a sign you're learning. When concepts feel hard:
- Take a break and return later
- Try the exercises even if you don't fully understand
- Look up supplementary resources
- Ask questions (of colleagues, communities, or AI)

Don't expect everything to click immediately. Learning is non-linear.

### Connect Concepts

Design Engineering is about seeing connections. As you learn:
- Note when concepts from different lessons relate
- Consider how design principles appear in code
- Think about how engineering constraints influence design

The "aha" moments come when you connect ideas across disciplines.

### Build, Build, Build

Reading isn't learning. Doing is learning.

Every exercise exists for a reason. Even if an exercise feels simple, do it. Building creates understanding that reading cannot.

After completing each module, build something on your own that uses what you learned. This is how you move from "I've seen this" to "I can do this."

## Getting Help

### When You're Stuck

1. **Re-read the lesson.** The answer is often there.
2. **Check the exercises.** Working through exercises clarifies concepts.
3. **Look at related lessons.** The Design and Engineering tracks often explain concepts differently.
4. **Search for the concept.** Sometimes a different explanation helps.
5. **Take a break.** Fresh eyes solve problems.

### Community Resources

Consider joining communities where you can ask questions:
- Design Engineering Slack/Discord communities
- Platform-specific forums (iOS dev forums, web dev communities)
- Twitter/X communities around design engineering

## Time Expectations

Here's a rough guide for how long each section takes:

| Section | Modules | Estimated Hours |
|---------|---------|-----------------|
| Introduction | 1 | 1-2 hours |
| Design Track (Web) | 5 | 15-25 hours |
| Engineering Track (Web) | 5 | 25-40 hours |
| Convergence (Web) | 5 | 15-25 hours |

These estimates assume:
- You're learning the content for the first time
- You complete all exercises
- You build additional projects to practice

Experienced students move faster. Complete beginners may need more time. Both are fine.

## Try It Yourself

Before diving into your chosen track:

1. **Set up your environment.** Depending on your path:
   - **Web**: A code editor (VS Code recommended) and a browser
   - **iOS**: Xcode on a Mac
   - **Android**: Android Studio

2. **Create a learning folder.** A place to save exercises and projects.

3. **Review the Course Plan.** Open `/content/course/_meta/COURSE-PLAN.md` and familiarise yourself with the structure.

4. **Set a schedule.** Decide when you'll study and how much time you'll commit each week.

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "course-structure-quiz",
  "type": "multiple-choice",
  "title": "Course Navigation",
  "description": "Check your understanding of how to navigate the course effectively.",
  "difficulty": "easy",
  "question": "According to the course, what is the MOST effective way to learn?",
  "options": [
    {
      "id": "a",
      "text": "Read all lessons thoroughly before attempting exercises",
      "isCorrect": false,
      "explanation": "Reading alone isn't learning—the course emphasizes doing over reading."
    },
    {
      "id": "b",
      "text": "Active practice through exercises and building projects",
      "isCorrect": true,
      "explanation": "Correct! 'Reading is not learning. Doing is learning.' Every exercise exists for a reason, and building creates understanding that reading cannot."
    },
    {
      "id": "c",
      "text": "Completing one entire track before starting another",
      "isCorrect": false,
      "explanation": "While linear progression is good for beginners, cross-track learning and connecting concepts is encouraged."
    },
    {
      "id": "d",
      "text": "Marathon study sessions to get through material quickly",
      "isCorrect": false,
      "explanation": "Spaced repetition beats cramming—30-60 minute sessions with breaks are more effective."
    }
  ]
}
-->

## Key Takeaways

- The course has three tracks (Design, Engineering, Convergence) across three platforms
- Lessons follow a consistent structure with exercises in every lesson
- Progress linearly if you're a beginner; jump around if you're experienced
- Active practice beats passive reading—do the exercises
- Track your progress in the Course Plan document

## Next Steps

You're ready to begin!

Based on your choices in the previous lesson:

**If you're taking the Design Track:**
- [Web Design Track: Foundations of Visual Design](../design-track/web/01-foundations/01-what-is-visual-design.md)
- [iOS Design Track: HIG Fundamentals](../design-track/ios/01-hig-fundamentals/01-ios-design-philosophy.md)
- [Android Design Track: Material Design Fundamentals](../design-track/android/01-material-design/01-material-design-philosophy.md)

**If you're taking the Engineering Track:**
- [Web Engineering Track: HTML Fundamentals](../engineering-track/web/01-html-fundamentals/01-what-is-html.md)
- [iOS Engineering Track: Swift Basics](../engineering-track/ios/01-swift-basics/01-introduction-to-swift.md)
- [Android Engineering Track: Kotlin Basics](../engineering-track/android/01-kotlin-basics/01-introduction-to-kotlin.md)

**If you're ready for Convergence:**
- [Web Convergence: Motion and Interaction](../convergence/web/01-motion-and-interaction/01-why-motion-matters.md)
- [iOS Convergence: SwiftUI Animation](../convergence/ios/01-ios-motion-and-animation/01-swiftui-animation.md)
- [Android Convergence: Compose Animation](../convergence/android/01-android-motion-and-animation/01-compose-animation.md)

Good luck. Build something great.
