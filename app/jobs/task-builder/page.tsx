"use client";

import React, { useState, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import SectionTitle from "@/app/components/section-title";
import { StyledButton as Button } from "@/app/components/styled-button";
import {
  CopyIcon,
  EraserIcon,
  FlameIcon,
  SendIcon,
  SparklesIcon,
} from "lucide-react";
import { Message, continueConversation } from "./actions";
import { readStreamableValue } from "ai/rsc";
import { Card, CardBody, Divider, Input } from "@nextui-org/react";
import { useMediaQuery } from "usehooks-ts";

function TaskBuilder() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const isMobile = useMediaQuery("(max-width: 640px)");

  const suggestions = [
    {
      text: "A Design Engineer, with experience designing for AI tools.",
    },
    {
      text: "A UI Engineer, with experience designing for mobile applications.",
    },
    {
      text: "A UX Engineer, with experience designing for e-commerce websites.",
    },
    {
      text: "A Design Technologist, with experience designing for web applications.",
    },
  ];

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
      <div className="flex w-full items-baseline justify-between">
        <span className="font-medium text-foreground-500">
          Generate a task for a Design Engineer role at your company.
        </span>
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
                      title="Copy to clipboard"
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
                  {conversation.length > 2 && <Divider className="mb-4 mt-8" />}
                </div>
              ),
          )
        ) : (
          <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-4 md:min-h-[50dvh]">
            <div className="flex h-full w-full flex-col">
              <div className="flex h-full w-full flex-col gap-y-2">
                <SparklesIcon
                  className="mx-auto animate-pulse text-secondary-200"
                  size={104}
                />
                <span className="mx-auto max-w-xs text-center text-foreground-500">
                  Start by entering some basic task requirements and click
                  Generate.
                </span>
              </div>
              <div className="fixed bottom-20 left-0 right-0 grid w-full max-w-3xl grid-cols-1 gap-2 px-4 md:grid-cols-2 lg:left-auto lg:right-auto">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full cursor-pointer select-none rounded-lg border border-foreground-200 px-4 py-2 text-start text-sm hover:bg-foreground-50 hover:shadow-sm"
                    onClick={() => {
                      setInput(suggestion.text);
                    }}
                  >
                    <div className="flex w-full flex-col items-start gap-4 text-foreground-500">
                      {suggestion.text}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-20 flex w-full max-w-3xl gap-4 border-t border-foreground-100 bg-background px-4 py-4 *:sticky lg:left-auto lg:right-auto">
        {conversation.length > 0 && (
          <Button
            title="Clear conversation"
            color="danger"
            isIconOnly
            variant="flat"
            onPress={() => {
              setConversation([]);
              setInput("");
            }}
            startContent={<FlameIcon size={16} />}
          />
        )}
        <Input
          type="text"
          value={input}
          placeholder="Provide some basic task requirements..."
          isClearable
          onClear={() => setInput("")}
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
          startContent={
            isMobile ? (
              <SendIcon className="shrink-0" size={16} />
            ) : (
              <SparklesIcon className="shrink-0" size={16} />
            )
          }
          isIconOnly={isMobile}
        >
          {!isMobile && "Generate"}
        </Button>
      </div>
    </div>
  );
}

export default TaskBuilder;
