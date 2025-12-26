---
title: "Capstone Project"
description: "Build a polished, portfolio-ready Android experience that demonstrates your animation, prototyping, and accessibility skills"
---

# Convergence Android Capstone: Polished Android Experience

Build a portfolio-ready Android app or feature that demonstrates mastery of motion design, accessibility, and the complete design-to-code workflow.

## Quick Summary

- **Time:** 12-16 hours
- **Deliverables:** Polished Android feature/app with animations, accessibility, case study
- **Skills:** Compose animation, Material motion, TalkBack, performance optimisation

## What You'll Create

A polished Android experience that showcases:

- **Fluid Animations** - Meaningful motion that enhances usability
- **Full Accessibility** - TalkBack support and inclusive design
- **Performance Excellence** - 60fps animations and optimised rendering
- **Design-Code Convergence** - Seamless translation from design to implementation

---

## The Brief

Choose one project that demonstrates convergence skills:

### Option A: Onboarding Experience

A 3-5 screen onboarding flow with:
- Page transitions and parallax effects
- Animated illustrations or Lottie animations
- Skip/progress indicators with motion
- Accessibility announcements for each step

### Option B: Interactive Dashboard

A data dashboard featuring:
- Animated charts and data visualisations
- Pull-to-refresh with custom animation
- Staggered list animations
- Screen reader-friendly data presentation

### Option C: Media Player

A music or podcast player with:
- Expandable mini-player animation
- Waveform or progress visualisations
- Gesture-driven controls
- Full media accessibility support

### Option D: Social Feed

A content feed featuring:
- Shared element transitions to detail views
- Like/reaction animations
- Skeleton loading states
- Accessible content descriptions

---

## Phase 1: Planning & Audit (2-3 hours)

### 1.1 Project Selection

Choose your project and define scope:

```kotlin
// Document your project scope
/*
Project: [Your Choice]
Core Feature: [Main interaction]
Animation Goals:
  - [Animation 1]
  - [Animation 2]
  - [Animation 3]
Accessibility Goals:
  - [A11y goal 1]
  - [A11y goal 2]
*/
```

### 1.2 Motion Audit

Plan your animation strategy:

- **Entrances:** How elements appear on screen
- **Transitions:** How screens connect
- **Feedback:** How interactions respond
- **State Changes:** How UI updates communicate

### 1.3 Accessibility Audit

Define your accessibility approach:

- Content descriptions for all interactive elements
- Focus order and navigation patterns
- Touch target sizes (minimum 48dp)
- Colour contrast and text scaling

---

## Phase 2: Animation Implementation (4-5 hours)

### 2.1 Core Animations

Implement your primary animations:

```kotlin
@Composable
fun AnimatedFeature() {
    var isExpanded by remember { mutableStateOf(false) }
    
    val animatedHeight by animateDpAsState(
        targetValue = if (isExpanded) 300.dp else 80.dp,
        animationSpec = spring(
            dampingRatio = Spring.DampingRatioMediumBouncy,
            stiffness = Spring.StiffnessLow
        ),
        label = "height"
    )
    
    val animatedAlpha by animateFloatAsState(
        targetValue = if (isExpanded) 1f else 0f,
        animationSpec = tween(durationMillis = 300),
        label = "alpha"
    )
    
    // Implementation
}
```

### 2.2 Transition Animations

Create smooth screen transitions:

```kotlin
// Shared element transitions
val sharedTransitionScope = rememberSharedTransitionScope()

AnimatedContent(
    targetState = currentScreen,
    transitionSpec = {
        fadeIn(tween(300)) togetherWith fadeOut(tween(300))
    }
) { screen ->
    when (screen) {
        Screen.List -> ListScreen(
            onItemClick = { /* transition */ }
        )
        Screen.Detail -> DetailScreen()
    }
}
```

### 2.3 Gesture Animations

Implement gesture-driven motion:

