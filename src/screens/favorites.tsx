import { FlatList, StyleSheet, View } from "react-native";
import { JobCard } from "../components/JobCard";
import { StateView } from "../components/StateView";
import { useTheme } from "../hooks/use-theme";
import { useFavoritesStore } from "../stores/useFavoritesStore";

export const FavoritesScreen = () => {
  const { favorites } = useFavoritesStore();
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        style={styles.list}
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <JobCard job={item} />}
        ListEmptyComponent={
          <StateView status="empty" empty="No tienes empleos guardados" />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  list: {
    flex: 1,
  },
});
