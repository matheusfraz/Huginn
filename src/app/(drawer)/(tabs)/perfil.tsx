import { View, StyleSheet } from "react-native";
import { Screen } from "@/components/Screen";
import { GlobalText } from "@/components/GlobalText";

export default function Perfil() {
  return (
    <Screen scroll={true}>
      <View style={styles.container}>
        <GlobalText style={styles.title}>Perfil</GlobalText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: {
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 34,
    marginBottom: 20,
  },
});
