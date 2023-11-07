"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

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
        <span className="text-slate-600 dark:text-slate-400">
          Thanks for signing up! We will be in touch soon.
        </span>
      </div>
    );
    ``;
  }

  return (
    <div className="relative z-2 flex w-full max-w-xl flex-col gap-2 text-center">
      <form
        className="flex w-full max-w-xl flex-col gap-2 md:flex-row"
        onSubmit={submit}
      >
        <Input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button size="lg" variant="primary" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Registering interest...</span>
            </>
          ) : (
            "Register interest"
          )}
        </Button>

        {error ? <div className="">{error}</div> : null}
      </form>
      <span className="text-xs text-slate-500">
        We respect your privacy and will never share your email.
      </span>
    </div>
  );
};
