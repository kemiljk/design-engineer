"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  CheckCircle,
  XmarkCircle as XCircle,
  ArrowRight,
  RefreshDouble as Loader2,
  Lock,
  InfoCircle,
} from "iconoir-react";
import Link from "next/link";

function PreviewContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlToken = searchParams.get("token");

  // If token is in URL, we start in 'loading' state to verify it.
  // If not, we start in 'idle' state to show the form.
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >(urlToken ? "loading" : "idle");
  const [message, setMessage] = useState("");
  const [inputToken, setInputToken] = useState("");

  const activatePreview = async (tokenToUse: string) => {
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/course/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: tokenToUse }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("Preview API response:", data);

      if (response.ok) {
        setStatus("success");
        setMessage(
          "Preview access activated! You now have full access to all course content.",
        );

        // Redirect to course after a short delay
        setTimeout(() => {
          router.push("/course");
        }, 2000);
      } else {
        setStatus("error");
        // const debugStr = data.debug ? ` (tokens match: ${data.debug.tokensMatch})` : "";
        setMessage(data.error || "Failed to activate preview access");
      }
    } catch (err) {
      setStatus("error");
      setMessage(
        `Something went wrong: ${
          err instanceof Error ? err.message : "Unknown error"
        }`,
      );
    }
  };

  // Handle URL token on mount
  useEffect(() => {
    if (urlToken) {
      activatePreview(urlToken);
    }
  }, [urlToken]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputToken.trim()) {
      activatePreview(inputToken.trim());
    }
  };

  return (
    <>
      <div className="w-full max-w-[400px] rounded-none border border-neutral-200 bg-white p-8 text-center sm:rounded-none dark:border-neutral-800 dark:bg-neutral-900">
        {/* Loading State */}
        {status === "loading" && (
          <>
            <Loader2 className="text-swiss-red mx-auto mb-4 h-12 w-12 animate-spin" />
            <h1 className="mb-2 text-xl font-bold">Activating Access</h1>
            <p className="text-sm text-neutral-500">Verifying token...</p>
          </>
        )}

        {/* Success State */}
        {status === "success" && (
          <>
            <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
            <h1 className="mb-2 text-xl font-bold">Access Granted!</h1>
            <p className="mb-6 text-sm text-neutral-500">{message}</p>
            <p className="text-sm text-neutral-400">Redirecting to course...</p>
          </>
        )}

        {/* Idle (Form) State OR Error State with retry */}
        {(status === "idle" || status === "error") && (
          <div className="text-left">
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                {status === "error" ? (
                  <XCircle className="h-5 w-5 text-red-500" />
                ) : (
                  <Lock className="h-5 w-5 text-neutral-400" />
                )}
              </div>
              <h1 className="mb-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                {status === "error" ? "Access Denied" : "Preview Access"}
              </h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {status === "error"
                  ? message
                  : "Enter your access code to view the course preview."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-1">
              <div className="relative">
                <input
                  type="text"
                  value={inputToken}
                  onChange={(e) => setInputToken(e.target.value)}
                  placeholder="Enter access code"
                  className="w-full border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 transition-colors outline-none placeholder:text-neutral-400 focus:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50 dark:focus:border-neutral-700"
                  autoFocus
                  disabled={status === "loading"}
                />
                <button
                  type="submit"
                  disabled={!inputToken.trim() || status === "loading"}
                  className="absolute top-1 right-1 bottom-1 flex items-center justify-center bg-neutral-900 px-4 text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30 dark:bg-neutral-50 dark:text-black"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>

            <div className="mt-8 border-t border-neutral-100 pt-6 text-center dark:border-neutral-800">
              <Link
                href="/"
                className="text-xs text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-50"
              >
                Return to homepage
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function PreviewPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-950">
      <Suspense
        fallback={
          <div className="w-full max-w-md p-8 text-center">
            <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-neutral-400" />
            <p className="text-neutral-500">Loading...</p>
          </div>
        }
      >
        <PreviewContent />
      </Suspense>
    </main>
  );
}
