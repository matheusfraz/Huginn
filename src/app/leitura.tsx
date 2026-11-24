import { Image, Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GlobalText } from "@/components/GlobalText";
import { Screen } from "@/components/Screen";
import { useReading } from "@/contexts/ReadingContext";

export default function Leitura() {
  const { lastReadBook } = useReading();

  return (
    <Screen scroll>
      <View style={styles.container}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color="#F5F0E6" />
          <GlobalText>Voltar</GlobalText>
        </Pressable>

        <View style={styles.content}>
          {lastReadBook?.cover_i ? (
            <Image
              source={{
                uri: `https://covers.openlibrary.org/b/id/${lastReadBook.cover_i}-L.jpg`,
              }}
              style={styles.cover}
            />
          ) : (
            <View style={[styles.cover, styles.coverPlaceholder]}>
              <Ionicons name="book-outline" size={42} color="#D9B8A4" />
            </View>
          )}
          <GlobalText style={styles.eyebrow}>SUA LEITURA</GlobalText>
          <GlobalText style={styles.title}>
            {lastReadBook?.title ?? "Nenhum livro selecionado"}
          </GlobalText>
          {!!lastReadBook?.author_name?.[0] && (
            <GlobalText style={styles.author}>
              {lastReadBook.author_name[0]}
            </GlobalText>
          )}
          <View style={styles.divider} />
          <GlobalText style={styles.message}>
            Reserve este momento para continuar sua leitura com tranquilidade.
          </GlobalText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  backButton: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 8 },
  content: { flex: 1, alignItems: "center", justifyContent: "center", paddingBottom: 70 },
  cover: { width: 150, height: 225, borderRadius: 12, backgroundColor: "#17413C", marginBottom: 26 },
  coverPlaceholder: { alignItems: "center", justifyContent: "center" },
  eyebrow: { color: "#D9B8A4", fontSize: 11, letterSpacing: 1.8 },
  title: { fontFamily: "Literata_700Bold", fontSize: 23, textAlign: "center", marginTop: 8 },
  author: { color: "#AFC2B7", fontSize: 15, marginTop: 5 },
  divider: { width: 55, height: 1, backgroundColor: "#52756A", marginVertical: 22 },
  message: { color: "#D5DED6", fontSize: 15, lineHeight: 24, textAlign: "center", maxWidth: 280 },
});
