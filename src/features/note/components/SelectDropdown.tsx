import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ReactNode } from "react";

type Value = string | undefined;

interface SelectDropdownProps {
  value: Value;
  label?: string;
  placeholder?: string;
  children: ReactNode;
  onChange: (value:string) => void;
}

export function SelectDropdown({
  label,
  value,
  children,
  placeholder = "Select one",
  onChange,
}: SelectDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {children}
        </SelectContent>
      </Select>
    </div>
  );
}
