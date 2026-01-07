"use client";

import React, { useState } from "react";
import { ExampleWrapper } from "../base/example-wrapper";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

type FilterType = "all" | "active" | "completed";

export function TaskManagerDemo() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Learn useState hook", completed: true },
    { id: 2, text: "Build a task manager", completed: false },
    { id: 3, text: "Master React state", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask, completed: false },
    ]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <ExampleWrapper
      title="Task Manager"
      description="A complete example using useState for tasks, input, and filters"
    >
      <div className="mx-auto max-w-md">
        {/* Add Task Form */}
        <form onSubmit={addTask} className="mb-4 flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white"
          />
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 active:scale-95"
          >
            Add
          </button>
        </form>

        {/* Filter Tabs */}
        <div className="mb-4 flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800">
          {(["all", "active", "completed"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                filter === f
                  ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              {f === "all" ? "All" : f === "active" ? "Active" : "Completed"}
            </button>
          ))}
        </div>

        {/* Task List */}
        <ul className="mb-4 list-none space-y-2 pl-0">
          {filteredTasks.length === 0 ? (
            <li className="rounded-lg border border-dashed border-neutral-300 py-8 text-center text-sm text-neutral-500 dark:border-neutral-600">
              {filter === "all"
                ? "No tasks yet. Add one above!"
                : filter === "active"
                  ? "No active tasks"
                  : "No completed tasks"}
            </li>
          ) : (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                className={`group flex items-center gap-3 rounded-lg border bg-white p-3 transition-all dark:bg-neutral-800 ${
                  task.completed
                    ? "border-neutral-200 dark:border-neutral-700"
                    : "border-neutral-200 dark:border-neutral-700"
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-4 w-4 cursor-pointer rounded border-neutral-300 text-blue-600 focus:ring-blue-500 dark:border-neutral-600"
                />
                <span
                  className={`flex-1 text-sm ${
                    task.completed
                      ? "text-neutral-400 line-through"
                      : "text-neutral-900 dark:text-white"
                  }`}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-lg text-neutral-400 opacity-0 transition-all hover:text-red-500 group-hover:opacity-100"
                >
                  ×
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Footer Stats */}
        <p className="text-xs text-neutral-500">
          {activeCount} task{activeCount !== 1 ? "s" : ""} remaining
        </p>
      </div>
    </ExampleWrapper>
  );
}
