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
      <Ionicons
        name="bookmark-outline"
        size={22}
        color={colors.textSecondary}
      />
    </Button>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});
