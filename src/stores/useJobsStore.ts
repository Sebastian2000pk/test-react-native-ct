import { create } from "zustand";
import { fetchCategories, fetchJobs } from "../api/remotive";
import { Category, Job } from "../interfaces/job";

type Status = "idle" | "loading" | "error" | "success";

interface JobsState {
  jobs: Job[];
  categories: Category[];
  status: Status;
  error: string | null;
  search: string;
  category: string;
  jobType: string;
  loadJobs: () => Promise<void>;
  loadCategories: () => Promise<void>;
  setSearch: (s: string) => void;
  setCategory: (c: string) => void;
  setJobType: (t: string) => void;
}

export const useJobsStore = create<JobsState>((set) => ({
  jobs: [],
  categories: [],
  status: "idle",
  error: null,
  search: "",
  category: "",
  jobType: "",

  loadJobs: async () => {
    set({ status: "loading", error: null });
    try {
      const jobs = await fetchJobs({ limit: 100 });
      console.log("Fetched jobs:", jobs); // Debugging line
      set({ jobs, status: "success" });
    } catch (e: any) {
      set({ status: "error", error: e.message });
    }
  },

  loadCategories: async () => {
    try {
      const categories = await fetchCategories();
      set({ categories });
    } catch {}
  },

  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
  setJobType: (jobType) => set({ jobType }),
}));
