import { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { useJobsStore } from "../stores/useJobsStore";

export const JobsScreen = () => {
  const { status, error, loadJobs, loadCategories, filteredJobs } =
    useJobsStore();
  const data = filteredJobs();

  useEffect(() => {
    loadJobs();
    loadCategories();
  }, []);

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
      />
    </>
  );
};
