"use client";

import { useState } from "react";
import { StyledButton } from "@/app/components/styled-button";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to subscribe");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
        <Check className="h-5 w-5" />
        <span>You&apos;re on the list! We&apos;ll be in touch.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="h-11 flex-1 border border-neutral-200 bg-white px-4 text-sm placeholder:text-neutral-400 focus:border-swiss-red focus:outline-none dark:border-neutral-700 dark:bg-neutral-800"
        />
        <StyledButton
          type="submit"
          variant="stylised"
          isDisabled={status === "loading"}
          className="h-11 w-full shrink-0 sm:w-auto"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Notify Me
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </StyledButton>
      </div>
      {status === "error" && (
        <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
      )}
    </form>
  );
}
