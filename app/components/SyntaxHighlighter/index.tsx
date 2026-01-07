"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { ScrollContainer } from "@/app/components/ui";
import CopyButton from "./CopyButton";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-cshtml";
import "prismjs/components/prism-regex";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-kotlin";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-java";
import "prism-svelte";

const languageAliases: Record<string, string> = {
  vue: "markup",
  html: "markup",
};

type SyntaxHighlighterProps = {
  code: string;
  language?: string;
  showCopyButton?: boolean;
  className?: string;
  previewCode?: string;
  textClassName?: string;
};

const SyntaxHighlighter = ({
  code,
  language = "plain",
  showCopyButton,
  className,
}: SyntaxHighlighterProps) => {
  const highlighted = useMemo(() => {
    const resolvedLanguage = languageAliases[language] || language;
    const grammar = Prism.languages[resolvedLanguage] || Prism.languages.plain || {};
    try {
      return Prism.highlight(code, grammar, resolvedLanguage);
    } catch {
      return code;
    }
  }, [code, language]);

  // Use system mono for text/plain (better box-drawing chars), JetBrains for code
  const isPlainText = language === "text" || language === "plain";

  return (
    <div className={cn("relative mb-6 rounded-none last:mb-0", className)}>
      <ScrollContainer
        orientation="horizontal"
        className="bg-neutral-100 pt-4 dark:bg-neutral-800"
      >
        <div>
          <pre
            className={cn(
              `language-${language} text-neutral-900 dark:text-neutral-100`,
              isPlainText ? "leading-[1.2]" : "font-mono"
            )}
            style={{
              borderRadius: "0",
              margin: 0,
              padding: "16px",
              minHeight: "56px",
              ...(isPlainText && {
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
              }),
            }}
            tabIndex={0}
          >
            <code
              className={cn(`language-${language}`)}
              style={{ display: "inline-block", paddingRight: "40px" }}
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </pre>
        </div>
      </ScrollContainer>
      {showCopyButton && (
        <div className="absolute top-0 right-0">
          <CopyButton text={code} className="rounded-none" />
        </div>
      )}
    </div>
  );
};

export default SyntaxHighlighter;
