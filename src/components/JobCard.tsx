import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { Job } from "@/interfaces/job";

export const JobCard = ({ job }: { job: Job }) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: job.company_logo }}
        style={styles.logo}
        contentFit="contain"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {job.title}
        </Text>
        <Text style={styles.company}>{job.company_name}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{job.category}</Text>
          <Text style={styles.meta}>{job.candidate_required_location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e5e5",
    marginHorizontal: 12,
    marginVertical: 6,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
  },
  info: {
    flex: 1,
    marginLeft: 12,
    gap: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
  },
  company: {
    fontSize: 13,
    color: "#555",
  },
  metaRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
  },
  meta: {
    fontSize: 12,
    color: "#888",
  },
});
