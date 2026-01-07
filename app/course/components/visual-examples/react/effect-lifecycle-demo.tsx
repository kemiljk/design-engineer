"use client";

import React, { useState, useEffect, useRef } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { Play, Pause, RefreshDouble } from "iconoir-react";

type LogEntry = {
  type: "mount" | "effect" | "cleanup" | "update";
  message: string;
  timestamp: number;
};

export function EffectLifecycleDemo() {
  const [userId, setUserId] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [fetchedUser, setFetchedUser] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const addLog = (type: LogEntry["type"], message: string) => {
    setLogs((prev) => [...prev.slice(-7), { type, message, timestamp: Date.now() }]);
  };

  // Simulated effect that "fetches" user data
  useEffect(() => {
    if (!isRunning) return;

    addLog("effect", `Effect runs: Fetching user ${userId}...`);
    setFetchedUser(null);

    const timeoutId = setTimeout(() => {
      setFetchedUser(`User ${userId}: ${["Alex", "Sam", "Jordan", "Taylor", "Morgan"][userId - 1] || "Unknown"}`);
      addLog("update", `Data received for user ${userId}`);
    }, 800);

    // Cleanup function
    return () => {
      addLog("cleanup", `Cleanup: Cancelled fetch for user ${userId}`);
      clearTimeout(timeoutId);
    };
  }, [userId, isRunning]);

  // Auto-scroll logs
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  const logColors = {
    mount: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20",
    effect: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
    cleanup: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20",
    update: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20",
  };

  return (
    <ExampleWrapper
      title="useEffect Lifecycle"
      description="Watch effects run and cleanup as dependencies change"
      controls={
        <div className="flex flex-wrap items-center gap-4">
          <ControlGroup label="User ID">
            {[1, 2, 3, 4, 5].map((id) => (
              <ControlButton
                key={id}
                active={userId === id}
                onClick={() => setUserId(id)}
              >
                {id}
              </ControlButton>
            ))}
          </ControlGroup>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              isRunning
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
            }`}
          >
            {isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {isRunning ? "Pause" : "Resume"}
          </button>
          <button
            onClick={() => setLogs([])}
            className="flex items-center gap-2 rounded-lg bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-all hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
          >
            <RefreshDouble className="h-3 w-3" />
            Clear Logs
          </button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Code View */}
        <div className="flex flex-col">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
            The Effect Code
          </div>
          <div className="overflow-x-auto rounded-lg bg-neutral-900 p-4">
            <pre className="font-mono text-xs leading-relaxed sm:text-sm">
              <code>
                <span className="text-green-300">useEffect</span>
                <span className="text-white">{"(() => {"}</span>
                {"\n"}
                <span className="text-neutral-500">  {"// 1. Effect runs"}</span>
                {"\n"}
                <span className="text-white">  </span>
                <span className="text-blue-300">fetchUser</span>
                <span className="text-white">(</span>
                <span className="text-orange-300">{userId}</span>
                <span className="text-white">);</span>
                {"\n\n"}
                <span className="text-neutral-500">  {"// 2. Return cleanup"}</span>
                {"\n"}
                <span className="text-purple-400">  return</span>
                <span className="text-white">{" () => {"}</span>
                {"\n"}
                <span className="text-white">    </span>
                <span className="text-orange-300">cancelFetch</span>
                <span className="text-white">();</span>
                {"\n"}
                <span className="text-white">{"  };"}</span>
                {"\n"}
                <span className="text-white">{"}, ["}</span>
                <span className="text-yellow-300">userId</span>
                <span className="text-white">{"]);"}</span>
              </code>
            </pre>
          </div>

          {/* Result */}
          <div className="mt-4">
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
              Fetched Data
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
              {fetchedUser ? (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    {fetchedUser.split(":")[1]?.trim()[0] || "?"}
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900 dark:text-white">
                      {fetchedUser.split(":")[1]?.trim()}
                    </div>
                    <div className="text-xs text-neutral-500">User ID: {userId}</div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                    <div className="h-3 w-16 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Event Log */}
        <div className="flex flex-col">
          <div className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
            Effect Lifecycle Log
          </div>
          <div
            ref={logRef}
            className="h-64 overflow-y-auto rounded-lg border border-neutral-200 bg-neutral-50 p-2 dark:border-neutral-700 dark:bg-neutral-800/50"
          >
            {logs.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-neutral-400">
                Change the User ID to see the effect lifecycle
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {logs.map((log, i) => (
                  <div
                    key={i}
                    className={`rounded px-2 py-1 text-xs font-mono ${logColors[log.type]}`}
                  >
                    <span className="opacity-50">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>{" "}
                    {log.message}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-neutral-600 dark:text-neutral-400">Effect runs</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-orange-500" />
              <span className="text-neutral-600 dark:text-neutral-400">Cleanup runs</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              <span className="text-neutral-600 dark:text-neutral-400">Data received</span>
            </div>
          </div>

          {/* Key Insight */}
          <div className="mt-4 rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
            <p className="text-xs text-amber-800 dark:text-amber-200">
              <strong>Watch:</strong> When you change the User ID, cleanup runs <em>first</em> (cancelling the old fetch), then the new effect runs. This prevents race conditions!
            </p>
          </div>
        </div>
      </div>
    </ExampleWrapper>
  );
}
