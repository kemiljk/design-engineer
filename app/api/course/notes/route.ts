import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getUserNotes, createNote, updateNote, deleteNote } from "@/lib/course";

export async function GET(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const lessonPath = searchParams.get("lessonPath") || undefined;

  const notes = await getUserNotes(userId, lessonPath);

  return NextResponse.json({ notes });
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { lessonPath, noteType, content } = body;

  if (!lessonPath) {
    return NextResponse.json(
      { error: "Missing lesson path" },
      { status: 400 }
    );
  }

  // Note: is_pinned field needs to be added to Cosmic CMS object type
  // Once added, uncomment is_pinned below
  const note = await createNote({
    user_id: userId,
    lesson_path: lessonPath,
    note_type: noteType || "general",
    content: content || "",
    // is_pinned: isPinned || false,
  });

  return NextResponse.json({ note }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { noteId, content, noteType } = body;

  if (!noteId) {
    return NextResponse.json({ error: "Missing note ID" }, { status: 400 });
  }

  // Note: is_pinned field needs to be added to Cosmic CMS object type
  // Once added, uncomment is_pinned handling below
  const updateData: Record<string, unknown> = {};
  if (content !== undefined) updateData.content = content;
  // if (isPinned !== undefined) updateData.is_pinned = isPinned;
  if (noteType !== undefined) updateData.note_type = noteType;

  const note = await updateNote(noteId, updateData);

  return NextResponse.json({ note });
}

export async function DELETE(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const noteId = searchParams.get("noteId");

  if (!noteId) {
    return NextResponse.json({ error: "Missing note ID" }, { status: 400 });
  }

  await deleteNote(noteId);

  return NextResponse.json({ success: true });
}
