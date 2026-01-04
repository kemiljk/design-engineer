# Course Evaluation Report

**Course:** Design Engineer Course (d×e)
**Evaluation Date:** January 2026
**Evaluator:** Automated Course Evaluation Agent

---

## Executive Summary

### Overall Assessment

The Design Engineer Course is a **comprehensive, well-structured curriculum** that successfully bridges the gap between design and engineering across web, iOS, and Android platforms. The course demonstrates strong pedagogical design, authentic practitioner voice, and covers modern frameworks and tooling.

However, **critical accuracy issues were identified** that require immediate attention—specifically, British English spellings used in code examples where American English is mandatory (CSS properties, Kotlin parameters). These issues would cause code to fail if copied directly.

### Critical Issues Requiring Immediate Attention

1. **CSS code uses British English spellings** (`colour`, `background-colour`, `border-colour`) - CSS requires American English (`color`, `background-color`, `border-color`). Found in 15+ files with 39+ instances.

2. **Kotlin/Compose code uses British English** (`colour = MaterialTheme.colorScheme.background`) - Compose parameters use American English. Found in Android track files.

### Top 5 Improvement Recommendations

1. **Fix all British English in code** (Critical - code won't compile/run)
2. Add explicit version requirements in environment setup lessons
3. Include iOS 18 and potential "Liquid Glass" design language updates when released
4. Add more real-world project complexity in capstone exercises
5. Include CI/CD and deployment workflows in engineering tracks

---

## Recency Findings

### Web Track

| Technology | Course Status | Current Reality | Assessment |
|------------|---------------|-----------------|------------|
| CSS Container Queries | ✅ Covered | Widely supported (2023+) | **Current** |
| CSS `:has()` selector | ✅ Covered | Baseline 2023 | **Current** |
| CSS Nesting | Not mentioned | Baseline 2024 | Minor gap |
| View Transitions API | Not covered | Experimental/Growing | Acceptable |
| WCAG | ✅ WCAG 2.2 mentioned | WCAG 2.2 (Oct 2023) | **Current** |
| Motion library | ✅ `motion/react` import | Correct modern syntax | **Current** |
| ES6+ JavaScript | ✅ Comprehensive | Current | **Current** |
| `dvh`/`svh`/`lvh` units | ✅ `100dvh` mentioned | Baseline 2023 | **Current** |

**Web Track Recency Score: Excellent (5/5)**

### iOS Track

| Technology | Course Status | Current Reality | Assessment |
|------------|---------------|-----------------|------------|
| SwiftUI | ✅ Modern patterns | iOS 17+ features | **Current** |
| `@Observable` macro | ✅ Used correctly | iOS 17+ (2023) | **Current** |
| `#Preview` macro | ✅ Used correctly | iOS 17+ | **Current** |
| Xcode | macOS 14+ mentioned | macOS 14 Sonoma minimum | **Current** |
| SF Symbols | ✅ SF Symbols 6 mentioned | SF Symbols 6 (2024) | **Current** |
| SwiftData | Not covered | Available iOS 17+ | Minor gap |
| iOS 18 design changes | Not applicable | Monitor for updates | N/A |

**iOS Track Recency Score: Excellent (5/5)**

### Android Track

| Technology | Course Status | Current Reality | Assessment |
|------------|---------------|-----------------|------------|
| Jetpack Compose | ✅ Modern patterns | Current | **Current** |
| Material Design 3 | ✅ Comprehensive | Current | **Current** |
| Material 3 Expressive | ✅ Mentioned (2024+) | Latest evolution | **Excellent** |
| Dynamic Color | ✅ Covered | Android 12+ | **Current** |
| Kotlin DSL | ✅ Recommended | Current best practice | **Current** |
| Kotlin Multiplatform | Not covered | Growing adoption | Minor gap |

**Android Track Recency Score: Excellent (5/5)**

### Design Track

| Area | Course Status | Current Reality | Assessment |
|------|---------------|-----------------|------------|
| Figma Variables | ✅ Mentioned | Current feature | **Current** |
| Design Tokens | ✅ W3C spec awareness | Evolving standard | **Current** |
| iOS HIG | ✅ Core principles | Current | **Current** |
| Material Design | ✅ M3 + Expressive | Very current | **Excellent** |

**Design Track Recency Score: Excellent (5/5)**

---

## Accuracy Findings

### Critical Accuracy Issues

#### Issue 1: CSS Properties Use British English (CRITICAL)

- **Location:** 15+ files across `engineering-track/web/` and `convergence/web/`
- **Problem:** CSS code examples use British spellings (`colour`, `background-colour`, `border-colour`) which are invalid CSS properties
- **Evidence:** CSS requires American English. `colour: navy;` is invalid; `color: navy;` is required.
- **Severity:** **CRITICAL** - Code will not work if copied
- **Files affected:**
  - `02-css-mastery/01-how-css-works.md`
  - `02-css-mastery/02-selectors-deep-dive.md`
  - `02-css-mastery/03-the-box-model.md`
  - `02-css-mastery/07-custom-properties.md`
  - `04-building-components/02-building-a-button.md`
  - `04-building-components/03-building-a-card.md`
  - `04-building-components/05-building-a-form.md`
  - And 8+ additional files

**Required Fix Example:**

```css
/* Current (INCORRECT - won't work): */
h1 {
  colour: navy;
  font-size: 2rem;
}

/* Corrected: */
h1 {
  color: navy;
  font-size: 2rem;
}
```

#### Issue 2: Kotlin/Compose Parameters Use British English (CRITICAL)

- **Location:** `engineering-track/android/` multiple files
- **Problem:** Compose function parameters use `colour` instead of `color`
- **Evidence:** Compose's `Surface` and `Text` composables use `color` parameter
- **Severity:** **CRITICAL** - Code will not compile
- **Example location:** `00-environment-setup/01-getting-started-with-android-studio.md` line 220

**Required Fix Example:**

```kotlin
// Current (INCORRECT - won't compile):
Surface(
    modifier = Modifier.fillMaxSize(),
    colour = MaterialTheme.colorScheme.background
)

// Corrected:
Surface(
    modifier = Modifier.fillMaxSize(),
    color = MaterialTheme.colorScheme.background
)
```

### Moderate Accuracy Issues

None identified. Technical explanations are accurate.

### Minor Accuracy Issues

None identified. Code patterns and best practices are correctly presented.

---

## Realism Assessment

### Strengths

1. **Progressive complexity:** Lessons build appropriately from fundamentals to advanced topics
2. **Industry-standard tooling:** Covers actual tools professionals use (Figma, VS Code, Xcode, Android Studio)
3. **Real-world patterns:** Component architecture, design systems, and state management reflect industry practices
4. **Cross-platform awareness:** Acknowledges platform-specific conventions while teaching transferable concepts
5. **Accessibility inclusion:** Not treated as an afterthought; integrated into convergence track

### Realism Concerns

#### Concern 1: Capstone Project Complexity

- **Location:** All capstone modules
- **Gap:** Capstone projects focus on single-feature applications; real projects involve multiple interacting features
- **Real-world context:** Professional work includes API integration, authentication, error handling, offline support
- **Suggestion:** Consider adding optional "stretch goals" that introduce real-world complexity

#### Concern 2: Collaboration Workflows

- **Location:** Engineering tracks
- **Gap:** Limited coverage of Git workflows, code review, and CI/CD
- **Real-world context:** Design engineers work in teams with version control, pull requests, and automated pipelines
- **Suggestion:** Consider a module on "Working in Teams" covering Git, PR workflows, and design-dev handoff

#### Concern 3: Performance Debugging

- **Location:** Performance module
- **Gap:** Theory-focused; limited hands-on debugging with real browser/device tools
- **Real-world context:** Professionals use Chrome DevTools, Instruments, Android Profiler extensively
- **Suggestion:** Add practical debugging exercises with screenshots/videos of actual tools

---

## Value Assessment by Track

### Track: Web Engineering

#### Value Score: 4.5/5 - Excellent

**Strengths:**
- Comprehensive HTML/CSS/JavaScript coverage
- Modern CSS features (container queries, custom properties, grid)
- Strong component-building methodology
- Design systems in code module is particularly valuable

**Gaps:**
- No React/Vue/framework-specific content (intentional but noted)
- Limited TypeScript coverage
- No build tooling (Vite, etc.)

**Competitor comparison:** Exceeds free resources (MDN, freeCodeCamp) in structure and design focus. Comparable to paid courses (Frontend Masters) but with unique design engineer perspective.

**Improvement recommendations:**
1. Add optional TypeScript introduction
2. Include modern build tooling overview

**Priority:** Medium

---

### Track: Web Design

#### Value Score: 4.5/5 - Excellent

**Strengths:**
- Solid visual design fundamentals
- Excellent design systems coverage
- Strong UX principles module
- Practical Figma workflow content

**Gaps:**
- Could include more on user research methods
- Limited motion design in design track (covered in convergence)

**Competitor comparison:** Unique positioning—most design courses don't bridge to code. Strong differentiation.

**Priority:** Low

---

### Track: iOS Engineering

#### Value Score: 4.5/5 - Excellent

**Strengths:**
- Modern SwiftUI patterns (`@Observable`, `#Preview`)
- Clear state management explanation
- Appropriate scope for designers learning to code

**Gaps:**
- No UIKit coverage (acceptable for modern focus)
- Limited networking/persistence content
- No SwiftData coverage

**Competitor comparison:** Comparable to Stanford CS193p in technical depth, better for design-focused learners.

**Priority:** Low

---

### Track: iOS Design

#### Value Score: 4/5 - Good

**Strengths:**
- Solid HIG coverage
- SF Symbols integration
- Platform-specific design patterns

**Gaps:**
- Could expand on Apple's evolving design language
- Limited visionOS/spatial design content

**Priority:** Low

---

### Track: Android Engineering

#### Value Score: 4.5/5 - Excellent

**Strengths:**
- Comprehensive Kotlin introduction
- Modern Compose-first approach
- Excellent Material 3 integration
- Mentions Material 3 Expressive (very current)

**Gaps:**
- Limited architecture patterns (MVVM briefly mentioned)
- No Room/persistence coverage
- No Kotlin Multiplatform mention

**Priority:** Low

---

### Track: Android Design

#### Value Score: 4.5/5 - Excellent

**Strengths:**
- Comprehensive Material Design coverage
- Dynamic color explained well
- Material 3 Expressive inclusion is excellent

**Gaps:**
- Could expand on designing for foldables/large screens

**Priority:** Low

---

### Track: Web Convergence

#### Value Score: 5/5 - Excellent

**Strengths:**
- Exceptional motion design content
- Shader introduction is unique and valuable
- Accessibility coverage is comprehensive
- Performance content is practical
- Portfolio/career module adds real value

**Gaps:**
- None significant

**Priority:** N/A

---

### Track: iOS Convergence

#### Value Score: 4/5 - Good

**Strengths:**
- SwiftUI animation coverage
- Accessibility integration

**Gaps:**
- Fewer lessons than web convergence
- Could expand on custom transitions

**Priority:** Medium

---

### Track: Android Convergence

#### Value Score: 4/5 - Good

**Strengths:**
- Compose animation coverage
- Accessibility integration

**Gaps:**
- Fewer lessons than web convergence
- Could expand on shared element transitions

**Priority:** Medium

---

## Required Fixes

### Fix 1: CSS British English to American English

**Scope:** All CSS code blocks in web track and convergence track

**Find and replace:**
| British (Wrong) | American (Correct) |
|-----------------|-------------------|
| `colour:` | `color:` |
| `background-colour:` | `background-color:` |
| `border-colour:` | `border-color:` |
| `text-colour:` | (CSS var name - evaluate case-by-case) |

**Files requiring changes:**
1. `/content/course/engineering-track/web/02-css-mastery/01-how-css-works.md`
2. `/content/course/engineering-track/web/02-css-mastery/02-selectors-deep-dive.md`
3. `/content/course/engineering-track/web/02-css-mastery/03-the-box-model.md`
4. `/content/course/engineering-track/web/02-css-mastery/07-custom-properties.md`
5. `/content/course/engineering-track/web/02-css-mastery/08-css-transitions.md`
6. `/content/course/engineering-track/web/02-css-mastery/08-transitions-and-animations.md`
7. `/content/course/engineering-track/web/02-css-mastery/08b-keyframe-animations.md`
8. `/content/course/engineering-track/web/04-building-components/02-building-a-button.md`
9. `/content/course/engineering-track/web/04-building-components/03-building-a-card.md`
10. `/content/course/engineering-track/web/04-building-components/05-building-a-form.md`
11. `/content/course/engineering-track/web/06-capstone/03-capstone-components.md`
12. `/content/course/convergence/web/01-motion-and-interaction/03-micro-interactions.md`
13. `/content/course/convergence/web/03-accessibility/05-color-and-contrast.md`
14. `/content/course/convergence/web/05-performance-and-polish/03-css-performance.md`
15. `/content/course/design-track/web/04-design-systems/02-tokens-and-variables.md`

**Note:** CSS custom property *names* (e.g., `--primary-colour`) are arbitrary strings and can use British spelling as a stylistic choice. However, for consistency with the actual CSS property names they represent, American spelling is recommended.

### Fix 2: Kotlin/Compose British English to American English

**Scope:** All Kotlin code blocks with Compose function parameters

**Find and replace in code blocks:**
| British (Wrong) | American (Correct) |
|-----------------|-------------------|
| `colour =` | `color =` |

**Files requiring changes:**
1. `/content/course/engineering-track/android/00-environment-setup/01-getting-started-with-android-studio.md`
2. `/content/course/engineering-track/android/02-compose-fundamentals/06-theming.md`
3. `/content/course/engineering-track/android/03-building-interfaces/01-building-a-button.md`
4. `/content/course/engineering-track/android/03-building-interfaces/02-building-a-card.md`
5. `/content/course/engineering-track/android/03-building-interfaces/03-building-a-list-item.md`
6. `/content/course/engineering-track/android/03-building-interfaces/05-custom-composables.md`

---

## Recommended Improvements

*These are suggestions, not required fixes.*

### High Priority

1. **Add version requirements** - Specify minimum versions (Node.js, Xcode, Android Studio, SDK levels) in environment setup lessons
2. **Expand iOS/Android convergence tracks** - Currently fewer lessons than web; could benefit from additional depth

### Medium Priority

3. **Add CSS Nesting syntax** - Now baseline 2024, worth covering
4. **Include Git workflow module** - Valuable for professional practice
5. **Add TypeScript introduction** - Increasingly standard in web development

### Low Priority

6. **SwiftData module** - Modern persistence for iOS
7. **Kotlin Multiplatform mention** - Growing in adoption
8. **Large screen/foldable design** - Increasingly relevant for Android

---

## Appendix: Research Sources

### Web
- MDN Web Docs: https://developer.mozilla.org/
- Can I Use: https://caniuse.com/
- web.dev: https://web.dev/
- CSS Baseline status: https://web.dev/baseline/

### iOS
- Apple Developer Documentation: https://developer.apple.com/documentation/
- Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
- SF Symbols: https://developer.apple.com/sf-symbols/

### Android
- Android Developers: https://developer.android.com/
- Material Design: https://m3.material.io/
- Jetpack Compose: https://developer.android.com/jetpack/compose

### Accessibility
- WCAG 2.2: https://www.w3.org/WAI/WCAG22/quickref/

### Design Systems
- W3C Design Tokens: https://design-tokens.github.io/community-group/format/

---

## Summary

| Category | Assessment |
|----------|------------|
| **Recency** | Excellent - Course is current with 2024/2025 technologies |
| **Accuracy** | Critical issues found - Code examples need American English |
| **Realism** | Good - Appropriate for target audience with room for complexity |
| **Value** | Excellent - Strong differentiation in design engineer niche |

**Overall Recommendation:** Fix critical code accuracy issues immediately. The course is otherwise well-positioned as a leading resource for design engineers.

---

*Report generated: January 2026*
