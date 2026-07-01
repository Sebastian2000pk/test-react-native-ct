import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Job } from "@/interfaces/job";
import { Spacing } from "@/constants/theme";
import { useFavoritesStore } from "@/stores/useFavoritesStore";

export const JobCard = ({ job }: { job: Job }) => {
  const toggle = useFavoritesStore((s) => s.toggle);
  const fav = useFavoritesStore((s) => s.favorites.some((j) => j.id === job.id));

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => router.push(`/job/${job.id}`)}
    >
      <Image
        source={{ uri: job.company_logo }}
        style={styles.logo}
        contentFit="contain"
      />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {job.title}
        </Text>
        <Text style={styles.company} numberOfLines={1}>
          {job.company_name}
        </Text>

        <View style={styles.metaRow}>
          {!!job.job_type && (
            <View style={styles.badge}>
              <Text style={styles.badgeText} numberOfLines={1}>
                {job.job_type.replace(/_/g, " ")}
              </Text>
            </View>
          )}
          {!!job.candidate_required_location && (
            <View style={styles.badge}>
              <Text style={styles.badgeText} numberOfLines={1}>
                {job.candidate_required_location}
              </Text>
            </View>
          )}
        </View>
      </View>

      <Pressable
        onPress={() => toggle(job)}
        style={({ pressed }) => [styles.favBtn, pressed && styles.favBtnPressed]}
        hitSlop={8}
      >
        <Text style={[styles.heart, fav && styles.heartActive]}>
          {fav ? "♥" : "♡"}
        </Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.three,
    borderRadius: 18,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#EDEDEF",
    marginHorizontal: Spacing.three,
    marginVertical: Spacing.one + 2,
  },
  cardPressed: {
    backgroundColor: "#fafafa",
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#F0F0F3",
  },
  info: {
    flex: 1,
    marginLeft: Spacing.three,
    gap: 3,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    lineHeight: 20,
  },
  company: {
    fontSize: 13,
    color: "#777",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 6,
  },
  badge: {
    backgroundColor: "#F0F0F3",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    maxWidth: "100%",
  },
  badgeText: {
    fontSize: 11.5,
    color: "#60646C",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  favBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: Spacing.one,
  },
  favBtnPressed: {
    backgroundColor: "#F0F0F3",
  },
  heart: {
    fontSize: 20,
    color: "#c7c7cc",
  },
  heartActive: {
    color: "#e53e3e",
  },
});
