import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import { FavoritesButton } from "@/components/header/FavoritesButton";
import { ProfileIcon } from "@/components/header/ProfileIcon";
import { useTheme } from "@/hooks/use-theme";

export default function RootLayout() {
  const colors = useTheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: colors.background }]}
        edges={["bottom", "left", "right"]}
      >
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: true,
              headerTitle: "",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: colors.background },
              headerLeft: () => <ProfileIcon />,
              headerRight: () => <FavoritesButton />,
            }}
          />
          <Stack.Screen
            name="favorites"
            options={{
              headerShown: true,
              headerBackTitle: "Atrás",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: colors.background },
              title: "Favoritos",
            }}
          />
          <Stack.Screen
            name="job/[id]"
            options={{
              headerShown: true,
              headerBackTitle: "Atrás",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: colors.background },
              title: "",
            }}
          />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
