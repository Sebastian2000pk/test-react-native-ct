import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export const FavoritesButton = () => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push("/favorites")}
      style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
      hitSlop={8}
    >
      <Ionicons name="heart-outline" size={22} color="#e53e3e" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  btnPressed: {
    opacity: 0.6,
  },
});
