import React, { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { FileText, Brain, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/lib/utils";
import { useNote } from "../store";
import type { Note } from "../types";
import { createId } from "../utils";
import { NoteCard } from "./NoteCard";
import { SelectDropdown } from "./SelectDropdown";
import { SelectItem } from "@/components/ui/select";
import { RichTextEditor } from "./rich-text-editor";


export const NOTE_TYPES = [
  {
    id: "summary",
    label: "Summary",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    id: "key-points",
    label: "Key Points",
    icon: Brain,
    color: "bg-green-500",
  },
  {
    id: "questions",
    label: "Questions",
    icon: MessageSquare,
    color: "bg-orange-500",
  },
] as const;

type NoteFormProps = {
  editNote?: Note | null;
  createTime?: number | null;
  onSave: () => void;
  onCancel: () => void;
};

export const NoteForm = ({
  editNote = null,
  createTime = null,
  onSave,
  onCancel,
}: NoteFormProps) => {
  
    const { createNote, updateNote, noteType, setNoteType} = useNote(
    useShallow((state) => ({
      noteType: state.noteType,
      setNoteType: state.setNoteType,
      createNote: state.createNote,
      updateNote: state.updateNote,
    }))
  );

  const [formData, setFormData] = useState({
    content: editNote?.content || ""
  })

  const [error, setError] = useState("");

  const isEditing = !!editNote;

  const handleChange = (content: string) => {
    // const content = e.target.value;
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
        type: noteType,
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
            <SelectDropdown
              value={noteType}
              placeholder="Select note type"
              label="Note Type"
              onChange={(value) => setNoteType(value as Note['type'])}
            >
              {NOTE_TYPES.map((item) => {

                const Icon = item.icon;

                return (
                <SelectItem value={item.id}> 
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <Icon className="size-4" /> 
                  {item.label}
                </SelectItem>
              )
              })}
            </SelectDropdown>
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
            {/* <Textarea
            autoFocus
            value={formData.content}
            onChange={handleChange}
            onFocus={handleFocus}
            id="note-content"
            name="note-content"
            className="resize-none focus:shadow-none focus-visible:ring-primary"
            /> */}
            <RichTextEditor 
              content={formData.content}
              onChange={handleChange}
            />
            {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>

    </NoteCard>
  );
};
