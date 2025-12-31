"use client";

import React, { useState } from "react";
import { readStreamableValue } from '@ai-sdk/rsc';
import { auditAccessibility } from "./actions";
import { RefreshDouble, WarningCircle, CheckCircle } from "iconoir-react";
import ReactMarkdown from "react-markdown";

export default function AccessibilityAuditor() {
  const [inputCode, setInputCode] = useState("");
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    setIsLoading(true);
    setOutput("");

    try {
      const { output: stream } = await auditAccessibility(inputCode);
      
      for await (const text of readStreamableValue(stream)) {
        setOutput(text as string);
      }
    } catch (error) {
      console.error(error);
      setOutput("An error occurred while analyzing the code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-4 text-lg font-bold">Input Code</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative">
              <textarea
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Paste your React component or HTML here..."
                className="min-h-[400px] w-full resize-y rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-mono text-sm focus:border-swiss-red focus:outline-none dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !inputCode.trim()}
              className="flex items-center justify-center gap-2 rounded-lg bg-swiss-red px-6 py-3 font-medium text-white transition-colors hover:bg-red-600 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshDouble className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Audit Accessibility
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Output Section */}
      <div className="space-y-4">
        <div className="min-h-[400px] rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="mb-4 text-lg font-bold">Audit Report</h2>
          {output ? (
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{output}</ReactMarkdown>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center text-neutral-500">
              <WarningCircle className="mb-2 h-8 w-8 opacity-20" />
              <p>Paste your code and run the audit to see the results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
