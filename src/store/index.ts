import { createNoteSlice } from "@/features/note/store";
import type { StoreType } from "@/type";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useStore = create<StoreType>()(
  devtools(
    persist(
        immer((...n) => ({
          ...createNoteSlice(...n),
        })),
        { name: "app-storage" }
    )
  )
);
