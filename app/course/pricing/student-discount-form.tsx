"use client";

import { useState } from "react";
import { CheckCircle, AlertCircle, Loader2, GraduationCap } from "lucide-react";

export function StudentDiscountForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter your student email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/course/student-discount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="rounded-none border-2 border-swiss-red/20 bg-swiss-red/5 p-8 dark:border-swiss-red/30 dark:bg-swiss-red/10">
      <div className="mx-auto max-w-xl">
        <div className="mb-4 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-swiss-red text-white">
            <GraduationCap className="h-6 w-6" />
          </div>
        </div>
        
        <h2 className="mb-2 text-center text-xl font-bold">Student Discount - 30% Off</h2>
        <p className="mb-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
          Currently enrolled in university or college? Get an instant discount code sent to your student email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="student-email" className="mb-2 block text-sm font-medium">
              Student Email Address
            </label>
            <input
              id="student-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@university.edu"
              disabled={status === "loading" || status === "success"}
              className="w-full rounded-none border border-neutral-300 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-500 focus:border-swiss-red focus:outline-none focus:ring-2 focus:ring-swiss-red/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-400"
            />
            <p className="mt-2 text-xs text-neutral-500">
              Must be a valid student email (.edu, .ac.uk, etc.)
            </p>
          </div>

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="flex w-full items-center justify-center gap-2 bg-swiss-red px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-900 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white dark:hover:text-black"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Code Sent!
              </>
            ) : (
              <>
                <GraduationCap className="h-4 w-4" />
                Get My Discount Code
              </>
            )}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 flex items-start gap-3 rounded-none border p-4 ${
              status === "success"
                ? "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400"
                : "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400"
            }`}
          >
            {status === "success" ? (
              <CheckCircle className="h-5 w-5 shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium">{message}</p>
              {status === "success" && (
                <p className="mt-2 text-xs opacity-90">
                  Check your inbox (and spam folder). Your unique discount code will be waiting for you!
                </p>
              )}
              {status === "error" && message.includes("not being recognised") && (
                <p className="mt-2 text-xs opacity-90">
                  Contact us at{" "}
                  <a
                    href="mailto:hello@designengineer.xyz?subject=Student%20Discount%20Request"
                    className="font-medium underline hover:no-underline"
                  >
                    hello@designengineer.xyz
                  </a>
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 rounded-none border border-neutral-200 bg-white p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900">
          <p className="mb-2 font-medium text-neutral-900 dark:text-white">How it works:</p>
          <ol className="ml-4 list-decimal space-y-1 text-neutral-600 dark:text-neutral-400">
            <li>Enter your student email address above</li>
            <li>We&apos;ll verify it&apos;s from a recognised educational institution</li>
            <li>Receive your unique 30% discount code instantly via email</li>
            <li>Apply the code at checkout (one-time use, non-transferable)</li>
          </ol>
        </div>

        <p className="mt-4 text-center text-xs text-neutral-500">
          Your email is only used to verify student status and send your discount code. We don&apos;t share it with anyone.
        </p>
      </div>
    </div>
  );
}
