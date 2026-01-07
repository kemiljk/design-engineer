"use client";

import React, { createContext, useContext, useState } from "react";
import { ExampleWrapper } from "../base/example-wrapper";

// Tabs Context
interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tab components must be used within Tabs");
  return context;
}

// Compound Components
interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  onChange?: (value: string) => void;
}

function Tabs({ defaultValue, children, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onChange?.(value);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800"
      role="tablist"
    >
      {children}
    </div>
  );
}

interface TabProps {
  value: string;
  children: React.ReactNode;
}

function Tab({ value, children }: TabProps) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => setActiveTab(value)}
      className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
        isActive
          ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white"
          : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

interface TabPanelProps {
  value: string;
  children: React.ReactNode;
}

function TabPanel({ value, children }: TabPanelProps) {
  const { activeTab } = useTabs();

  if (activeTab !== value) return null;

  return (
    <div role="tabpanel" className="mt-4 animate-in fade-in duration-200">
      {children}
    </div>
  );
}

export function TabsDemo() {
  const [eventLog, setEventLog] = useState<string[]>([]);

  const log = (tab: string) => {
    setEventLog((prev) => [...prev.slice(-3), `Tab changed to: ${tab}`]);
  };

  return (
    <ExampleWrapper
      title="Compound Components: Tabs"
      description="Related components sharing state through React Context"
    >
      <div className="space-y-6">
        {/* Live Example */}
        <div>
          <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Try It
          </h4>
          <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
            <Tabs defaultValue="overview" onChange={log}>
              <TabList>
                <Tab value="overview">Overview</Tab>
                <Tab value="features">Features</Tab>
                <Tab value="pricing">Pricing</Tab>
              </TabList>

              <TabPanel value="overview">
                <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                  <h3 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">
                    Product Overview
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    A powerful tool for building modern web applications. Built
                    with React and designed for developer experience.
                  </p>
                </div>
              </TabPanel>

              <TabPanel value="features">
                <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
                  <h3 className="mb-2 font-semibold text-green-900 dark:text-green-100">
                    Key Features
                  </h3>
                  <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
                    <li>✓ Component-based architecture</li>
                    <li>✓ Type-safe with TypeScript</li>
                    <li>✓ Accessible by default</li>
                    <li>✓ Customisable styling</li>
                  </ul>
                </div>
              </TabPanel>

              <TabPanel value="pricing">
                <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
                  <h3 className="mb-2 font-semibold text-amber-900 dark:text-amber-100">
                    Pricing Plans
                  </h3>
                  <div className="flex gap-3 text-sm">
                    <div className="flex-1 rounded bg-white p-3 dark:bg-neutral-800">
                      <div className="font-medium text-amber-900 dark:text-amber-100">
                        Free
                      </div>
                      <div className="text-amber-700 dark:text-amber-300">
                        £0/month
                      </div>
                    </div>
                    <div className="flex-1 rounded bg-white p-3 dark:bg-neutral-800">
                      <div className="font-medium text-amber-900 dark:text-amber-100">
                        Pro
                      </div>
                      <div className="text-amber-700 dark:text-amber-300">
                        £19/month
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>

          {/* Event Log */}
          <div className="mt-4">
            <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
              Event Log
            </h4>
            <div className="h-[60px] overflow-y-auto rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
              {eventLog.length === 0 ? (
                <p className="text-xs text-neutral-500">
                  Click tabs to see events...
                </p>
              ) : (
                <div className="space-y-1">
                  {eventLog.map((event, i) => (
                    <div
                      key={i}
                      className={`font-mono text-xs ${
                        i === eventLog.length - 1
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-neutral-500"
                      }`}
                    >
                      {event}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="space-y-4">
          <h4 className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            How It Works
          </h4>

          {/* Architecture - horizontal on larger screens */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
              <div className="mb-1 font-mono text-xs text-purple-600 dark:text-purple-400">
                {"<Tabs>"}
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Parent wrapper. Creates Context and manages active tab state.
              </p>
            </div>

            <div className="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
              <div className="mb-1 font-mono text-xs text-blue-600 dark:text-blue-400">
                {"<TabList>"}
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Container for tab buttons. Adds proper ARIA role.
              </p>
            </div>

            <div className="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
              <div className="mb-1 font-mono text-xs text-green-600 dark:text-green-400">
                {"<Tab value='x'>"}
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Individual tab button. Reads/writes to shared Context.
              </p>
            </div>

            <div className="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
              <div className="mb-1 font-mono text-xs text-amber-600 dark:text-amber-400">
                {"<TabPanel value='x'>"}
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Content panel. Only renders when value matches active tab.
              </p>
            </div>
          </div>

          {/* Key Insight */}
          <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>Compound components</strong> share implicit state through
              React Context. The parent manages state; children read and update
              it. This gives consumers a clean, declarative API while keeping
              state coordination internal.
            </p>
          </div>

          {/* Usage Code */}
          <div>
            <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
              Usage
            </h4>
            <div className="overflow-hidden rounded-lg bg-neutral-900 p-4">
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-neutral-300">
                {`<Tabs defaultValue="overview">
  <TabList>
    <Tab value="overview">Overview</Tab>
    <Tab value="features">Features</Tab>
  </TabList>
  
  <TabPanel value="overview">
    Overview content...
  </TabPanel>
  <TabPanel value="features">
    Features content...
  </TabPanel>
</Tabs>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </ExampleWrapper>
  );
}

