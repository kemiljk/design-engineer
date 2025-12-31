"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XmarkCircle, RefreshDouble } from "iconoir-react";
import Link from "next/link";

export default function PreviewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No preview token provided");
      return;
    }

    async function activatePreview() {
      try {
        const response = await fetch("/api/course/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
          credentials: "include", // Required to accept Set-Cookie from response
        });

        const data = await response.json();
        console.log("Preview API response:", data);

        if (response.ok) {
          setStatus("success");
          setMessage("Preview access activated! You now have full access to all course content.");
          
          // Redirect to course after a short delay
          setTimeout(() => {
            router.push("/course");
          }, 2000);
        } else {
          setStatus("error");
          const debugStr = data.debug ? ` (tokens match: ${data.debug.tokensMatch})` : "";
          setMessage((data.error || "Failed to activate preview access") + debugStr);
        }
      } catch (err) {
        setStatus("error");
        setMessage(`Something went wrong: ${err instanceof Error ? err.message : "Unknown error"}`);
      }
    }

    activatePreview();
  }, [token, router]);

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-none border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-neutral-900 text-center">
        {status === "loading" && (
          <>
            <RefreshDouble className="h-12 w-12 mx-auto mb-4 text-swiss-red animate-spin" />
            <h1 className="text-xl font-bold mb-2">Activating Preview Access</h1>
            <p className="text-neutral-500">Please wait...</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h1 className="text-xl font-bold mb-2">Preview Access Granted!</h1>
            <p className="text-neutral-500 mb-6">{message}</p>
            <p className="text-sm text-neutral-400">Redirecting to course...</p>
          </>
        )}

        {status === "error" && (
          <>
            <XmarkCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <h1 className="text-xl font-bold mb-2">Access Denied</h1>
            <p className="text-neutral-500 mb-6">{message}</p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 bg-swiss-red text-white hover:bg-neutral-900 transition-colors"
            >
              Go to Homepage
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
