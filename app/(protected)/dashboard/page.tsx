import { auth } from "@/auth";
import { connectToDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import NoteCard from "@/components/NoteCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();

  await connectToDB();
  const rawNotes = await Note.find({ userId: session?.user?.id })
    .sort({ updatedAt: -1 })
    .lean();

  // Serialize MongoDB documents to plain objects
  const notes = rawNotes.map((note) => ({
    id: note._id.toString(),
    title: note.title,
    content: note.content,
    updatedAt: (note.updatedAt as Date).toISOString(),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Notes</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {notes.length === 0
              ? "No notes yet"
              : `${notes.length} note${notes.length !== 1 ? "s" : ""}`}
          </p>
        </div>
        <Link href="/notes/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            New Note
          </Button>
        </Link>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg mb-2">You have no notes yet.</p>
          <p className="text-sm mb-6">Create your first note to get started!</p>
          <Link href="/notes/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Note
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard key={note.id} {...note} />
          ))}
        </div>
      )}
    </div>
  );
}
