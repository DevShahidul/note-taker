import { useMemo } from "react";
import { useNote } from "../store";
import { useShallow } from "zustand/shallow";

export const useFilteredNotes = () => {
    const { notes, sortOrder, lessonFilter } = useNote(
        useShallow((state) => ({
            notes: state.notes,
            sortOrder: state.sortOrder,
            lessonFilter: state.lessonFilter,
        }))
    );

    return useMemo(() => {
        let filtered = [...notes];

        // Filter by lesson
        if (lessonFilter !== "all") {
            filtered = filtered.filter((note) => note.lessonId === lessonFilter);
        }

        // Sort by date
        if( sortOrder === "oldest" ) {
            filtered = [...filtered].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        } else if ( sortOrder === "newest" ) {
            filtered = [...filtered].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        return filtered;
    }, [notes, sortOrder, lessonFilter]);
}