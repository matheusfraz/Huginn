import { Image, Pressable, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "@/components/Screen";
import { GlobalText } from "@/components/GlobalText";

export default function Sobre() {
  return (
    <Screen scroll>
      <View style={styles.container}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color="#F5F0E6" />
          <GlobalText style={styles.backText}>Voltar</GlobalText>
        </Pressable>

        <View style={styles.hero}>
          <Image source={require("@/assets/images/Huginn.png")} style={styles.logo} />
          <GlobalText style={styles.brand}>Huginn</GlobalText>
          <GlobalText style={styles.tagline}>Apenas o conhecimento liberta.</GlobalText>
        </View>

        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Ionicons name="book-outline" size={25} color="#F5F0E6" />
          </View>
          <GlobalText style={styles.heading}>Sobre o aplicativo</GlobalText>
          <GlobalText style={styles.body}>
            O Huginn foi criado para aproximar você dos livros e tornar a leitura
            parte da rotina. Pesquise obras, organize sua biblioteca e acompanhe
            seu progresso em um só lugar.
          </GlobalText>
        </View>

        <View style={styles.card}>
          <View style={styles.iconCircle}>
            <Ionicons name="hourglass-outline" size={24} color="#F5F0E6" />
          </View>
          <GlobalText style={styles.heading}>Leia no seu ritmo</GlobalText>
          <GlobalText style={styles.body}>
            Com a Técnica Pomodoro, você alterna períodos de leitura e descanso
            para manter o foco. Cada sessão ajuda a construir um hábito, uma
            página de cada vez.
          </GlobalText>
        </View>

        <View style={styles.team}>
          <GlobalText style={styles.teamTitle}>Desenvolvido por</GlobalText>
          <GlobalText style={styles.names}>matheusfraz  ·  bentocsf</GlobalText>
          <GlobalText style={styles.footer}>Huginn · Projeto de Aplicativo de Leitura</GlobalText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    paddingVertical: 12,
  },
  backText: { fontSize: 15 },
  hero: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 28,
  },
  logo: {
    width: 92,
    height: 92,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#F5F0E6",
    resizeMode: "contain",
  },
  brand: {
    marginTop: 8,
    fontWeight: "600",
    fontSize: 43,
  },
  tagline: {
    marginTop: 2,
    fontSize: 15,
    color: "#C4D0C7",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#17413C",
    borderColor: "#315B53",
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#28564D",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  heading: {
    fontWeight: "700",
    fontSize: 19,
    marginBottom: 7,
  },
  body: {
    color: "#D5DED6",
    fontSize: 14,
    lineHeight: 23,
  },
  team: {
    alignItems: "center",
    paddingTop: 20,
  },
  teamTitle: {
    color: "#AFC2B7",
    fontSize: 13,
  },
  names: {
    fontWeight: "700",
    fontSize: 16,
    marginTop: 4,
  },
  footer: {
    color: "#8DA59A",
    fontSize: 11,
    marginTop: 20,
    textAlign: "center",
  },
});
