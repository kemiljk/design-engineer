"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { cn } from "@/lib/utils";
import { NavArrowRight } from "iconoir-react";

type Type = "hidden" | "false" | "clear";

export function AffordancesSignifiersDemo() {
  const [type, setType] = useState<Type>("clear");

  return (
    <ExampleWrapper
      title="Affordances & Signifiers"
      description="How design communicates interactivity"
      controls={
        <ControlGroup label="Type">
          <ControlButton active={type === "hidden"} onClick={() => setType("hidden")}>Hidden (Poor)</ControlButton>
          <ControlButton active={type === "false"} onClick={() => setType("false")}>False (Confusing)</ControlButton>
          <ControlButton active={type === "clear"} onClick={() => setType("clear")}>Clear (Good)</ControlButton>
        </ControlGroup>
      }
    >
      <div className="flex flex-col gap-8 items-center py-6">
        
        {/* The Example UI */}
        <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-6 dark:bg-neutral-950 dark:border-neutral-800">
          
          <div className="space-y-4">
             <h3 className="font-bold text-lg">Payment Methods</h3>
             
             {/* Card Option 1 */}
             <div className={cn(
               "p-4 rounded-lg flex justify-between items-center transition-all",
               type === "hidden" ? "bg-neutral-50" : "", // No signifiers
               type === "false" ? "bg-blue-600 text-white shadow-md cursor-default" : "", // Looks clickable but isn't
               type === "clear" ? "bg-white border border-neutral-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer shadow-sm dark:bg-neutral-900 dark:border-neutral-800 dark:hover:border-blue-500" : "" // Clear signifiers
             )}>
                <div className="flex gap-3 items-center">
                   <div className="w-8 h-5 bg-neutral-200 rounded dark:bg-neutral-700"></div>
                   <div className="font-medium">Visa •••• 4242</div>
                </div>
                {type === "clear" && <NavArrowRight width={20} height={20} className="text-neutral-400" />}
             </div>

             {/* Card Option 2 */}
             <div className={cn(
               "p-4 rounded-lg flex justify-between items-center transition-all",
                type === "hidden" ? "bg-neutral-50" : "",
                type === "false" ? "bg-white border-2 border-blue-600 cursor-default" : "",
                type === "clear" ? "bg-white border border-neutral-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer shadow-sm dark:bg-neutral-900 dark:border-neutral-800 dark:hover:border-blue-500" : ""
             )}>
                <div className="flex gap-3 items-center">
                   <div className="w-8 h-5 bg-neutral-200 rounded dark:bg-neutral-700"></div>
                   <div className="font-medium">Mastercard •••• 8888</div>
                </div>
                {type === "clear" && <NavArrowRight width={20} height={20} className="text-neutral-400" />}
             </div>
          </div>

          <button className={cn(
            "w-full py-3 rounded-lg font-bold text-center transition-all",
            type === "hidden" ? "text-blue-600" : "", // Just text
            type === "false" ? "bg-neutral-200 text-neutral-400 cursor-not-allowed" : "", // Disabled look but clickable? (Confusing)
            type === "clear" ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md active:transform active:scale-[0.98]" : ""
          )}>
            {type === "false" ? "Processing..." : "Confirm Payment"}
          </button>

        </div>

        {/* Explanation */}
        <div className="max-w-sm w-full p-4 rounded-lg bg-neutral-50 border border-neutral-100 dark:bg-neutral-900 dark:border-neutral-800">
           <h4 className="text-sm font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
             {type === "hidden" && "🚫 Hidden Affordance"}
             {type === "false" && "🤥 False Affordance"}
             {type === "clear" && "✅ Clear Signifiers"}
           </h4>
           <p className="text-sm text-neutral-600 dark:text-neutral-400">
             {type === "hidden" && "The items are clickable, but they look like static text. Users have to guess (interact) to discover capabilities."}
             {type === "false" && "Elements look interactive (bright colors, borders) but aren't. The button looks disabled but might be the primary action? Confusing."}
             {type === "clear" && "Visual cues (borders, icons, shadows) signal what can be clicked. Hover states confirm the affordance."}
           </p>
        </div>

      </div>
    </ExampleWrapper>
  );
}

