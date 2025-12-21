// Shared course utilities - safe to import from client components

// Course structure constants - these reflect the actual content
export const COURSE_STRUCTURE = {
  introduction: {
    title: "Introduction",
    lessons: 4, // 00-introduction
    free: true,
  },
  design: {
    web: {
      title: "Design (Web)",
      lessons: 24,
      freeLessons: 1, // Only first lesson free
      modules: [
        { id: "01-foundations", title: "Foundations of Visual Design", lessons: 4 },
        { id: "02-visual-design", title: "Visual Design Deep Dive", lessons: 5 },
        { id: "03-design-tools", title: "Design Tools Mastery", lessons: 5 },
        { id: "04-design-systems", title: "Design Systems", lessons: 5 },
        { id: "05-ux-principles", title: "UX Principles", lessons: 5 },
      ],
    },
    ios: {
      title: "Design (iOS)",
      lessons: 17,
      freeLessons: 1,
      modules: [
        { id: "01-hig-fundamentals", title: "HIG Fundamentals", lessons: 4 },
        { id: "02-ios-design-patterns", title: "iOS Design Patterns", lessons: 4 },
        { id: "03-designing-for-ios", title: "Designing for iOS", lessons: 4 },
        { id: "04-advanced-design", title: "Advanced Design", lessons: 5 },
      ],
    },
    android: {
      title: "Design (Android)",
      lessons: 17,
      freeLessons: 1,
      modules: [
        { id: "01-material-design", title: "Material Design", lessons: 4 },
        { id: "02-android-design-patterns", title: "Android Design Patterns", lessons: 4 },
        { id: "03-designing-for-android", title: "Designing for Android", lessons: 4 },
        { id: "04-advanced-design", title: "Advanced Design", lessons: 5 },
      ],
    },
  },
  engineering: {
    web: {
      title: "Engineering (Web)",
      lessons: 33,
      freeLessons: 1,
      modules: [
        { id: "01-html-fundamentals", title: "HTML Fundamentals", lessons: 6 },
        { id: "02-css-mastery", title: "CSS Mastery", lessons: 8 },
        { id: "03-javascript-essentials", title: "JavaScript Essentials", lessons: 7 },
        { id: "04-building-components", title: "Building Components", lessons: 6 },
        { id: "05-design-systems-in-code", title: "Design Systems in Code", lessons: 5 },
      ],
    },
    ios: {
      title: "Engineering (iOS)",
      lessons: 17,
      freeLessons: 1,
      modules: [
        { id: "01-swift-basics", title: "Swift Basics", lessons: 6 },
        { id: "02-swiftui-fundamentals", title: "SwiftUI Fundamentals", lessons: 6 },
        { id: "03-building-interfaces", title: "Building Interfaces", lessons: 5 },
      ],
    },
    android: {
      title: "Engineering (Android)",
      lessons: 17,
      freeLessons: 1,
      modules: [
        { id: "01-kotlin-basics", title: "Kotlin Basics", lessons: 6 },
        { id: "02-compose-fundamentals", title: "Compose Fundamentals", lessons: 6 },
        { id: "03-building-interfaces", title: "Building Interfaces", lessons: 5 },
      ],
    },
  },
  convergence: {
    web: {
      title: "Convergence (Web)",
      lessons: 27,
      modules: [
        { id: "01-motion-and-interaction", title: "Motion & Interaction", lessons: 6, free: false },
        { id: "02-prototyping", title: "Prototyping", lessons: 5, free: false },
        { id: "03-accessibility", title: "Accessibility", lessons: 6, free: false },
        { id: "04-performance-and-polish", title: "Performance & Polish", lessons: 5, free: false },
        { id: "05-workflow-and-portfolio", title: "Workflow & Portfolio", lessons: 5, free: false },
      ],
    },
    ios: {
      title: "Convergence (iOS)",
      lessons: 5,
      modules: [
        { id: "01-ios-motion-and-animation", title: "iOS Motion & Animation", lessons: 2, free: false },
        { id: "02-prototyping-with-swiftui", title: "Prototyping with SwiftUI", lessons: 1, free: false },
        { id: "03-accessibility-and-polish", title: "Accessibility & Polish", lessons: 2, free: false },
      ],
    },
    android: {
      title: "Convergence (Android)",
      lessons: 5,
      modules: [
        { id: "01-android-motion-and-animation", title: "Android Motion & Animation", lessons: 2, free: false },
        { id: "02-prototyping-with-compose", title: "Prototyping with Compose", lessons: 1, free: false },
        { id: "03-accessibility-and-polish", title: "Accessibility & Polish", lessons: 2, free: false },
      ],
    },
  },
} as const;

// Helper to get estimated reading time (assume 8 min per lesson average)
export function getEstimatedDuration(lessonCount: number): string {
  const totalMinutes = lessonCount * 8;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`;
  } else if (hours > 0) {
    return `${hours}h`;
  }
  return `${minutes}m`;
}

// Format module name for display
export function formatModuleName(moduleName: string): string {
  return moduleName
    .replace(/^\d+-/, '')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
