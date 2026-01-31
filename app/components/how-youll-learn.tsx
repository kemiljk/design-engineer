import { AnimatedSection } from "./animated-section";
import { AnimatedGrid } from "./animated-grid";

const methods = [
  {
    title: "Principles first, then platform.",
    description:
      "Each concept is taught from fundamentals before showing platform-specific implementation. Understand the why, then learn the how.",
  },
  {
    title: "Build real things.",
    description:
      "Every module includes hands-on exercises — not just passive video watching. You'll ship components, screens, and interactions you can use in your own projects.",
  },
  {
    title: "Design and code together.",
    description:
      "See how design decisions translate directly to implementation, and vice versa. No handoff gap — the same person learns both sides.",
  },
];

export function HowYoullLearnSection() {
  return (
    <AnimatedSection
      as="div"
      className="w-full border-b border-neutral-200 bg-neutral-50 py-16 md:py-24 dark:border-neutral-800 dark:bg-neutral-900/50"
    >
      <div className="container-page">
        <div className="mb-10">
          <p className="heading-eyebrow mb-2">Methodology</p>
          <h2 className="heading-section">How You&apos;ll Learn</h2>
        </div>

        <AnimatedGrid className="grid gap-6 md:grid-cols-3">
          {methods.map((method) => (
            <div
              key={method.title}
              className="h-full border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <h3 className="heading-card mb-3">{method.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {method.description}
              </p>
            </div>
          ))}
        </AnimatedGrid>
      </div>
    </AnimatedSection>
  );
}
