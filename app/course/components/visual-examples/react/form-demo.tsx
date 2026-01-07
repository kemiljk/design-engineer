"use client";

import React, { useState } from "react";
import { ExampleWrapper } from "../base/example-wrapper";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  as?: "input" | "textarea";
  placeholder?: string;
}

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  required,
  as = "input",
  placeholder,
}: FormFieldProps) {
  const Component = as;
  const inputId = `field-${name}`;
  const errorId = `${name}-error`;

  return (
    <div className="space-y-1">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <Component
        id={inputId}
        name={name}
        type={as === "input" ? type : undefined}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            : "border-neutral-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-neutral-600"
        } dark:bg-neutral-700 dark:text-white`}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? "true" : undefined}
        rows={as === "textarea" ? 3 : undefined}
      />

      {error && (
        <p
          id={errorId}
          className="flex items-center gap-1 text-xs text-red-600 dark:text-red-400"
          role="alert"
        >
          <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function FormDemo() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = (data: FormData): FormErrors => {
    const newErrors: FormErrors = {};

    if (!data.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!data.message.trim()) {
      newErrors.message = "Message is required";
    } else if (data.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing (if field was touched)
    if (touched[name] && errors[name as keyof FormErrors]) {
      const newErrors = validate({ ...formData, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate on blur
    const newErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FormErrors] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({ name: true, email: true, message: true });

    // Validate all
    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitStatus("success");
    setFormData({ name: "", email: "", message: "" });
    setTouched({});
    setErrors({});

    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
    setTouched({});
    setSubmitStatus("idle");
  };

  return (
    <ExampleWrapper
      title="Form Component"
      description="Controlled form with validation, error states, and submission handling"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <div className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-800">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <FormField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name ? errors.name : undefined}
              placeholder="Your name"
              required
            />

            <FormField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email ? errors.email : undefined}
              placeholder="you@example.com"
              required
            />

            <FormField
              label="Message"
              name="message"
              as="textarea"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.message ? errors.message : undefined}
              placeholder="Your message (min 10 characters)"
              required
            />

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>

            {submitStatus === "success" && (
              <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                <p className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Form submitted successfully!
                </p>
              </div>
            )}
          </form>
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          {/* Current State */}
          <div>
            <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
              Form State
            </h4>
            <div className="overflow-hidden rounded-lg bg-neutral-900 p-4">
              <pre className="overflow-x-auto font-mono text-xs text-neutral-300">
                {JSON.stringify(
                  {
                    values: formData,
                    errors,
                    touched,
                    isSubmitting,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>

          {/* Validation Rules */}
          <div>
            <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
              Validation Rules
            </h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
                <span className="mt-0.5 text-xs">📝</span>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  <strong>Name:</strong> Required, cannot be empty
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
                <span className="mt-0.5 text-xs">✉️</span>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  <strong>Email:</strong> Required, must be valid format
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
                <span className="mt-0.5 text-xs">💬</span>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  <strong>Message:</strong> Required, minimum 10 characters
                </div>
              </div>
            </div>
          </div>

          {/* Key Insight */}
          <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>Controlled components:</strong> React state is the single
              source of truth. Every keystroke updates state, which re-renders
              the input with the new value.
            </p>
          </div>
        </div>
      </div>
    </ExampleWrapper>
  );
}

