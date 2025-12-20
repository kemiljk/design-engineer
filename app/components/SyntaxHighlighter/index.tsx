"use client";

import { useMemo } from "react";
import cx from "classnames";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-cshtml";
import "prismjs/components/prism-regex";
import { ScrollShadow } from "@heroui/scroll-shadow";
import CopyButton from "./CopyButton";

type SyntaxHighlighterProps = {
  code: string;
  language?: string;
  showCopyButton?: boolean;
  overrideCopyPosition?: boolean;
  className?: string;
  previewCode?: string;
  textClassName?: string;
};

const SyntaxHighlighter = ({
  code,
  language = "plain",
  showCopyButton,
  overrideCopyPosition,
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
      className={cx(
        "relative rounded-none text-foreground",
        className
      )}
    >
      <ScrollShadow orientation="horizontal" className="bg-zinc-100 dark:bg-zinc-800/80">
        <div>
          <pre
            style={{
              borderRadius: "0",
              margin: 0,
              padding: "16px",
              minHeight: "56px",
            }}
          >
            <code
              className={cx(`language-${language}`)}
              style={{ display: "inline-block", paddingRight: "64px" }}
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </pre>
        </div>
      </ScrollShadow>
      {showCopyButton && (
        <div className="absolute right-2 top-2">
          <CopyButton
            text={code}
            className="right-0"
            overridePosition={overrideCopyPosition}
          />
        </div>
      )}
    </div>
  );
};

export default SyntaxHighlighter;
