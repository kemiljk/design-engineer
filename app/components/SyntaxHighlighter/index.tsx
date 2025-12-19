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
        "relative flex overflow-hidden text-foreground [&>pre]:bg-zinc-50 [&>pre]:dark:!bg-zinc-800",
        className
      )}
    >
      <pre
        style={{
          borderRadius: "12px",
          width: "100%",
          margin: 0,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <code
          className={cx(`language-${language}`)}
          style={{ display: "inline-block" }}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
        <div className="flex space-x-2">
          {showCopyButton && (
            <CopyButton
              text={code}
              className="right-2"
              overridePosition={overrideCopyPosition}
            />
          )}
        </div>
      </pre>
    </div>
  );
};

export default SyntaxHighlighter;
