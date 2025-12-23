"use client";

import { useState } from "react";
import { Bug, RefreshCw, CheckCircle, XCircle, ChevronDown, ChevronUp, Trash2 } from "lucide-react";

interface DebugData {
  userId: string;
  enrollment: { found: boolean; id?: string; accessLevel?: string; error?: string };
  progress: { 
    objectId?: string | null; 
    lessonCount?: number; 
    completedCount?: number;
    inProgressCount?: number;
    totalTimeSpent?: number;
    lastLesson?: string;
    error?: string;
  };
  checks: Record<string, { exists?: boolean | string; hasObjects?: boolean; error?: string }>;
  testMode: { enabled: boolean; accessLevel?: string };
}

const ACCESS_LEVELS = [
  { value: "full", label: "Full Access" },
  { value: "design_web", label: "Design (Web)" },
  { value: "design_ios", label: "Design (iOS)" },
  { value: "design_android", label: "Design (Android)" },
  { value: "engineering_web", label: "Engineering (Web)" },
  { value: "engineering_ios", label: "Engineering (iOS)" },
  { value: "engineering_android", label: "Engineering (Android)" },
];

export function TestModePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [debugData, setDebugData] = useState<DebugData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createStatus, setCreateStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [createMessage, setCreateMessage] = useState("");
  const [cleanupStatus, setCleanupStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [cleanupMessage, setCleanupMessage] = useState("");
  const [setupStatus, setSetupStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [setupMessage, setSetupMessage] = useState("");
  const [selectedAccessLevel, setSelectedAccessLevel] = useState("full");

  const fetchDebugData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/course/debug");
      const data = await response.json();
      setDebugData(data);
    } catch (error) {
      console.error("Error fetching debug data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createTestEnrollment = async () => {
    setCreateStatus("loading");
    try {
      const response = await fetch("/api/course/test-enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessLevel: selectedAccessLevel }),
      });
      const data = await response.json();
      
      if (response.ok) {
        setCreateStatus("success");
        setCreateMessage(`${data.message} (${selectedAccessLevel})`);
        fetchDebugData();
      } else {
        setCreateStatus("error");
        setCreateMessage(data.error || "Failed to create enrollment");
      }
    } catch (error) {
      setCreateStatus("error");
      setCreateMessage(String(error));
    }
  };

  const cleanupOldRecords = async () => {
    setCleanupStatus("loading");
    setCleanupMessage("");
    try {
      const response = await fetch("/api/course/admin/cleanup", {
        method: "POST",
      });
      const data = await response.json();
      
      if (response.ok) {
        setCleanupStatus("success");
        setCleanupMessage(data.message);
        fetchDebugData();
      } else {
        setCleanupStatus("error");
        setCleanupMessage(data.error || "Cleanup failed");
      }
    } catch (error) {
      setCleanupStatus("error");
      setCleanupMessage(String(error));
    }
  };

  const setupObjectType = async () => {
    setSetupStatus("loading");
    setSetupMessage("");
    try {
      const response = await fetch("/api/course/admin/setup", {
        method: "POST",
      });
      const data = await response.json();
      
      if (response.ok) {
        setSetupStatus("success");
        setSetupMessage(data.message + (data.steps ? ` (${data.steps.join(", ")})` : ""));
        fetchDebugData();
      } else {
        setSetupStatus("error");
        setSetupMessage(data.error || "Setup failed");
      }
    } catch (error) {
      setSetupStatus("error");
      setSetupMessage(String(error));
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && !debugData) {
            fetchDebugData();
          }
        }}
        className="flex items-center gap-2 rounded-full bg-yellow-500 px-4 py-2 text-sm font-medium text-black shadow-lg hover:bg-yellow-400"
      >
        <Bug className="h-4 w-4" />
        Test Mode
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="absolute bottom-12 left-0 w-96 rounded-lg border border-neutral-200 bg-white p-4 shadow-xl dark:border-neutral-700 dark:bg-neutral-800">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold">Debug Panel</h3>
            <button
              onClick={fetchDebugData}
              disabled={isLoading}
              className="rounded p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
          </div>

          {debugData ? (
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">User ID:</span>{" "}
                <code className="rounded bg-neutral-100 px-1 text-xs text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300">
                  {debugData.userId}
                </code>
              </div>

              <div>
                <span className="font-medium">Enrollment:</span>{" "}
                {debugData.enrollment?.found ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="h-3 w-3" />
                    {debugData.enrollment.accessLevel}
                    {debugData.enrollment.id === "test-enrollment" && (
                      <span className="ml-1 text-yellow-600">(test mode)</span>
                    )}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-500">
                    <XCircle className="h-3 w-3" />
                    Not found
                  </span>
                )}
              </div>

              <div>
                <span className="font-medium">Progress:</span>{" "}
                {debugData.progress?.objectId ? (
                  <span className="text-green-600">
                    {debugData.progress.completedCount || 0} completed, {debugData.progress.inProgressCount || 0} in progress
                  </span>
                ) : (
                  <span className="text-neutral-500">No progress yet</span>
                )}
              </div>

              <div className="border-t border-neutral-200 pt-3 dark:border-neutral-700">
                <span className="font-medium">Object Types:</span>
                <div className="mt-1 space-y-1">
                  {debugData.checks && Object.entries(debugData.checks)
                    .filter(([type]) => type !== "cosmicConnection")
                    .map(([type, check]) => (
                    <div key={type} className="flex items-center justify-between text-xs">
                      <code>{type}</code>
                      {check.exists === true || check.hasObjects ? (
                        <span className="text-green-600">✓ exists</span>
                      ) : check.exists === "no objects yet (type may exist)" ? (
                        <span className="text-yellow-600">⚠ empty</span>
                      ) : (
                        <span className="text-red-500">✗ missing</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-3 dark:border-neutral-700 space-y-2">
                {/* Only disable if there's a REAL enrollment (not the fake test mode one) */}
                {debugData.enrollment?.found && debugData.enrollment.id !== "test-enrollment" ? (
                  <p className="text-center text-sm text-green-600">
                    ✓ Real enrollment exists in Cosmic ({debugData.enrollment.accessLevel})
                  </p>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <select
                        value={selectedAccessLevel}
                        onChange={(e) => setSelectedAccessLevel(e.target.value)}
                        className="flex-1 rounded border border-neutral-300 bg-white px-2 py-2 text-sm dark:border-neutral-600 dark:bg-neutral-800"
                      >
                        {ACCESS_LEVELS.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={createTestEnrollment}
                        disabled={createStatus === "loading"}
                        className="rounded bg-swiss-red px-3 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
                      >
                        {createStatus === "loading" ? "..." : "Create"}
                      </button>
                    </div>
                    {debugData.enrollment?.id === "test-enrollment" && (
                      <p className="mt-2 text-xs text-yellow-600">
                        Current enrollment is fake (test mode). Click to create a real one.
                      </p>
                    )}
                  </>
                )}
                {createMessage && (
                  <p className={`mt-2 text-xs ${createStatus === "success" ? "text-green-600" : "text-red-500"}`}>
                    {createMessage}
                  </p>
                )}

                {/* Setup button */}
                <button
                  onClick={setupObjectType}
                  disabled={setupStatus === "loading"}
                  className="w-full flex items-center justify-center gap-2 border border-swiss-red/30 bg-swiss-red/10 px-3 py-2 text-sm font-medium text-swiss-red hover:bg-swiss-red/20 disabled:opacity-50 dark:border-swiss-red/40 dark:bg-swiss-red/20 dark:text-swiss-red"
                >
                  {setupStatus === "loading" ? "Setting up..." : "Setup Object Type in Cosmic"}
                </button>
                {setupMessage && (
                  <p className={`text-xs ${setupStatus === "success" ? "text-green-600" : "text-red-500"}`}>
                    {setupMessage}
                  </p>
                )}

                {/* Cleanup button */}
                <button
                  onClick={cleanupOldRecords}
                  disabled={cleanupStatus === "loading"}
                  className="w-full flex items-center justify-center gap-2 rounded border border-neutral-300 bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-700 dark:text-neutral-300"
                >
                  <Trash2 className="h-3 w-3" />
                  {cleanupStatus === "loading" ? "Cleaning..." : "Cleanup Old Progress Records"}
                </button>
                {cleanupMessage && (
                  <p className={`text-xs ${cleanupStatus === "success" ? "text-green-600" : "text-red-500"}`}>
                    {cleanupMessage}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-4">
              <RefreshCw className="h-5 w-5 animate-spin text-neutral-400" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
