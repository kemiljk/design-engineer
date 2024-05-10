"use client";

import cx from "classnames";
import Prism from "prismjs";
import "prismjs/components/prism-jsx"; // Required
import "prismjs/components/prism-typescript"; // Required
import "prismjs/components/prism-tsx"; // Required
import "prismjs/components/prism-json"; // Required
import "prismjs/components/prism-cshtml"; // Required
import "prismjs/components/prism-regex"; // Required
import { useEffect } from "react";
import CopyButton from "./CopyButton";

type SyntaxHighlighter = {
  code: string;
  language?: string;
  showCopyButton?: boolean;
  overrideCopyPosition?: boolean;
  className?: string;
  previewCode?: string;
  textClassName?: string;
};

const SyntaxHighlighter = (props: SyntaxHighlighter) => {
  const {
    code,
    language = "plain-text",
    showCopyButton,
    overrideCopyPosition,
    className,
  } = props;

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <div
      className={cx(
        `relative flex overflow-hidden text-foreground [&>pre]:bg-zinc-50 [&>pre]:dark:!bg-zinc-800`,
        className,
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
          style={{
            display: "inline-block",
          }}
        >
          {code}
        </code>
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
