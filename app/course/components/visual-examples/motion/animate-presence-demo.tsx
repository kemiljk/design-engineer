"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X, Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type Todo = {
  id: number;
  text: string;
};

export function AnimatePresenceDemo() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Review pull requests" },
    { id: 2, text: "Update documentation" },
    { id: 3, text: "Team sync" },
  ]);
  const [showCode, setShowCode] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setTodos([{ id: Date.now(), text: inputValue }, ...todos]);
    setInputValue("");
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const cssCode = `/* 
  Pure CSS exit animations are tricky.
  You usually need to add a class, 
  wait for the animation to finish, 
  and THEN remove the element from DOM.
*/

.item-exit {
  animation: slideOut 0.3s forwards;
}

@keyframes slideOut {
  to { opacity: 0; height: 0; margin: 0; }
}`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";

function TodoList() {
  const [items, setItems] = useState(initialItems);

  return (
    <ul>
      <AnimatePresence initial={false} mode="popLayout">
        {items.map((item) => (
          <motion.li
            layout
            key={item.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            {item.text}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Exit Animations"
      description="AnimatePresence allows components to animate out when they're removed from the React tree."
      controls={
        <div className="flex justify-end">
          <ControlButton
            active={showCode}
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Interactive Demo */}
        <div className="mx-auto max-w-md overflow-hidden rounded-[24px] bg-white shadow-xl dark:bg-neutral-900">
          <div className="bg-linear-to-r from-indigo-500 to-purple-600 p-8 text-white">
            <h3 className="text-2xl font-bold">Tasks</h3>
            <p className="text-indigo-100 opacity-80">
              {todos.length} remaining
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={addTodo} className="relative mb-8">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a new task..."
                className="w-full rounded-[12px] bg-neutral-100 px-4 py-3 pr-12 text-neutral-900 placeholder:text-neutral-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-neutral-800 dark:text-white"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center justify-center rounded-[8px] bg-white p-1.5 text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50 disabled:opacity-50 dark:bg-neutral-700 dark:text-indigo-400"
              >
                <Plus className="size-5" />
              </button>
            </form>

            <ul className="space-y-3">
              <AnimatePresence initial={false} mode="popLayout">
                {todos.map((todo) => (
                  <motion.li
                    layout
                    key={todo.id}
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      transition: { duration: 0.2 },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      mass: 1,
                    }}
                    className="group flex items-center justify-between rounded-[12px] border border-neutral-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => removeTodo(todo.id)}
                        className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-neutral-300 text-transparent transition-all hover:border-emerald-500 hover:text-emerald-500 dark:border-neutral-600"
                      >
                        <Check className="size-3" strokeWidth={4} />
                      </button>
                      <span className="font-medium text-neutral-700 dark:text-neutral-200">
                        {todo.text}
                      </span>
                    </div>
                    <button
                      onClick={() => removeTodo(todo.id)}
                      className="text-neutral-400 opacity-0 transition-opacity group-hover:opacity-100 hover:text-rose-500"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {todos.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center text-neutral-400"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800">
                  <Check className="size-8 text-neutral-300 dark:text-neutral-600" />
                </div>
                <p>All tasks completed!</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Visual Explanation */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[12px] border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Graceful Exit
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              Without exit animations, items just disappear instantly, causing
              the layout to snap. Animating height and opacity allows the list
              to close the gap smoothly.
            </p>
          </div>
          <div className="rounded-[12px] border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              popLayout Mode
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              The `mode="popLayout"` prop removes the exiting element from the
              layout immediately (absolute positioning) so siblings can animate
              into their new places simultaneously.
            </p>
          </div>
        </div>

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
