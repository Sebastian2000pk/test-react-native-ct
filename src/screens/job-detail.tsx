import { Button } from "@/components/Button";
import { FavoriteButton } from "@/components/FavoriteButton";
import { AccentColor, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { useJobsStore } from "@/stores/useJobsStore";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
    s.jobs.find((j) => String(j.id) === id),
  );
  const jobFromFav = useFavoritesStore((s) =>
    s.favorites.find((j) => String(j.id) === id),
  );
  const job = jobFromStore ?? jobFromFav;

  const infoItems = job
    ? ([
        job.candidate_required_location && {
          icon: "location-outline" as const,
          label: job.candidate_required_location,
        },
        job.job_type && {
          icon: "briefcase-outline" as const,
          label: job.job_type.replace(/_/g, " "),
        },
        job.category && {
          icon: "pricetag-outline" as const,
          label: job.category,
        },
      ].filter(Boolean) as {
        icon: keyof typeof Ionicons.glyphMap;
        label: string;
      }[])
    : [];

  if (!job) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.notFound, { color: colors.textSecondary }]}>
          Empleo no encontrado
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
      edges={["bottom"]}
    >
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
          <View
            style={[
              styles.logoWrapper,
              { backgroundColor: colors.backgroundElement },
            ]}
          >
            <Image
              source={{ uri: job.company_logo }}
              style={styles.logo}
              contentFit="contain"
            />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>
            {job.title}
          </Text>
          <Text style={[styles.company, { color: colors.textSecondary }]}>
            {job.company_name}
          </Text>
          {!!job.salary && (
            <Text style={[styles.salary, { color: AccentColor }]}>
              {job.salary}
            </Text>
          )}
        </View>

        {infoItems.length > 0 && (
          <View style={styles.infoCard}>
            {infoItems.map((item) => (
              <View key={item.label} style={styles.infoItem}>
                <Ionicons name={item.icon} size={15} color={AccentColor} />
                <Text
                  style={[styles.infoText, { color: colors.textSecondary }]}
                  numberOfLines={1}
                >
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        )}

        {!!job.description && (
          <View style={styles.descContainer}>
            <Text style={[styles.descTitle, { color: colors.text }]}>
              Descripción
            </Text>
            <Text style={[styles.descText, { color: colors.textSecondary }]}>
              {stripHtml(job.description)}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <FavoriteButton job={job} variant="detail" />
        <Button
          variant="primary"
          onPress={() => WebBrowser.openBrowserAsync(job.url)}
          style={styles.applyBtn}
        >
          <Text style={styles.applyBtnText}>Aplicar ahora</Text>
        </Button>
      </View>
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
  logoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.three,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: Spacing.half,
  },
  salary: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    paddingVertical: Spacing.two,
  },
  company: {
    fontSize: 15,
    textAlign: "center",
  },
  infoCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: Spacing.four,
    rowGap: Spacing.two,
    marginBottom: Spacing.four,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.one,
  },
  infoText: {
    fontSize: 13,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
    backgroundColor: "#fff",
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#eee",
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
