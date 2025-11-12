import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNote } from "../store";
import { useShallow } from "zustand/react/shallow";
import { Badge } from "@/components/ui/badge";
import type { NoteType } from "../types";
import { createId } from "@/features/note/utils";
import { NoteCard } from "./NoteCard";

type NoteFormProps = {
  editNote?: NoteType | null;
  onSave: () => void;
  onCancel: () => void;
};

export const NoteForm = ({
  editNote = null,
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
      const newNote: NoteType = {
        ...formData,
        id,
        sectionId: `section-${id}`,
        lessonId: `lesson-${id}`,
        createdAt: new Date().toISOString(),
        bookmarkTime: Math.random() * 120,
      };
      createNote(newNote);
    }

    onSave();
  };

  const timeStamp = new Date().getTime();


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
            id="note-content"
            name="note-content"
            className="resize-none focus:shadow-none focus-visible:ring-primary"
            />
            {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
    </NoteCard>
  );
};
