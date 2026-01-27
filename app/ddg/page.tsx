"use client";

import { useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import { claimDuckDuckGoAccess } from "./actions";
import { ArrowRight, Check } from "iconoir-react";

export default function DdgPage() {
  const { isSignedIn } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = (formData.get("email") as string).trim().toLowerCase();
    const result = await claimDuckDuckGoAccess(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result.success) {
      handleRedirect(email);
    }
  }

  const handleRedirect = (email: string) => {
    setIsRedirecting(true);
    
    // If not signed in, redirect to sign-up with direct enrollment API as redirect_url
    if (!isSignedIn) {
      const returnUrl = `/course/enroll-ddg`;
      const signUpUrl = `/sign-up?redirect_url=${encodeURIComponent(returnUrl)}&email_address=${encodeURIComponent(email)}`;
      window.location.href = signUpUrl;
      return;
    }
    
    // If signed in, go directly to enrollment handler
    window.location.href = `/course/enroll-ddg`;
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black font-sans text-neutral-900 dark:text-white flex flex-col relative overflow-hidden">
      
      {/* Vertical grid lines - positioned so a line falls at viewport center */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #80808012 1px, transparent 1px)',
          backgroundSize: '32px 100%',
          backgroundPosition: 'calc(50% - 16px) 0'
        }}
      />

      <main className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        <div className="w-[448px] max-w-full">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center size-16 rounded-full mb-8 shadow-xl">
               <img src="/ddg-logo.svg" alt="DuckDuckGo" className="size-16" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Hello, Colleague! 👋</h1>
            <p className="text-neutral-900/80 text-lg">
              Unlock free lifetime access to the full Design Engineer course using your DuckDuckGo email.
            </p>
          </div>

          <div className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 shadow-2xl relative">
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-swiss-red" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-swiss-red" />

            <form onSubmit={onSubmit} className="space-y-8">
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider h-8 text-neutral-500">
                  DuckDuckGo Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="you@duckduckgo.com"
                  disabled={isLoading || isRedirecting}
                  className="w-full h-16 bg-neutral-100 border-2 border-transparent px-4 focus:border-[#DE5833] focus:ring-0 outline-none transition-all font-medium"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || isRedirecting}
                className="w-full h-16 bg-black text-white font-bold uppercase tracking-wide hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {isLoading || isRedirecting ? (isRedirecting ? "Redirecting..." : "Verifying...") : "Get Free Access"}
                {!(isLoading || isRedirecting) && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      </main>
      
      <div className="absolute bottom-6 left-0 w-full text-center text-white/40 text-xs">
         Internal use only. Please do not share this URL externally.
      </div>
    </div>
  );
}
