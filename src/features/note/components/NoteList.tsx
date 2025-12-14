import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Note, SortOrder } from "../types";
import { NoteItem } from "./NoteItem";
import { useNote } from "../store";
import EmptyNote from "./EmptyNote";
import { SelectDropdown } from "./SelectDropdown";

type NoteListProps = {
  notes: Note[];
};

export const NoteList = ({ notes }: NoteListProps) => {
  const {
    sortOrder,
    lessonFilter,
    setSortOrder,
    setLessonFilter,
    getUniqueLessons,
    clearFilters,
  } = useNote(
    useShallow((state) => ({
      sortOrder: state.sortOrder,
      lessonFilter: state.lessonFilter,
      setSortOrder: state.setSortOrder,
      setLessonFilter: state.setLessonFilter,
      getUniqueLessons: state.getUniqueLessons,
      clearFilters: state.clearFilters,
    }))
  );

  const uniqueLessons = getUniqueLessons();

  const sortOptions = [
    {
      value: "oldest",
      title: "Oldest",
    },
    {
      value: "newest",
      title: "Most Recent",
    },
  ];

  function handleLessonFilter(value: string) {
    setLessonFilter(value)
  }

  if (!notes.length) return <EmptyNote />;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Sort by Date */}
        <SelectDropdown 
          value={sortOrder} 
          label="Sort by:" 
          placeholder="Select sort order"  
          onChange={(value) => setSortOrder(value as SortOrder)}
        >
            {sortOptions.map((opt) => <SelectItem value={opt.value}>{opt.title}</SelectItem>)}
        </SelectDropdown>

        {/* Filter by Lesson */}
        {uniqueLessons.length > 0 && (
          <SelectDropdown
            value={lessonFilter} 
            label="Lesson:" 
            placeholder="Select lesson"  
            onChange={handleLessonFilter}
          >
            <SelectItem value="all">All Lessons</SelectItem>
            {uniqueLessons.map((lesson) => (
              <SelectItem key={lesson} value={lesson}>
                {lesson}
              </SelectItem>
            ))}
          </SelectDropdown>
        )}

        {/* Clear Filters Button */}
        {(sortOrder !== "newest" || lessonFilter !== "all") && (
          <Button onClick={clearFilters} variant="outline" size="sm">
            Clear Filters
          </Button>
        )}
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.map((note: Note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};
