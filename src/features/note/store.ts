import { create, type StateCreator } from "zustand";
import type { NoteType } from "./types";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { createId } from "@/features/note/utils";

type NoteState = {
  notes: NoteType[];
  showNoteForm: boolean;
  editNote: NoteType | null;
};

type NoteActions = {
  createNote: (note: Omit<NoteType, "id" | "createdAt">) => void;
  getNotesForLesson: (lessonId: string) => NoteType[];
  updateNote: (id: string, content: string) => void;
  removeNote: (noteId: string) => void;
  displayNoteFrom: () => void;
  hideNoteFrom: () => void;
  setEditNote: (note: NoteType) => void;
  clearNotes: () => void;
};

const initialNotes = {
  notes: [],
  showNoteForm: false,
  editNote: null,
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
    return get().notes.filter((note: NoteType) => note.id === lessonId);
  },

  updateNote: (id, content) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id ? { ...note, content } : note
      ),
    }));
  },

  removeNote: (noteId) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== noteId),
    }));
  },

  setEditNote: (note) => {
    set((state) => {
      state.editNote = note;
    });
  },

  displayNoteFrom: () => set({ showNoteForm: true }),
  hideNoteFrom: () => set({ showNoteForm: false, editNote: null }),

  clearNotes: () => set({ notes: [] }),
});

export const useNote = create<NoteStoreSlice>()(
  persist(
    immer((...a) => ({
      ...createNoteSlice(...a),
    })),
    { name: "note-storage" }
  )
);
