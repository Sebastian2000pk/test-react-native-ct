import { Alert, Pressable, StyleSheet, Text } from "react-native";

import { useFavoritesStore } from "@/stores/useFavoritesStore";

export const ClearFavoritesButton = () => {
  const hasFavorites = useFavoritesStore((s) => s.favorites.length > 0);
  const clear = useFavoritesStore((s) => s.clear);

  if (!hasFavorites) {
    return null;
  }

  const confirmClear = () => {
    Alert.alert(
      "Vaciar favoritos",
      "¿Seguro que quieres eliminar todos los empleos guardados?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Vaciar", style: "destructive", onPress: clear },
      ],
    );
  };

  return (
    <Pressable
      onPress={confirmClear}
      style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
      hitSlop={8}
    >
      <Text style={styles.label}>Vaciar</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  btnPressed: {
    opacity: 0.5,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e53e3e",
  },
});
