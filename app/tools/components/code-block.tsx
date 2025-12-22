"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

type CodeBlockProps = {
  label: string;
  code: string;
  language?: string;
};

export function CodeBlock({ label, code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-2 dark:border-neutral-800">
        <span className="text-xs font-medium text-neutral-500">{label}</span>
        <button
          onClick={handleCopy}
          className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-3 sm:p-4">
        <pre className="whitespace-pre-wrap break-all font-mono text-[10px] text-neutral-600 dark:text-neutral-400 sm:whitespace-pre sm:break-normal sm:text-xs">
          {code}
        </pre>
      </div>
    </div>
  );
}
