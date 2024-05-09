"use client";

import { StyledButton as Button } from "@/app/components/styled-button";
import { Message, continueConversation } from "./actions";
import { readStreamableValue } from "ai/rsc";
import { CopyIcon, RefreshCcwDotIcon, SparklesIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { checkSpecs } from "./check-specs";
import MDEditor from "@uiw/react-md-editor";
import Markdown from "react-markdown";

function SpecBuilderFunction({
  jobRole,
  company,
  location,
  industry,
  url,
  contactEmail,
  extraDetails,
  onInputChanged,
}: {
  jobRole: string;
  company: string;
  location: string;
  industry: string;
  url: string;
  contactEmail: string;
  extraDetails: string;
  onInputChanged: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [thinking, setThinking] = useState<boolean>(false);

  const [preGeneratedAlert, setPreGeneratedAlert] = useState<boolean | null>(
    false,
  );

  const completionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (completionRef.current) {
      completionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [conversation]);

  useEffect(() => {
    onInputChanged(input);
  }, [input, onInputChanged]);

  useEffect(() => {
    setInput(
      jobRole +
        " at " +
        company +
        " in " +
        location +
        " in the " +
        industry +
        " industry. " +
        "Contact " +
        contactEmail +
        " for more information. " +
        url +
        extraDetails,
    );
  }, [jobRole, company, location, industry, url, contactEmail, extraDetails]);

  useEffect(() => {
    setInput(conversation.map((message) => message.content).join("\n"));
  }, [conversation, setInput]);

  const saveFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promptObject = {
      type: "spec-builder-prompts",
      title:
        jobRole +
        " at " +
        company +
        " in " +
        location +
        " in the " +
        industry +
        " industry",
    };

    await fetch("/api/insert-prompt", {
      method: "POST",
      body: JSON.stringify({ prompt: promptObject }),
    });
  };

  const sendMessage = async () => {
    const { newMessage } = await continueConversation([
      { role: "user", content: input },
    ]);

    let textContent = "";

    for await (const delta of readStreamableValue(newMessage)) {
      textContent = `${textContent}${delta}`;

      setConversation([{ role: "assistant", content: textContent }]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from being submitted immediately
    const checkString = jobRole + " at " + company + " in " + location;
    const matchingCompletion = await checkSpecs({ checkString });

    if (matchingCompletion) {
      setPreGeneratedAlert(true);
      setInput(matchingCompletion.metadata.completion);
    } else {
      sendMessage();
      // If the prompt is unique, save it to the database
      saveFormData(e as React.FormEvent<HTMLFormElement>);
    }
  };

  const handleReset = () => {
    setConversation([]);
    setPreGeneratedAlert(false);
    setInput("");
  };

  return (
    <div className="mx-auto w-full">
      <form
        onSubmit={handleFormSubmit}
        className="mx-auto flex flex-col justify-center space-y-4"
      >
        {preGeneratedAlert && (
          <div className="flex flex-col">
            <div className="mb-4 flex flex-col gap-y-2 rounded-lg border border-success-100 bg-success-50/30 p-4">
              <span className="font-medium text-success-800">
                This job spec already exists!
              </span>
              <span className="text-sm text-success-700">
                This job spec was generated automatically from a pre-existing
                matching prompt. If you&apos;d like to customise this, please
                add some additional details in the text input.
              </span>
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <Markdown className="prose w-full dark:prose-invert">
                {input}
              </Markdown>
              <Button
                isIconOnly
                size="sm"
                variant="ghost"
                startContent={<CopyIcon size={16} />}
                className="sticky right-0 top-20"
                onPress={() => {
                  navigator.clipboard.writeText(input);
                }}
              />
            </div>
          </div>
        )}
        <div className="relative">
          {conversation.length ? (
            conversation.map(
              (message, index) =>
                message.role === "assistant" && (
                  <div
                    ref={completionRef}
                    key={index}
                    className="mt-4 flex items-start justify-between gap-4"
                  >
                    <Markdown className="prose w-full dark:prose-invert">
                      {message.content}
                    </Markdown>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="ghost"
                      startContent={<CopyIcon size={16} />}
                      className="sticky right-0 top-20"
                      onPress={() => {
                        navigator.clipboard.writeText(message.content);
                      }}
                    />
                  </div>
                ),
            )
          ) : !conversation.length && thinking ? (
            <div className="mx-auto flex w-full animate-pulse items-center justify-center gap-2">
              <SparklesIcon className="text-primary" size={16} />
              <span className="max-w-xs text-center text-foreground-500">
                Generating job spec...
              </span>
            </div>
          ) : (
            <>
              <p className="text-sm text-foreground-500">
                Start by entering some basic task requirements and click
                Generate.
              </p>
            </>
          )}
        </div>

        <div className="mx-auto mt-4 flex w-max items-center gap-x-2">
          <Button
            type="submit"
            variant="stylised"
            onClick={() => {
              setPreGeneratedAlert(false);
              setThinking(true);
            }}
            className="mx-auto w-max bg-gradient-to-br from-secondary-400 to-primary-400 text-background disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50"
            startContent={<SparklesIcon size={16} />}
          >
            Generate
          </Button>
          <Button
            type="button"
            onClick={handleReset}
            startContent={<RefreshCcwDotIcon size={16} />}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SpecBuilderFunction;
