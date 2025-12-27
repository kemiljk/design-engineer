import React from "react";
import { PageHeader } from "@/app/components/page-header";
import AccessibilityAuditor from "./auditor";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowRight, Lock } from "lucide-react";
import { Button } from "@/app/components/ui";

export const metadata = {
  title: "Accessibility Auditor | Design Engineer",
  description: "AI-powered accessibility and contrast checker for your components.",
};

export default function AccessibilityAuditorPage() {
  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Accessibility Auditor"
        description="Paste your code to get an instant AI analysis of accessibility, semantics, and contrast."
      />
      <div className="container-page py-12">
        <SignedIn>
          <AccessibilityAuditor />
        </SignedIn>
        
        <SignedOut>
          <div className="mx-auto flex max-w-md flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-800">
              <Lock className="h-8 w-8 text-neutral-500" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Sign in to Access</h2>
            <p className="mb-8 text-neutral-600 dark:text-neutral-400">
              The Accessibility Auditor uses AI to analyze your code. Please sign in or create an account to use this tool.
            </p>
            <div className="flex gap-4">
              <Button href="/sign-in" variant="outline">
                Sign In
              </Button>
              <Button href="/sign-up" className="gap-2">
                Create Account
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SignedOut>
      </div>
    </main>
  );
}
