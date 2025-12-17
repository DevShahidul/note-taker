import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { FileText, PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ConfirmationModal } from "./ConfirmationModal";
import { useNote } from "../store";
import { NoteCard } from "./NoteCard";
import { NoteForm } from "./NoteForm";
import type { Note } from "../types";
import { cn, formatTime } from "@/lib/utils";
import { NOTE_TYPES } from "./NoteForm";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import CodeBlock from "@tiptap/extension-code-block";
import { generateHTML } from "@tiptap/html";

type Props = {
  note: Note;
};

export const NoteItem = ({ note }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { removeNote, setNoteType } = useNote(
    useShallow((state) => ({
      removeNote: state.removeNote,
      setNoteType: state.setNoteType,
    }))
  );

  const handleEdit = () => {
    setIsEditing(true);
    setNoteType(note.type);
  };
  const handleSave = () => setIsEditing(false);
  const handleCancel = () => setIsEditing(false);
  const handleDelete = () => removeNote(note.id);

  const timeStamp = formatTime(note.bookmarkTime);

  const noteType = NOTE_TYPES.find((nt) => nt.id === note.type);
  const Icon = noteType?.icon || FileText;

  const renderNoteContent = () => {
    try {
      const json = JSON.parse(note.content);
      const html = generateHTML(json, [
        StarterKit.configure({
          bulletList: {
            HTMLAttributes: {
              class: "list-disc ml-4",
            },
          },
          orderedList: {
            HTMLAttributes: {
              class: "list-decimal ml-4",
            },
          },
        }),
        Highlight.configure({
          HTMLAttributes: {
            class: "hover:bg-purple-500 hover:text-white",
          },
        }),
        CodeBlock.configure({
          enableTabIndentation: true,
          tabSize: 2,
          HTMLAttributes: {
            class: "bg-primary text-white p-3 rounded-sm",
          },
        }),
      ]);
      return html;
    } catch(error) {
      console.error("Failed to render note content:", error);
      return `<p>${note.content}</p>`;
    }
  };

  return (
    <NoteCard
      badch={
        noteType?.label && (
          <div
            className={cn(
              "absolute inline-flex items-center start-0 top-0 shadow text-amber-50 space-x-1.5 p-0.5 rounded-tl-sm",
              noteType?.color
            )}
          >
            <Icon className="size-3" />
            <span className="text-xs">{noteType?.label}</span>
          </div>
        )
      }
      header={
        <>
          <Badge className="ms-2 min-w-14 text-sm">{timeStamp}</Badge>
          <span>{note.sectionId}</span>
          <span>{note.lessonId}</span>
        </>
      }
      headerActions={
        <>
          <Button
            variant="ghost"
            size="icon"
            disabled={isEditing}
            onClick={handleEdit}
          >
            <PencilIcon />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive hover:bg-destructive/5"
              >
                <TrashIcon />
              </Button>
            </DialogTrigger>
            <ConfirmationModal onOk={handleDelete} />
          </Dialog>
        </>
      }
    >
      {isEditing ? (
        <NoteForm onSave={handleSave} onCancel={handleCancel} editNote={note} />
      ) : (
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: renderNoteContent() }}
        />
      )}
    </NoteCard>
  );
};
