import {
  StyleSheet,
  StyleProp,
  TextStyle,
  Text,
  TextProps,
} from "react-native";

interface GlobalTextProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function GlobalText({ children, style }: GlobalTextProps) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: "#F5F0E6",
    fontVariant: ["lining-nums"],
  },
});
