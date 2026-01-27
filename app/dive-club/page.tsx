"use client";

import { useState } from "react";
import { claimDiveClubDiscount } from "./actions";
import { Sparks, ArrowRight } from "iconoir-react";

export default function DiveClubPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await claimDiveClubDiscount(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result.url) {
      window.location.href = result.url;
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black font-sans text-neutral-900 dark:text-white flex flex-col relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="max-w-md w-full">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-swiss-red text-white mb-6">
              <Sparks className="w-6 h-6" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Dive Club Exclusive
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Welcome, Dive Club member. Enter your email to unlock your exclusive 20% discount on the Design Engineer course.
            </p>
          </div>

          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 shadow-xl relative">
             {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-swiss-red" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-swiss-red" />

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider mb-2 text-neutral-500">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="you@example.com"
                  className="w-full bg-neutral-100 dark:bg-neutral-800 border-none px-4 py-3 rounded-none focus:ring-2 focus:ring-swiss-red outline-none transition-all"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 font-bold uppercase tracking-wide hover:bg-swiss-red dark:hover:bg-swiss-red hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? "Unlocking..." : "Unlock 20% Discount"}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
            
            <p className="mt-4 text-xs text-center text-neutral-400">
              Includes lifetime access to all current and future content.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
