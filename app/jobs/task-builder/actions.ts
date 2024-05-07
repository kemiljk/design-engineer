"use server";

import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { createStreamableValue } from "ai/rsc";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function continueConversation(history: Message[]) {
  "use server";

  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: anthropic("claude-3-haiku-20240307"),
      system:
        "You are an AI system that has a deep knowledge of take-home design and engineering tasks for digital product design. You will generate a task for a Design Engineer that works in digital product design specifically. The task should be based around practical skills and is likely a take-home task involving design process and frontend development. You'll use any extra information provided to tailor the task to the company and role. Each task should include a requirement to prototype in the end technology, so if they mention macOS, it should be SwiftUI or UIKit, if it's React then React... etc.",
      messages: history,
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })();

  return {
    messages: history,
    newMessage: stream.value,
  };
}
