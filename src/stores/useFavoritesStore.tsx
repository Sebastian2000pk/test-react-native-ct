import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Job } from "../interfaces/job";

interface FavoritesState {
  favorites: Job[];
  toggle: (job: Job) => void;
  isFavorite: (id: number) => boolean;
  remove: (id: number) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggle: (job) => {
        const exists = get().favorites.some((j) => j.id === job.id);
        set({
          favorites: exists
            ? get().favorites.filter((j) => j.id !== job.id)
            : [...get().favorites, job],
        });
      },
      isFavorite: (id) => get().favorites.some((j) => j.id === id),
      remove: (id) =>
        set({ favorites: get().favorites.filter((j) => j.id !== id) }),
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
