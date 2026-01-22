"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Loader2, InfoEmpty } from "iconoir-react";
import Link from "next/link";

export default function EarlyPreviewPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/course/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token.trim() }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Access granted! Redirecting to course...");
        setTimeout(() => {
          router.push("/course");
        }, 1500);
      } else {
        setStatus("error");
        setMessage(data.error || "Invalid access code. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-neutral-50 p-6 sm:p-8 dark:bg-neutral-950">
      <div className="w-full max-w-[400px]">
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900">
            <Lock className="h-5 w-5 text-neutral-400" />
          </div>
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            Early Preview Access
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Please enter your temporary access code to view the course preview
            before it goes live.
          </p>
        </div>

        <div className="border border-neutral-200 bg-white p-1 dark:border-neutral-800 dark:bg-neutral-900">
          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <div className="relative">
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter access code"
                className="w-full bg-transparent px-4 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-50"
                autoFocus
                disabled={status === "loading" || status === "success"}
              />
              <button
                type="submit"
                disabled={
                  !token.trim() || status === "loading" || status === "success"
                }
                className="absolute top-1 right-1 bottom-1 flex items-center justify-center bg-neutral-900 px-4 text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-neutral-50 dark:text-black"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-4 min-h-[20px] text-center">
          {status === "error" && (
            <p className="animate-in fade-in slide-in-from-top-1 flex items-center justify-center gap-1.5 text-xs text-red-500">
              <InfoEmpty className="h-3.5 w-3.5" />
              {message}
            </p>
          )}
          {status === "success" && (
            <p className="animate-in fade-in slide-in-from-top-1 flex items-center justify-center gap-1.5 text-xs text-green-500">
              {message}
            </p>
          )}
        </div>

        <div className="mt-12 border-t border-neutral-100 pt-8 text-center dark:border-neutral-900">
          <Link
            href="/"
            className="text-xs text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-50"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
