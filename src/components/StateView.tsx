import { ActivityIndicator, Button, Text, View } from "react-native";

interface StateViewProps {
  status: "loading" | "error" | "empty";
  error?: string | null;
  empty?: string;
  onRetry?: () => void;
}

export function StateView({ status, error, empty, onRetry }: StateViewProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      {status === "loading" && <ActivityIndicator size="large" />}
      {status === "error" && (
        <>
          <Text>{error ?? "Ocurrió un error"}</Text>
          {onRetry && <Button title="Reintentar" onPress={onRetry} />}
        </>
      )}
      {status === "empty" && <Text>{empty ?? "Sin resultados"}</Text>}
    </View>
  );
}
