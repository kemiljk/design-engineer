"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  StickyNote,
  X,
  Plus,
  Pin,
  Trash2,
  List,
  ExternalLink,
} from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { cn } from "@/lib/utils";
import type { CourseNote } from "@/lib/types";

interface FloatingNotesPanelProps {
  lessonPath: string;
  lessonTitle: string;
}

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
  const [view, setView] = useState<"list" | "edit">("edit");

  const [debouncedContent] = useDebounceValue(editingContent, 1000);

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

  const createNewNote = async () => {
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
        return;
      }

      const data = await response.json();
      if (data.note) {
        setNotes((prev) => [data.note, ...prev]);
        setActiveNoteId(data.note.id);
        setEditingContent("");
        setView("edit");
      }
    } catch (error) {
      console.error("Failed to create note:", error);
    }
  };

  const saveNote = async (noteId: string, content: string) => {
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
    try {
      await fetch(`/api/course/notes?noteId=${noteId}`, { method: "DELETE" });
      setNotes((prev) => prev.filter((n) => n.id !== noteId));
      if (activeNoteId === noteId) {
        setActiveNoteId(null);
        setEditingContent("");
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  const togglePin = async (noteId: string, currentPinned: boolean) => {
    try {
      await fetch("/api/course/notes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId, isPinned: !currentPinned }),
      });
      setNotes((prev) =>
        prev.map((n) =>
          n.id === noteId
            ? { ...n, metadata: { ...n.metadata, is_pinned: !currentPinned } }
            : n
        )
      );
    } catch (error) {
      console.error("Failed to toggle pin:", error);
    }
  };

  const selectNote = (note: CourseNote) => {
    setActiveNoteId(note.id);
    setEditingContent(note.metadata.content);
    setView("edit");
  };

  const activeNote = notes.find((n) => n.id === activeNoteId);

  const updateNote = (noteId: string, updates: any) => {
    if (updates.is_pinned !== undefined) {
      // Logic assumes updates.is_pinned is the *new* state
      // togglePin takes the *current* state and flips it
      // So pass the *inverse* of the new state (which is the old state)
      togglePin(noteId, !updates.is_pinned);
    }
    if (updates.content !== undefined) {
      setEditingContent(updates.content);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all",
          "bg-swiss-red text-white hover:scale-105",
          isOpen && "bg-neutral-800"
        )}
      >
        <span className="sr-only">Notes</span>
        {isOpen ? <X className="h-6 w-6" /> : <StickyNote className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 flex h-[500px] w-96 flex-col overflow-hidden rounded-none border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <StickyNote className="h-5 w-5 text-swiss-red" />
                <h3 className="font-semibold">Course Notes</h3>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setView("list")}
                  className={cn(
                    "rounded-none p-1 transition-colors",
                    view === "list"
                      ? "bg-swiss-red/10 text-swiss-red"
                      : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => createNewNote()}
                  className={cn(
                    "rounded-none p-1 transition-colors",
                    view === "edit"
                      ? "bg-swiss-red/10 text-swiss-red"
                      : "text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  )}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 border-b border-neutral-200 px-4 py-2 dark:border-neutral-800">
              <button
                onClick={() => setViewMode("lesson")}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-full transition-colors",
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
                  "px-3 py-1 text-xs font-medium rounded-full transition-colors",
                  viewMode === "all"
                    ? "bg-swiss-red text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400"
                )}
              >
                All Notes
              </button>
              <Link
                href="/course/notes"
                className="ml-auto flex items-center gap-1 text-xs text-neutral-500 hover:text-swiss-red"
              >
                Full View
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>

            {/* Current Lesson Info */}
            {lessonPath && viewMode === "lesson" && (
              <div className="border-b border-neutral-200 bg-neutral-50 px-4 py-2 dark:border-neutral-800 dark:bg-neutral-800/50">
                <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                  {lessonPath.split("/").pop()?.replace(/-/g, " ")}
                </p>
              </div>
            )}

            <div className="flex flex-1 overflow-hidden">
              {/* Notes List */}
              <div className="w-1/3 overflow-y-auto border-r border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={() => createNewNote()}
                  className="flex w-full items-center gap-2 border-b border-neutral-100 px-3 py-2 text-left text-sm text-swiss-red hover:bg-swiss-red/5 dark:border-neutral-800 dark:hover:bg-neutral-800"
                >
                  <Plus className="h-3 w-3" />
                  New Note
                </button>

                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-swiss-red border-t-transparent" />
                  </div>
                ) : notes.length === 0 ? (
                  <div className="px-3 py-8 text-center text-sm text-neutral-400">
                    No notes yet
                  </div>
                ) : (
                  notes.map((note) => (
                    <button
                      key={note.id}
                      onClick={() => selectNote(note)}
                      className={cn(
                        "group flex w-full items-start gap-2 border-b border-neutral-100 px-3 py-2 text-left transition-colors dark:border-neutral-800",
                        activeNote?.id === note.id
                          ? "bg-swiss-red/5 dark:bg-swiss-red/10"
                          : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {note.metadata.content || "Empty note"}
                        </p>
                        {viewMode === "all" && (
                          <p className="text-xs text-neutral-400 truncate">
                            {note.metadata.lesson_path.split('/').slice(-2).join(' › ')}
                          </p>
                        )}
                        <p className="text-xs text-neutral-400">
                          {new Date(note.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      {note.metadata.is_pinned && (
                        <Pin className="h-3 w-3 shrink-0 text-swiss-red" />
                      )}
                    </button>
                  ))
                )}
              </div>

              {/* Editor */}
              <div className="flex flex-1 flex-col">
                {view === "edit" && activeNote ? (
                  <>
                    <div className="flex items-center justify-between border-b border-neutral-200 px-3 py-2 dark:border-neutral-800">
                      <div className="flex items-center gap-2">
                        {isSaving && (
                          <span className="text-xs text-neutral-400">
                            Saving...
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() =>
                            updateNote(activeNote.id, {
                              is_pinned: !activeNote.metadata.is_pinned,
                            })
                          }
                          className={cn(
                            "rounded-none p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800",
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
                          className="rounded-none p-1 text-neutral-400 hover:bg-neutral-100 hover:text-red-500 dark:hover:bg-neutral-800"
                          title="Delete note"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={editingContent}
                      onChange={(e) =>
                        updateNote(activeNote.id, { content: e.target.value })
                      }
                      placeholder="Write your note here..."
                      className="flex-1 resize-none border-none bg-transparent p-4 focus:ring-0"
                    />
                  </>
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4 text-center text-neutral-400">
                    <StickyNote className="h-8 w-8" />
                    <p className="text-sm">Select or create a note</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
