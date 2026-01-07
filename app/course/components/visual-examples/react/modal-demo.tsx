"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { ExampleWrapper } from "../base/example-wrapper";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      modalRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-xl bg-white shadow-2xl dark:bg-neutral-800 animate-in fade-in zoom-in-95 duration-200"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 p-4 dark:border-neutral-700">
          <h2
            id="modal-title"
            className="text-lg font-semibold text-neutral-900 dark:text-white"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );

  // Use portal to render outside the component tree
  if (typeof window !== "undefined") {
    return createPortal(modalContent, document.body);
  }
  return null;
}

export function ModalDemo() {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [eventLog, setEventLog] = useState<string[]>([]);

  const log = useCallback((message: string) => {
    setEventLog((prev) => [...prev.slice(-4), message]);
  }, []);

  const handleBasicOpen = () => {
    log("Modal opened");
    setBasicModalOpen(true);
  };

  const handleBasicClose = () => {
    log("Modal closed");
    setBasicModalOpen(false);
  };

  const handleConfirm = () => {
    log("Action confirmed!");
    setConfirmModalOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    log("Form submitted");
    setFormModalOpen(false);
  };

  return (
    <ExampleWrapper
      title="Modal Component"
      description="Accessible modals with focus management and keyboard support"
    >
      <div className="space-y-6">
        {/* Trigger Buttons */}
        <div>
          <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Modal Types
          </h4>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleBasicOpen}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Basic Modal
            </button>
            <button
              onClick={() => {
                log("Confirmation requested");
                setConfirmModalOpen(true);
              }}
              className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
            >
              Confirmation Dialog
            </button>
            <button
              onClick={() => {
                log("Form modal opened");
                setFormModalOpen(true);
              }}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Form Modal
            </button>
          </div>
        </div>

        {/* Event Log */}
        <div>
          <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Event Log
          </h4>
          <div className="h-[120px] overflow-y-auto rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
            {eventLog.length === 0 ? (
              <p className="text-sm text-neutral-500">
                Open a modal to see events...
              </p>
            ) : (
              <div className="space-y-1">
                {eventLog.map((event, i) => (
                  <div
                    key={i}
                    className={`rounded px-2 py-1 font-mono text-xs ${
                      i === eventLog.length - 1
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        : "text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {event}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
            <div className="mb-1 text-sm font-medium text-neutral-900 dark:text-white">
              🎯 Focus Trap
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Tab cycles within modal only
            </p>
          </div>
          <div className="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
            <div className="mb-1 text-sm font-medium text-neutral-900 dark:text-white">
              ⌨️ Escape to Close
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Press Esc to dismiss
            </p>
          </div>
          <div className="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
            <div className="mb-1 text-sm font-medium text-neutral-900 dark:text-white">
              🔙 Focus Restore
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Returns focus on close
            </p>
          </div>
        </div>

        {/* Key Insight */}
        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <p className="text-sm text-green-800 dark:text-green-200">
            <strong>Portal magic:</strong> React's{" "}
            <code className="rounded bg-green-200 px-1 dark:bg-green-800">
              createPortal
            </code>{" "}
            renders the modal outside the parent DOM tree (directly in{" "}
            <code className="rounded bg-green-200 px-1 dark:bg-green-800">
              {"<body>"}
            </code>
            ) while keeping React context and state intact.
          </p>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={basicModalOpen}
        onClose={handleBasicClose}
        title="Basic Modal"
      >
        <p className="mb-4 text-neutral-600 dark:text-neutral-400">
          This is a basic modal with a title and content. Click outside, press
          Escape, or click the X to close.
        </p>
        <button
          onClick={handleBasicClose}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Got it
        </button>
      </Modal>

      <Modal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title="Confirm Action"
      >
        <p className="mb-4 text-neutral-600 dark:text-neutral-400">
          Are you sure you want to proceed? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              log("Action cancelled");
              setConfirmModalOpen(false);
            }}
            className="flex-1 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        title="Contact Form"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
              placeholder="you@example.com"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setFormModalOpen(false)}
              className="flex-1 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </ExampleWrapper>
  );
}

