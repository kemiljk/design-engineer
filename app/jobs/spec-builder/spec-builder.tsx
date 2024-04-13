"use client";

import SectionTitle from "@/app/components/section-title";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useCompletion, useChat } from "ai/react";
import Markdown from "react-markdown";
import { Chip } from "@nextui-org/react";
import { CopyIcon, RefreshCcw } from "lucide-react";

const jobTitles = [
  "Design Engineer",
  "Creative Technologist",
  "Design Technologist",
  "UI Engineer",
  "UX Engineer",
];

function SpecBuilderFunction() {
  const { completion, input, setInput, handleInputChange, handleSubmit } =
    useCompletion();

  return (
    <div className="mx-auto max-w-3xl p-4">
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex flex-col justify-center space-y-4"
      >
        <div className="flex flex-wrap space-x-2">
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
        <Button type="submit" color="primary" className="mx-auto w-max">
          Generate Job Spec
        </Button>
      </form>
      {completion && (
        <div className="mt-12 max-w-3xl rounded-md">
          <div className="flex w-full justify-between">
            <SectionTitle>Generated Job Spec</SectionTitle>
            <div className="flex gap-2">
              <Button
                isIconOnly
                size="sm"
                variant="ghost"
                startContent={<CopyIcon size={16} />}
                onClick={() => {
                  navigator.clipboard.writeText(completion);
                }}
              />
            </div>
          </div>
          <Markdown className="prose mt-4 space-x-4 text-black dark:prose-invert dark:text-white">
            {completion}
          </Markdown>
        </div>
      )}
    </div>
  );
}

export default SpecBuilderFunction;