```kotlin
@Composable
fun SwipeableCard(
    onDismiss: () -> Unit
) {
    var offsetX by remember { mutableFloatStateOf(0f) }
    val dismissThreshold = 200f
    
    Box(
        modifier = Modifier
            .offset { IntOffset(offsetX.roundToInt(), 0) }
            .pointerInput(Unit) {
                detectHorizontalDragGestures(
                    onDragEnd = {
                        if (abs(offsetX) > dismissThreshold) {
                            onDismiss()
                        } else {
                            offsetX = 0f
                        }
                    },
                    onHorizontalDrag = { _, dragAmount ->
                        offsetX += dragAmount
                    }
                )
            }
    ) {
        // Card content
    }
}
```

---

## Phase 3: Accessibility Implementation (3-4 hours)

### 3.1 Semantic Structure

Add proper semantics:

```kotlin
@Composable
fun AccessibleCard(
    title: String,
    description: String,
    onAction: () -> Unit
) {
    Card(
        modifier = Modifier
            .semantics(mergeDescendants = true) {
                contentDescription = "$title. $description"
                role = Role.Button
            }
            .clickable(
                onClickLabel = "Open $title"
            ) { onAction() }
    ) {
        // Visual content
    }
}
```

### 3.2 Focus Management

Implement logical focus order:

```kotlin
@Composable
fun AccessibleForm() {
    val (emailFocus, passwordFocus, submitFocus) = remember {
        FocusRequester.createRefs()
    }
    
    Column {
        TextField(
            modifier = Modifier
                .focusRequester(emailFocus)
                .focusProperties { next = passwordFocus },
            // ...
        )
        
        TextField(
            modifier = Modifier
                .focusRequester(passwordFocus)
                .focusProperties { next = submitFocus },
            // ...
        )
        
        Button(
            modifier = Modifier.focusRequester(submitFocus),
            onClick = { /* submit */ }
        ) {
            Text("Submit")
        }
    }
}
```

### 3.3 Live Regions

Announce dynamic content:

```kotlin
@Composable
fun LiveUpdateSection(
    updateText: String
) {
    Text(
        text = updateText,
        modifier = Modifier.semantics {
            liveRegion = LiveRegionMode.Polite
        }
    )
}

// For urgent updates
modifier = Modifier.semantics {
    liveRegion = LiveRegionMode.Assertive
}
```

### 3.4 Custom Actions

Add accessibility actions:

```kotlin
@Composable
fun ActionableItem(
    onDelete: () -> Unit,
    onArchive: () -> Unit
) {
    Row(
        modifier = Modifier.semantics {
            customActions = listOf(
                CustomAccessibilityAction("Delete") {
                    onDelete()
                    true
                },
                CustomAccessibilityAction("Archive") {
                    onArchive()
                    true
                }
            )
        }
    ) {
        // Content
    }
}
```

---

## Phase 4: Polish & Details (2-3 hours)

### 4.1 Performance Optimization

Ensure smooth 60fps animations:

```kotlin
// Use remember for expensive calculations
val animatedColor by remember(progress) {
    derivedStateOf {
        lerp(startColor, endColor, progress)
    }
}

// Use graphicsLayer for GPU-accelerated transforms
Modifier.graphicsLayer {
    translationX = offsetX
    alpha = alphaValue
    // GPU-accelerated, no recomposition
}
```

### 4.2 Haptic Feedback

Add tactile responses:

```kotlin
@Composable
fun HapticButton(onClick: () -> Unit) {
    val haptic = LocalHapticFeedback.current
    
    Button(
        onClick = {
            haptic.performHapticFeedback(HapticFeedbackType.LongPress)
            onClick()
        }
    ) {
        Text("Action")
    }
}
```

### 4.3 Edge Cases

Handle all states gracefully:

- Empty states with helpful messaging
- Error states with recovery options
- Loading states with skeleton screens
- Offline states with cached data

### 4.4 Testing

Test thoroughly:

```kotlin
@Test
fun testAccessibility() {
    composeTestRule.setContent {
        YourScreen()
    }
    
    // Verify content descriptions
    composeTestRule
        .onNodeWithContentDescription("Submit form")
        .assertExists()
    
    // Verify focus order
    composeTestRule
        .onAllNodes(hasClickAction())
        .assertCountEquals(expectedCount)
}
```

