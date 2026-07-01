import { FlatList, StyleSheet, Text, View } from "react-native";
import { JobCard } from "../components/JobCard";
import { StateView } from "../components/StateView";
import { useFavoritesStore } from "../stores/useFavoritesStore";
import { useTheme } from "../hooks/use-theme";

export const FavoritesScreen = () => {
  const { favorites } = useFavoritesStore();
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.heading}>Favoritos</Text>
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
