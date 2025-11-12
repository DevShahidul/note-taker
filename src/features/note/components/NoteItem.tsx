import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useShallow } from "zustand/shallow";
import { PencilIcon, TrashIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ConfirmationModal } from "./ConfirmationModal";
import { useNote } from "../store";
import { NoteCard } from "./NoteCard";
import { NoteForm } from "./NoteForm";
import type { NoteType } from "../types";

type Props = {
  note: NoteType;
};

export const NoteItem = ({ note }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { removeNote } = useNote(
    useShallow((state) => ({
      removeNote: state.removeNote,
    }))
  );

const handleEdit = () => setIsEditing(true);
const handleSave = () => setIsEditing(false);
const handleCancel = () => setIsEditing(false);
const handleDelete = () => removeNote(note.id);

const timeStamp = note.bookmarkTime.toFixed(1);

  return (
    <NoteCard
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
            <NoteForm
            onSave={handleSave}
            onCancel={handleCancel}
            editNote={note}
          />
        ) : (
            <div>{note.content}</div>
        )}
    </NoteCard>
  );
};
