import React from "react";
import Link from "next/link";
import { PageHeader } from "@/app/components/page-header";
import { 
  Sparks as Sparkles, 
  Activity, 
  Eye, 
  Text as Type, 
  NavArrowRight as ArrowRight,
  Lock,
  CurveArray as Spline,
  Frame as Ratio,
  Combine as Layers,
  Palette,
  Code as Code2,
  Intersect as Blend,
  CursorPointer as Pointer,
  AppWindow,
  Square,
  SunLight as SunMoon,
  Union as Combine,
  Label as Tags,
  Square3dCornerToCorner as SquareStack,
} from "iconoir-react";
import type { ComponentType, SVGProps } from "react";
type IconType = ComponentType<SVGProps<SVGSVGElement>>;
import { SignedOut } from "@clerk/nextjs";

export const metadata = {
  title: "Tools | Design Engineer",
  description: "A collection of tools to help you design and build better products.",
};

type Tool = {
  title: string;
  description: string;
  href: string;
  icon: IconType;
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
      {
        title: "Blend Mode Explorer",
        description: "Learn how blend modes work and experiment with stacking them for beautiful effects.",
        href: "/tools/blend-mode-explorer",
        icon: Combine,
        isGated: false,
      },
      {
        title: "Corner Radius Calculator",
        description: "Calculate harmonious nested corner radii for optically perfect UI components.",
        href: "/tools/corner-radius",
        icon: SquareStack,
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
      {
        title: "Token Naming",
        description: "Build consistent semantic token names with auto-generated variants and states.",
        href: "/tools/token-naming",
        icon: Tags,
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

      <div className="container-page py-12">
        <div className="space-y-16">
          {TOOL_SECTIONS.map((section, idx) => (
            <section
              key={section.title}
              className="motion-enter"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <div className="mb-8">
                <h2 className="heading-section">{section.title}</h2>
                <p className="mt-2 text-neutral-500 dark:text-neutral-400">
                  {section.description}
                </p>
              </div>

              <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {section.tools.map((tool) => (
                  <Link
                    key={tool.title}
                    href={tool.href}
                    className="group relative flex h-full flex-col justify-between overflow-hidden border border-neutral-200 bg-white p-5 transition-colors hover:border-swiss-red dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-swiss-red md:p-6"
                  >
                    <div>
                      <div className="mb-4 flex h-10 w-10 items-center justify-center bg-neutral-100 transition-colors group-hover:bg-swiss-red dark:bg-neutral-800 md:h-12 md:w-12">
                        <tool.icon className="h-5 w-5 text-neutral-600 transition-colors group-hover:text-white dark:text-neutral-400 md:h-6 md:w-6" />
                      </div>
                      
                      <h3 className="heading-card mb-2">{tool.title}</h3>
                      
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">
                        {tool.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-2 border-t border-neutral-100 pt-4 dark:border-neutral-800">
                      {tool.isGated && (
                        <SignedOut>
                          <Lock className="h-4 w-4 text-neutral-400" />
                        </SignedOut>
                      )}
                      <ArrowRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-swiss-red dark:text-neutral-500" />
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
