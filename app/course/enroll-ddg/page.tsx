"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { ArrowRight, Loader } from "iconoir-react";
import { motion } from "motion/react";
import { ease } from "@/lib/motion";

export default function EnrollDdgPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState<string | null>(null);
  const enrollmentStarted = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;

    if (!isSignedIn) {
      router.push("/sign-in?redirect_url=/course/enroll-ddg");
      return;
    }

    const email = user?.emailAddresses[0]?.emailAddress;
    if (!email || !email.endsWith("@duckduckgo.com")) {
      setStatus("error");
      setError("This enrollment is only available for @duckduckgo.com email addresses.");
      return;
    }

    if (enrollmentStarted.current) return;
    enrollmentStarted.current = true;

    async function processEnrollment() {
      try {
        const response = await fetch("/api/course/enroll-ddg-handle", {
          method: "POST"
        });

        if (response.ok) {
          setStatus("success");
          // Slight delay before redirecting to show the success state
          setTimeout(() => {
            router.push("/course?purchase=success");
          }, 1500);
        } else {
          const data = await response.json();
          setStatus("error");
          setError(data.error || "Failed to process enrollment.");
        }
      } catch (err) {
        setStatus("error");
        setError("An unexpected error occurred. Please try again.");
      }
    }

    processEnrollment();
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black font-sans text-neutral-900 dark:text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Vertical grid lines */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #80808012 1px, transparent 1px)',
          backgroundSize: '32px 100%',
          backgroundPosition: 'calc(50% - 16px) 0'
        }}
      />

      <div className="w-[448px] max-w-full relative z-10">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-12 shadow-2xl relative text-center">
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-swiss-red" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-swiss-red" />

          {status === "loading" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-neutral-100 dark:bg-neutral-800">
                <Loader className="size-8 text-swiss-red animate-spin" />
              </div>
              <h1 className="text-2xl font-bold">Granting Access...</h1>
              <p className="text-neutral-500">
                We're setting up your lifetime access to the Design Engineer course. This will only take a moment.
              </p>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ease: ease.outQuint, duration: 0.5 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-green-100 dark:bg-green-900/30">
                <motion.div
                   initial={{ scale: 0 }}
                   animate={{ scale: 1 }}
                   transition={{ delay: 0.2, type: "spring" }}
                >
                  <ArrowRight className="size-8 text-green-600 dark:text-green-400 rotate-[-45deg]" />
                </motion.div>
              </div>
              <h1 className="text-2xl font-bold">Welcome Aboard!</h1>
              <p className="text-neutral-500">
                Your enrollment is complete. Redirecting you to the course dashboard...
              </p>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center justify-center size-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-bold text-2xl">
                !
              </div>
              <h1 className="text-2xl font-bold">Enrollment Failed</h1>
              <p className="text-neutral-500">{error}</p>
              <button
                onClick={() => router.push("/ddg")}
                className="w-full h-12 bg-black text-white font-bold uppercase tracking-wide hover:bg-neutral-800 transition-colors shadow-lg"
              >
                Go Back
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
