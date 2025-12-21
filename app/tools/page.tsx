import React from "react";
import { PageHeader } from "@/app/components/page-header";
import { Link } from "@heroui/link";
import { 
  Sparkles, 
  Activity, 
  Eye, 
  Type, 
  ArrowRight,
  Lock,
  Spline,
  Ratio
} from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export const metadata = {
  title: "Tools | Design Engineer",
  description: "A collection of tools to help you design and build better products.",
};

const TOOLS = [
  {
    title: "Task Builder",
    description: "Generate customised design engineering tasks and practice scenarios with AI.",
    href: "/tools/task-builder",
    icon: Sparkles,
    isGated: true,
  },
  {
    title: "Spring Physics",
    description: "Visualise and generate spring animations for Framer Motion, CSS, and SwiftUI.",
    href: "/tools/spring-physics",
    icon: Activity,
    isGated: false,
  },
  {
    title: "Accessibility Auditor",
    description: "AI-powered analysis of your components for accessibility and contrast issues.",
    href: "/tools/accessibility-auditor",
    icon: Eye,
    isGated: true,
  },
  {
    title: "Token Calculator",
    description: "Generate harmonious typography and spacing scales for your design system.",
    href: "/tools/token-calculator",
    icon: Type,
    isGated: false,
  },
  {
    title: "Easing Generator",
    description: "Create custom cubic-bezier curves for smooth CSS and Framer Motion transitions.",
    href: "/tools/easing-generator",
    icon: Spline,
    isGated: false,
  },
  {
    title: "Aspect Ratio",
    description: "Calculate dimensions and generate aspect-ratio CSS for responsive media.",
    href: "/tools/aspect-ratio",
    icon: Ratio,
    isGated: false,
  }
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Tools"
        description="Utilities and generators to supercharge your design engineering workflow."
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:border-neutral-300 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
            >
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-swiss-red text-white shadow-sm">
                  <tool.icon className="h-6 w-6" />
                </div>
                
                <h3 className="mb-2 text-xl font-bold text-neutral-900 dark:text-white">
                  {tool.title}
                </h3>
                
                <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
                  {tool.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800">
                <span className="text-sm font-medium text-neutral-900 group-hover:underline dark:text-white">
                  Open Tool
                </span>
                <div className="flex items-center gap-3">
                  {tool.isGated && (
                    <SignedOut>
                      <Lock className="h-4 w-4 text-neutral-400" />
                    </SignedOut>
                  )}
                  <ArrowRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-1 dark:text-neutral-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
