import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

import { Job } from "@/interfaces/job";
import { Spacing } from "@/constants/theme";
import { useFavoritesStore } from "@/stores/useFavoritesStore";

type FavoriteButtonProps = {
  job: Job;
  variant?: "card" | "detail";
};

export const FavoriteButton = ({ job, variant = "card" }: FavoriteButtonProps) => {
  const toggle = useFavoritesStore((s) => s.toggle);
  const fav = useFavoritesStore((s) => s.favorites.some((j) => j.id === job.id));

  const isDetail = variant === "detail";

  return (
    <Pressable
      onPress={() => toggle(job)}
      style={({ pressed }) => [
        isDetail ? styles.detailBtn : styles.cardBtn,
        !isDetail && pressed && styles.cardBtnPressed,
      ]}
      hitSlop={isDetail ? undefined : 8}
    >
      <Ionicons
        name={fav ? "heart" : "heart-outline"}
        size={isDetail ? 24 : 20}
        color={fav ? "#e53e3e" : isDetail ? "#aaa" : "#c7c7cc"}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: Spacing.one,
  },
  cardBtnPressed: {
    backgroundColor: "#F0F0F3",
  },
  detailBtn: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    justifyContent: "center",
    alignItems: "center",
  },
});
