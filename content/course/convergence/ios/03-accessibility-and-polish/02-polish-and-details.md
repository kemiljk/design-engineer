# Polish and Details

> **Quick Summary:** Polish transforms good apps into great ones. Small details in haptics, sounds, and micro-interactions create delightful experiences.

## What You'll Learn

- Haptic feedback
- Sound design
- Micro-interactions
- Attention to detail

## Haptic Feedback

### UIKit Haptics
```swift
// Impact
let impact = UIImpactFeedbackGenerator(style: .medium)
impact.impactOccurred()

// Selection
let selection = UISelectionFeedbackGenerator()
selection.selectionChanged()

// Notification
let notification = UINotificationFeedbackGenerator()
notification.notificationOccurred(.success)
```

### SwiftUI Sensory Feedback (iOS 17+)
```swift
Button("Tap") { }
    .sensoryFeedback(.impact, trigger: tapCount)

Toggle("Setting", isOn: $isOn)
    .sensoryFeedback(.selection, trigger: isOn)
```

### When to Use Haptics
- Button presses
- Toggle changes
- Successful actions
- Errors
- Reaching list bounds

## Sound Design

```swift
import AVFoundation

func playSound() {
    AudioServicesPlaySystemSound(1104)  // System sound
}

// Custom sound
var player: AVAudioPlayer?

func playCustomSound() {
    guard let url = Bundle.main.url(forResource: "tap", withExtension: "wav") else { return }
    player = try? AVAudioPlayer(contentsOf: url)
    player?.play()
}
```

Use sound sparingly—most interactions shouldn't make noise.

## Micro-interactions

### Button Press
```swift
struct PressableButton: View {
    @State private var isPressed = false
    let action: () -> Void
    
    var body: some View {
        Text("Press Me")
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .clipShape(RoundedRectangle(cornerRadius: 10))
            .scaleEffect(isPressed ? 0.95 : 1)
            .animation(.spring(response: 0.2), value: isPressed)
            .simultaneousGesture(
                DragGesture(minimumDistance: 0)
                    .onChanged { _ in isPressed = true }
                    .onEnded { _ in
                        isPressed = false
                        action()
                    }
            )
    }
}
```

### Success Animation
```swift
struct SuccessCheckmark: View {
    @State private var animate = false
    
    var body: some View {
        Image(systemName: "checkmark.circle.fill")
            .font(.system(size: 80))
            .foregroundColor(.green)
            .scaleEffect(animate ? 1 : 0)
            .opacity(animate ? 1 : 0)
            .onAppear {
                withAnimation(.spring(response: 0.4, dampingFraction: 0.6)) {
                    animate = true
                }
            }
    }
}
```

## Polish Checklist

### Visual
- [ ] Consistent spacing
- [ ] Proper alignment
- [ ] Dark mode looks good
- [ ] Safe area respected
- [ ] Loading states smooth

### Interaction
- [ ] All buttons have press feedback
- [ ] Appropriate haptics
- [ ] Animations feel natural
- [ ] No jarring transitions

### Edge Cases
- [ ] Empty states handled
- [ ] Error states clear
- [ ] Long text handled
- [ ] Offline mode considered

## Try It Yourself

### Exercise 1: Like Button

Create a like button with:
- Heart fill animation
- Scale bounce
- Haptic feedback
- Particle burst (advanced)

### Exercise 2: Pull to Refresh

Build custom pull-to-refresh:
- Loading indicator
- Haptic at threshold
- Smooth animation

## Test Your Understanding

<!-- exercise: multiple-choice
{
  "id": "ios-polish-quiz",
  "type": "multiple-choice",
  "title": "Polish and Details",
  "description": "Test your understanding of iOS app polish.",
  "difficulty": "easy",
  "question": "What is haptic feedback and when should you use it?",
  "options": [
    {
      "id": "a",
      "text": "Sound effects for button taps",
      "isCorrect": false,
      "explanation": "Haptics are tactile (vibration), not audio."
    },
    {
      "id": "b",
      "text": "Subtle vibrations that confirm actions and create physical connection to UI interactions",
      "isCorrect": true,
      "explanation": "Correct! Use UIImpactFeedbackGenerator for impacts, UINotificationFeedbackGenerator for success/warning/error, and UISelectionFeedbackGenerator for selections. Sparingly—overuse reduces impact."
    },
    {
      "id": "c",
      "text": "Only for games and AR apps",
      "isCorrect": false,
      "explanation": "Haptics are used throughout iOS system apps and should be used in regular apps too."
    },
    {
      "id": "d",
      "text": "Screen flashes to confirm actions",
      "isCorrect": false,
      "explanation": "That would be visual feedback—haptics are tactile."
    }
  ]
}
-->

## Key Takeaways

- Haptics add tactile dimension
- Use sound very sparingly
- Micro-interactions show craft
- Polish is the accumulation of details
- Test on real devices

## Congratulations!

You've completed the iOS Convergence Track!

**What's Next?**

→ Return to the [Course Overview](/course) to explore other tracks

→ Start building your portfolio with what you've learned

→ Share your work and continue practising
