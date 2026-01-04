# Course Evaluation Report

**Course:** Design Engineer Course (d×e)
**Evaluation Date:** January 2026
**Evaluator:** Automated Course Evaluation Agent
**Status:** ✅ All critical issues resolved

---

## Executive Summary

### Overall Assessment

The Design Engineer Course is a **comprehensive, well-structured curriculum** that successfully bridges the gap between design and engineering across web, iOS, and Android platforms. The course demonstrates strong pedagogical design, authentic practitioner voice, and covers modern frameworks and tooling.

### ✅ Issues Resolved

All critical accuracy issues have been fixed:

1. **CSS code** - All `colour`, `background-colour`, `border-colour` instances in code blocks have been changed to American English (`color`, `background-color`, `border-color`).

2. **Kotlin/Compose code** - All `colour =` parameter usages have been changed to `color =`.

3. **Swift/SwiftUI code** - All `.shadow(colour:` and property names have been updated to use `color`.

4. **JavaScript DOM code** - All `element.style.colour` instances fixed to `element.style.color`.

### Improvements Made

1. ✅ Added version requirements tables to all environment setup lessons
2. ✅ Added CSS Nesting syntax coverage (Baseline 2024 feature)
3. ✅ **Added iOS 26 Liquid Glass coverage** - Comprehensive design and SwiftUI API documentation
4. ✅ **Updated iOS version requirements** to Xcode 26 / iOS SDK 26

### Remaining Recommendations

1. Add more real-world project complexity in capstone exercises
2. Include CI/CD and deployment workflows in engineering tracks
3. Consider adding TypeScript introduction to web track
4. Expand iOS/Android convergence tracks with additional content

---

## Recency Findings

### Web Track

| Technology | Course Status | Current Reality | Assessment |
|------------|---------------|-----------------|------------|
| CSS Container Queries | ✅ Covered | Widely supported (2023+) | **Current** |
| CSS `:has()` selector | ✅ Covered | Baseline 2023 | **Current** |
| CSS Nesting | ✅ Now covered | Baseline 2024 | **Current** |
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
| Xcode | ✅ Xcode 26 | Xcode 26 (2025) | **Current** |
| SF Symbols | ✅ SF Symbols 6 mentioned | SF Symbols 6 (2024) | **Current** |
| SwiftData | Not covered | Available iOS 17+ | Minor gap |
| **Liquid Glass** | ✅ Comprehensive coverage | iOS 26 (2025) | **Excellent** |
| `.glassEffect()` modifier | ✅ Full API coverage | iOS 26+ | **Current** |

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

#### Value Score: 5/5 - Excellent

**Strengths:**
- Modern SwiftUI patterns (`@Observable`, `#Preview`)
- Clear state management explanation
- Appropriate scope for designers learning to code
- ✅ **Liquid Glass SwiftUI APIs** now covered with dedicated lesson
- ✅ **iOS 26 version requirements** throughout

**Gaps:**
- No UIKit coverage (acceptable for modern focus)
- Limited networking/persistence content
- No SwiftData coverage

**Competitor comparison:** Comparable to Stanford CS193p in technical depth, better for design-focused learners. **Unique Liquid Glass coverage**.

**Priority:** Low

---

### Track: iOS Design

#### Value Score: 4.5/5 - Excellent

**Strengths:**
- Solid HIG coverage
- SF Symbols integration
- Platform-specific design patterns
- ✅ **Liquid Glass design principles** now covered comprehensively

**Gaps:**
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

## ✅ Completed Fixes

### Fix 1: CSS British English to American English - COMPLETED

All CSS code blocks in web track and convergence track have been updated:
- `colour:` → `color:`
- `background-colour:` → `background-color:`
- `border-colour:` → `border-color:`

**Files fixed:** 15+ files across web engineering, convergence, and design tracks.

### Fix 2: Kotlin/Compose British English to American English - COMPLETED

All Kotlin/Compose code blocks have been updated:
- `colour =` → `color =`
- `colours =` → `colors =`

**Files fixed:** 6 files across Android engineering track.

### Fix 3: Swift/SwiftUI British English to American English - COMPLETED

All Swift code blocks have been updated:
- `.shadow(colour:` → `.shadow(color:`
- Property names updated for consistency

**Files fixed:** 4 files across iOS engineering track.

### Fix 4: JavaScript DOM British English to American English - COMPLETED

All JavaScript DOM style manipulation code has been updated:
- `element.style.colour` → `element.style.color`

**Files fixed:** 2 files in JavaScript essentials module.

### Enhancement 1: Version Requirements Added - COMPLETED

Added version requirements tables to all platform environment setup lessons:
- Web: Node.js 22.x LTS, npm 10.x, Git 2.30+
- iOS: Xcode 16.x, Swift 6.0+, iOS SDK 18.0+
- Android: Android Studio latest, Kotlin 2.0+, Compose BOM latest

### Enhancement 2: CSS Nesting Coverage Added - COMPLETED

Added comprehensive CSS Nesting syntax coverage to the Selectors Deep Dive lesson:
- Native nesting with `&` selector
- Nested descendants, children, and pseudo-classes
- Media query nesting
- Best practices for nesting depth

### Enhancement 3: iOS 26 Liquid Glass Coverage - COMPLETED

Added comprehensive Liquid Glass coverage across iOS tracks:

**iOS Design Track (`01-hig-fundamentals/01-ios-design-philosophy.md`):**
- Liquid Glass design principles
- Material characteristics (blur, reflect, react, morph)
- Where Liquid Glass appears automatically
- Adoption guidelines for existing apps

**iOS Engineering Track (`02-swiftui-fundamentals/07-liquid-glass.md`):**
- New dedicated lesson covering:
  - `.glassEffect()` modifier basics
  - Custom shapes (`.rect(cornerRadius:)`, `.circle`)
  - `Glass` structure configuration (`.tint()`, `.interactive()`)
  - `GlassEffectContainer` for combining effects
  - `.glassEffectUnion()` for unified glass regions
  - `.glassEffectID()` for morphing transitions
  - `GlassEffectTransition` types
  - Best practices and accessibility considerations

**Updated Files:**
- `00-environment-setup/01-getting-started-with-xcode.md` - Xcode 26, iOS 26 version requirements
- `02-swiftui-fundamentals/06-styling-and-theming.md` - References Liquid Glass and `.glass` button style
- `04-capstone/06-capstone-finalisation.md` - Updated version requirements

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
- Liquid Glass Overview: https://developer.apple.com/documentation/technologyoverviews/liquid-glass
- Adopting Liquid Glass: https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass
- Applying Liquid Glass to Custom Views: https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views

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
| **Accuracy** | ✅ Excellent - All code issues resolved |
| **Realism** | Good - Appropriate for target audience with room for complexity |
| **Value** | Excellent - Strong differentiation in design engineer niche |

**Status:** All critical issues have been resolved. The course is well-positioned as a leading resource for design engineers.

### Changes Made in This Evaluation

1. ✅ Fixed 50+ instances of British English in code (CSS, Kotlin, Swift, JavaScript)
2. ✅ Added version requirements to all environment setup lessons
3. ✅ Added CSS Nesting syntax coverage (Baseline 2024)
4. ✅ **Added iOS 26 Liquid Glass coverage:**
   - Design principles in iOS Design Philosophy lesson
   - New SwiftUI Liquid Glass lesson with full API documentation
   - Updated version requirements to Xcode 26 / iOS SDK 26
   - Added `.glass` button style reference in theming lesson
5. ✅ Updated evaluation report to reflect completed fixes

---

*Report generated: January 2026*
*Last updated: After iOS 26 Liquid Glass enhancements*
