import { StyleSheet, StyleProp, TextStyle, Text } from "react-native";

interface GlobalTextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export function GlobalText({ children, style }: GlobalTextProps) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Literata_400Regular",
    color: "#F5F0E6",
    fontVariant: ["lining-nums"],
  },
});
