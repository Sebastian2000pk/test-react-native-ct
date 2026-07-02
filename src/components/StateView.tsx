import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Button, Text, View } from "react-native";
import { useTheme } from "@/hooks/use-theme";

interface StateViewProps {
  status: "loading" | "error" | "empty";
  error?: string | null;
  empty?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onRetry?: () => void;
}

export function StateView({
  status,
  error,
  empty,
  icon = "file-tray-outline",
  onRetry,
}: StateViewProps) {
  const colors = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        gap: 16,
      }}
    >
      {status === "loading" && <ActivityIndicator size="large" />}
      {status === "error" && (
        <>
          <Ionicons name="alert-circle-outline" size={72} color={colors.textSecondary} />
          <Text style={{ color: colors.textSecondary, fontSize: 16, textAlign: "center" }}>
            {error ?? "Ocurrió un error"}
          </Text>
          {onRetry && <Button title="Reintentar" onPress={onRetry} />}
        </>
      )}
      {status === "empty" && (
        <>
          <Ionicons name={icon} size={72} color={colors.textSecondary} />
          <Text style={{ color: colors.textSecondary, fontSize: 16, textAlign: "center" }}>
            {empty ?? "Sin resultados"}
          </Text>
        </>
      )}
    </View>
  );
}
