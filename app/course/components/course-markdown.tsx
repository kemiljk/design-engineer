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
  CheckpointCard,
  SectionWrapper,
} from "./lesson-layout";
import { IllustrationRenderer } from "./illustrations/illustration-renderer";
import { ExerciseRenderer } from "./exercises";
import { VisualExampleRenderer } from "./visual-examples";

interface CourseMarkdownProps {
  content: string;
  className?: string;
  lessonPath?: string;
  onSectionsDetected?: (sections: { id: string; label: string }[]) => void;
}

interface ParsedSection {
  type:
    | "summary"
    | "objectives"
    | "exercise"
    | "takeaways"
    | "checkpoint"
    | "content"
    | "illustration"
    | "visual-example"
    | "exercise-interactive";
  content: string;
  id?: string;
  label?: string;
  checkpointItems?: string[];
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

  // Extract Checkpoint sections
  const checkpointResult = extractSection(remaining, /##\s*Checkpoint\s*/);
  if (checkpointResult) {
    // Extract checkbox items from the checkpoint content
    const checkboxItems = extractCheckboxItems(checkpointResult.content);
    sections.push({
      type: "checkpoint",
      content: checkpointResult.content,
      id: "checkpoint",
      label: "Checkpoint",
      checkpointItems: checkboxItems,
    });
    remaining = remaining.replace(checkpointResult.match, "");
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

  const checkpointSection = sections.find((s) => s.type === "checkpoint");
  if (checkpointSection) orderedSections.push(checkpointSection);

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

function extractCheckboxItems(content: string): string[] {
  const items: string[] = [];
  const lines = content.split("\n");
  for (const line of lines) {
    // Match checkbox items: - [ ] or - [x] followed by text (with optional leading whitespace for nested items)
    const match = line.match(/^\s*[-*]\s+\[[\sx]\]\s+(.+)$/i);
    if (match) {
      items.push(match[1].trim());
    }
  }
  return items;
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

// Helper to find checklist blocks in content
function findChecklistBlocks(content: string): { start: number; end: number; items: string[] }[] {
  const blocks: { start: number; end: number; items: string[] }[] = [];
  const lines = content.split('\n');
  let currentBlock: { start: number; items: string[]; startLine: number } | null = null;
  let charIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const checkboxMatch = line.match(/^\s*[-*]\s+\[[\sx]\]\s+(.+)$/i);
    
    if (checkboxMatch) {
      if (!currentBlock) {
        currentBlock = { start: charIndex, items: [], startLine: i };
      }
      currentBlock.items.push(checkboxMatch[1].trim());
    } else {
      // Non-checkbox line - close current block if exists
      if (currentBlock && currentBlock.items.length > 0) {
        blocks.push({
          start: currentBlock.start,
          end: charIndex,
          items: currentBlock.items,
        });
        currentBlock = null;
      }
    }
    
    charIndex += line.length + 1; // +1 for newline
  }

  // Close final block if exists
  if (currentBlock && currentBlock.items.length > 0) {
    blocks.push({
      start: currentBlock.start,
      end: charIndex,
      items: currentBlock.items,
    });
  }

  return blocks;
}

// Component to render markdown content that may contain illustration/visual-example comments and checklists
function MarkdownWithIllustrations({
  content,
  components,
  lessonPath,
  sectionId,
}: {
  content: string;
  components: any;
  lessonPath?: string;
  sectionId?: string;
}) {
  // Normalize content to fix back-to-back code fences
  const normalizedContent = normalizeMarkdown(content);
  
  const illustrationRegex = /<!--\s*illustration:\s*([a-z0-9-]+)\s*-->/g;
  const visualExampleRegex = /<!--\s*visual-example:\s*([a-z0-9-]+)\s*-->/g;

  // Find all special blocks
  const blocks: { type: 'text' | 'illustration' | 'visual-example' | 'checklist'; content: string; index: number; length: number; items?: string[] }[] = [];
  let match;

  while ((match = illustrationRegex.exec(normalizedContent)) !== null) {
    blocks.push({
      type: 'illustration',
      content: match[1],
      index: match.index,
      length: match[0].length,
    });
  }

  while ((match = visualExampleRegex.exec(normalizedContent)) !== null) {
    blocks.push({
      type: 'visual-example',
      content: match[1],
      index: match.index,
      length: match[0].length,
    });
  }

  // Find checklist blocks
  const checklistBlocks = findChecklistBlocks(normalizedContent);
  for (const cb of checklistBlocks) {
    blocks.push({
      type: 'checklist',
      content: '',
      index: cb.start,
      length: cb.end - cb.start,
      items: cb.items,
    });
  }

  // If no special blocks, just render markdown
  if (blocks.length === 0) {
    return (
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {normalizedContent}
      </ReactMarkdown>
    );
  }

  // Sort by position and interleave with text
  blocks.sort((a, b) => a.index - b.index);

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let checklistCounter = 0;

  blocks.forEach((block, i) => {
    // Add text before this block
    if (block.index > lastIndex) {
      const textBefore = normalizedContent.slice(lastIndex, block.index).trim();
      if (textBefore) {
        parts.push(
          <ReactMarkdown key={`text-${i}`} components={components} remarkPlugins={[remarkGfm]}>
            {textBefore}
          </ReactMarkdown>
        );
      }
    }

    // Add the special block
    if (block.type === 'illustration') {
      parts.push(
        <div key={`ill-${i}`} className="my-6">
          <IllustrationRenderer type={block.content} />
        </div>
      );
    } else if (block.type === 'visual-example') {
      parts.push(
        <div key={`ve-${i}`} className="my-6">
          <VisualExampleRenderer type={block.content} />
        </div>
      );
    } else if (block.type === 'checklist' && block.items && block.items.length > 0) {
      const storageKey = lessonPath
        ? `${lessonPath.replace(/\//g, "-")}-${sectionId || 'content'}-checklist-${checklistCounter}`
        : `checklist-${i}`;
      checklistCounter++;
      parts.push(
        <CheckpointCard
          key={`checklist-${i}`}
          items={block.items}
          storageKey={storageKey}
        />
      );
    }

    lastIndex = block.index + block.length;
  });

  // Add remaining text after last block
  if (lastIndex < normalizedContent.length) {
    const textAfter = normalizedContent.slice(lastIndex).trim();
    if (textAfter) {
      parts.push(
        <ReactMarkdown key="text-end" components={components} remarkPlugins={[remarkGfm]}>
          {textAfter}
        </ReactMarkdown>
      );
    }
  }

  return <>{parts}</>;
}

const CourseMarkdown: React.FC<CourseMarkdownProps> = ({
  content,
  className,
  lessonPath,
  onSectionsDetected,
}) => {
  // Normalize markdown content before parsing (fixes back-to-back code fences)
  const normalizedContent = useMemo(() => normalizeMarkdown(content), [content]);
  const parsedSections = useMemo(() => parseContent(normalizedContent), [normalizedContent]);
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
                  <MarkdownWithIllustrations
                    content={section.content}
                    components={components}
                    lessonPath={lessonPath}
                    sectionId={section.id}
                  />
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

          case "checkpoint":
            // Checkpoint sections are now handled as regular content with checklists
            // The MarkdownWithIllustrations component will automatically convert
            // any checklist items into interactive CheckpointCard components
            return (
              <SectionWrapper key={index} id={section.id}>
                <div
                  className={cn(
                    "prose prose-neutral max-w-none text-pretty dark:prose-invert prose-headings:font-sans prose-headings:font-bold prose-h1:text-4xl prose-h1:leading-[0.95] prose-h1:tracking-[-0.035em] prose-h2:mt-12 prose-h2:text-3xl prose-h2:leading-[1] prose-h2:tracking-[-0.025em] prose-h3:mt-10 prose-h3:text-2xl prose-h3:leading-[1.05] prose-h3:tracking-[-0.02em] prose-h4:text-xl prose-h4:leading-[1.1] prose-p:leading-[1.55] prose-p:tracking-[-0.01em] prose-li:list-disc prose-img:rounded-none"
                  )}
                >
                  <MarkdownWithIllustrations
                    content={section.content}
                    components={components}
                    lessonPath={lessonPath}
                    sectionId={section.id}
                  />
                </div>
              </SectionWrapper>
            );

          case "content":
          default:
            return (
              <SectionWrapper key={index} id={section.id}>
                <div
                  className={cn(
                    "prose prose-neutral max-w-none text-pretty dark:prose-invert prose-headings:font-sans prose-headings:font-bold prose-h1:text-4xl prose-h1:leading-[0.95] prose-h1:tracking-[-0.035em] prose-h2:mt-12 prose-h2:text-3xl prose-h2:leading-[1] prose-h2:tracking-[-0.025em] prose-h3:mt-10 prose-h3:text-2xl prose-h3:leading-[1.05] prose-h3:tracking-[-0.02em] prose-h4:text-xl prose-h4:leading-[1.1] prose-p:leading-[1.55] prose-p:tracking-[-0.01em] prose-li:list-disc prose-img:rounded-none"
                  )}
                >
                  <MarkdownWithIllustrations
                    content={section.content}
                    components={components}
                    lessonPath={lessonPath}
                    sectionId={section.id}
                  />
                </div>
              </SectionWrapper>
            );
        }
      })}
    </div>
  );
};

export default CourseMarkdown;
