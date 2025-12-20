"use client";

import React, { useMemo, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "@/app/components/SyntaxHighlighter";
import { cn } from "@/lib/utils";
import {
  SummaryCard,
  ObjectivesCard,
  ExerciseCard,
  TakeawaysCard,
  SectionWrapper,
} from "./lesson-layout";
import { IllustrationRenderer } from "./illustrations/illustration-renderer";
import { ExerciseRenderer } from "./exercises";

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

  // Process remaining content for illustrations, exercises, and h2 sections
  const illustrationRegex = /<!--\s*illustration:\s*([a-z0-9-]+)\s*-->/g;
  const exerciseRegex = /<!--\s*exercise:\s*([a-z-]+)\n([\s\S]*?)-->/g;
  let lastIndex = 0;
  let match;
  const contentParts: ParsedSection[] = [];

  // Combine all special blocks (illustrations and exercises) with their positions
  const specialBlocks: { type: 'illustration' | 'exercise-interactive'; index: number; length: number; content: string; exerciseType?: string }[] = [];

  while ((match = illustrationRegex.exec(remaining)) !== null) {
    specialBlocks.push({
      type: 'illustration',
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
            "w-max rounded-none border border-foreground-100 bg-foreground-50 p-1 font-mono text-sm font-normal text-inherit",
            className
          )}
          {...props}
        >
          {children}
        </code>
      );
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
                    "prose prose-neutral text-pretty dark:prose-invert prose-h1:font-sans prose-h2:mt-10 prose-h2:font-sans prose-h2:tracking-tight prose-h3:mt-8 prose-h3:font-sans prose-li:list-disc prose-img:rounded-none"
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
