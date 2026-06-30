import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="job/[id]"
        options={{
          headerShown: true,
          headerBackTitle: "Atrás",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#fff" },
          title: "",
        }}
      />
    </Stack>
  );
}
