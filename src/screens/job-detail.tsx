import * as WebBrowser from "expo-web-browser";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useJobsStore } from "@/stores/useJobsStore";
import { Spacing } from "@/constants/theme";
import { Button } from "@/components/Button";
import { FavoriteButton } from "@/components/FavoriteButton";
import { useTheme } from "@/hooks/use-theme";

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
  const colors = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const jobFromStore = useJobsStore((s) =>
    s.jobs.find((j) => String(j.id) === id)
  );
  const jobFromFav = useFavoritesStore((s) =>
    s.favorites.find((j) => String(j.id) === id)
  );
  const job = jobFromStore ?? jobFromFav;

  if (!job) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Text style={[styles.notFound, { color: colors.textSecondary }]}>
          Empleo no encontrado
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={["bottom"]}>
      <Stack.Screen
        options={{
          title: job.company_name,
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerBackVisible: false,
          headerLeft: () => (
            <Button
              variant="secondary"
              onPress={() => router.back()}
              style={styles.backBtn}
              hitSlop={8}
            >
              <Ionicons name="chevron-back" size={20} color={colors.text} />
            </Button>
          ),
        }}
      />
      <ScrollView
        style={styles.card}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Image
            source={{ uri: job.company_logo }}
            style={[styles.logo, { backgroundColor: colors.backgroundElement }]}
            contentFit="contain"
          />
          <Text style={[styles.title, { color: colors.text }]}>{job.title}</Text>
          <Text style={[styles.company, { color: colors.textSecondary }]}>
            {job.company_name}
          </Text>
        </View>

        <View style={styles.metaList}>
          {!!job.candidate_required_location && (
            <View style={styles.metaRow}>
              <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                {job.candidate_required_location}
              </Text>
            </View>
          )}
          {!!job.job_type && (
            <View style={styles.metaRow}>
              <Ionicons name="briefcase-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                {job.job_type.replace(/_/g, " ")}
              </Text>
            </View>
          )}
          {!!job.category && (
            <View style={styles.metaRow}>
              <Ionicons name="pricetag-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.metaText, { color: colors.textSecondary }]}>
                {job.category}
              </Text>
            </View>
          )}
        </View>

        {!!job.salary && (
          <View style={[styles.salaryPill, { backgroundColor: colors.backgroundElement }]}>
            <Ionicons name="cash-outline" size={16} color={colors.text} />
            <Text style={[styles.salaryText, { color: colors.text }]}>{job.salary}</Text>
          </View>
        )}

        {job.tags.length > 0 && (
          <View style={styles.tagsRow}>
            {job.tags.slice(0, 8).map((tag) => (
              <View key={tag} style={[styles.tagChip, { backgroundColor: colors.backgroundElement }]}>
                <Text style={[styles.tagText, { color: colors.textSecondary }]}>{tag}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.actions}>
          <Button
            variant="primary"
            onPress={() => WebBrowser.openBrowserAsync(job.url)}
            style={styles.applyBtn}
          >
            <Text style={styles.applyBtnText}>Aplicar ahora</Text>
          </Button>
          <FavoriteButton job={job} variant="detail" />
        </View>

        {!!job.description && (
          <View style={styles.descContainer}>
            <Text style={[styles.descTitle, { color: colors.text }]}>Descripción</Text>
            <Text style={[styles.descText, { color: colors.textSecondary }]}>
              {stripHtml(job.description)}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  scroll: { padding: Spacing.four, paddingBottom: Spacing.six },
  notFound: { textAlign: "center", marginTop: 40 },
  backBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  header: { alignItems: "center", marginBottom: Spacing.four },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 18,
    marginBottom: Spacing.three,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: Spacing.half,
  },
  company: {
    fontSize: 15,
    textAlign: "center",
  },
  metaList: {
    gap: Spacing.two,
    marginBottom: Spacing.three,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.two,
  },
  metaText: { fontSize: 14 },
  salaryPill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: Spacing.one,
    borderRadius: 20,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + 2,
    marginBottom: Spacing.three,
  },
  salaryText: { fontSize: 14, fontWeight: "600" },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.two,
    justifyContent: "center",
    marginBottom: Spacing.four,
  },
  tagChip: {
    borderRadius: 12,
    paddingHorizontal: Spacing.two + 2,
    paddingVertical: Spacing.one,
  },
  tagText: { fontSize: 12 },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  applyBtn: { flex: 1 },
  applyBtnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  descContainer: { marginTop: Spacing.two },
  descTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: Spacing.two,
  },
  descText: { fontSize: 14, lineHeight: 22 },
});
