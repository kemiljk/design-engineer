import {
  DesignPencil as PencilIcon,
  Code as CodeIcon,
  RefreshDouble as SwitchIcon,
} from "iconoir-react";
import { AnimatedSection } from "./animated-section";
import { AnimatedGrid } from "./animated-grid";

const audiences = [
  {
    icon: PencilIcon,
    title: "Designers",
    description:
      "You want to go beyond Vibe Coding. You're tired of handing off specs and watching them get lost in translation. Learn to build what you design properly.",
  },
  {
    icon: CodeIcon,
    title: "Engineers",
    description:
      "You want to develop design taste. You can build anything, but you want your work to look and feel intentional. Learn the visual fundamentals that elevate your craft.",
  },
  {
    icon: SwitchIcon,
    title: "Career Switchers",
    description:
      "You're looking to break into Design Engineering roles. Whether you're coming from pure design or pure engineering, this course bridges the gap from day one.",
  },
];

export function WhoThisIsForSection() {
  return (
    <AnimatedSection
      as="div"
      variant="secondary"
      className="w-full border-b border-neutral-200 py-16 md:py-24 dark:border-neutral-800"
    >
      <div className="container-page">
        <div className="mb-10">
          <p className="heading-eyebrow mb-2">Made for you</p>
          <h2 className="heading-section">Who This Is For</h2>
        </div>

        <AnimatedGrid className="grid gap-6 md:grid-cols-3">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="group hover:border-swiss-red dark:hover:border-swiss-red border border-neutral-200 bg-white p-6 transition-colors dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="group-hover:bg-swiss-red mb-4 flex h-10 w-10 items-center justify-center bg-neutral-100 transition-colors dark:bg-neutral-800">
                <audience.icon className="h-5 w-5 text-neutral-600 transition-colors group-hover:text-white dark:text-neutral-400" />
              </div>
              <h3 className="heading-card mb-2">{audience.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                {audience.description}
              </p>
            </div>
          ))}
        </AnimatedGrid>
      </div>
    </AnimatedSection>
  );
}
