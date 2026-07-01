import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/use-theme";

export const FavoritesButton = () => {
  const router = useRouter();
  const colors = useTheme();

  return (
    <Button
      variant="secondary"
      onPress={() => router.push("/favorites")}
      style={styles.btn}
      hitSlop={8}
    >
      <Ionicons name="heart-outline" size={18} color={colors.textSecondary} />
    </Button>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
