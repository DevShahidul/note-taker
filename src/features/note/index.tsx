import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui/button";
import { getCurrentTimeAsNumber } from "@/lib/utils";
import { useNote } from "./store";
import { NoteList } from "./components/NoteList";
import { NoteForm } from "./components/NoteForm";
import { useFilteredNotes } from "./hooks/useFilteredNotes";
import { Plus } from "lucide-react";

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
        <Button onClick={handleDisplayNoteForm} variant="outline" className="w-full" size="sm">
          <Plus className="h-3 w-3 mr-2" />
          Create Note
        </Button>
      ) : (
        <NoteForm onCancel={hideNoteFrom} onSave={handleSave} createTime={currentTime} />
      )}
      <h3 className="text-sm font-medium text-muted-foreground">
        Notes ({filteredNotes.length})
      </h3>
      <NoteList notes={filteredNotes} />
    </div>
  );
};
