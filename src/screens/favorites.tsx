import { FlatList, StyleSheet, Text, View } from "react-native";
import { ClearFavoritesButton } from "../components/ClearFavoritesButton";
import { JobCard } from "../components/JobCard";
import { StateView } from "../components/StateView";
import { Spacing } from "../constants/theme";
import { useTheme } from "../hooks/use-theme";
import { useFavoritesStore } from "../stores/useFavoritesStore";

export const FavoritesScreen = () => {
  const { favorites } = useFavoritesStore();
  const colors = useTheme();

  if (favorites.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StateView
          status="empty"
          empty="No tienes empleos guardados"
          icon="heart-outline"
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.toolbar}>
        <Text style={[styles.count, { color: colors.textSecondary }]}>
          {favorites.length} guardado{favorites.length === 1 ? "" : "s"}
        </Text>
        <ClearFavoritesButton />
      </View>
      <FlatList
        style={styles.list}
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <JobCard job={item} />}
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
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
  },
  count: {
    fontSize: 13,
    fontWeight: "500",
  },
  list: {
    flex: 1,
  },
});
