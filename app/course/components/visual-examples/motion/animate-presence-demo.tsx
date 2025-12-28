"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Reorder } from "motion/react";
import { Plus, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

let nextId = 4;

const initialTodos: Todo[] = [
  { id: 1, text: "Learn Motion library", completed: true },
  { id: 2, text: "Build animation demos", completed: false },
  { id: 3, text: "Polish the details", completed: false },
];

export function AnimatePresenceDemo() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [showCode, setShowCode] = useState(false);

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos((prev) => [...prev, { id: nextId++, text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const motionCode = `import { motion, AnimatePresence, Reorder } from "motion/react";

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <Reorder.Group
      axis="y"
      values={todos}
      onReorder={setTodos}
      className="space-y-2"
    >
      <AnimatePresence initial={false}>
        {todos.map((todo) => (
          <Reorder.Item
            key={todo.id}
            value={todo}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 rounded-lg border p-3"
          >
            <Checkbox 
              checked={todo.completed} 
              onChange={() => toggleTodo(todo.id)} 
            />
            <span className={todo.completed ? "line-through" : ""}>
              {todo.text}
            </span>
            <button onClick={() => removeTodo(todo.id)}>
              <X className="size-4" />
            </button>
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
}

// Key points:
// 1. AnimatePresence enables exit animations
// 2. Each item needs a unique key prop
// 3. exit prop defines the leaving animation
// 4. initial={false} prevents animation on mount
// 5. Reorder.Group enables drag-to-reorder with layout animation`;

  const codeTabs: CodeTab[] = [
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="AnimatePresence & Lists"
      description="Items animate in, out, and reorder smoothly. Try adding, completing, removing, and dragging items."
      controls={
        <div className="flex items-center justify-end">
          <button
            onClick={() => setShowCode(!showCode)}
            className={cn(
              "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
              showCode
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
            )}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Todo list demo */}
        <div className="mx-auto max-w-md">
          {/* Add todo input */}
          <div className="mb-4 flex gap-2">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="Add a new task..."
              className="flex-1 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:border-swiss-red focus:ring-2 focus:ring-swiss-red/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
            <button
              onClick={addTodo}
              disabled={!newTodo.trim()}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                newTodo.trim()
                  ? "bg-swiss-red text-white hover:bg-swiss-red/90"
                  : "bg-neutral-200 text-neutral-400 dark:bg-neutral-700"
              )}
            >
              <Plus className="size-5" />
            </button>
          </div>

          {/* Todo list */}
          <Reorder.Group
            axis="y"
            values={todos}
            onReorder={setTodos}
            className="space-y-2"
          >
            <AnimatePresence initial={false}>
              {todos.map((todo) => (
                <Reorder.Item
                  key={todo.id}
                  value={todo}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className={cn(
                    "flex cursor-grab items-center gap-3 rounded-lg border bg-white p-3 shadow-sm active:cursor-grabbing dark:bg-neutral-900",
                    todo.completed
                      ? "border-green-200 bg-green-50/50 dark:border-green-900/50 dark:bg-green-900/10"
                      : "border-neutral-200 dark:border-neutral-800"
                  )}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={cn(
                      "flex h-5 w-5 items-center justify-center rounded border-2 transition-colors",
                      todo.completed
                        ? "border-green-500 bg-green-500"
                        : "border-neutral-300 hover:border-neutral-400 dark:border-neutral-600"
                    )}
                  >
                    {todo.completed && <Check className="size-3 text-white" />}
                  </button>

                  {/* Text */}
                  <span
                    className={cn(
                      "flex-1 text-sm transition-colors",
                      todo.completed
                        ? "text-neutral-400 line-through"
                        : "text-neutral-700 dark:text-neutral-300"
                    )}
                  >
                    {todo.text}
                  </span>

                  {/* Delete button */}
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="rounded p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
                  >
                    <X className="size-4" />
                  </button>
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>

          {/* Empty state */}
          <AnimatePresence>
            {todos.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="py-8 text-center text-sm text-neutral-500"
              >
                No tasks yet. Add one above!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature highlights */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Enter Animation",
              desc: "Items slide in from the left when added",
              color: "border-blue-200 bg-blue-50 dark:border-blue-900/50 dark:bg-blue-900/20",
            },
            {
              title: "Exit Animation",
              desc: "Items slide out and collapse when removed",
              color: "border-rose-200 bg-rose-50 dark:border-rose-900/50 dark:bg-rose-900/20",
            },
            {
              title: "Reorder Animation",
              desc: "Drag items to reorder with smooth layout transitions",
              color: "border-violet-200 bg-violet-50 dark:border-violet-900/50 dark:bg-violet-900/20",
            },
          ].map((item) => (
            <div key={item.title} className={cn("rounded-lg border p-3", item.color)}>
              <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                {item.title}
              </p>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Code panel */}
        {showCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <CodePanel tabs={codeTabs} />
          </motion.div>
        )}
      </div>
    </ExampleWrapper>
  );
}

