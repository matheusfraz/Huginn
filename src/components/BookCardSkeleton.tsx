import { View, StyleSheet } from "react-native";

export function BookCardSkeleton() {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.cover} />
        <View style={styles.info}>
          <View style={[styles.line, { width: "85%", height: 16 }]} />
          <View style={[styles.line, { width: "55%" }]} />
          <View style={[styles.line, { width: "30%", height: 10 }]} />
        </View>
      </View>
      <View style={styles.actions}>
        <View style={styles.button} />
        <View style={styles.button} />
        <View style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0a201f",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1f4642",
    padding: 14,
    gap: 14,
    opacity: 0.7,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  cover: {
    width: 72,
    aspectRatio: 2 / 3,
    borderRadius: 8,
    backgroundColor: "#1f4642",
  },
  info: {
    flex: 1,
    gap: 10,
  },
  line: {
    height: 13,
    borderRadius: 7,
    backgroundColor: "#1f4642",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#1f4642",
  },
  button: {
    flex: 1,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#17332F",
  },
});
