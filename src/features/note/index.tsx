import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui/button";
import { getCurrentTimeAsNumber } from "@/lib/utils";
import { useNote } from "./store";
import { NoteList } from "./components/NoteList";
import { NoteForm } from "./components/NoteForm";
import { useFilteredNotes } from "./hooks/useFilteredNotes";
import SelectNoteType from "./components/SelectNoteType";
import type { Note } from "./types";

export const NotePresenter = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<Note["type"]>("summary");

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

  function handleSelectedType(type: Note['type']){
    setSelectedType(type);
  }

 
  const filteredNotes = useFilteredNotes();

  return (
    <div className="max-w-4xl mx-auto p-10 space-y-6">
      <h2 className="text-2xl font-bold">Simple Note tacker App!</h2>
      <SelectNoteType 
        selectedType={selectedType}
        onSelectedType={handleSelectedType}
      />
      {!showNoteForm ? (
        <Button onClick={handleDisplayNoteForm} variant="outline">
          Create Note
        </Button>
      ) : (
        <NoteForm onCancel={hideNoteFrom} onSave={handleSave} createTime={currentTime} selectedType={selectedType} />
      )}
      <NoteList notes={filteredNotes} selectedType={selectedType} />
    </div>
  );
};
