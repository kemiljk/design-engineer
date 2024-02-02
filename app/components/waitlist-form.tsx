"use client";

import { FormEvent, useState } from "react";
import { Button, Input } from "@nextui-org/react";

export const Form = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(false);
    setSubmitting(true);
    const newWaitlist = {
      type: "waitlists",
      title: email,
    };
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        body: JSON.stringify({ email: newWaitlist }),
      });
      await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({ email: email }),
      });
      await fetch("/api/waitlisted", {
        method: "POST",
        body: JSON.stringify({ email: email }),
      });
    } catch (err) {
      setSubmitting(false);
      setError(true);
      return;
    }
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 5000);
  };

  if (submitted) {
    return (
      <div>
        <span className="text-gray-600 dark:text-gray-400">
          Thanks for signing up! We will be in touch soon.
        </span>
      </div>
    );
  }

  return (
    <div className="z-2 relative flex w-full max-w-xl flex-col gap-2 text-center">
      <form
        className="flex h-16 w-full max-w-xl flex-col items-center justify-center gap-2 md:flex-row"
        onSubmit={submit}
      >
        <Input
          size="md"
          type="email"
          variant="bordered"
          radius="lg"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full md:w-80"
          classNames={{
            inputWrapper: [
              "bg-white/30",
              "dark:bg-black/10",
              "backdrop-blur-xl",
              "backdrop-saturate-200",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              "border-blue-500/20 dark:border-blue-300/50",
            ],
          }}
        />

        <Button
          type="submit"
          size="lg"
          color="primary"
          variant="solid"
          isDisabled={submitting}
          isLoading={submitting}
        >
          {submitting ? (
            <>
              <span>Registering interest...</span>
            </>
          ) : (
            <span>Register interest</span>
          )}
        </Button>

        {error ? <div>{error}</div> : null}
      </form>
      <span className="text-xs text-gray-500">
        We respect your privacy and will never share your email.
      </span>
    </div>
  );
};
