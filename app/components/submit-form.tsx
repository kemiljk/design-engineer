import React from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";

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
    <form onSubmit={sendEmail} onFocus={handleFocus} onBlur={handleBlur}>
      <div className="mb-3 flex flex-col gap-3 overflow-visible px-4">
        {isSubmitted ? (
          <div>Submitted!</div>
        ) : (
          <>
            <Input
              size="md"
              autoFocus
              label="Your name"
              type="name"
              name="from_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              size="md"
              type="email"
              label="Your email"
              name="reply_to"
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
              type="text"
              label="Article URL"
              name="url"
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
              color="primary"
              type="submit"
              name="Submit message"
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
