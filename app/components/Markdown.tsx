"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "./SyntaxHighlighter";
import { cn } from "@/lib/utils";

interface MarkdownProps {
  content: string;
  className?: string;
}

const Markdown: React.FC<MarkdownProps> = ({ content, ...props }) => {
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
    code: ({ inline, className, children, ...props }: any) => {
      const match = /language-(\w+)/.exec(className || "");
      const childRegex = String(children).replace(/\n$/, "");
      return !inline && match ? (
        <SyntaxHighlighter
          language={match[1]}
          code={childRegex}
          showCopyButton
        />
      ) : (
        <code
          className={cn(
            "w-max rounded border border-foreground-100 bg-foreground-50 p-1 font-mono text-sm font-normal text-inherit",
            className,
          )}
          {...props}
        >
          {children}
        </code>
      );
    },
  };

  // Rest of the code remains unchanged
  return (
    <ReactMarkdown
      components={components}
      {...props}
      className={cn(
        "prose prose-zinc text-pretty dark:prose-invert prose-h2:tracking-tight prose-li:list-disc prose-img:rounded-lg",
        props.className ? props.className : null,
      )}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
};
export default Markdown;
