import { useEffect, useMemo } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { JobCard } from "../components/JobCard";
import { JobFilters } from "../components/JobFilters";
import { StateView } from "../components/StateView";
import { useJobsStore } from "../stores/useJobsStore";

export const JobsScreen = () => {
  const {
    status,
    error,
    jobs,
    search,
    category,
    jobType,
    loadJobs,
    loadCategories,
  } = useJobsStore();

  const data = useMemo(() => {
    const q = search.trim().toLowerCase();
    return jobs.filter((j) => {
      const matchText =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.company_name.toLowerCase().includes(q);
      const matchCategory = !category || j.category === category;
      const matchType = !jobType || j.job_type === jobType;
      return matchText && matchCategory && matchType;
    });
  }, [jobs, search, category, jobType]);

  useEffect(() => {
    loadJobs();
    loadCategories();
  }, []);

  if (status === "loading" && data.length === 0)
    return <StateView status="loading" />;
  if (status === "error")
    return <StateView status="error" error={error} onRetry={loadJobs} />;

  return (
    <>
      <JobFilters />
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <JobCard job={item} />}
        refreshControl={
          <RefreshControl
            refreshing={status === "loading"}
            onRefresh={loadJobs}
          />
        }
        ListEmptyComponent={<StateView status="empty" empty="No hay empleos" />}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    width: "100%",
  },
  listContent: {
    paddingBottom: 16,
  },
});
