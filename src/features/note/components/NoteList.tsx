import type { NoteType, SortOrder } from "@/features/note/types";
import { NoteItem } from "./NoteItem";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNote } from "@/features/note/store";
import { useShallow } from "zustand/react/shallow";

type NoteListProps = {
  notes: NoteType[];
};

export const NoteList = ({ notes }: NoteListProps) => {
  const { sortOrder, lessonFilter, setSortOrder, setLessonFilter, getUniqueLessons, clearFilters } = useNote(
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

  if (!notes.length) return <p className="text-2xl">No notes available</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Sort by Date */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Sort by:</label>
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="newest">Most Recent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filter by Lesson */}
        {uniqueLessons.length > 0 && (
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Lesson:</label>
            <Select value={lessonFilter} onValueChange={setLessonFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select lesson" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Lessons</SelectItem>
                {uniqueLessons.map((lesson) => (
                  <SelectItem key={lesson} value={lesson}>
                    {lesson}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
        {notes.map((note: NoteType) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};
