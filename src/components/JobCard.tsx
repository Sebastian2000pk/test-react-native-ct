import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Job } from "@/interfaces/job";
import { Spacing } from "@/constants/theme";
import { FavoriteButton } from "@/components/FavoriteButton";

export const JobCard = ({ job }: { job: Job }) => {
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
        {!!job.salary && (
          <Text style={styles.salary} numberOfLines={1}>
            {job.salary}
          </Text>
        )}

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

      <FavoriteButton job={job} variant="card" />
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
  salary: {
    fontSize: 13,
    color: "#1a7d3a",
    fontWeight: "600",
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
  salaryBadge: {
    backgroundColor: "#d4edda",
  },
  salaryText: {
    color: "#155724",
  },
});
