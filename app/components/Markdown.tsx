"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "./SyntaxHighlighter";
import { cn } from "@/lib/utils";
import { MasterQuote, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/app/components/ui";

interface MarkdownProps {
  content: string;
  className?: string;
}

function normalizeMarkdown(content: string): string {
  // Remove invisible Unicode characters that can break code fences
  let normalized = content.replace(/[\u200B\u200C\u200D\u2060\uFEFF\u00AD]/g, "");
  
  // Ensure blank line between consecutive code fences
  // Split by lines and check for closing fence immediately followed by opening fence
  const lines = normalized.split('\n');
  const result: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    result.push(lines[i]);
    
    // Check if current line is a closing code fence (``` with optional language)
    const isClosingFence = /^```\s*$/.test(lines[i]);
    
    // Check if next line is an opening code fence (``` with optional language)
    if (isClosingFence && i + 1 < lines.length && /^```/.test(lines[i + 1])) {
      // Insert blank line between them
      result.push('');
    }
  }
  
  return result.join('\n');
}

function extractCodeContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (node === null || node === undefined) return "";

  if (Array.isArray(node)) {
    return node.map(extractCodeContent).join("");
  }

  if (React.isValidElement(node)) {
    const props = node.props as any;
    // Check for direct value/data props first
    if (props.value !== undefined) return String(props.value);
    if (props.data !== undefined) return String(props.data);
    // Then check children
    if (props.children !== undefined) {
      return extractCodeContent(props.children);
    }
  }

  return String(node);
}

const Markdown: React.FC<MarkdownProps> = ({ content, ...props }) => {
  // Normalize markdown content before rendering (fixes back-to-back code fences)
  const normalizedContent = normalizeMarkdown(content);
  
  const components = {
    a: (
      a: React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >,
    ) => {
      return (
        <a
          href={a.href}
          rel="noopener noreferrer"
          target="_blank"
          className="my-0 inline-flex items-center"
        >
          {a.children}
        </a>
      );
    },
    pre: ({ children }: any) => {
      // react-markdown wraps code blocks in <pre><code>
      // Handle both direct code element and nested structure
      let codeElement: React.ReactElement<{ className?: string; children?: React.ReactNode }> | undefined;
      
      const childrenArray = React.Children.toArray(children);
      
      // First, try to find a code element directly
      codeElement = childrenArray.find(
        (child: any) => {
          if (!child || typeof child !== "object") return false;
          // Check if it's a code element by type
          if (child.type === "code") return true;
          // Or by className containing language-
          if (typeof child.props?.className === "string" && child.props.className.includes("language-")) return true;
          return false;
        }
      ) as React.ReactElement<{ className?: string; children?: React.ReactNode }> | undefined;

      // If not found, check if children itself is a code element
      if (!codeElement && childrenArray.length === 1 && (childrenArray[0] as any)?.type === "code") {
        codeElement = childrenArray[0] as React.ReactElement<{ className?: string; children?: React.ReactNode }>;
      }

      if (codeElement?.props) {
        const props = codeElement.props as { className?: string; children?: React.ReactNode };
        const className = String(props.className || "");
        const match = /language-(\w+)/.exec(className);
        
        // Extract code content
        const code = extractCodeContent(props.children).replace(/\n$/, "");

        if (code) {
          return (
            <SyntaxHighlighter
              language={match ? match[1] : "plain"}
              code={code}
              showCopyButton
            />
          );
        }
      }

      // Fallback: render as-is
      return <pre>{children}</pre>;
    },
    code: ({ className, children, ...props }: any) => {
      // Inline code only (fenced blocks handled in pre component)
      return (
        <code
          className={cn(
            "rounded-none border border-neutral-200 bg-neutral-100 px-1 py-px font-mono text-[0.9em] font-normal text-inherit dark:border-neutral-700 dark:bg-neutral-800",
            className,
          )}
          {...props}
        >
          {children}
        </code>
      );
    },
    blockquote: (blockquote: React.HTMLAttributes<HTMLElement>) => {
      return <MasterQuote>{blockquote.children}</MasterQuote>;
    },
    table: ({ children }: React.HTMLAttributes<HTMLTableElement>) => (
      <Table>{children}</Table>
    ),
    thead: ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <TableHeader>{children}</TableHeader>
    ),
    tbody: ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <TableBody>{children}</TableBody>
    ),
    tr: ({ children }: React.HTMLAttributes<HTMLTableRowElement>) => (
      <TableRow>{children}</TableRow>
    ),
    th: ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
      <TableHead {...props}>{children}</TableHead>
    ),
    td: ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
      <TableCell {...props}>{children}</TableCell>
    ),
  };

  return (
    <div
      className={cn(
        "prose prose-neutral max-w-none text-pretty dark:prose-invert prose-headings:font-sans prose-headings:font-bold prose-h1:text-4xl prose-h1:leading-[0.95] prose-h1:tracking-[-0.035em] prose-h2:text-3xl prose-h2:leading-[1] prose-h2:tracking-[-0.025em] prose-h3:text-2xl prose-h3:leading-[1.05] prose-h3:tracking-[-0.02em] prose-h4:text-xl prose-h4:leading-[1.1] prose-p:leading-[1.55] prose-p:tracking-[-0.01em] prose-li:list-disc prose-img:rounded-none",
        props.className,
      )}
    >
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {normalizedContent}
      </ReactMarkdown>
    </div>
  );
};
export default Markdown;
