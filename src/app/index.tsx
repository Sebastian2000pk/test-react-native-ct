import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { JobsScreen } from "@/screens/index";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <JobsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.two,
    alignItems: "center",
    gap: Spacing.three,
  },
});
