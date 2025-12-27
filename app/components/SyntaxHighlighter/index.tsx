"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import Prism from "prismjs";
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
import { ScrollContainer } from "@/app/components/ui";
import CopyButton from "./CopyButton";

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
    const grammar = Prism.languages[language] || Prism.languages.plain || {};
    try {
      return Prism.highlight(code, grammar, language);
    } catch {
      return code;
    }
  }, [code, language]);

  return (
    <div
      className={cn(
        "relative rounded-none",
        className
      )}
    >
      <ScrollContainer orientation="horizontal" className="bg-neutral-100 dark:bg-neutral-800">
        <div>
          <pre
            className={cn(
              `language-${language}`,
              "text-neutral-900 dark:text-neutral-100"
            )}
            style={{
              borderRadius: "0",
              margin: 0,
              padding: "16px",
              minHeight: "56px",
            }}
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
        <div className="absolute right-0 top-0 p-2">
          <CopyButton text={code} />
        </div>
      )}
    </div>
  );
};

export default SyntaxHighlighter;
