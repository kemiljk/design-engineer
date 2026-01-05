"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import Link from "next/link";
import {
  Notes as StickyNote,
  Xmark as X,
  Plus,
  Pin,
  Trash,
  OpenNewWindow as ExternalLink,
  NavArrowUp as ChevronUp,
} from "iconoir-react";
import { useDebounceValue } from "usehooks-ts";
import { cn } from "@/lib/utils";
import type { CourseNote } from "@/lib/types";

interface FloatingNotesPanelProps {
  lessonPath: string;
  lessonTitle: string;
}

const springTransition = {
  type: "spring" as const,
  damping: 32,
  stiffness: 400,
};

export function FloatingNotesPanel({
  lessonPath,
  lessonTitle,
}: FloatingNotesPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState<CourseNote[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState<"lesson" | "all">("lesson");
  const containerRef = useRef<HTMLDivElement>(null);
  const editingContentRef = useRef(editingContent);

  const [debouncedContent] = useDebounceValue(editingContent, 1000);

  // Keep ref in sync for use in async callbacks
  useEffect(() => {
    editingContentRef.current = editingContent;
  }, [editingContent]);

  const fetchNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = viewMode === "lesson" ? `?lessonPath=${lessonPath}` : "";
      const response = await fetch(`/api/course/notes${params}`);
      if (!response.ok) {
        setNotes([]);
        return;
      }
      const data = await response.json();
      setNotes(data.notes || []);
    } catch {
      setNotes([]);
    } finally {
      setIsLoading(false);
    }
  }, [lessonPath, viewMode]);

  useEffect(() => {
    if (isOpen) {
      fetchNotes();
    }
  }, [isOpen, fetchNotes]);

  useEffect(() => {
    if (debouncedContent && activeNoteId && !isSaving) {
      saveNote(activeNoteId, debouncedContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedContent, activeNoteId]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const createNewNote = async () => {
    const tempId = `temp-${Date.now()}`;
    const optimisticNote: CourseNote = {
      id: tempId,
      slug: tempId,
      title: `Note: ${lessonPath}`,
      created_at: new Date().toISOString(),
      modified_at: new Date().toISOString(),
      metadata: {
        user_id: "",
        lesson_path: lessonPath,
        note_type: "general",
        content: "",
        is_pinned: false,
      },
    };

    setNotes((prev) => [optimisticNote, ...prev]);
    setActiveNoteId(tempId);
    setEditingContent("");

    try {
      const response = await fetch("/api/course/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonPath,
          noteType: "general",
          content: "",
          isPinned: false,
        }),
      });

      if (!response.ok) {
        console.error("Failed to create note:", response.status);
        setNotes((prev) => prev.filter((n) => n.id !== tempId));
        setActiveNoteId(null);
        return;
      }

      const data = await response.json();
      if (data.note) {
        // Get content typed while the API was in flight
        const typedContent = editingContentRef.current;
        
        // Preserve any content typed while the API was in flight
        setNotes((prev) =>
          prev.map((n) => {
            if (n.id === tempId) {
              return {
                ...data.note,
                metadata: {
                  ...data.note.metadata,
                  content: typedContent || data.note.metadata.content,
                },
              };
            }
            return n;
          })
        );
        setActiveNoteId(data.note.id);

        // If content was typed during API call, save it now
        if (typedContent) {
          saveNote(data.note.id, typedContent);
        }
      }
    } catch (error) {
      console.error("Failed to create note:", error);
      setNotes((prev) => prev.filter((n) => n.id !== tempId));
      setActiveNoteId(null);
    }
  };

  const saveNote = async (noteId: string, content: string) => {
    // Skip API call for optimistic notes that haven't been saved yet
    if (noteId.startsWith("temp-")) {
      return;
    }

    setIsSaving(true);
    try {
      await fetch("/api/course/notes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId, content }),
      });
    } catch (error) {
      console.error("Failed to save note:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteNote = async (noteId: string) => {
    const noteToDelete = notes.find((n) => n.id === noteId);
    
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
    if (activeNoteId === noteId) {
      setActiveNoteId(null);
      setEditingContent("");
    }

    // Skip API call for optimistic notes that haven't been saved yet
    if (noteId.startsWith("temp-")) {
      return;
    }

    try {
      const response = await fetch(`/api/course/notes?noteId=${noteId}`, { method: "DELETE" });
      if (!response.ok && noteToDelete) {
        setNotes((prev) => [noteToDelete, ...prev]);
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
      if (noteToDelete) {
        setNotes((prev) => [noteToDelete, ...prev]);
      }
    }
  };

  const togglePin = async (noteId: string, currentPinned: boolean) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === noteId
          ? { ...n, metadata: { ...n.metadata, is_pinned: !currentPinned } }
          : n
      )
    );

    // Skip API call for optimistic notes that haven't been saved yet
    if (noteId.startsWith("temp-")) {
      return;
    }

    try {
      const response = await fetch("/api/course/notes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId, isPinned: !currentPinned }),
      });
      if (!response.ok) {
        setNotes((prev) =>
          prev.map((n) =>
            n.id === noteId
              ? { ...n, metadata: { ...n.metadata, is_pinned: currentPinned } }
              : n
          )
        );
      }
    } catch (error) {
      console.error("Failed to toggle pin:", error);
      setNotes((prev) =>
        prev.map((n) =>
          n.id === noteId
            ? { ...n, metadata: { ...n.metadata, is_pinned: currentPinned } }
            : n
        )
      );
    }
  };

  const selectNote = (note: CourseNote) => {
    setActiveNoteId(note.id);
    setEditingContent(note.metadata.content ?? "");
  };

  const activeNote = notes.find((n) => n.id === activeNoteId);

  const updateNote = (noteId: string, updates: { is_pinned?: boolean; content?: string }) => {
    if (updates.is_pinned !== undefined) {
      togglePin(noteId, !updates.is_pinned);
    }
    if (updates.content !== undefined) {
      const newContent = updates.content;
      setEditingContent(newContent);
      // Also update the note in the notes array so preview updates
      setNotes((prev) =>
        prev.map((n) =>
          n.id === noteId
            ? { ...n, metadata: { ...n.metadata, content: newContent } }
            : n
        )
      );
    }
  };

  return (
    <LayoutGroup>
      <div ref={containerRef} className="fixed bottom-6 right-4 z-40">
        <motion.div
          layout
          className="overflow-hidden border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
          style={{ borderRadius: 24 }}
          transition={springTransition}
        >
          <AnimatePresence mode="popLayout">
            {isOpen ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex h-[420px] w-[320px] max-w-[calc(100vw-2rem)] flex-col"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 px-4 py-3 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <StickyNote className="h-4 w-4 text-swiss-red" />
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                      Notes
                    </span>
                    {isSaving && (
                      <span className="text-xs text-neutral-400">Saving...</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Link
                      href="/course/notes"
                      className="flex h-7 w-7 items-center justify-center text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                      title="Full view"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex h-7 w-7 items-center justify-center text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                      aria-label="Close notes"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-2 dark:border-neutral-800">
                  <button
                    onClick={() => setViewMode("lesson")}
                    className={cn(
                      "px-3 py-1 text-xs font-medium transition-colors",
                      viewMode === "lesson"
                        ? "bg-swiss-red text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400"
                    )}
                  >
                    This Lesson
                  </button>
                  <button
                    onClick={() => setViewMode("all")}
                    className={cn(
                      "px-3 py-1 text-xs font-medium transition-colors",
                      viewMode === "all"
                        ? "bg-swiss-red text-white"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400"
                    )}
                  >
                    All Notes
                  </button>
                </div>

                <div className="flex flex-1 overflow-hidden">
                  {/* Notes List */}
                  <div className="scrollbar-hide w-2/5 overflow-y-auto border-r border-neutral-100 dark:border-neutral-800">
                    <button
                      onClick={() => createNewNote()}
                      className="flex w-full items-center gap-2 border-b border-neutral-100 px-3 py-2.5 text-left text-sm text-swiss-red transition-colors hover:bg-swiss-red/5 dark:border-neutral-800 dark:hover:bg-neutral-800"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span className="font-medium">New</span>
                    </button>

                    {isLoading ? (
                      <div className="flex justify-center py-8">
                        <div className="h-5 w-5 animate-spin border-2 border-swiss-red border-t-transparent" />
                      </div>
                    ) : notes.length === 0 ? (
                      <div className="px-3 py-6 text-center text-xs text-neutral-400">
                        No notes yet
                      </div>
                    ) : (
                      notes.map((note) => (
                        <button
                          key={note.id}
                          onClick={() => selectNote(note)}
                          className={cn(
                            "group relative flex w-full items-start gap-2 border-b border-neutral-100 px-3 py-2.5 text-left transition-colors dark:border-neutral-800",
                            activeNote?.id === note.id
                              ? "bg-neutral-100 dark:bg-neutral-800"
                              : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                          )}
                        >
                          {activeNote?.id === note.id && (
                            <motion.div
                              layoutId="activeNoteBg"
                              className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800"
                              transition={springTransition}
                            />
                          )}
                          <div className="relative z-10 min-w-0 flex-1">
                            <p className="truncate text-xs font-medium text-neutral-900 dark:text-white">
                              {note.metadata.content?.slice(0, 30) || "Empty note"}
                            </p>
                            <p className="mt-0.5 text-xxs text-neutral-400">
                              {new Date(note.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          {note.metadata.is_pinned && (
                            <Pin className="relative z-10 h-3 w-3 shrink-0 text-swiss-red" />
                          )}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Editor */}
                  <div className="flex flex-1 flex-col">
                    {activeNote ? (
                      <>
                        <div className="flex items-center justify-end gap-1 border-b border-neutral-100 px-2 py-1.5 dark:border-neutral-800">
                          <button
                            onClick={() =>
                              updateNote(activeNote.id, {
                                is_pinned: !activeNote.metadata.is_pinned,
                              })
                            }
                            className={cn(
                              "p-1.5 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800",
                              activeNote.metadata.is_pinned
                                ? "text-swiss-red"
                                : "text-neutral-400"
                            )}
                            title="Pin note"
                          >
                            <Pin className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => deleteNote(activeNote.id)}
                            className="p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-red-500 dark:hover:bg-neutral-800"
                            title="Delete note"
                          >
                            <Trash className="h-3 w-3" />
                          </button>
                        </div>
                        <textarea
                          value={editingContent}
                          onChange={(e) =>
                            updateNote(activeNote.id, { content: e.target.value })
                          }
                          placeholder="Write your note here..."
                          className="flex-1 resize-none border-none bg-transparent p-3 text-sm focus:ring-0 dark:text-white"
                        />
                      </>
                    ) : (
                      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4 text-center text-neutral-400">
                        <StickyNote className="h-6 w-6" />
                        <p className="text-xs">Select or create a note</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => setIsOpen(true)}
                className="flex h-12 items-center gap-3 px-4"
                aria-label="Open notes"
                aria-expanded={isOpen}
              >
                <StickyNote className="h-4 w-4 text-swiss-red" />
                <span className="hidden text-sm font-medium text-neutral-900 sm:block dark:text-white">
                  Notes
                </span>
                {notes.length > 0 && (
                  <span className="shrink-0 bg-neutral-100 px-2 py-0.5 text-xs font-medium tabular-nums text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                    {notes.length}
                  </span>
                )}
                <ChevronUp className="h-4 w-4 shrink-0 text-neutral-400" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </LayoutGroup>
  );
}
