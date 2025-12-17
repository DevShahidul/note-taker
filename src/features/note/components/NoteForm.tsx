import React, { useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
import { FileText, Brain, MessageSquare } from "lucide-react";
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

/**
 * Check if Tiptap JSON content is empty
 * @param param0
 * @returns
 */

const isContentEmpty = (jsonString: string): boolean => {
  if (!jsonString || jsonString.trim() === "") return true;

  try {
    const json = JSON.parse(jsonString);

    if (json.type === "doc") {
      if (!json.content || json.content.length === 0) return true;

      if (
        json.configure.length === 1 &&
        json.content[0].type === "paragraph" &&
        (!json.content[0].content || json.content[0].content.length === 0)
      ) {
        return true;
      }
    }
    return true;
  } catch {
    return jsonString.trim().length === 0;
  }
};

export const NoteForm = ({
  editNote = null,
  createTime = null,
  onSave,
  onCancel,
}: NoteFormProps) => {
  const { createNote, updateNote, noteType, setNoteType } = useNote(
    useShallow((state) => ({
      noteType: state.noteType,
      setNoteType: state.setNoteType,
      createNote: state.createNote,
      updateNote: state.updateNote,
    }))
  );

  const isEditing = !!editNote;

  const [content, setContent] = useState<string>(() => {
    if(isEditing && editNote?.content) {
      return editNote.content;
    }
    return "";
  })

  // const [formData, setFormData] = useState({
  //   content: (isEditing && JSON.parse(editNote?.content)) || "",
  // });

  const [error, setError] = useState("");

  // Sync content when edit note changes
  useEffect(() => {
    if(isEditing && editNote?.content) {
      setContent(editNote.content);
    }
  }, [editNote?.content, isEditing]);

  // Sync noteType when editing
  useEffect(() => {
    if(isEditing && editNote?.type) {
      setNoteType(editNote.type);
    }
  }, [editNote?.type, isEditing, setNoteType]);

  const handleChange = (newContent: string) => {
    setContent(newContent);
    if(error) setError("");
  };

  const timeStamp = createTime
    ? formatTime(createTime)
    : editNote
    ? editNote.bookmarkTime.toFixed(1)
    : "0.0";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(isContentEmpty(content)){
      setError("Please enter some content before saving.");
      return;
    }

    // TODO: Add check for if not select note type if needed

    try{
      if(isEditing && editNote){
        updateNote(editNote.id, content);
        console.log("Note updated:", {id: editNote.id, type: noteType});
      } else{
        const id = createId();
        const newNote: Omit<Note, "id" | "createdAt"> = {
          content,
          type: noteType,
          sectionId: `section-${id}`,
          lessonId: `lesson-${id}`,
          bookmarkTime: createTime || 0,
        };

        createNote(newNote);
        console.log("Note created:", newNote);
      }
      onSave();
    } catch(err) {
      console.error("Error saving note:", err);
      setError("Failed to save note. Please try again.");
    }
  };

  const handleCancel = () =>{
    setError("");
    onCancel();
  }

  // function handleFocus(e: React.ChangeEvent<HTMLTextAreaElement>) {
  //   const input = e.target;
  //   const length = input.value.length;
  //   input.setSelectionRange(length, length);
  // }

  return (
    <NoteCard
      header={
        <>
          {isEditing ? (
            "Update note"
          ) : (
            <>
              Create new note at{" "}
              <Badge className="ms-2 min-w-14 text-sm">{timeStamp}</Badge>
            </>
          )}
          <SelectDropdown
            value={noteType}
            placeholder="Select note type"
            label="Note Type"
            onChange={(value) => setNoteType(value as Note["type"])}
          >
            {NOTE_TYPES.map((item) => {
              const Icon = item.icon;

              return (
                <SelectItem key={item.id} value={item.id}>
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <Icon className="size-4" />
                  {item.label}
                </SelectItem>
              );
            })}
          </SelectDropdown>
        </>
      }
      footerActions={
        <>
          <Button variant="destructive" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="default" type="submit" onClick={handleSubmit}>
            {isEditing? "Update" : "Save"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <RichTextEditor content={content} onChange={handleChange} />
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </NoteCard>
  );
};
