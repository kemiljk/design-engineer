"use client";

import { useState } from "react";
import { claimDuckDuckGoAccess } from "./actions";
import { Lock, ArrowRight, Check, Rocket } from "iconoir-react";
import { cn } from "@/lib/utils";

const PRODUCT_VARIANT_ID = process.env.NEXT_PUBLIC_LEMON_PRODUCT_FULL;

export default function DdgPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discountCode, setDiscountCode] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await claimDuckDuckGoAccess(formData);

    if (result.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result.code) {
      setDiscountCode(result.code);
      setIsLoading(false);
    }
  }

  const handleClaim = () => {
    if (!PRODUCT_VARIANT_ID || !discountCode) return;
    window.location.href = `https://designengineer.lemonsqueezy.com/checkout/buy/${PRODUCT_VARIANT_ID}?discount=${discountCode}`;
  };

  return (
    <div className="min-h-screen bg-[#DE5833] font-sans text-white flex flex-col relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="max-w-md w-full">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-[#DE5833] rounded-full mb-6 shadow-xl">
               <Rocket className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-bold mb-3">Hello, Colleague! 👋</h1>
            <p className="text-white/80 text-lg">
              Unlock free lifetime access to the full Design Engineer course using your DuckDuckGo email.
            </p>
          </div>

          {!discountCode ? (
            <div className="bg-white text-neutral-900 p-8 shadow-2xl rounded-none relative">
               <div className="absolute top-0 left-0 w-full h-1 bg-black/10" />

              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider mb-2 text-neutral-500">
                    DuckDuckGo Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="you@duckduckgo.com"
                    className="w-full bg-neutral-100 border-2 border-transparent px-4 py-3 focus:border-[#DE5833] focus:ring-0 outline-none transition-all font-medium"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white py-4 font-bold uppercase tracking-wide hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                >
                  {isLoading ? "Verifying..." : "Get Free Access"}
                  {!isLoading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </div>
          ) : (
             <div className="bg-white text-neutral-900 p-8 shadow-2xl rounded-none animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 text-green-600 rounded-full mb-4">
                        <Check className="w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Access Granted!</h2>
                    <p className="text-neutral-500 mb-6 text-sm">
                        Your 100% off code is ready.
                    </p>

                    <div className="bg-neutral-100 p-4 mb-6 rounded border border-neutral-200">
                        <code className="text-xl font-mono font-bold tracking-wider">{discountCode}</code>
                    </div>

                    <button
                      onClick={handleClaim}
                      className="w-full bg-[#DE5833] text-white py-4 font-bold uppercase tracking-wide hover:bg-[#c44926] transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                      Activate Enrollment
                    </button>
                    <p className="mt-4 text-xs text-neutral-400">
                        Clicking above will take you to a free checkout page.
                    </p>
                </div>
             </div>
          )}
        </div>
      </main>
      
      <div className="absolute bottom-6 left-0 w-full text-center text-white/40 text-xs">
         Internal use only. Please do not share this URL externally.
      </div>
    </div>
  );
}
