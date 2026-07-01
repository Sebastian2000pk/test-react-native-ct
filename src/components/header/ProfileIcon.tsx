import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

import { useTheme } from "@/hooks/use-theme";

export const ProfileIcon = () => {
  const colors = useTheme();

  return (
    <View
      style={[styles.circle, { backgroundColor: colors.backgroundElement }]}
    >
      <Ionicons name="person" size={18} color={colors.textSecondary} />
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
