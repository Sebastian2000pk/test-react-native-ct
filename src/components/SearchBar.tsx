import { TextField } from "@/components/TextField";
import { useJobsStore } from "@/stores/useJobsStore";

export const SearchBar = () => {
  const { search, setSearch } = useJobsStore();

  return (
    <TextField
      icon="search"
      placeholder="Buscar por título o empresa"
      value={search}
      onChangeText={setSearch}
      returnKeyType="search"
      clearButtonMode="while-editing"
    />
  );
};
