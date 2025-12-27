"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "./SyntaxHighlighter";
import { cn } from "@/lib/utils";
import { Callout } from "@/app/components/ui";

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
    pre: ({ children }: any) => {
      // In react-markdown v9, fenced code blocks are wrapped in <pre><code>
      // Extract the code element and render with SyntaxHighlighter
      const codeElement = React.Children.toArray(children).find(
        (child: any) =>
          child?.type === "code" || child?.props?.node?.tagName === "code",
      ) as
        | React.ReactElement<{ className?: string; children?: React.ReactNode }>
        | undefined;

      if (codeElement?.props) {
        const className = codeElement.props.className;
        const codeChildren = codeElement.props.children;
        const match = /language-(\w+)/.exec(className || "");
        const code = String(codeChildren).replace(/\n$/, "");

        return (
          <SyntaxHighlighter
            language={match ? match[1] : "plain"}
            code={code}
            showCopyButton
          />
        );
      }

      // Fallback for edge cases
      return <pre>{children}</pre>;
    },
    code: ({ className, children, ...props }: any) => {
      // In react-markdown v9, this component only receives inline code
      // (fenced code blocks are handled by the pre component above)
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
      return (
        <Callout as="blockquote" className="not-prose my-8">
          <div className="prose prose-neutral text-pretty dark:prose-invert">
            {blockquote.children}
          </div>
        </Callout>
      );
    },
  };

  // Rest of the code remains unchanged
  return (
    <ReactMarkdown
      components={components}
      {...props}
      className={cn(
        "prose prose-neutral text-pretty dark:prose-invert prose-headings:font-sans prose-headings:font-bold prose-h1:tracking-tighter prose-h2:tracking-tight prose-h3:tracking-tight prose-li:list-disc prose-img:rounded-none",
        props.className ? props.className : null,
      )}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
};
export default Markdown;
