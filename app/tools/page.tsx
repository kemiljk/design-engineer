import React from "react";
import Link from "next/link";
import { PageHeader } from "@/app/components/page-header";
import { 
  Sparkles, 
  Activity, 
  Eye, 
  Type, 
  ArrowRight,
  Lock,
  Spline,
  Ratio,
  Layers,
  Palette,
  Code2,
  Blend,
  Pointer,
  AppWindow,
  Square,
  SunMoon,
  LucideIcon
} from "lucide-react";
import { SignedOut } from "@clerk/nextjs";

export const metadata = {
  title: "Tools | Design Engineer",
  description: "A collection of tools to help you design and build better products.",
};

type Tool = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  isGated: boolean;
};

type ToolSection = {
  title: string;
  description: string;
  tools: Tool[];
};

const TOOL_SECTIONS: ToolSection[] = [
  {
    title: "Animation & Motion",
    description: "Create smooth, physics-based animations for web and mobile.",
    tools: [
      {
        title: "Spring Physics",
        description: "Visualise and generate spring animations for Motion, CSS, SwiftUI, and Android.",
        href: "/tools/spring-physics",
        icon: Activity,
        isGated: false,
      },
      {
        title: "Easing Generator",
        description: "Create custom cubic-bezier curves for smooth CSS and Motion transitions.",
        href: "/tools/easing-generator",
        icon: Spline,
        isGated: false,
      },
    ],
  },
  {
    title: "Visual Design",
    description: "Tools for colours, shadows, gradients, and visual properties.",
    tools: [
      {
        title: "Gradient Generator",
        description: "Create linear, radial, and conic gradients with export for CSS, Tailwind, SwiftUI, and Android.",
        href: "/tools/gradient-generator",
        icon: Blend,
        isGated: false,
      },
      {
        title: "Shadow Generator",
        description: "Design shadows and export for CSS, Tailwind, SwiftUI, Android, and React Native.",
        href: "/tools/shadow-generator",
        icon: Layers,
        isGated: false,
      },
      {
        title: "Colour Converter",
        description: "Convert colours between HEX, RGB, HSL, OKLCH, SwiftUI, and Android formats.",
        href: "/tools/colour-converter",
        icon: Palette,
        isGated: false,
      },
      {
        title: "Aspect Ratio",
        description: "Calculate dimensions and generate aspect-ratio code for CSS, Tailwind, SwiftUI, and Android.",
        href: "/tools/aspect-ratio",
        icon: Ratio,
        isGated: false,
      },
      {
        title: "Border Comparison",
        description: "Compare grey borders vs semi-transparent borders on colourful backgrounds.",
        href: "/tools/border-comparison",
        icon: Square,
        isGated: false,
      },
    ],
  },
  {
    title: "Design Systems",
    description: "Build consistent, scalable design foundations.",
    tools: [
      {
        title: "Spectrum Generator",
        description: "Generate harmonious colour scales from any colour using perceptually uniform OKLCH.",
        href: "/tools/tint-shade-generator",
        icon: SunMoon,
        isGated: false,
      },
      {
        title: "Token Calculator",
        description: "Generate harmonious typography and spacing scales for Tailwind v4, CSS, or SCSS.",
        href: "/tools/token-calculator",
        icon: Type,
        isGated: false,
      },
    ],
  },
  {
    title: "Mobile & Accessibility",
    description: "Tools for building accessible, platform-native experiences.",
    tools: [
      {
        title: "Touch Target Calculator",
        description: "Validate touch target sizes against iOS, Android, and WCAG accessibility guidelines.",
        href: "/tools/touch-target",
        icon: Pointer,
        isGated: false,
      },
      {
        title: "App Icon Sizes",
        description: "Reference guide for all required app icon dimensions across iOS, Android, macOS, and web.",
        href: "/tools/icon-generator",
        icon: AppWindow,
        isGated: false,
      },
    ],
  },
  {
    title: "Code & Development",
    description: "Convert and validate your code across frameworks.",
    tools: [
      {
        title: "Framework Converter",
        description: "Convert component syntax between React, Vue, Svelte, Astro, and Solid.",
        href: "/tools/framework-converter",
        icon: Code2,
        isGated: false,
      },
    ],
  },
  {
    title: "AI-Powered",
    description: "Intelligent tools to accelerate your workflow.",
    tools: [
      {
        title: "Task Builder",
        description: "Generate customised design engineering tasks and practice scenarios with AI.",
        href: "/tools/task-builder",
        icon: Sparkles,
        isGated: true,
      },
      {
        title: "Accessibility Auditor",
        description: "AI-powered analysis of your components for accessibility and contrast issues.",
        href: "/tools/accessibility-auditor",
        icon: Eye,
        isGated: true,
      },
    ],
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Tools"
        description="Utilities and generators to supercharge your design engineering workflow."
      />

      <div className="container mx-auto px-4 py-12">
        <div className="space-y-16">
          {TOOL_SECTIONS.map((section, idx) => (
            <section
              key={section.title}
              className="motion-enter"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {section.title}
                </h2>
                <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                  {section.description}
                </p>
              </div>

              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {section.tools.map((tool) => (
                  <Link
                    key={tool.title}
                    href={tool.href}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200 bg-white p-4 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md hover:ring-1 hover:ring-swiss-red/10 hover:ring-inset dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700 motion-reduce:transform-none motion-reduce:transition-none sm:p-6"
                  >
                    <div>
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-swiss-red text-white shadow-sm transition-colors sm:h-12 sm:w-12">
                        <tool.icon className="h-5 w-5 transition-transform duration-200 ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:scale-[1.02] motion-reduce:transition-none sm:h-6 sm:w-6" />
                      </div>
                      
                      <h3 className="mb-2 text-lg font-bold text-neutral-900 dark:text-white sm:text-xl">
                        {tool.title}
                      </h3>
                      
                      <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400 sm:mb-6">
                        {tool.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-neutral-100 pt-4 dark:border-neutral-800">
                      <span className="text-sm font-medium text-neutral-900 group-hover:underline dark:text-white">
                        Open Tool
                      </span>
                      <div className="flex items-center gap-2">
                        {tool.isGated && (
                          <SignedOut>
                            <Lock className="h-4 w-4 text-neutral-400" />
                          </SignedOut>
                        )}
                        <ArrowRight className="h-4 w-4 text-neutral-400 transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1 motion-reduce:transition-none dark:text-neutral-500" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
