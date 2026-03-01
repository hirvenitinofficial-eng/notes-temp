import { auth } from "@/auth";
import { connectToDB } from "@/lib/mongodb";
import Note from "@/models/Note";
import NoteForm from "@/components/NoteForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";

interface EditNotePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditNotePage({ params }: EditNotePageProps) {
  const { id } = await params;
  const session = await auth();

  await connectToDB();
  const note = await Note.findOne({ _id: id, userId: session?.user?.id }).lean();

  if (!note) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
        </CardHeader>
        <CardContent>
          <NoteForm
            mode="edit"
            noteId={id}
            initialTitle={note.title}
            initialContent={note.content}
          />
        </CardContent>
      </Card>
    </div>
  );
}
