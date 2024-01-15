"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SubmitForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [formFocus, setFormFocus] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [url, setURL] = React.useState("");
  const [summary, setSummary] = React.useState("");

  const handleFocus = () => setFormFocus(true);
  const handleBlur = () => setFormFocus(false);

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
    <form
      onSubmit={sendEmail}
      autoFocus
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className="mb-3 flex flex-col gap-3 overflow-visible">
        {isSubmitted ? (
          <div>Submitted!</div>
        ) : (
          <>
            <Input
              type="name"
              placeholder="Your name"
              name="from_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Your email"
              name="reply_to"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Article title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Article URL"
              name="url"
              value={url}
              onChange={(e) => setURL(e.target.value)}
              required
            />
            <Textarea
              placeholder="Article summary"
              name="message"
              aria-label="Your summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
            <Button
              variant="primary"
              type="submit"
              name="Submit message"
              aria-label="Submit message"
              className="mx-auto disabled:opacity-50 md:w-max"
              disabled={isSubmitting}
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
