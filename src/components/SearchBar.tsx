import { Spacing } from "@/constants/theme";
import { useJobsStore } from "@/stores/useJobsStore";
import { StyleSheet, TextInput } from "react-native";

export const SearchBar = () => {
  const { search, setSearch } = useJobsStore();

  return (
    <TextInput
      style={styles.search}
      placeholder="Buscar por título o empresa"
      placeholderTextColor="#aaa"
      value={search}
      onChangeText={setSearch}
      returnKeyType="search"
      clearButtonMode="while-editing"
    />
  );
};

const styles = StyleSheet.create({
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 10,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 14,
    backgroundColor: "#fff",
    color: "#111",
  },
});
