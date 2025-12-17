import { create, type StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, devtools } from "zustand/middleware";
import type { Note, SortOrder, LessonFilter  } from "./types";
import { createId } from "./utils";

type NoteState = {
  notes: Note[];
  showNoteForm: boolean;
  editNote: Note | null;
  sortOrder: SortOrder;
  lessonFilter: LessonFilter;
  noteType: Note['type'];
};

type NoteActions = {
  createNote: (note: Omit<Note, "id" | "createdAt">) => void;
  getNotesForLesson: (lessonId: string) => Note[];
  updateNote: (id: string, content: string) => void;
  removeNote: (noteId: string) => void;
  displayNoteFrom: () => void;
  hideNoteFrom: () => void;
  setEditNote: (note: Note) => void;
  clearNotes: () => void;
  setSortOrder: (order: SortOrder) => void;
  setLessonFilter: (lessonId: LessonFilter) => void;
  getUniqueLessons: () => string[];
  clearFilters: () => void;
  setNoteType: (value: Note['type']) => void;
};

const initialNotes = {
  notes: [],
  showNoteForm: false,
  editNote: null,
  sortOrder: "newest" as SortOrder,
  lessonFilter: "all" as LessonFilter,
  noteType: "" as Note['type']
};

export type NoteStoreSlice = NoteState & NoteActions;

export const createNoteSlice: StateCreator<
  NoteStoreSlice,
  [["zustand/immer", never]],
  [],
  NoteStoreSlice
> = (set, get) => ({
  ...initialNotes,

  createNote: (note) => {
    const newNote = {
      ...note,
      id: `note-${createId()}`,
      createdAt: new Date().toISOString(),
    };
    set((state) => {
      state.notes.push(newNote);
    });
    get().hideNoteFrom();
  },

  getNotesForLesson: (lessonId) => {
    return get().notes.filter((note: Note) => note.id === lessonId);
  },

  updateNote: (id, content) => {
    set((state) => {
      const noteIndex = state.notes.findIndex((note) => note.id === id);
      if (noteIndex !== -1) {
        state.notes[noteIndex].content = content;
        state.notes[noteIndex].type = state.noteType;
        return;
      }
    });
  },

  removeNote: (noteId) => {
    set((state) => {
      const noteIndex = state.notes.findIndex((note) => note.id === noteId);
      if (noteIndex !== -1) {
        state.notes.splice(noteIndex, 1);
        return;
      }
    });
  },

  setEditNote: (note) => {
    set((state) => {
      state.editNote = note;
    });
  },

  setNoteType: (value) => set({noteType: value}),
  displayNoteFrom: () => set({ showNoteForm: true }),
  hideNoteFrom: () => set({ showNoteForm: false, editNote: null }),

  clearNotes: () => set({ notes: [] }),

  setSortOrder: (order: SortOrder) => set({ sortOrder: order }),

  setLessonFilter: (lessonId: LessonFilter) => set({ lessonFilter: lessonId }),

  getUniqueLessons: () => {
    const lessons = get().notes.map((note) => note.lessonId);
    return Array.from(new Set(lessons));
  },

  clearFilters: () => set({ sortOrder: "newest", lessonFilter: "all" }),
});

export const useNote = create<NoteStoreSlice>()(
  persist(
    devtools(
      immer((...a) => ({
        ...createNoteSlice(...a),
      })),
    ),
    { name: "note-storage" }
  )
);
