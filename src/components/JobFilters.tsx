import { Button } from "@/components/Button";
import { Spacing } from "@/constants/theme";
import { useJobsStore } from "@/stores/useJobsStore";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const JOB_TYPES = [
  { value: "full_time", label: "Full time" },
  { value: "part_time", label: "Part time" },
  { value: "contract", label: "Contract" },
  { value: "freelance", label: "Freelance" },
  { value: "internship", label: "Internship" },
];

type Option = { value: string; label: string };

interface DropdownPickerProps {
  label: string;
  placeholder: string;
  value: string;
  options: Option[];
  onSelect: (v: string) => void;
}

const DropdownPicker = ({
  label,
  placeholder,
  value,
  options,
  onSelect,
}: DropdownPickerProps) => {
  const [open, setOpen] = useState(false);
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const sheetY = useRef(new Animated.Value(300)).current;

  const openSheet = () => {
    setOpen(true);
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.spring(sheetY, {
        toValue: 0,
        damping: 18,
        stiffness: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeSheet = (selected?: string) => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(sheetY, {
        toValue: 300,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setOpen(false);
      sheetY.setValue(300);
      if (selected !== undefined) onSelect(selected);
    });
  };

  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <>
      <TouchableOpacity
        style={styles.trigger}
        onPress={openSheet}
        activeOpacity={0.7}
      >
        <View style={styles.triggerInner}>
          <Text style={styles.triggerLabel}>{label}</Text>
          <Text
            style={[
              styles.triggerValue,
              !selectedLabel && styles.triggerPlaceholder,
            ]}
            numberOfLines={1}
          >
            {selectedLabel ?? placeholder}
          </Text>
        </View>
        <Text style={[styles.chevron, open && styles.chevronOpen]}>›</Text>
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="none"
        onRequestClose={() => closeSheet()}
      >
        <View style={StyleSheet.absoluteFill}>
          <Animated.View
            style={[styles.backdrop, { opacity: backdropOpacity }]}
          >
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => closeSheet()}
            />
          </Animated.View>

          <View style={styles.sheetWrapper}>
            <Animated.View
              style={[styles.sheet, { transform: [{ translateY: sheetY }] }]}
            >
              <View style={styles.sheetHandle} />
              <Text style={styles.sheetTitle}>{label}</Text>

              <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => closeSheet("")}
                  activeOpacity={0.6}
                >
                  <Text
                    style={[styles.optionText, !value && styles.optionActive]}
                  >
                    {placeholder}
                  </Text>
                  {!value && <Text style={styles.check}>✓</Text>}
                </TouchableOpacity>

                {options.map((opt) => (
                  <TouchableOpacity
                    key={opt.value}
                    style={styles.option}
                    onPress={() => closeSheet(opt.value)}
                    activeOpacity={0.6}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        value === opt.value && styles.optionActive,
                      ]}
                    >
                      {opt.label}
                    </Text>
                    {value === opt.value && <Text style={styles.check}>✓</Text>}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Animated.View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const FilterSheet = ({
  visible,
  onClose,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const sheetY = useRef(new Animated.Value(400)).current;

  const animateIn = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.spring(sheetY, {
        toValue: 0,
        damping: 18,
        stiffness: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateOut = (after: () => void) => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(sheetY, {
        toValue: 400,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      sheetY.setValue(400);
      after();
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onShow={animateIn}
      onRequestClose={() => animateOut(onClose)}
    >
      <View style={StyleSheet.absoluteFill}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => animateOut(onClose)}
          />
        </Animated.View>

        <View style={styles.sheetWrapper}>
          <Animated.View
            style={[
              styles.filterSheet,
              { transform: [{ translateY: sheetY }] },
            ]}
          >
            <View style={styles.sheetHandle} />
            <View style={styles.filterSheetHeader}>
              <Text style={styles.sheetTitle}>Filtros</Text>
              <TouchableOpacity
                onPress={() => animateOut(onClose)}
                hitSlop={8}
              >
                <Ionicons name="close" size={22} color="#888" />
              </TouchableOpacity>
            </View>

            <View style={styles.filterSheetBody}>{children}</View>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

export const JobFilters = () => {
  const { category, jobType, categories, setCategory, setJobType } =
    useJobsStore();

  const [filtersOpen, setFiltersOpen] = useState(false);

  const categoryOptions: Option[] = categories.map((c) => ({
    value: c.name,
    label: c.name,
  }));

  const activeFilterCount = [category, jobType].filter(Boolean).length;

  return (
    <>
      <Button
        variant="secondary"
        style={styles.filterButton}
        onPress={() => setFiltersOpen(true)}
      >
        <Ionicons name="options-outline" size={20} color="#111" />
        {activeFilterCount > 0 && (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>{activeFilterCount}</Text>
          </View>
        )}
      </Button>

      <FilterSheet visible={filtersOpen} onClose={() => setFiltersOpen(false)}>
        <DropdownPicker
          label="Categoría"
          placeholder="Todas las categorías"
          value={category}
          options={categoryOptions}
          onSelect={setCategory}
        />

        <DropdownPicker
          label="Tipo de empleo"
          placeholder="Todos los tipos"
          value={jobType}
          options={JOB_TYPES}
          onSelect={setJobType}
        />
      </FilterSheet>
    </>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    width: 40,
    height: 40,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  filterBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  filterBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F0F3",
    borderRadius: 10,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two + 2,
    gap: Spacing.two,
  },
  triggerInner: {
    flex: 1,
  },
  triggerLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#888",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  triggerValue: {
    fontSize: 14,
    fontWeight: "500",
    color: "#111",
  },
  triggerPlaceholder: {
    color: "#aaa",
    fontWeight: "400",
  },
  chevron: {
    fontSize: 20,
    color: "#888",
    transform: [{ rotate: "90deg" }],
  },
  chevronOpen: {
    transform: [{ rotate: "-90deg" }],
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sheetWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six,
    maxHeight: "70%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 16,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ddd",
    alignSelf: "center",
    marginBottom: Spacing.three,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111",
    paddingHorizontal: Spacing.three,
    marginBottom: Spacing.two,
  },
  filterSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.six,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 16,
  },
  filterSheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.three,
    marginBottom: Spacing.two,
  },
  filterSheetBody: {
    paddingHorizontal: Spacing.three,
    gap: Spacing.two,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#f0f0f0",
  },
  optionText: {
    fontSize: 15,
    color: "#333",
  },
  optionActive: {
    color: "#111",
    fontWeight: "600",
  },
  check: {
    fontSize: 16,
    color: "#111",
    fontWeight: "700",
  },
});
