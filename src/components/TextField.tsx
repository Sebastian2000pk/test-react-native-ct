import { AccentColor, Spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { forwardRef, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

interface TextFieldProps extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  containerStyle?: StyleProp<ViewStyle>;
}

export const TextField = forwardRef<TextInput, TextFieldProps>(
  (
    { icon, containerStyle, style, placeholderTextColor, onFocus, onBlur, ...props },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    return (
      <View
        style={[
          styles.container,
          focused && styles.containerFocused,
          containerStyle,
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={focused ? AccentColor : "#aaa"}
            style={styles.icon}
          />
        )}
        <TextInput
          ref={ref}
          style={[styles.input, style]}
          placeholderTextColor={placeholderTextColor ?? "#aaa"}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...props}
        />
      </View>
    );
  }
);

TextField.displayName = "TextField";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: Spacing.three,
    borderWidth: 1.5,
    borderColor: "#e5e5e5",
  },
  containerFocused: {
    borderColor: AccentColor,
  },
  icon: {
    marginRight: Spacing.two,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.two + 2,
    fontSize: 14,
    color: "#111",
  },
});
