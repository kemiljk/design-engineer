"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { cn } from "@/lib/utils";
import { RefreshDouble as Loader } from "iconoir-react";

type State = "default" | "hover" | "focus" | "active" | "disabled" | "loading";

export function ComponentStatesDemo() {
  const [state, setState] = useState<State>("default");

  return (
    <ExampleWrapper
      title="Component States"
      description="Interactive states communicate availability and feedback"
      controls={
        <div className="flex flex-wrap gap-2">
          {(["default", "hover", "focus", "active", "disabled", "loading"] as State[]).map((s) => (
            <ControlButton key={s} active={state === s} onClick={() => setState(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </ControlButton>
          ))}
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center gap-12 py-8 min-h-[300px]">
        
        {/* The Component Visualisation */}
        <div className="relative">
           {/* Focus Ring Visualisation (for demo purposes) */}
           {state === "focus" && (
             <div className="absolute -inset-1 rounded-lg border-2 border-blue-500 animate-pulse"></div>
           )}
           
           <button
             disabled={state === "disabled" || state === "loading"}
             className={cn(
               "relative h-12 px-6 rounded-md font-medium text-white transition-all duration-200 flex items-center gap-2",
               // Base styles simulating the "Default" state
               "bg-blue-600 shadow-sm",
               
               // Interactive State Simulations
               state === "hover" && "bg-blue-700 shadow-md translate-y-[-1px]",
               state === "active" && "bg-blue-800 shadow-inner translate-y-[1px]",
               state === "disabled" && "bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none dark:bg-neutral-800 dark:text-neutral-600",
               state === "loading" && "bg-blue-600/80 cursor-wait",
               state === "focus" && "ring-2 ring-white ring-offset-2 ring-offset-blue-600" // Browser focus simulation
             )}
             // Prevent actual interactions from overriding the demo state
             style={{ pointerEvents: 'none' }}
           >
             {state === "loading" && <Loader className="animate-spin" width={18} height={18} />}
             <span>Submit Request</span>
           </button>
           
           {/* Cursor Simulation */}
           <div className={cn(
             "absolute top-1/2 left-1/2 w-4 h-4 ml-8 mt-4 pointer-events-none transition-all duration-300 z-50",
             state === "hover" || state === "active" ? "opacity-100" : "opacity-0"
           )}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.5 3.5L11.5 19.5L14.5 13.5L20.5 10.5L5.5 3.5Z" fill="black" stroke="white" strokeWidth="1.5"/>
              </svg>
           </div>
        </div>

        {/* State Description */}
        <div className="w-full max-w-sm text-center">
           <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
             {state.charAt(0).toUpperCase() + state.slice(1)} State
           </h4>
           <p className="text-sm text-neutral-600 dark:text-neutral-400">
             {state === "default" && "The normal resting state. Clear, accessible, and ready for interaction."}
             {state === "hover" && "Indicates interactivity when a pointing device is over the element."}
             {state === "focus" && "Critical for keyboard navigation. Shows which element receives input."}
             {state === "active" && "The moment of interaction (click/tap). Provides immediate tactile feedback."}
             {state === "disabled" && "Cannot be interacted with. Often communicates that a requirement isn't met."}
             {state === "loading" && "Processing an action. Prevents double-submission and assures the user."}
           </p>
        </div>
      </div>
    </ExampleWrapper>
  );
}

