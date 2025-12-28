"use client";

import React, { useState, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import { Button } from "@/app/components/ui";
import {
  Copy,
  Check,
  Trash2,
  Sparkles,
  MessageSquare,
  ArrowUp,
} from "lucide-react";
import { ConversationMessage, continueConversation } from "../actions";
import { readStreamableValue } from '@ai-sdk/rsc';
import { TaskBuilderSuggestion } from "@/lib/types";

function TaskBuilder({
  suggestions,
}: {
  suggestions: TaskBuilderSuggestion[];
}) {
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const completionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (completionRef.current) {
      completionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [conversation]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  const sendMessage = async () => {
    if (!input.trim() || isGenerating) return;

    setIsGenerating(true);
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
    setIsGenerating(false);
  };

  const copyToClipboard = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const clearConversation = () => {
    setConversation([]);
    setInput("");
  };

  return (
    <div className="flex w-full flex-col">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-swiss-red">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Task Builder</h2>
            <p className="text-sm text-neutral-500">
              Generate design engineering tasks
            </p>
          </div>
        </div>
        {conversation.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearConversation}
            startContent={<Trash2 className="h-4 w-4" />}
            className="text-neutral-500 hover:text-red-500"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Content Area */}
      <div ref={completionRef} className="min-h-[50vh]">
        {conversation.length > 0 ? (
          <div className="space-y-6">
            {conversation.map((message, index) => (
              <div key={index}>
                {message.role === "user" ? (
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-neutral-200 dark:bg-neutral-800">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-sm font-medium text-neutral-500">
                        Your requirements
                      </p>
                      <p className="mt-1">{message.content}</p>
                    </div>
                  </div>
                ) : (
                  <div className="border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                    <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-swiss-red" />
                        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">
                          Generated Task
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(message.content, index)}
                        className="h-8 w-8 p-0"
                      >
                        {copied === index ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="prose prose-neutral max-w-none p-6 dark:prose-invert prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-neutral-600 prose-li:text-neutral-600 dark:prose-p:text-neutral-400 dark:prose-li:text-neutral-400">
                      <Markdown>{message.content}</Markdown>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isGenerating && (
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <div className="h-2 w-2 animate-pulse rounded-full bg-swiss-red" />
                Generating task...
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Sparkles className="mb-4 h-12 w-12 text-neutral-300 dark:text-neutral-700" />
            <h3 className="mb-2 text-lg font-bold">
              What kind of task do you need?
            </h3>
            <p className="mb-8 max-w-md text-center text-neutral-500">
              Describe the role, company type, or specific skills you want to
              test. The more detail you provide, the better the task.
            </p>

            {/* Suggestion Pills */}
            <div className="grid w-full max-w-xl gap-2 sm:grid-cols-2">
              {suggestions.slice(0, 4).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setInput(suggestion.title)}
                  className="border border-neutral-200 bg-white px-4 py-3 text-left text-sm transition-colors hover:border-swiss-red hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                >
                  {suggestion.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 mt-8 border-t border-neutral-200 bg-neutral-50 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950 sm:px-0">
        <div className="relative flex w-full items-end rounded-xl border border-neutral-200 bg-white p-2 shadow-sm focus-within:border-swiss-red focus-within:ring-1 focus-within:ring-swiss-red dark:border-neutral-800 dark:bg-neutral-900">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., Design Engineer at a fintech startup focusing on mobile apps..."
            rows={1}
            className="max-h-[200px] min-h-[44px] w-full resize-none bg-transparent px-3 py-2 pr-12 text-sm placeholder:text-neutral-400 focus:outline-none"
          />
          <Button
            onClick={() => {
              sendMessage();
              setInput("");
            }}
            isDisabled={!input.trim() || isGenerating}
            className="absolute bottom-2 right-2 h-8 w-8 min-w-0 p-0"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TaskBuilder;
