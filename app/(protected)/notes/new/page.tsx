import NoteForm from "@/components/NoteForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewNotePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Note</CardTitle>
        </CardHeader>
        <CardContent>
          <NoteForm mode="create" />
        </CardContent>
      </Card>
    </div>
  );
}
