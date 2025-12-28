"use server";

import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { createStreamableValue } from "@ai-sdk/rsc";

export async function auditAccessibility(code: string) {
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = streamText({
      model: anthropic("claude-3-haiku-20240307"),
      system: `You are an expert Accessibility Auditor for web development (React/HTML/CSS).
Your goal is to analyze the provided code snippet and identify accessibility issues, semantic structure problems, and potential contrast violations.

Please format your response in Markdown with the following sections:
1. **Audit Report**: A bulleted list of issues found. Be specific (e.g., "Missing aria-label on button", "Div used instead of <button>").
2. **Fixed Code**: The corrected code block. Use comments to highlight changes if helpful.
3. **Explanation**: Briefly explain why the changes improve accessibility (referencing WCAG where appropriate).

Focus on:
- Semantic HTML (avoiding div soup).
- ARIA attributes (role, label, etc.).
- Color contrast (if colors are visible in the code).
- Keyboard navigability.
- Focus management.

If the code is already perfect, praise it and explain why it's good.`,
      messages: [
        { role: "user", content: `Please audit this code for accessibility:\n\n${code}` },
      ],
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })();

  return {
    output: stream.value,
  };
}
