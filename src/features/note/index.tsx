import { Button } from "@/components/ui/button";
import { useNote } from "./store";
import { NoteList } from "@/features/note/components/NoteList";
import { useShallow } from "zustand/react/shallow";
import { NoteForm } from "@/features/note/components/NoteForm";
import { useFilteredNotes } from "./hooks/useFilteredNotes";
import { useState } from "react";
import { getCurrentTimeAsNumber } from "@/lib/utils";

export const NotePresenter = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
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

  function handleDisplayNoteForm() {
    const currentTime = getCurrentTimeAsNumber();
    setCurrentTime(currentTime);
    displayNoteFrom();
  }

 
  const filteredNotes = useFilteredNotes();

  return (
    <div className="max-w-4xl mx-auto p-10 space-y-6">
      <h2 className="text-2xl font-bold">Simple Note tacker App!</h2>
      {!showNoteForm ? (
        <Button onClick={handleDisplayNoteForm} variant="outline">
          Create Note
        </Button>
      ) : (
        <NoteForm onCancel={hideNoteFrom} onSave={handleSave} createTime={currentTime} />
      )}
      <NoteList notes={filteredNotes} />
    </div>
  );
};
