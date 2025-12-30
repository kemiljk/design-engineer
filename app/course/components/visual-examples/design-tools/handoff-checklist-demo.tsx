"use client";

import React, { useState, useEffect } from "react";
import { Check, Download, Copy, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

const INITIAL_CHECKLIST: ChecklistSection[] = [
  {
    title: "Visual Design",
    items: [
      { id: "vd-1", label: "All components use defined styles", checked: false },
      { id: "vd-2", label: "Colours are from the palette", checked: false },
      { id: "vd-3", label: "Typography uses text styles", checked: false },
      { id: "vd-4", label: "Spacing is on the grid", checked: false },
    ],
  },
  {
    title: "Completeness",
    items: [
      { id: "cp-1", label: "All screens/states designed", checked: false },
      { id: "cp-2", label: "Hover states included", checked: false },
      { id: "cp-3", label: "Error states included", checked: false },
      { id: "cp-4", label: "Loading states included", checked: false },
      { id: "cp-5", label: "Empty states included", checked: false },
      { id: "cp-6", label: "Responsive breakpoints covered", checked: false },
    ],
  },
  {
    title: "Documentation",
    items: [
      { id: "dc-1", label: "Layers properly named", checked: false },
      { id: "dc-2", label: "File organised", checked: false },
      { id: "dc-3", label: "Edge cases noted", checked: false },
      { id: "dc-4", label: "Complex interactions documented", checked: false },
    ],
  },
  {
    title: "Assets",
    items: [
      { id: "as-1", label: "Icons exported (SVG)", checked: false },
      { id: "as-2", label: "Images exported (appropriate sizes)", checked: false },
      { id: "as-3", label: "Assets named consistently", checked: false },
    ],
  },
];

const STORAGE_KEY = "handoff-checklist-state";

export function HandoffChecklistDemo() {
  const [checklist, setChecklist] = useState<ChecklistSection[]>(INITIAL_CHECKLIST);
  const [projectName, setProjectName] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setChecklist(parsed.checklist || INITIAL_CHECKLIST);
        setProjectName(parsed.projectName || "");
      } catch {
        // Invalid JSON, use defaults
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ checklist, projectName }));
    }
  }, [checklist, projectName, isHydrated]);

  const toggleItem = (sectionIndex: number, itemIndex: number) => {
    setChecklist((prev) =>
      prev.map((section, si) =>
        si === sectionIndex
          ? {
              ...section,
              items: section.items.map((item, ii) =>
                ii === itemIndex ? { ...item, checked: !item.checked } : item
              ),
            }
          : section
      )
    );
  };

  const resetChecklist = () => {
    setChecklist(INITIAL_CHECKLIST);
    setProjectName("");
    toast.success("Checklist reset");
  };

  const totalItems = checklist.reduce((acc, s) => acc + s.items.length, 0);
  const checkedItems = checklist.reduce(
    (acc, s) => acc + s.items.filter((i) => i.checked).length,
    0
  );
  const progress = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;

  const generateMarkdown = () => {
    const date = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let md = `# Design Handoff Checklist\n\n`;
    if (projectName) {
      md += `**Project:** ${projectName}\n`;
    }
    md += `**Date:** ${date}\n`;
    md += `**Progress:** ${checkedItems}/${totalItems} (${Math.round(progress)}%)\n\n`;

    checklist.forEach((section) => {
      md += `## ${section.title}\n\n`;
      section.items.forEach((item) => {
        md += `- [${item.checked ? "x" : " "}] ${item.label}\n`;
      });
      md += "\n";
    });

    return md;
  };

  const generatePlainText = () => {
    const date = new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    let txt = `DESIGN HANDOFF CHECKLIST\n`;
    txt += `${"=".repeat(40)}\n\n`;
    if (projectName) {
      txt += `Project: ${projectName}\n`;
    }
    txt += `Date: ${date}\n`;
    txt += `Progress: ${checkedItems}/${totalItems} (${Math.round(progress)}%)\n\n`;

    checklist.forEach((section) => {
      txt += `${section.title.toUpperCase()}\n`;
      txt += `${"-".repeat(section.title.length)}\n`;
      section.items.forEach((item) => {
        txt += `[${item.checked ? "✓" : " "}] ${item.label}\n`;
      });
      txt += "\n";
    });

    return txt;
  };

  const generateJSON = () => {
    const date = new Date().toISOString();
    return JSON.stringify(
      {
        title: "Design Handoff Checklist",
        project: projectName || null,
        date,
        progress: {
          completed: checkedItems,
          total: totalItems,
          percentage: Math.round(progress),
        },
        sections: checklist.map((section) => ({
          title: section.title,
          items: section.items.map((item) => ({
            label: item.label,
            completed: item.checked,
          })),
        })),
      },
      null,
      2
    );
  };

  const copyToClipboard = (format: "markdown" | "text" | "json") => {
    let content: string;
    let formatName: string;

    switch (format) {
      case "markdown":
        content = generateMarkdown();
        formatName = "Markdown";
        break;
      case "text":
        content = generatePlainText();
        formatName = "Plain text";
        break;
      case "json":
        content = generateJSON();
        formatName = "JSON";
        break;
    }

    navigator.clipboard.writeText(content);
    toast.success(`${formatName} copied to clipboard`);
  };

  const downloadFile = (format: "markdown" | "text" | "json") => {
    let content: string;
    let filename: string;
    let mimeType: string;

    const projectSlug = projectName
      ? projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      : "handoff";

    switch (format) {
      case "markdown":
        content = generateMarkdown();
        filename = `${projectSlug}-checklist.md`;
        mimeType = "text/markdown";
        break;
      case "text":
        content = generatePlainText();
        filename = `${projectSlug}-checklist.txt`;
        mimeType = "text/plain";
        break;
      case "json":
        content = generateJSON();
        filename = `${projectSlug}-checklist.json`;
        mimeType = "application/json";
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${filename}`);
  };

  if (!isHydrated) {
    return (
      <figure className="not-prose my-8">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-48 rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-2 w-full rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 w-full rounded bg-neutral-100 dark:bg-neutral-800" />
              ))}
            </div>
          </div>
        </div>
      </figure>
    );
  }

  return (
    <figure className="not-prose my-8">
      <div className="rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        {/* Header */}
        <div className="border-b border-neutral-200 p-4 dark:border-neutral-800">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Design Handoff Checklist
              </h4>
              <p className="mt-1 text-sm text-neutral-500">
                Track your handoff readiness. Progress is saved automatically.
              </p>
            </div>
            <button
              onClick={resetChecklist}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>

          {/* Project name input */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Project name (optional)"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-swiss-red focus:outline-none focus:ring-1 focus:ring-swiss-red dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500"
            />
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-neutral-600 dark:text-neutral-400">
                Progress
              </span>
              <span className="font-mono text-neutral-500">
                {checkedItems}/{totalItems} ({Math.round(progress)}%)
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
              <div
                  className="h-full rounded-full bg-swiss-red transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Checklist sections */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {checklist.map((section, sectionIndex) => {
            const sectionChecked = section.items.filter((i) => i.checked).length;
            const sectionTotal = section.items.length;
            const sectionComplete = sectionChecked === sectionTotal;

            return (
              <div key={section.title} className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h5
                    className={cn(
                      "text-sm font-semibold",
                      sectionComplete
                        ? "text-swiss-red"
                        : "text-neutral-700 dark:text-neutral-300"
                    )}
                  >
                    {section.title}
                    {sectionComplete && (
                      <Check className="ml-1.5 inline-block h-4 w-4" />
                    )}
                  </h5>
                  <span className="text-xs text-neutral-400">
                    {sectionChecked}/{sectionTotal}
                  </span>
                </div>
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <label
                      key={item.id}
                      className="group flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                    >
                      <div
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center border-2 transition-all",
                          item.checked
                            ? "border-swiss-red bg-swiss-red"
                            : "border-neutral-300 bg-white group-hover:border-neutral-400 dark:border-neutral-600 dark:bg-neutral-800 dark:group-hover:border-neutral-500"
                        )}
                      >
                        {item.checked && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => toggleItem(sectionIndex, itemIndex)}
                        className="sr-only"
                      />
                      <span
                        className={cn(
                          "text-sm transition-colors",
                          item.checked
                            ? "text-neutral-400 line-through dark:text-neutral-500"
                            : "text-neutral-700 dark:text-neutral-300"
                        )}
                      >
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Export options */}
        <div className="border-t border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-800/50">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs font-medium text-neutral-500">Export:</span>
            
            <div className="flex gap-1">
              <button
                onClick={() => copyToClipboard("markdown")}
                className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                <Copy className="h-3 w-3" />
                Markdown
              </button>
              <button
                onClick={() => copyToClipboard("text")}
                className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                <Copy className="h-3 w-3" />
                Text
              </button>
              <button
                onClick={() => copyToClipboard("json")}
                className="flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                <Copy className="h-3 w-3" />
                JSON
              </button>
            </div>

            <div className="mx-2 h-4 w-px bg-neutral-300 dark:bg-neutral-600" />

            <div className="flex gap-1">
              <button
                onClick={() => downloadFile("markdown")}
                className="flex items-center gap-1.5 rounded-lg bg-swiss-red px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-swiss-red/90"
              >
                <Download className="h-3 w-3" />
                .md
              </button>
              <button
                onClick={() => downloadFile("text")}
                className="flex items-center gap-1.5 rounded-lg bg-swiss-red px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-swiss-red/90"
              >
                <Download className="h-3 w-3" />
                .txt
              </button>
              <button
                onClick={() => downloadFile("json")}
                className="flex items-center gap-1.5 rounded-lg bg-swiss-red px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-swiss-red/90"
              >
                <Download className="h-3 w-3" />
                .json
              </button>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}

