import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, StyleProp, ViewStyle, ScrollView, View } from "react-native";

interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scroll: boolean;
}

export function Screen({ children, style, scroll }: ScreenProps) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      {scroll ? (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {children}
        </ScrollView>
      ) : (
        <View style={styles.content}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#103330" },
  scrollContent: { flexGrow: 1 },
  content: { flex: 1 },
});
