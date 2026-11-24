import { Image, Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "expo-router/drawer";
import { GlobalText } from "@/components/GlobalText";
import { Screen } from "@/components/Screen";
import { useReading } from "@/contexts/ReadingContext";

export default function Inicio() {
  const { lastReadBook } = useReading();

  return (
    <Screen scroll>
      <View style={styles.container}>
        <View style={styles.menuButton}>
          <DrawerToggleButton tintColor="#F5F0E6" />
        </View>

        <View style={styles.heading}>
          <GlobalText style={styles.eyebrow}>SEU ESPAÇO DE LEITURA</GlobalText>
          <GlobalText style={styles.title}>Início</GlobalText>
          <GlobalText style={styles.subtitle}>
            Cada página é um novo caminho.
          </GlobalText>
        </View>

        <View style={styles.sectionHeading}>
          <GlobalText style={styles.sectionTitle}>Continue de onde parou</GlobalText>
          <Ionicons name="leaf-outline" size={20} color="#D9B8A4" />
        </View>

        {lastReadBook ? (
          <View style={styles.readingCard}>
            {lastReadBook.cover_i ? (
              <Image
                source={{
                  uri: `https://covers.openlibrary.org/b/id/${lastReadBook.cover_i}-M.jpg`,
                }}
                style={styles.cover}
              />
            ) : (
              <View style={[styles.cover, styles.coverPlaceholder]}>
                <Ionicons name="book-outline" size={32} color="#AFC2B7" />
              </View>
            )}

            <View style={styles.bookInfo}>
              <GlobalText style={styles.cardEyebrow}>ÚLTIMA LEITURA</GlobalText>
              <GlobalText style={styles.bookTitle} numberOfLines={3}>
                {lastReadBook.title}
              </GlobalText>
              <GlobalText style={styles.author} numberOfLines={1}>
                {lastReadBook.author_name?.[0] ?? "Autor desconhecido"}
              </GlobalText>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/leitura")}
              style={({ pressed }) => [styles.resumeButton, pressed && styles.pressed]}
            >
              <Ionicons name="play" size={18} color="#103330" />
              <GlobalText style={styles.resumeLabel}>Retomar leitura</GlobalText>
            </Pressable>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons name="book-outline" size={30} color="#D9B8A4" />
            </View>
            <GlobalText style={styles.emptyTitle}>Sua próxima leitura começa aqui</GlobalText>
            <GlobalText style={styles.emptyText}>
              Quando iniciar um livro, você poderá voltar a ele por esta tela.
            </GlobalText>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/catalogo")}
              style={({ pressed }) => [styles.exploreButton, pressed && styles.pressed]}
            >
              <GlobalText style={styles.exploreLabel}>Explorar catálogo</GlobalText>
              <Ionicons name="arrow-forward" size={18} color="#F5F0E6" />
            </Pressable>
          </View>
        )}

        <View style={styles.quoteCard}>
          <Ionicons name="sparkles-outline" size={20} color="#D9B8A4" />
          <GlobalText style={styles.quote}>
            “A leitura abre portas para mundos que ainda não conhecemos.”
          </GlobalText>
          <GlobalText style={styles.quoteCaption}>UM CAPÍTULO DE CADA VEZ</GlobalText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24, paddingBottom: 36 },
  menuButton: { height: 44, alignSelf: "flex-start", justifyContent: "center", marginTop: 4, marginLeft: -12 },
  heading: { marginTop: 14, marginBottom: 30 },
  eyebrow: { color: "#D9B8A4", fontSize: 11, letterSpacing: 1.5 },
  title: { fontFamily: "CormorantGaramond_600SemiBold", fontSize: 46, lineHeight: 54 },
  subtitle: { color: "#AFC2B7", fontSize: 15, marginTop: 2 },
  sectionHeading: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
  sectionTitle: { fontFamily: "Literata_700Bold", fontSize: 17 },
  readingCard: {
    backgroundColor: "#17413C",
    borderColor: "#315B53",
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 14,
  },
  cover: { width: 82, height: 122, borderRadius: 9, backgroundColor: "#28564D" },
  coverPlaceholder: { alignItems: "center", justifyContent: "center" },
  bookInfo: { flex: 1, minWidth: 150, gap: 5 },
  cardEyebrow: { color: "#D9B8A4", fontSize: 10, letterSpacing: 1 },
  bookTitle: { fontFamily: "Literata_700Bold", fontSize: 16, lineHeight: 23 },
  author: { color: "#AFC2B7", fontSize: 13 },
  resumeButton: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    borderRadius: 13,
    backgroundColor: "#F5F0E6",
  },
  resumeLabel: { color: "#103330", fontFamily: "Literata_700Bold", fontSize: 14 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.985 }] },
  emptyCard: {
    alignItems: "center",
    padding: 24,
    borderRadius: 20,
    backgroundColor: "#17413C",
    borderWidth: 1,
    borderColor: "#315B53",
  },
  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#28564D",
    marginBottom: 14,
  },
  emptyTitle: { fontFamily: "Literata_700Bold", fontSize: 16, textAlign: "center" },
  emptyText: { color: "#AFC2B7", textAlign: "center", fontSize: 13, lineHeight: 21, marginTop: 7 },
  exploreButton: {
    minHeight: 46,
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 19,
    borderRadius: 12,
    backgroundColor: "#28564D",
  },
  exploreLabel: { fontFamily: "Literata_700Bold", fontSize: 14 },
  quoteCard: {
    marginTop: 22,
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#0A201F",
    borderLeftWidth: 3,
    borderLeftColor: "#D9B8A4",
    gap: 8,
  },
  quote: { color: "#D5DED6", fontSize: 14, lineHeight: 22 },
  quoteCaption: { color: "#8DA59A", fontSize: 9, letterSpacing: 1.2 },
});
