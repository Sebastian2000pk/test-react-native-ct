import * as WebBrowser from "expo-web-browser";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useJobsStore } from "@/stores/useJobsStore";
import { Spacing } from "@/constants/theme";

const stripHtml = (html: string) =>
  html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();

export const JobDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const jobFromStore = useJobsStore((s) =>
    s.jobs.find((j) => String(j.id) === id)
  );
  const jobFromFav = useFavoritesStore((s) =>
    s.favorites.find((j) => String(j.id) === id)
  );
  const job = jobFromStore ?? jobFromFav;

  const toggle = useFavoritesStore((s) => s.toggle);
  const fav = useFavoritesStore((s) =>
    s.favorites.some((j) => j.id === job?.id)
  );

  if (!job) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.notFound}>Empleo no encontrado</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <Stack.Screen
        options={{
          title: job.company_name,
          headerBackTitle: "Atrás",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#fff" },
        }}
      />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: job.company_logo }}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>{job.company_name}</Text>

        <View style={styles.badgesRow}>
          {!!job.job_type && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {job.job_type.replace(/_/g, " ")}
              </Text>
            </View>
          )}
          {!!job.candidate_required_location && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {job.candidate_required_location}
              </Text>
            </View>
          )}
          {!!job.salary && (
            <View style={[styles.badge, styles.salaryBadge]}>
              <Text style={[styles.badgeText, styles.salaryText]}>
                {job.salary}
              </Text>
            </View>
          )}
        </View>

        {!!job.category && (
          <View style={styles.categoryRow}>
            <View style={[styles.badge, styles.categoryBadge]}>
              <Text style={[styles.badgeText, styles.categoryText]}>
                {job.category}
              </Text>
            </View>
          </View>
        )}

        {job.tags.length > 0 && (
          <View style={styles.tagsRow}>
            {job.tags.slice(0, 8).map((tag) => (
              <View key={tag} style={styles.tagChip}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.actions}>
          <Pressable
            style={styles.applyBtn}
            onPress={() => WebBrowser.openBrowserAsync(job.url)}
          >
            <Text style={styles.applyBtnText}>Aplicar ahora</Text>
          </Pressable>
          <Pressable style={styles.favBtn} onPress={() => toggle(job)}>
            <Text style={[styles.heart, fav && styles.heartActive]}>
              {fav ? "♥" : "♡"}
            </Text>
          </Pressable>
        </View>

        {!!job.description && (
          <View style={styles.descContainer}>
            <Text style={styles.descTitle}>Descripción</Text>
            <Text style={styles.descText}>{stripHtml(job.description)}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { padding: Spacing.four, paddingBottom: Spacing.six },
  notFound: { textAlign: "center", marginTop: 40, color: "#888" },
  logoContainer: { alignItems: "center", marginBottom: Spacing.three },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
    textAlign: "center",
    marginBottom: Spacing.one,
  },
  company: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: Spacing.three,
  },
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    marginBottom: Spacing.two,
  },
  badge: {
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  badgeText: { fontSize: 13, color: "#555" },
  salaryBadge: { backgroundColor: "#d4edda" },
  salaryText: { color: "#155724", fontWeight: "600" },
  categoryRow: { alignItems: "center", marginBottom: Spacing.three },
  categoryBadge: { backgroundColor: "#cce5ff" },
  categoryText: { color: "#004085" },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: Spacing.three,
    justifyContent: "center",
  },
  tagChip: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: { fontSize: 12, color: "#666" },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: Spacing.four,
  },
  applyBtn: {
    flex: 1,
    backgroundColor: "#111",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  applyBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  favBtn: {
    width: 50,
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    justifyContent: "center",
    alignItems: "center",
  },
  heart: { fontSize: 22, color: "#aaa" },
  heartActive: { color: "#e53e3e" },
  descContainer: { marginTop: Spacing.two },
  descTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: Spacing.two,
  },
  descText: { fontSize: 14, color: "#444", lineHeight: 22 },
});
