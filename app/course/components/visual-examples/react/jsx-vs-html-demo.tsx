"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { CheckCircle, XmarkCircle } from "iconoir-react";

type Difference = "className" | "camelCase" | "style" | "expressions" | "selfClosing";

const differences: Record<Difference, { 
  title: string; 
  html: string; 
  jsx: string; 
  explanation: string;
}> = {
  className: {
    title: "className vs class",
    html: `<div class="container">
  <button class="btn primary">
    Click me
  </button>
</div>`,
    jsx: `<div className="container">
  <button className="btn primary">
    Click me
  </button>
</div>`,
    explanation: "class is a reserved word in JavaScript, so JSX uses className instead.",
  },
  camelCase: {
    title: "camelCase attributes",
    html: `<input 
  tabindex="1"
  autocomplete="off"
  onclick="handleClick()"
  maxlength="50"
/>`,
    jsx: `<input 
  tabIndex="1"
  autoComplete="off"
  onClick={handleClick}
  maxLength="50"
/>`,
    explanation: "HTML attributes become camelCase in JSX. Event handlers use curly braces.",
  },
  style: {
    title: "Style as object",
    html: `<div style="
  background-color: blue;
  font-size: 16px;
  margin-top: 20px;
">
  Styled content
</div>`,
    jsx: `<div style={{
  backgroundColor: 'blue',
  fontSize: '16px',
  marginTop: '20px'
}}>
  Styled content
</div>`,
    explanation: "Inline styles are objects with camelCase properties, not strings.",
  },
  expressions: {
    title: "JavaScript expressions",
    html: `<!-- Can't do this in HTML -->
<p>Hello, USER_NAME</p>
<p>Items: ITEM_COUNT</p>
<p>2 + 2 = ???</p>`,
    jsx: `{/* Embed any expression */}
<p>Hello, {user.name}</p>
<p>Items: {items.length}</p>
<p>2 + 2 = {2 + 2}</p>`,
    explanation: "Use curly braces {} to embed any JavaScript expression in JSX.",
  },
  selfClosing: {
    title: "Self-closing tags",
    html: `<!-- HTML allows unclosed tags -->
<img src="photo.jpg">
<input type="text">
<br>
<hr>`,
    jsx: `{/* JSX requires closing */}
<img src="photo.jpg" />
<input type="text" />
<br />
<hr />`,
    explanation: "All tags must be closed in JSX. Self-closing tags need the trailing slash.",
  },
};

export function JsxVsHtmlDemo() {
  const [selected, setSelected] = useState<Difference>("className");
  const diff = differences[selected];

  return (
    <ExampleWrapper
      title="JSX vs HTML"
      description="Key syntax differences to remember when writing JSX"
      controls={
        <ControlGroup label="Difference">
          {(Object.keys(differences) as Difference[]).map((d) => (
            <ControlButton
              key={d}
              active={selected === d}
              onClick={() => setSelected(d)}
            >
              {differences[d].title.split(" ")[0]}
            </ControlButton>
          ))}
        </ControlGroup>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {/* HTML */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <XmarkCircle className="h-4 w-4 text-red-500" />
            <span className="text-xs font-medium uppercase tracking-wide text-red-600 dark:text-red-400">
              HTML (Won&apos;t work in JSX)
            </span>
          </div>
          <div className="flex-1 overflow-x-auto rounded-lg bg-red-100 p-4 ring-1 ring-red-300 dark:bg-red-950/40 dark:ring-red-500/30">
            <pre className="font-mono text-xs leading-relaxed text-red-800 dark:text-red-200 sm:text-sm">
              <code>{diff.html}</code>
            </pre>
          </div>
        </div>

        {/* JSX */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span className="text-xs font-medium uppercase tracking-wide text-green-600 dark:text-green-400">
              JSX (Correct)
            </span>
          </div>
          <div className="flex-1 overflow-x-auto rounded-lg bg-green-100 p-4 ring-1 ring-green-300 dark:bg-green-950/40 dark:ring-green-500/30">
            <pre className="font-mono text-xs leading-relaxed text-green-800 dark:text-green-200 sm:text-sm">
              <code>{diff.jsx}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Why?</strong> {diff.explanation}
        </p>
      </div>
    </ExampleWrapper>
  );
}
