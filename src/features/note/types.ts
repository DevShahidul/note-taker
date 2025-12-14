export type Note = {
    id: string;
    type?: "summary" | "key-points" | "questions";
    sectionId: string;
    lessonId: string;
    bookmarkTime: number;
    content: string;
    createdAt: string;
}

export type SortOrder = "oldest" | "newest";
export type LessonFilter = "all" | string;