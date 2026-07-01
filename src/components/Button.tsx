import { Spacing } from "@/constants/theme";
import { ReactNode } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

export type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps {
  variant?: ButtonVariant;
  onPress?: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  hitSlop?: number;
}

export const Button = ({
  variant = "primary",
  onPress,
  children,
  style,
  disabled,
  hitSlop,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.base,
        styles[variant],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      hitSlop={hitSlop}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
  },
  primary: {
    backgroundColor: "#111",
  },
  secondary: {
    backgroundColor: "#F0F0F3",
  },
  outline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },
  disabled: {
    opacity: 0.5,
  },
});
