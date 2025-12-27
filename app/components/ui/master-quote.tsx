"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MasterQuoteProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Recursively extracts text content from React children,
 * handling nested elements like <p><em>text</em> — author</p>
 */
function extractTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";

  if (Array.isArray(node)) {
    return node.map(extractTextContent).join("");
  }

  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return extractTextContent(props.children);
  }

  return "";
}

/**
 * Parses quote content to extract the quote text and attribution.
 * Handles markdown-rendered format where *"Quote"* becomes <em>"Quote"</em>
 * Expected rendered structure: <p><em>"Quote text."</em> — Attribution</p>
 */
function parseQuoteContent(children: React.ReactNode): {
  quoteText: string;
  attribution: string;
} | null {
  // Extract all text content recursively
  const text = extractTextContent(children).trim();

  // Match pattern: quote in quotes (with or without surrounding punctuation), em dash/en dash/hyphen, attribution
  // Handles: "Quote text." — Author
  const match = text.match(
    /^"(.+?)"\s*[—–-]\s*(.+)$/s
  );

  if (match) {
    return {
      quoteText: match[1].trim(),
      attribution: match[2].trim(),
    };
  }

  return null;
}

export function MasterQuote({ children, className }: MasterQuoteProps) {
  const parsed = parseQuoteContent(children);

  // If we can parse it as a quote with attribution, render Swiss style
  if (parsed) {
    return (
      <figure
        className={cn(
          "not-prose relative my-12 border-l-4 border-swiss-red pl-6 md:pl-8",
          className
        )}
      >
        {/* Quote text - large, bold, Swiss typography */}
        <blockquote className="relative">
          {/* Opening quotation mark as decorative element */}
          <span
            className="pointer-events-none absolute -left-2 -top-4 font-serif text-6xl leading-none text-neutral-300 select-none md:-left-4 md:text-8xl dark:text-neutral-700"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <p className="relative z-10 text-xl font-bold leading-snug tracking-tight text-neutral-900 md:text-2xl lg:text-3xl dark:text-white">
            {parsed.quoteText}
          </p>
        </blockquote>

        {/* Attribution - Swiss style with em dash */}
        <figcaption className="mt-4 flex items-center gap-3">
          <span
            className="h-px w-6 bg-swiss-red md:w-8"
            aria-hidden="true"
          />
          <cite className="not-italic text-sm font-medium tracking-wide text-neutral-600 md:text-base dark:text-neutral-400">
            {parsed.attribution}
          </cite>
        </figcaption>
      </figure>
    );
  }

  // Fallback to simple blockquote styling for non-attributed quotes
  return (
    <blockquote
      className={cn(
        "not-prose my-8 border-l-4 border-swiss-red bg-neutral-50 p-6 dark:bg-neutral-900",
        className
      )}
    >
      <div className="prose prose-neutral text-pretty dark:prose-invert">
        {children}
      </div>
    </blockquote>
  );
}

