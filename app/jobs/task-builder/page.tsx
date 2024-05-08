"use client";

import React, { useState, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import SectionTitle from "@/app/components/section-title";
import { StyledButton as Button } from "@/app/components/styled-button";
import { CopyIcon, SparklesIcon } from "lucide-react";
import { Message, continueConversation } from "./actions";
import { readStreamableValue } from "ai/rsc";
import { Divider, Input } from "@nextui-org/react";

function TaskBuilder() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const completionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (completionRef.current) {
      completionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [conversation]);

  const sendMessage = async () => {
    const { messages, newMessage } = await continueConversation([
      ...conversation,
      { role: "user", content: input },
    ]);

    let textContent = "";

    for await (const delta of readStreamableValue(newMessage)) {
      textContent = `${textContent}${delta}`;

      setConversation([
        ...messages,
        { role: "assistant", content: textContent },
      ]);
    }
  };

  return (
    <div className="flex w-full max-w-3xl flex-col gap-4 pb-24">
      <SectionTitle>Task Builder</SectionTitle>
      <span className="font-medium text-foreground-500">
        Generate a task for a Design Engineer role at your company.
      </span>
      <div className="fixed bottom-0 z-20 flex w-full max-w-3xl gap-4 border-t border-foreground-100 bg-background px-4 py-4 *:sticky">
        <Input
          type="text"
          value={input}
          placeholder="Provide some basic task requirements..."
          onChange={(event) => {
            setInput(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMessage();
              setInput("");
            }
          }}
        />
        <Button
          variant="stylised"
          onPress={sendMessage}
          onClick={() => setInput("")}
          className="mx-auto w-max bg-gradient-to-br from-secondary-400 to-primary-400 text-background disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50"
          startContent={<SparklesIcon className="shrink-0" size={16} />}
        >
          Generate
        </Button>
      </div>
      <div ref={completionRef} className="relative mt-12 max-w-3xl">
        {conversation.length ? (
          conversation.map(
            (message, index) =>
              message.role === "assistant" && (
                <div key={index}>
                  <div className="flex items-start justify-between">
                    <Markdown className="prose mt-4 space-x-4 text-foreground dark:prose-invert ">
                      {message.content}
                    </Markdown>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="ghost"
                      startContent={<CopyIcon size={16} />}
                      className="sticky right-0 top-20 mt-4"
                      onPress={() => {
                        navigator.clipboard.writeText(message.content);
                      }}
                    />
                  </div>
                  {conversation.length > 1 && <Divider className="mt-8" />}
                </div>
              ),
          )
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <SparklesIcon
              className="mx-auto mt-40 animate-pulse text-secondary-200"
              size={104}
            />
            <span className="max-w-xs text-center text-foreground-500">
              Start by entering some basic task requirements and click Generate.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskBuilder;
