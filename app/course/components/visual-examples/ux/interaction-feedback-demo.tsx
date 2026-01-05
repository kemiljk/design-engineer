"use client";

import React, { useState, useEffect } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { cn } from "@/lib/utils";
import { Check, RefreshDouble as Loader, Xmark } from "iconoir-react";

type FeedbackType = "none" | "delayed" | "immediate";

export function InteractionFeedbackDemo() {
  const [type, setType] = useState<FeedbackType>("immediate");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleClick = () => {
    if (status !== "idle") return;

    if (type === "none") {
      // No feedback at all
      setTimeout(() => {
        // Silent completion
      }, 1000);
    } else if (type === "delayed") {
      // Freeze then jump
      // Simulating a synchronous block or lag
      setTimeout(() => {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 2000);
      }, 1000);
    } else if (type === "immediate") {
      // Instant acknowledgment
      setStatus("loading");
      setTimeout(() => {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 2000);
      }, 1000);
    }
  };

  return (
    <ExampleWrapper
      title="Interaction Feedback"
      description="Closing the loop between user action and system response"
      controls={
        <ControlGroup label="Response">
          <ControlButton active={type === "none"} onClick={() => setType("none")}>None (Broken)</ControlButton>
          <ControlButton active={type === "delayed"} onClick={() => setType("delayed")}>Delayed (Laggy)</ControlButton>
          <ControlButton active={type === "immediate"} onClick={() => setType("immediate")}>Immediate (Responsive)</ControlButton>
        </ControlGroup>
      }
    >
      <div className="flex flex-col items-center justify-center gap-8 py-10 min-h-[250px]">
        
        <button
          onClick={handleClick}
          className={cn(
            "relative h-14 w-48 rounded-full font-bold text-lg transition-all shadow-lg overflow-hidden",
            status === "success" ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95",
            type === "delayed" && status === "idle" && "active:bg-blue-600 active:scale-100" // Remove tactile feedback for delayed
          )}
        >
          <div className="flex items-center justify-center gap-2">
            {status === "loading" && <Loader className="animate-spin" width={20} height={20} />}
            {status === "success" && <Check className="animate-in zoom-in spin-in-45" />}
            <span>
              {status === "idle" && "Save Changes"}
              {status === "loading" && "Saving..."}
              {status === "success" && "Saved!"}
            </span>
          </div>
          
          {/* Progress Bar for immediate */}
          {status === "loading" && (
            <div className="absolute bottom-0 left-0 h-1 bg-white/30 animate-progress w-full origin-left"></div>
          )}
        </button>

        <div className="max-w-md text-center text-sm text-neutral-500 min-h-[3rem]">
           {type === "none" && "Clicking does nothing visible. Did it work? Is it broken? The user has no idea."}
           {type === "delayed" && "The system works, but feels unresponsive. Users might click multiple times in frustration."}
           {type === "immediate" && "Button acknowledges click instantly (tactile). Loader confirms processing. Success state confirms completion."}
        </div>

      </div>
    </ExampleWrapper>
  );
}

