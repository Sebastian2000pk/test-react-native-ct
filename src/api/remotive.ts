import axios from "axios";
import { Category, Job } from "../interfaces/job";

const api = axios.create({ baseURL: "https://remotive.com/api" });

interface FetchJobsParams {
  search?: string;
  category?: string;
  limit?: number;
}

export async function fetchJobs(params?: FetchJobsParams): Promise<Job[]> {
  const { data } = await api.get("/remote-jobs", { params });
  return data.jobs as Job[];
}

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await api.get("/remote-jobs/categories");
  return data.jobs as Category[];
}
