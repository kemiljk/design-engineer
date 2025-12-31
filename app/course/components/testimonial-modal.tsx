"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Xmark, StarSolid, SendDiagonal } from "iconoir-react";
import type { CertificateTrack, CertificatePlatform, Testimonial } from "@/lib/types";

interface TestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
  trackCompleted: CertificateTrack;
  platformCompleted: CertificatePlatform;
  userName?: string;
  userPhotoUrl?: string;
}

export function TestimonialModal({
  isOpen,
  onClose,
  trackCompleted,
  platformCompleted,
  userName,
  userPhotoUrl,
}: TestimonialModalProps) {
  const [content, setContent] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingTestimonial, setExistingTestimonial] = useState<Testimonial | null>(null);

  // Check for existing testimonial on mount
  useEffect(() => {
    if (isOpen) {
      fetch("/api/course/testimonial")
        .then((res) => res.json())
        .then((data) => {
          if (data.testimonial) {
            setExistingTestimonial(data.testimonial);
            setContent(data.testimonial.metadata.content);
            setRole(data.testimonial.metadata.user_role || "");
            setCompany(data.testimonial.metadata.user_company || "");
          }
        })
        .catch(console.error);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (content.trim().length < 10) {
      setError("Please write at least 10 characters");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/course/testimonial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content.trim(),
          trackCompleted,
          platformCompleted,
          role: role.trim() || undefined,
          company: company.trim() || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit");
      }

      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setContent("");
        setRole("");
        setCompany("");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const trackName = trackCompleted === "design" 
    ? "Design Track" 
    : trackCompleted === "engineering" 
      ? "Engineering Track" 
      : "Convergence";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4"
          >
            <div className="overflow-hidden border-2 border-neutral-900 bg-white shadow-2xl dark:border-neutral-100 dark:bg-neutral-900">
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-neutral-900 bg-neutral-900 px-6 py-4 dark:border-neutral-100 dark:bg-neutral-100">
                <div className="flex items-center gap-3">
                  <StarSolid className="h-5 w-5 text-yellow-400" />
                  <h2 className="font-bold text-white dark:text-neutral-900">
                    Share Your Experience
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-neutral-400 transition-colors hover:text-white dark:hover:text-neutral-900"
                >
                  <Xmark className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center p-12 text-center"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center bg-green-100 dark:bg-green-900/30">
                    <StarSolid className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Thank You!</h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Your testimonial has been submitted for review.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6">
                  <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
                    Congratulations on completing the <strong>{trackName}</strong>! 
                    We&apos;d love to hear about your experience. Your feedback helps 
                    others discover the course.
                  </p>

                  {/* Preview */}
                  <div className="mb-6 flex items-start gap-3 rounded-none border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
                    {userPhotoUrl ? (
                      <img
                        src={userPhotoUrl}
                        alt={userName || "User"}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-swiss-red text-sm font-bold text-white">
                        {userName?.charAt(0) || "?"}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {userName || "Anonymous"}
                      </p>
                      <p className="text-xs text-neutral-500">
                        Completed {trackName}
                      </p>
                    </div>
                  </div>

                  {/* Testimonial Input */}
                  <div className="mb-4">
                    <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Your Testimonial <span className="text-swiss-red">*</span>
                    </label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="What did you learn? How has the course helped you?"
                      rows={4}
                      maxLength={500}
                      className="w-full resize-none rounded-none border border-neutral-300 bg-white px-4 py-3 text-sm focus:border-swiss-red focus:outline-none focus:ring-1 focus:ring-swiss-red dark:border-neutral-600 dark:bg-neutral-800"
                    />
                    <div className="mt-1 flex justify-between text-xs text-neutral-500">
                      <span>{content.length < 10 ? `${10 - content.length} more characters needed` : "Looking good!"}</span>
                      <span>{content.length}/500</span>
                    </div>
                  </div>

                  {/* Optional fields */}
                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Role <span className="text-neutral-400">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="e.g. Product Designer"
                        maxLength={50}
                        className="w-full rounded-none border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-swiss-red focus:outline-none dark:border-neutral-600 dark:bg-neutral-800"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Company <span className="text-neutral-400">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Acme Inc"
                        maxLength={50}
                        className="w-full rounded-none border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-swiss-red focus:outline-none dark:border-neutral-600 dark:bg-neutral-800"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="mb-4 rounded-none border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                      {error}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                    >
                      Maybe later
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || content.trim().length < 10}
                      className="flex items-center gap-2 bg-swiss-red px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-swiss-red/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          <SendDiagonal className="h-4 w-4" />
                          {existingTestimonial ? "Update Testimonial" : "Submit Testimonial"}
                        </>
                      )}
                    </button>
                  </div>

                  <p className="mt-4 text-center text-xs text-neutral-400">
                    Your testimonial will be reviewed before being published
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

