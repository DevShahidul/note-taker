import type { NoteType } from "@/features/note/types";
import { NoteItem } from "./NoteItem";

type NoteListProps = {
    notes: NoteType[]
}

export const NoteList = ({notes}:NoteListProps) => {
    console.log("I'm rendering from note list", !notes.length);
    
  if (!notes.length) return (<p className="text-2xl">No notes available</p>);

  return (
    <div className="space-y-4">
      {notes.map((note: NoteType) => <NoteItem key={note.id} note={note} />)}
    </div>
  );
};
