"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { cn } from "@/lib/utils";
import { ArrowRight, Trash, Mail, Plus } from "iconoir-react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export function ComponentVariantsDemo() {
  const [variant, setVariant] = useState<Variant>("primary");
  const [size, setSize] = useState<Size>("md");

  const getButtonClass = () => {
    const base = "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm focus:ring-blue-500",
      secondary: "bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm focus:ring-neutral-900 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200",
      outline: "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 focus:ring-neutral-200 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800",
      ghost: "text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm focus:ring-red-500",
    };
    
    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };

    return cn(base, variants[variant], sizes[size]);
  };

  return (
    <ExampleWrapper
      title="Component Variants"
      description="Semantic variations and size options for a single component"
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <ControlGroup label="Variant">
            {(["primary", "secondary", "outline", "ghost", "danger"] as Variant[]).map((v) => (
              <ControlButton key={v} active={variant === v} onClick={() => setVariant(v)}>
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </ControlButton>
            ))}
          </ControlGroup>
          <ControlGroup label="Size">
            {(["sm", "md", "lg"] as Size[]).map((s) => (
              <ControlButton key={s} active={size === s} onClick={() => setSize(s)}>
                {s.toUpperCase()}
              </ControlButton>
            ))}
          </ControlGroup>
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center gap-12 py-8">
        
        {/* The Button Playground */}
        <div className="flex items-center gap-4">
          <button className={getButtonClass()}>
            {variant === "danger" ? <Trash width={size === "sm" ? 14 : size === "md" ? 16 : 18} height={size === "sm" ? 14 : size === "md" ? 16 : 18} /> : 
             variant === "outline" ? <Mail width={size === "sm" ? 14 : size === "md" ? 16 : 18} height={size === "sm" ? 14 : size === "md" ? 16 : 18} /> :
             variant === "primary" ? <Plus width={size === "sm" ? 14 : size === "md" ? 16 : 18} height={size === "sm" ? 14 : size === "md" ? 16 : 18} /> : null}
            
            <span>
              {variant === "danger" ? "Delete Item" : 
               variant === "outline" ? "Email Team" :
                  variant === "primary" ? "Create New" :
                    variant === "secondary" ? "Learn More" :
                      variant === "ghost" ? "View Details" : null}
            </span>
            
            {variant === "ghost" && <ArrowRight width={size === "sm" ? 14 : size === "md" ? 16 : 18} height={size === "sm" ? 14 : size === "md" ? 16 : 18} className="text-neutral-600 dark:text-neutral-400" />}
          </button>
        </div>

        {/* Code Snippet */}
        <div className="w-full max-w-md bg-neutral-900 rounded-lg p-4 font-mono text-xs text-blue-100 overflow-x-auto">
          <div><span className="text-pink-400">&lt;Button</span></div>
          <div className="pl-4">
            <span className="text-blue-300">variant</span>=<span className="text-green-300">"{variant}"</span>
          </div>
          <div className="pl-4">
            <span className="text-blue-300">size</span>=<span className="text-green-300">"{size}"</span>
          </div>
          {variant !== "ghost" && (
             <div className="pl-4">
               <span className="text-blue-300">iconLeft</span>=&#123;<span className="text-yellow-300">{variant === "danger" ? "Trash" : "Icon"}</span>&#125;
             </div>
          )}
          <div><span className="text-pink-400">/&gt;</span></div>
        </div>
      </div>
    </ExampleWrapper>
  );
}

