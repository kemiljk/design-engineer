"use client";

import React from "react";
import { Button } from "@/app/components/ui";
import { Input, Textarea } from "@/app/components/ui";

export default function SubmitForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [url, setURL] = React.useState("");
  const [summary, setSummary] = React.useState("");

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const newArticleSubmission = {
      title: title,
      status: "draft",
      type: "content-posts",
      metadata: {
        url: url,
        content: summary,
        published_date: new Date().toISOString().slice(0, 10),
      },
    };
    try {
      setIsSubmitting(true);
      await fetch("/api/article-submission", {
        method: "POST",
        body: JSON.stringify({ submission: newArticleSubmission }),
      });
      await fetch("/api/send-submission", {
        method: "POST",
        body: JSON.stringify({ email: email }),
      });
      await fetch("/api/receive-submission", {
        method: "POST",
        body: JSON.stringify({ email: email }),
      });
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setName("");
        setEmail("");
        setTitle("");
        setURL("");
        setSummary("");
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={sendEmail}>
      <div className="mb-3 flex flex-col gap-3 overflow-visible">
        {isSubmitted ? (
          <div className="flex h-40 w-full items-center justify-center border border-neutral-200 bg-neutral-50 text-lg font-medium text-swiss-red dark:border-neutral-800 dark:bg-neutral-900">
            Submitted successfully!
          </div>
        ) : (
          <>
            <Input
              size="md"
              autoFocus
              label="Your name"
              type="text"
              name="from_name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              size="md"
              type="email"
              label="Your email"
              name="reply_to"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              size="md"
              type="text"
              label="Article title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              size="md"
              type="url"
              label="Article URL"
              name="url"
              autoComplete="url"
              value={url}
              onChange={(e) => setURL(e.target.value)}
              required
            />
            <Textarea
              label="Article summary"
              name="message"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="mx-auto disabled:opacity-50 md:w-max"
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
            >
              {isSubmitted
                ? "Sent!"
                : isSubmitting
                  ? "Sending"
                  : "Submit article"}
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
