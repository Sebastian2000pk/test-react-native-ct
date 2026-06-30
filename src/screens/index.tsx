import { useEffect } from "react";
import { FlatList, RefreshControl, StyleSheet, Text } from "react-native";
import { JobCard } from "../components/JobCard";
import { StateView } from "../components/StateView";
import { useJobsStore } from "../stores/useJobsStore";

export const JobsScreen = () => {
  const { status, error, loadJobs, loadCategories, jobs } = useJobsStore();
  const data = jobs;

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
      <Text>Jobs Screen</Text>
      <FlatList
        style={styles.list}
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
});