---

## Phase 5: Documentation & Delivery (1-2 hours)

### 5.1 Code Documentation

Document key implementations:

```kotlin
/**
 * Animated card component with swipe-to-dismiss gesture.
 *
 * Animation Specs:
 * - Drag: Direct manipulation (1:1 tracking)
 * - Release: Spring animation (damping: 0.8, stiffness: 400)
 * - Dismiss threshold: 200dp
 *
 * Accessibility:
 * - Swipe gesture has "Dismiss" custom action alternative
 * - Announces "Item dismissed" on completion
 *
 * @param onDismiss Called when card is swiped past threshold
 */
@Composable
fun SwipeableCard(onDismiss: () -> Unit)
```

### 5.2 Case Study

Create a project case study:

1. **Problem Statement** - What challenge did you solve?
2. **Design Decisions** - Why these animations and interactions?
3. **Technical Approach** - How did you implement key features?
4. **Accessibility Strategy** - How did you ensure inclusivity?
5. **Results** - Demo video and performance metrics

### 5.3 Repository

Prepare your GitHub repository:

- Clear README with setup instructions
- Screen recordings or GIFs of animations
- Architecture documentation
- APK download link (optional)

---

## Submission Checklist

### Code Quality
- [ ] Clean, well-organised Kotlin code
- [ ] Proper Compose state management
- [ ] No unnecessary recompositions
- [ ] Consistent naming conventions

### Animation
- [ ] At least 3 distinct animation types
- [ ] Consistent motion language throughout
- [ ] 60fps performance verified
- [ ] Animations respect reduced motion setting

### Accessibility
- [ ] Full TalkBack support
- [ ] Logical focus order
- [ ] Adequate touch targets (48dp minimum)
- [ ] Colour contrast meets WCAG AA
- [ ] Dynamic type support

### Documentation
- [ ] README with project overview
- [ ] Setup and build instructions
- [ ] Demo video or GIF
- [ ] Case study document

---

## Evaluation Criteria

### Animation Quality (30%)
- Purposeful motion that enhances UX
- Smooth performance (60fps)
- Appropriate timing and easing
- Cohesive motion design language

### Accessibility (30%)
- Complete TalkBack navigation
- Proper semantic structure
- Alternative interaction methods
- Inclusive design decisions

### Code Quality (25%)
- Clean Compose patterns
- Efficient state management
- Performance optimisation
- Proper architecture

### Polish & Documentation (15%)
- Attention to detail
- Edge case handling
- Clear documentation
- Portfolio presentation

---

## Examples for Inspiration

### Onboarding Animation
- Parallax backgrounds with foreground elements
- Character or illustration animations per page
- Progress indicator with morphing shapes
- Smooth gesture-driven page transitions

### Dashboard Animation
- Charts that animate on data load
- Staggered card entrance animations
- Pull-to-refresh with custom spring physics
- Number counters with easing

### Media Player Animation
- Mini to full player expansion
- Album art with parallax depth effect
- Waveform visualisation that responds to audio
- Gesture-driven seek with haptic ticks

---

## Tips for Success

1. **Start Simple** - Get basic functionality working before adding animation polish
2. **Profile Early** - Use Android Studio Profiler to catch performance issues
3. **Test on Device** - Animations feel different on real hardware
4. **Use TalkBack Throughout** - Don't save accessibility testing for the end
5. **Record Everything** - Capture animations for your portfolio
6. **Respect User Preferences** - Honor reduced motion and font size settings

---

## What's Next

Congratulations on completing the Convergence track! You now have the skills to:

- Create fluid, meaningful animations in Compose
- Build fully accessible Android experiences
- Optimize for performance and polish
- Document and present your work professionally

Your capstone project demonstrates design engineering excellence: the ability to bridge design vision with technical implementation while ensuring accessibility for all users.

Consider sharing your project:
- Android Dev community forums
- GitHub with detailed documentation
- LinkedIn with a case study post
- Design engineering portfolios

Keep building, keep learning, and keep pushing the boundaries of what's possible on Android!
