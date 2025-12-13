import React, { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/lib/utils";
import { useNote } from "../store";
import type { Note } from "../types";
import { createId } from "../utils";
import { NoteCard } from "./NoteCard";

type NoteFormProps = {
  selectedType: Note['type'];
  editNote?: Note | null;
  createTime?: number | null;
  onSave: () => void;
  onCancel: () => void;
};

export const NoteForm = ({
  editNote = null,
  createTime = null,
  selectedType,
  onSave,
  onCancel,
}: NoteFormProps) => {
  
    const { createNote, updateNote } = useNote(
    useShallow((state) => ({
      createNote: state.createNote,
      updateNote: state.updateNote,
    }))
  );

  const [formData, setFormData] = useState({
    content: editNote?.content || ""
  })

  const [error, setError] = useState("");

  const isEditing = !!editNote;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setFormData({...formData, content})
  }

  const timeStamp = createTime ? formatTime(createTime) : editNote ? editNote.bookmarkTime.toFixed(1) : "0.0";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.content.trim()) {
      setError("The textarea is empty!");
      return;
    }

    if (isEditing && editNote) {
      updateNote(editNote.id, formData.content);
    } else {
      const id = createId()
      const newNote: Note = {
        ...formData,
        id,
        type: selectedType,
        sectionId: `section-${id}`,
        lessonId: `lesson-${id}`,
        createdAt: new Date().toISOString(),
        bookmarkTime: createTime || 0,
      };
      createNote(newNote);
    }

    onSave();
  };

  function handleFocus(e: React.ChangeEvent<HTMLTextAreaElement>){
    const input = e.target;
    const length = input.value.length;
    input.setSelectionRange(length, length);
  }

  return (
    <NoteCard
        header={
            <>
            {isEditing ? (
              "Update note"
            ) : (
              <>
                Create new note at{" "}
                <Badge className="ms-2 min-w-14 text-sm">
                  {timeStamp}
                </Badge>
              </>
            )}
            </>
        }

        footerActions={
            <>
                <Button variant="destructive" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="default" type="submit" onClick={handleSubmit}>
                    Save
                </Button>
            </>
        }
    >
        <form onSubmit={handleSubmit}>
            <Textarea
            autoFocus
            value={formData.content}
            onChange={handleChange}
            onFocus={handleFocus}
            id="note-content"
            name="note-content"
            className="resize-none focus:shadow-none focus-visible:ring-primary"
            />
            {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
    </NoteCard>
  );
};
