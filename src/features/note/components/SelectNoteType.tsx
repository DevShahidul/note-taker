import type { Note } from "../types";
import { Button } from "@/components/ui/button";

import { FileText, Brain, MessageSquare } from "lucide-react";

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

interface SelectNoteTypeProps {
  selectedType: Note["type"];
  onSelectedType: (type: Note["type"]) => void;
}

const SelectNoteType = ({
  selectedType,
  onSelectedType,
}: SelectNoteTypeProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium block">Note Type</label>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
        {NOTE_TYPES.map(({ id, label, icon: Icon, color }) => (
          <Button
            key={id}
            variant="outline"
            onClick={() => onSelectedType(id as Note["type"])}
            className={`flex items-center gap-2 text-left transition-colors ${
              selectedType === id
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-muted"
            }`}
          >
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <Icon className="h-3 w-3" />
            <span className="text-xs">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SelectNoteType;
