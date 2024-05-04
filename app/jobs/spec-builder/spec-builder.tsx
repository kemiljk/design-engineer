"use client";

import SectionTitle from "@/app/components/section-title";
import { StyledButton as Button } from "@/app/components/styled-button";
import { Textarea } from "@nextui-org/input";
import { Chip } from "@nextui-org/chip";
import { useCompletion } from "ai/react";
import Markdown from "react-markdown";
import { CopyIcon, Loader2Icon } from "lucide-react";
import { useRef, useEffect } from "react";

const jobTitles = [
  "Design Engineer",
  "Creative Technologist",
  "Design Technologist",
  "UI Engineer",
  "UX Engineer",
  "Product Engineer",
];

function SpecBuilderFunction() {
  const {
    completion,
    input,
    setInput,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion();

  const completionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (completionRef.current) {
      completionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [completion]);

  const saveFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promptObject = { type: "spec-builder-prompts", title: input };

    await fetch("/api/insert-prompt", {
      method: "POST",
      body: JSON.stringify({ prompt: promptObject }),
    });
  };

  return (
    <div className="mx-auto max-w-3xl p-4">
      <form
        onSubmit={handleSubmit}
        onSubmitCapture={saveFormData}
        className="mx-auto flex flex-col justify-center space-y-4"
      >
        <div className="flex flex-wrap gap-2">
          {jobTitles.map((title) => (
            <Chip
              key={title}
              variant="bordered"
              className="cursor-default select-none hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => {
                setInput(title);
              }}
            >
              {title}
            </Chip>
          ))}
        </div>
        <Textarea
          className="w-full"
          placeholder="Enter a job title"
          value={input}
          onChange={handleInputChange}
        />
        <div className="mx-auto flex items-center gap-x-2">
          <Button
            type="submit"
            color="primary"
            variant="stylised"
            disabled={isLoading}
            className="mx-auto w-max disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50"
            startContent={
              isLoading ? (
                <Loader2Icon
                  size={16}
                  className={isLoading ? "animate-spin" : ""}
                />
              ) : null
            }
          >
            {isLoading ? "Generating..." : "Generate Job Spec"}
          </Button>
          <Button
            color="default"
            disabled={!isLoading}
            className="mx-auto w-max disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50"
            onClick={stop}
          >
            Stop
          </Button>
        </div>
      </form>
      {completion && (
        <div ref={completionRef} className="relative mt-12 max-w-3xl">
          <div className="sticky right-0 top-16 flex w-full justify-between bg-foreground-50/50 px-4 py-2 backdrop-blur-md">
            <SectionTitle>Generated Job Spec</SectionTitle>
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              startContent={<CopyIcon size={16} />}
              className="sticky right-0 top-40"
              onClick={() => {
                navigator.clipboard.writeText(completion);
              }}
            />
          </div>
          <Markdown className="prose mt-4 space-x-4 px-4 text-foreground dark:prose-invert ">
            {completion}
          </Markdown>
        </div>
      )}
    </div>
  );
}

export default SpecBuilderFunction;
