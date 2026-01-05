"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { Home, Settings, User, Bell, Search, Menu } from "lucide-react";

type IconSize = 16 | 20 | 24 | 32 | 48 | 64;

export function IconSizingDemo() {
  const [size, setSize] = useState<IconSize>(24);

  const getUsageContext = (s: IconSize) => {
    switch (s) {
      case 16: return "Inline with text, tight spaces, dense data tables";
      case 20: return "Secondary actions, small buttons, form field icons";
      case 24: return "Standard UI icons, primary buttons, navigation items";
      case 32: return "Large buttons, featured list items, mobile touch targets";
      case 48: return "Feature highlights, empty state illustrations, avatars";
      case 64: return "Hero sections, major feature callouts, splash screens";
    }
  };

  return (
    <ExampleWrapper
      title="Icon Sizing"
      description="See how icon size affects hierarchy and usage context"
      controls={
        <ControlGroup label="Size (px)">
          {[16, 20, 24, 32, 48, 64].map((s) => (
            <ControlButton
              key={s}
              active={size === s}
              onClick={() => setSize(s as IconSize)}
            >
              {s}
            </ControlButton>
          ))}
        </ControlGroup>
      }
    >
      <div className="flex flex-col items-center justify-center gap-8 py-8">
        {/* Grid of icons at current size */}
        <div className="flex flex-wrap items-center justify-center gap-6 p-8 rounded-xl bg-neutral-50 border border-dashed border-neutral-200 dark:bg-neutral-900/50 dark:border-neutral-800">
          <Home size={size} strokeWidth={1.5} className="text-neutral-900 dark:text-white" />
          <Settings size={size} strokeWidth={1.5} className="text-neutral-900 dark:text-white" />
          <User size={size} strokeWidth={1.5} className="text-neutral-900 dark:text-white" />
          <Bell size={size} strokeWidth={1.5} className="text-neutral-900 dark:text-white" />
          <Search size={size} strokeWidth={1.5} className="text-neutral-900 dark:text-white" />
          <Menu size={size} strokeWidth={1.5} className="text-neutral-900 dark:text-white" />
        </div>

        {/* Context description */}
        <div className="text-center max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium mb-3 dark:bg-blue-900/30 dark:text-blue-300">
            Recommended Usage
          </div>
          <p className="text-neutral-600 dark:text-neutral-400 font-medium">
            {getUsageContext(size)}
          </p>
        </div>

        {/* Real-world example based on size */}
        <div className="w-full max-w-sm border-t border-neutral-200 pt-8 dark:border-neutral-800">
          <p className="text-xs text-neutral-500 uppercase tracking-widest text-center mb-4">In Context</p>
          
          <div className="bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden dark:bg-neutral-950 dark:border-neutral-800">
            {size <= 20 && (
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 dark:border-neutral-900">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Dense Table Row</span>
                <div className="flex gap-2">
                   <button className="p-1 hover:bg-neutral-100 rounded dark:hover:bg-neutral-900">
                     <Settings size={size} className="text-neutral-400" />
                   </button>
                   <button className="p-1 hover:bg-neutral-100 rounded dark:hover:bg-neutral-900">
                     <User size={size} className="text-neutral-400" />
                   </button>
                </div>
              </div>
            )}
            
            {(size === 24 || size === 32) && (
              <div className="p-4 flex items-center gap-4">
                <button className="flex items-center justify-center gap-2 w-full bg-neutral-900 text-white rounded-lg py-2.5 px-4 dark:bg-white dark:text-neutral-900">
                  <Search size={size} />
                  <span className={size === 32 ? "text-lg" : "text-base"}>Search Now</span>
                </button>
              </div>
            )}
            
            {size >= 48 && (
              <div className="p-8 text-center flex flex-col items-center">
                <div className="bg-neutral-100 p-4 rounded-full mb-4 dark:bg-neutral-900">
                  <Bell size={size} className="text-neutral-400" />
                </div>
                <h4 className="text-lg font-bold text-neutral-900 dark:text-white">No Notifications</h4>
                <p className="text-sm text-neutral-500 mt-1">We'll let you know when something arrives.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ExampleWrapper>
  );
}

