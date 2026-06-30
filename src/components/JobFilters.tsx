import { useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useJobsStore } from "@/stores/useJobsStore";
import { Spacing } from "@/constants/theme";

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
      <TouchableOpacity style={styles.trigger} onPress={openSheet} activeOpacity={0.7}>
        <View style={styles.triggerInner}>
          <Text style={styles.triggerLabel}>{label}</Text>
          <Text
            style={[styles.triggerValue, !selectedLabel && styles.triggerPlaceholder]}
            numberOfLines={1}
          >
            {selectedLabel ?? placeholder}
          </Text>
        </View>
        <Text style={[styles.chevron, open && styles.chevronOpen]}>›</Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="none" onRequestClose={() => closeSheet()}>
        <View style={StyleSheet.absoluteFill}>
          <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
            <Pressable style={StyleSheet.absoluteFill} onPress={() => closeSheet()} />
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
                  <Text style={[styles.optionText, !value && styles.optionActive]}>
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
                    <Text style={[styles.optionText, value === opt.value && styles.optionActive]}>
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

export const JobFilters = () => {
  const { search, category, jobType, categories, setSearch, setCategory, setJobType } =
    useJobsStore();

  const categoryOptions: Option[] = categories.map((c) => ({
    value: c.name,
    label: c.name,
  }));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Buscar por título o empresa"
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
        returnKeyType="search"
        clearButtonMode="while-editing"
      />

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: Spacing.two,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.two,
  },
  search: {
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 10,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    fontSize: 14,
    backgroundColor: "#fff",
    color: "#111",
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
