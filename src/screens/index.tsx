import { useEffect } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
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
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View
            style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}
          >
            <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            <Text>{item.company_name}</Text>
            <Text>{item.category}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={status === "loading"}
            onRefresh={loadJobs}
          />
        }
      />
    </>
  );
};
