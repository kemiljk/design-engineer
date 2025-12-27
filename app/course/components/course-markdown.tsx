"use client";

import React, { useMemo, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "@/app/components/SyntaxHighlighter";
import { cn } from "@/lib/utils";
import { MasterQuote } from "@/app/components/ui";
import {
  SummaryCard,
  ObjectivesCard,
  ExerciseCard,
  TakeawaysCard,
  SectionWrapper,
} from "./lesson-layout";
import { IllustrationRenderer } from "./illustrations/illustration-renderer";
import { ExerciseRenderer } from "./exercises";
import { VisualExampleRenderer } from "./visual-examples";

interface CourseMarkdownProps {
  content: string;
  className?: string;
  onSectionsDetected?: (sections: { id: string; label: string }[]) => void;
}

interface ParsedSection {
  type:
    | "summary"
    | "objectives"
    | "exercise"
    | "takeaways"
    | "content"
    | "illustration"
    | "visual-example"
    | "exercise-interactive";
  content: string;
  id?: string;
  label?: string;
}

function extractSection(content: string, headerPattern: RegExp): { match: string; content: string } | null {
  const match = content.match(headerPattern);
  if (!match) return null;
  
  const startIndex = match.index!;
  const afterHeader = startIndex + match[0].length;
  
  // Find the next ## heading or end of string
  const remainingContent = content.slice(afterHeader);
  const nextHeadingMatch = remainingContent.match(/\n##\s/);
  
  const sectionContent = nextHeadingMatch 
    ? remainingContent.slice(0, nextHeadingMatch.index)
    : remainingContent;
  
  return {
    match: content.slice(startIndex, afterHeader + (nextHeadingMatch ? nextHeadingMatch.index! : remainingContent.length)),
    content: sectionContent.trim()
  };
}

function parseContent(content: string): ParsedSection[] {
  const sections: ParsedSection[] = [];
  let remaining = content;

  // Extract Quick Summary (blockquote format)
  const summaryMatch = remaining.match(/^>\s*\*\*Quick Summary[:\*]*\*?\*?\s*([\s\S]*?)(?=\n\n|\n##|$)/m);
  if (summaryMatch) {
    const summaryContent = summaryMatch[1]
      .split("\n")
      .map((line) => line.replace(/^>\s*/, ""))
      .join("\n")
      .trim();
    sections.push({
      type: "summary",
      content: summaryContent,
      id: "summary",
      label: "Summary",
    });
    remaining = remaining.replace(summaryMatch[0], "");
  }

  // Extract What You'll Learn
  const objectivesResult = extractSection(remaining, /##\s*What You['']ll Learn\s*/);
  if (objectivesResult) {
    sections.push({
      type: "objectives",
      content: objectivesResult.content,
      id: "objectives",
      label: "What You'll Learn",
    });
    remaining = remaining.replace(objectivesResult.match, "");
  }

  // Extract Try It Yourself
  const exerciseResult = extractSection(remaining, /##\s*Try It Yourself\s*/);
  if (exerciseResult) {
    sections.push({
      type: "exercise",
      content: exerciseResult.content,
      id: "exercise",
      label: "Try It Yourself",
    });
    remaining = remaining.replace(exerciseResult.match, "");
  }

  // Extract Key Takeaways
  const takeawaysResult = extractSection(remaining, /##\s*Key Takeaways\s*/);
  if (takeawaysResult) {
    sections.push({
      type: "takeaways",
      content: takeawaysResult.content,
      id: "takeaways",
      label: "Key Takeaways",
    });
    remaining = remaining.replace(takeawaysResult.match, "");
  }

  // Process remaining content for illustrations, visual examples, exercises, and h2 sections
  const illustrationRegex = /<!--\s*illustration:\s*([a-z0-9-]+)\s*-->/g;
  const visualExampleRegex = /<!--\s*visual-example:\s*([a-z0-9-]+)\s*-->/g;
  const exerciseRegex = /<!--\s*exercise:\s*([a-z-]+)\n([\s\S]*?)-->/g;
  let lastIndex = 0;
  let match;
  const contentParts: ParsedSection[] = [];

  // Combine all special blocks (illustrations, visual examples, and exercises) with their positions
  const specialBlocks: { type: 'illustration' | 'visual-example' | 'exercise-interactive'; index: number; length: number; content: string; exerciseType?: string }[] = [];

  while ((match = illustrationRegex.exec(remaining)) !== null) {
    specialBlocks.push({
      type: 'illustration',
      index: match.index,
      length: match[0].length,
      content: match[1],
    });
  }

  while ((match = visualExampleRegex.exec(remaining)) !== null) {
    specialBlocks.push({
      type: 'visual-example',
      index: match.index,
      length: match[0].length,
      content: match[1],
    });
  }

  while ((match = exerciseRegex.exec(remaining)) !== null) {
    specialBlocks.push({
      type: 'exercise-interactive',
      index: match.index,
      length: match[0].length,
      content: match[2].trim(),
      exerciseType: match[1],
    });
  }

  // Sort by position
  specialBlocks.sort((a, b) => a.index - b.index);

  for (const block of specialBlocks) {
    if (block.index > lastIndex) {
      const textBefore = remaining.slice(lastIndex, block.index).trim();
      if (textBefore) {
        const headingMatch = textBefore.match(/^##\s+(.+)$/m);
        const id = headingMatch 
          ? headingMatch[1].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          : undefined;
        const label = headingMatch ? headingMatch[1] : undefined;
        contentParts.push({ type: "content", content: textBefore, id, label });
      }
    }
    
    if (block.type === 'illustration') {
      contentParts.push({ type: "illustration", content: block.content });
    } else if (block.type === 'visual-example') {
      contentParts.push({ type: "visual-example", content: block.content });
    } else {
      contentParts.push({
        type: "exercise-interactive",
        content: block.content,
        id: `exercise-${block.exerciseType}`,
        label: "Exercise",
      });
    }
    
    lastIndex = block.index + block.length;
  }

  if (lastIndex < remaining.length) {
    const textAfter = remaining.slice(lastIndex).trim();
    if (textAfter) {
      // Find all h2 headings in the remaining content to create sections
      const h2Pattern = /^##\s+(.+)$/gm;
      let h2Match;
      const headings: { title: string; index: number }[] = [];
      
      while ((h2Match = h2Pattern.exec(textAfter)) !== null) {
        headings.push({ title: h2Match[1], index: h2Match.index });
      }
      
      if (headings.length > 0) {
        // Create sections for each h2
        for (let i = 0; i < headings.length; i++) {
          const start = headings[i].index;
          const end = i < headings.length - 1 ? headings[i + 1].index : textAfter.length;
          const sectionContent = textAfter.slice(start, end).trim();
          const id = headings[i].title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          
          contentParts.push({
            type: "content",
            content: sectionContent,
            id,
            label: headings[i].title,
          });
        }
        
        // Add any content before the first heading
        if (headings[0].index > 0) {
          const beforeFirstHeading = textAfter.slice(0, headings[0].index).trim();
          if (beforeFirstHeading) {
            contentParts.unshift({
              type: "content",
              content: beforeFirstHeading,
              id: "intro",
              label: "Introduction",
            });
          }
        }
      } else {
        // No h2 headings, just add as single content block
        contentParts.push({
          type: "content",
          content: textAfter,
          id: "main",
          label: "Content",
        });
      }
    }
  }

  // Assemble final ordered sections
  const orderedSections: ParsedSection[] = [];

  const summarySection = sections.find((s) => s.type === "summary");
  if (summarySection) orderedSections.push(summarySection);

  const objectivesSection = sections.find((s) => s.type === "objectives");
  if (objectivesSection) orderedSections.push(objectivesSection);

  orderedSections.push(...contentParts);

  const exerciseSection = sections.find((s) => s.type === "exercise");
  if (exerciseSection) orderedSections.push(exerciseSection);

  const takeawaysSection = sections.find((s) => s.type === "takeaways");
  if (takeawaysSection) orderedSections.push(takeawaysSection);

  return orderedSections;
}

function extractListItems(content: string): string[] {
  const items: string[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/^[-*]\s+(.+)$/);
    if (match) {
      items.push(match[1].trim());
    }
  }
  return items;
}

const CourseMarkdown: React.FC<CourseMarkdownProps> = ({
  content,
  className,
  onSectionsDetected,
}) => {
  const parsedSections = useMemo(() => parseContent(content), [content]);
  const hasCalledCallback = useRef(false);

  useEffect(() => {
    if (onSectionsDetected && !hasCalledCallback.current) {
      hasCalledCallback.current = true;
      const detectedSections = parsedSections
        .filter((s) => s.id && s.label)
        .map((s) => ({
          id: s.id!,
          label: s.label!,
        }));
      onSectionsDetected(detectedSections);
    }
  }, [onSectionsDetected, parsedSections]);

  const components = useMemo(() => ({
    a: (
      a: React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >
    ) => {
      const href = a.href || "";
      
      // Transform relative .md links to proper course routes
      // e.g., "./02-what-is-design-engineering.md" → "02-what-is-design-engineering"
      if (href.startsWith("./") && href.endsWith(".md")) {
        const lessonSlug = href.slice(2, -3); // Remove "./" and ".md"
        return (
          <a
            href={lessonSlug}
            className="my-0 inline-flex items-center text-swiss-red hover:underline"
          >
            {a.children}
          </a>
        );
      }
      
      // External links open in new tab
      return (
        <a
          href={href}
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
        (child: any) => child?.type === "code" || child?.props?.node?.tagName === "code"
      ) as React.ReactElement<{ className?: string; children?: React.ReactNode }> | undefined;

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
            className
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
  }), []);

  return (
    <div className={cn("course-content", className)}>
      {parsedSections.map((section, index) => {
        switch (section.type) {
          case "summary":
            return (
              <SectionWrapper key={index} id={section.id}>
                <SummaryCard>
                  <ReactMarkdown
                    components={components}
                    remarkPlugins={[remarkGfm]}
                  >
                    {section.content}
                  </ReactMarkdown>
                </SummaryCard>
              </SectionWrapper>
            );

          case "objectives":
            return (
              <SectionWrapper key={index} id={section.id}>
                <ObjectivesCard objectives={extractListItems(section.content)} />
              </SectionWrapper>
            );

          case "exercise":
            return (
              <SectionWrapper key={index} id={section.id}>
                <ExerciseCard>
                  <ReactMarkdown
                    components={components}
                    remarkPlugins={[remarkGfm]}
                  >
                    {section.content}
                  </ReactMarkdown>
                </ExerciseCard>
              </SectionWrapper>
            );

          case "takeaways":
            return (
              <SectionWrapper key={index} id={section.id}>
                <TakeawaysCard takeaways={extractListItems(section.content)} />
              </SectionWrapper>
            );

          case "illustration":
            return (
              <div key={index} className="my-8">
                <IllustrationRenderer type={section.content} />
              </div>
            );

          case "visual-example":
            return (
              <div key={index} className="my-8">
                <VisualExampleRenderer type={section.content} />
              </div>
            );

          case "exercise-interactive":
            return (
              <div key={index} className="my-8">
                <ExerciseRenderer type="interactive" data={section.content} />
              </div>
            );

          case "content":
          default:
            return (
              <SectionWrapper key={index} id={section.id}>
                <ReactMarkdown
                  components={components}
                  className={cn(
                    "prose prose-neutral max-w-none text-pretty dark:prose-invert prose-headings:font-sans prose-headings:font-bold prose-h1:text-4xl prose-h1:leading-[0.95] prose-h1:tracking-[-0.035em] prose-h2:mt-12 prose-h2:text-3xl prose-h2:leading-[1] prose-h2:tracking-[-0.025em] prose-h3:mt-10 prose-h3:text-2xl prose-h3:leading-[1.05] prose-h3:tracking-[-0.02em] prose-h4:text-xl prose-h4:leading-[1.1] prose-p:leading-[1.55] prose-p:tracking-[-0.01em] prose-li:list-disc prose-img:rounded-none"
                  )}
                  remarkPlugins={[remarkGfm]}
                >
                  {section.content}
                </ReactMarkdown>
              </SectionWrapper>
            );
        }
      })}
    </div>
  );
};

export default CourseMarkdown;
