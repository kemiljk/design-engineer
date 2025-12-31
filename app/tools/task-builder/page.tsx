import React from "react";
import { PageHeader } from "@/app/components/page-header";
import TaskBuilder from "./builder";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { NavArrowRight as ArrowRight, Sparks as Sparkles, Compass as Target, Combine as Layers, Flash as Zap, CheckCircle as CheckCircle2 } from "iconoir-react";
import { Button } from "@/app/components/ui";
import { getTaskBuilderSuggestions } from "@/lib/cosmic";

export const metadata = {
  title: "Task Builder | Design Engineer",
  description: "Generate customized design engineering take-home tasks with AI.",
};

export default async function TaskBuilderPage() {
  const suggestions = await getTaskBuilderSuggestions();

  const features = [
    {
      icon: Target,
      title: "Tailored Challenges",
      description:
        "Tasks generated based on your specific requirements, skill level, and areas of focus.",
    },
    {
      icon: Layers,
      title: "Real-World Scenarios",
      description:
        "Practice with tasks that mirror actual design engineering challenges at top companies.",
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description:
        "Get detailed task briefs in seconds, complete with requirements and evaluation criteria.",
    },
  ];

  const useCases = [
    "Prepare for design engineering interviews",
    "Practice implementing complex UI patterns",
    "Build your portfolio with guided projects",
    "Train your team with custom challenges",
    "Explore new frameworks and techniques",
    "Hiring managers creating bespoke job posts",
  ];

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Task Builder"
        description="AI-powered tool to generate practice scenarios and interview tasks."
      />

      <div className="container-page py-12">
        <SignedIn>
          <div className="mx-auto max-w-3xl">
            <TaskBuilder suggestions={suggestions} />
          </div>
        </SignedIn>

        <SignedOut>
          {/* Hero Tool Card */}
          <div className="mx-auto max-w-4xl">
            <div className="border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
              {/* Tool Header */}
              <div className="border-b border-neutral-200 p-8 dark:border-neutral-800">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-gradient-to-br from-swiss-red to-red-600">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Task Builder</h2>
                    <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                      Generate customised design engineering tasks on demand
                    </p>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid gap-px bg-neutral-200 dark:bg-neutral-800 md:grid-cols-3">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="bg-white p-6 dark:bg-neutral-900"
                  >
                    <feature.icon className="mb-3 h-5 w-5 text-swiss-red" />
                    <h3 className="mb-1 font-bold">{feature.title}</h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Use Cases */}
              <div className="border-t border-neutral-200 p-8 dark:border-neutral-800">
                <h3 className="mb-4 font-bold">Perfect for:</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {useCases.map((useCase) => (
                    <div key={useCase} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-swiss-red" />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {useCase}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="border-t border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-950">
                <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
                  <div>
                    <p className="font-bold">Ready to start practicing?</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Create a free account to access the Task Builder.
                    </p>
                  </div>
                  <Button
                    href="/sign-up"
                    className="shrink-0 gap-2"
                  >
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Example Output Preview */}
            <div className="mt-8">
              <p className="mb-4 text-center text-sm text-neutral-500">
                Example generated task
              </p>
              <div className="border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                <div className="p-6">
                  <p className="text-neutral-600 dark:text-neutral-400 italic">
                    (Example task preview hidden for brevity, sign in to see full power)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SignedOut>
      </div>
    </main>
  );
}
