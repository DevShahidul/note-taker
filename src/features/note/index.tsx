import { Button } from "@/components/ui/button";
import { useNote } from "./store";
import { NoteList } from "@/features/note/components/NoteList";
import { useShallow } from "zustand/react/shallow";
import { NoteForm } from "@/features/note/components/NoteForm";
import { useFilteredNotes } from "./hooks/useFilteredNotes";

export const NotePresenter = () => {
  const { showNoteForm, displayNoteFrom, hideNoteFrom } = useNote(
    useShallow((state) => ({
      showNoteForm: state.showNoteForm,
      displayNoteFrom: state.displayNoteFrom,
      hideNoteFrom: state.hideNoteFrom,
    }))
  );

  function handleSave() {
    hideNoteFrom();
  }
 
  const filteredNotes = useFilteredNotes();

  return (
    <div className="max-w-4xl mx-auto p-10 space-y-6">
      <h2 className="text-2xl font-bold">Simple Note tacker App!</h2>
      {!showNoteForm ? (
        <Button onClick={displayNoteFrom} variant="outline">
          Create Note
        </Button>
      ) : (
        <NoteForm onCancel={hideNoteFrom} onSave={handleSave} />
      )}
      <NoteList notes={filteredNotes} />
    </div>
  );
};
