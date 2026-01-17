"use client";

import React from "react";
import { ExampleWrapper } from "../base/example-wrapper";
import { ArrowRight, Mail, Plus, Trash } from "iconoir-react";

// Reusable Button for these demos
function DemoButton({
  variant = "primary",
  children,
  icon: Icon,
}: {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
  icon?: React.ElementType;
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-sm focus:ring-blue-500",
    secondary:
      "bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50 shadow-sm focus:ring-neutral-200 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-700",
    ghost:
      "text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`}>
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </button>
  );
}

export function ButtonUsageDemo() {
  return (
    <ExampleWrapper
      title="Button Usage"
      description="Primary buttons for main actions, Secondary for alternatives."
    >
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Project Name
          </label>
          <input
            type="text"
            placeholder="My New Project"
            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800"
          />
        </div>
        <div className="mt-2 flex items-center justify-end gap-3">
          <DemoButton variant="secondary">Cancel</DemoButton>
          <DemoButton variant="primary">Create Project</DemoButton>
        </div>
      </div>
    </ExampleWrapper>
  );
}

export function ButtonPrimaryDemo() {
  return (
    <ExampleWrapper title="Primary Button" description="High emphasis for key actions.">
      <div className="flex justify-center p-8">
        <DemoButton variant="primary" icon={Plus}>
          Create New Item
        </DemoButton>
      </div>
    </ExampleWrapper>
  );
}

export function ButtonSecondaryDemo() {
  return (
    <ExampleWrapper title="Secondary Button" description="Medium emphasis for alternative actions.">
      <div className="flex justify-center p-8">
        <DemoButton variant="secondary" icon={Mail}>
          Send Email
        </DemoButton>
      </div>
    </ExampleWrapper>
  );
}

export function ButtonGhostDemo() {
  return (
    <ExampleWrapper title="Ghost Button" description="Low emphasis for subtle actions.">
      <div className="flex justify-center p-8">
        <DemoButton variant="ghost" icon={ArrowRight}>
          View Details
        </DemoButton>
      </div>
    </ExampleWrapper>
  );
}

export function ButtonAnatomyDemo() {
  return (
    <ExampleWrapper
      title="Button Anatomy"
      description="The structural components of a button."
    >
      <div className="flex flex-col items-center justify-center gap-8 p-8">
        <div className="relative">
          {/* The Button */}
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white shadow-sm">
            <Trash className="h-5 w-5" />
            <span className="font-medium">Delete</span>
          </button>

          {/* Annotations */}
          <div className="absolute -left-4 -top-8 flex flex-col items-center">
            <span className="mb-1 text-xs font-medium text-blue-500">Icon</span>
            <div className="h-8 w-px bg-blue-500/50"></div>
          </div>
          
           <div className="absolute left-1/2 -top-8 flex -translate-x-1/2 flex-col items-center">
            <span className="mb-1 text-xs font-medium text-blue-500">Label</span>
            <div className="h-8 w-px bg-blue-500/50"></div>
          </div>

          <div className="absolute -bottom-8 -right-4 flex flex-col items-center">
            <div className="h-8 w-px bg-neutral-400/50"></div>
            <span className="mt-1 text-xs font-medium text-neutral-500">Container</span>
          </div>
          
           {/* Container Bracket */}
           <div className="absolute -bottom-2 left-0 right-0 h-4 border-b border-l border-r border-neutral-400/30"></div>
        </div>
      </div>
    </ExampleWrapper>
  );
}
