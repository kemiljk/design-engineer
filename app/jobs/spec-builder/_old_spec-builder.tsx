"use client";

import { StyledButton as Button } from "@/app/components/styled-button";
import { useCompletion } from "ai/react";
import { CopyIcon, Loader2Icon, SparklesIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { checkSpecs } from "./check-specs";
import MDEditor from "@uiw/react-md-editor";

function SpecBuilderFunction({
  jobRole,
  company,
  location,
  industry,
  url,
  contactEmail,
}: {
  jobRole: string;
  company: string;
  location: string;
  industry: string;
  url: string;
  contactEmail: string;
}) {
  const {
    completion,
    input,
    setInput,
    setCompletion,
    stop,
    isLoading,
    handleSubmit,
  } = useCompletion();

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
  }, [completion]);

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
        ". Contact " +
        contactEmail +
        " for more information. " +
        url,
    );
  }, [jobRole, company, location, industry, url, contactEmail]);

  useEffect(() => {
    setInput(completion);
  }, [completion]);

  const saveFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promptObject = {
      type: "spec-builder-prompts",
      title: jobRole + " at " + company + " in " + location,
    };

    await fetch("/api/insert-prompt", {
      method: "POST",
      body: JSON.stringify({ prompt: promptObject }),
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the form from being submitted immediately
    const checkString = jobRole + " at " + company + " in " + location;
    const matchingCompletion = await checkSpecs({ checkString });

    if (matchingCompletion) {
      setPreGeneratedAlert(true);
      setCompletion(matchingCompletion.metadata.completion);
      setInput(matchingCompletion.metadata.completion);
    } else {
      handleSubmit(e as React.FormEvent<HTMLFormElement>);
      // If the prompt is unique, save it to the database
      saveFormData(e as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="mx-auto w-full">
      <form
        onSubmit={handleFormSubmit}
        className="mx-auto flex flex-col justify-center space-y-4"
      >
        {preGeneratedAlert && (
          <div className="mb-4 flex flex-col gap-y-2 rounded-lg border border-success-100 bg-success-50/30 p-4">
            <span className="font-medium text-success-800">
              This job spec already exists!
            </span>
            <span className="text-sm text-success-700">
              This job spec was generated automatically from a pre-existing
              matching prompt. If you'd like to customise this, please add some
              additional details in the text input.
            </span>
          </div>
        )}
        <div className="relative">
          <MDEditor
            className="w-full !rounded-xl"
            value={input}
            autoFocus={false}
            // @ts-ignore
            onChange={setInput}
            preview="edit"
            hideToolbar={true}
          />
          <Button
            isIconOnly
            size="sm"
            variant="ghost"
            startContent={<CopyIcon size={16} />}
            className="absolute right-2 top-2"
            onClick={() => {
              navigator.clipboard.writeText(completion);
            }}
          />
        </div>

        <div className="mx-auto mt-4 flex w-max items-center gap-x-2">
          <Button
            type="submit"
            onClick={() => setPreGeneratedAlert(false)}
            disabled={isLoading}
            className="mx-auto w-max bg-gradient-to-br from-secondary-400 to-primary-400 text-background disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50"
            startContent={
              isLoading ? (
                <Loader2Icon
                  size={16}
                  className={isLoading ? "animate-spin" : ""}
                />
              ) : (
                <SparklesIcon size={16} />
              )
            }
          >
            {isLoading ? "Generating..." : "Try Spec Builder"}
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
    </div>
  );
}

export default SpecBuilderFunction;
