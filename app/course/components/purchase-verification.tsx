"use client";

import { useEffect, useState } from "react";
import { verifyPurchase } from "../actions";
import { Check } from "iconoir-react";

export function PurchaseVerification() {
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying",
  );
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function runVerification() {
      try {
        const result = await verifyPurchase();

        if (result.success) {
          setStatus("success");
          // Slight delay to show success state before reload
          setTimeout(() => {
            // Remove the purchase query param to prevent loop and show clean URL
            window.location.href = "/course";
          }, 1500);
        } else {
          setStatus("error");
          setErrorMsg(result.error || "Could not verify purchase.");
        }
      } catch {
        setStatus("error");
        setErrorMsg("An unexpected error occurred.");
      }
    }

    runVerification();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm dark:bg-black/90">
      <div className="text-center">
        {status === "verifying" && (
          <>
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-800 dark:border-neutral-800 dark:border-t-white" />
            <h2 className="text-lg font-bold">Verifying your purchase...</h2>
            <p className="text-neutral-500">This may take a few seconds.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <Check />
            </div>
            <h2 className="text-lg font-bold">You're all set!</h2>
            <p className="text-neutral-500">Access granted. Redirecting...</p>
          </>
        )}

        {status === "error" && (
          <div className="max-w-md border border-neutral-200 bg-white p-6 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-2 text-lg font-bold text-red-600">
              Verification Failed
            </h2>
            <p className="mb-4 text-neutral-600 dark:text-neutral-400">
              {errorMsg}
            </p>
            <p className="mb-6 text-sm text-neutral-500">
              Don't worry, if you have a receipt, you have access. Webhooks
              might be delayed.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-black"
            >
              Try Again
            </button>
            <div className="mt-4">
              <a
                href="mailto:hello@designengineer.xyz"
                className="text-sm text-neutral-400 hover:underline"
              >
                Contact Support
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
