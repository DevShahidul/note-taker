export type NoteType = {
    id: string;
    sectionId: string;
    lessonId: string;
    bookmarkTime: number;
    content: string;
    createdAt: string;
}

export type SortOrder = "oldest" | "newest";
export type LessonFilter = "all" | string;