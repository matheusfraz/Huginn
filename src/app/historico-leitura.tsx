import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GlobalText } from "@/components/GlobalText";
import { Screen } from "@/components/Screen";
import { useReadingHistory } from "@/contexts/ReadingHistoryContext";

function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, "0")}min`;
  if (minutes > 0) return `${minutes} min`;
  return `${seconds} s`;
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Data indisponível";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function HistoricoLeitura() {
  const { sessions, isLoading, loadError, reloadHistory } = useReadingHistory();

  return (
    <Screen scroll>
      <View style={styles.container}>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color="#F5F0E6" />
          <GlobalText>Voltar ao perfil</GlobalText>
        </Pressable>

        <View style={styles.heading}>
          <GlobalText style={styles.eyebrow}>SUA JORNADA</GlobalText>
          <GlobalText style={styles.title}>Histórico de Leitura</GlobalText>
          <GlobalText style={styles.subtitle}>
            Sessões registradas, da mais recente para a mais antiga.
          </GlobalText>
        </View>

        {isLoading ? (
          <View style={styles.feedback}>
            <ActivityIndicator color="#D9B8A4" size="large" />
            <GlobalText style={styles.feedbackText}>Carregando histórico...</GlobalText>
          </View>
        ) : loadError ? (
          <View style={styles.feedbackCard}>
            <Ionicons name="cloud-offline-outline" size={34} color="#D9B8A4" />
            <GlobalText style={styles.emptyTitle}>
              Não foi possível carregar o histórico.
            </GlobalText>
            <Pressable onPress={() => void reloadHistory()} style={styles.retryButton}>
              <GlobalText style={styles.retryText}>Tentar novamente</GlobalText>
            </Pressable>
          </View>
        ) : sessions.length === 0 ? (
          <View style={styles.feedbackCard}>
            <View style={styles.emptyIcon}>
              <Ionicons name="book-outline" size={32} color="#D9B8A4" />
            </View>
            <GlobalText style={styles.emptyTitle}>
              Você ainda não possui histórico de leitura.
            </GlobalText>
            <GlobalText style={styles.emptyText}>
              Quando salvar uma sessão, ela aparecerá aqui.
            </GlobalText>
          </View>
        ) : (
          <View style={styles.sessionList}>
            {sessions.map((session) => (
              <View key={session.sessionId} style={styles.sessionCard}>
                <View style={styles.bookRow}>
                  {session.coverUrl ? (
                    <Image source={{ uri: session.coverUrl }} style={styles.cover} />
                  ) : (
                    <View style={[styles.cover, styles.coverPlaceholder]}>
                      <Ionicons name="book-outline" size={28} color="#AFC2B7" />
                    </View>
                  )}
                  <View style={styles.bookInfo}>
                    <GlobalText style={styles.bookTitle}>{session.title}</GlobalText>
                    <View style={styles.dateRow}>
                      <Ionicons name="calendar-outline" size={15} color="#D9B8A4" />
                      <GlobalText style={styles.dateText}>
                        {formatDate(session.date)}
                      </GlobalText>
                    </View>
                  </View>
                </View>

                <View style={styles.statsRow}>
                  <View style={styles.statItem}>
                    <Ionicons name="time-outline" size={18} color="#B7D6C8" />
                    <View>
                      <GlobalText style={styles.statLabel}>Tempo de leitura</GlobalText>
                      <GlobalText style={styles.statValue}>
                        {formatDuration(session.readingSeconds)}
                      </GlobalText>
                    </View>
                  </View>
                  <View style={styles.statItem}>
                    <Ionicons name="repeat-outline" size={18} color="#B7D6C8" />
                    <View>
                      <GlobalText style={styles.statLabel}>Ciclos concluídos</GlobalText>
                      <GlobalText style={styles.statValue}>
                        {session.completedCycles}
                      </GlobalText>
                    </View>
                  </View>
                </View>

                <View style={styles.commentBox}>
                  <GlobalText style={styles.commentLabel}>Comentário</GlobalText>
                  <GlobalText style={styles.commentText}>
                    {session.comment || "Nenhum comentário registrado."}
                  </GlobalText>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingBottom: 38 },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    paddingVertical: 8,
  },
  heading: { marginTop: 20, marginBottom: 22 },
  eyebrow: { color: "#D9B8A4", fontSize: 10, letterSpacing: 1.5 },
  title: { fontWeight: "700", fontSize: 29, marginTop: 5 },
  subtitle: { color: "#AFC2B7", fontSize: 13, lineHeight: 21, marginTop: 5 },
  feedback: { alignItems: "center", justifyContent: "center", paddingVertical: 60, gap: 12 },
  feedbackText: { color: "#AFC2B7", fontSize: 14 },
  feedbackCard: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#315B53",
    backgroundColor: "#17413C",
    gap: 12,
  },
  emptyIcon: {
    width: 62,
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 31,
    backgroundColor: "#28564D",
  },
  emptyTitle: { fontWeight: "700", fontSize: 16, textAlign: "center" },
  emptyText: { color: "#AFC2B7", fontSize: 13, lineHeight: 21, textAlign: "center" },
  retryButton: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 10, backgroundColor: "#28564D" },
  retryText: { fontWeight: "600", fontSize: 13 },
  sessionList: { gap: 14 },
  sessionCard: {
    padding: 15,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#315B53",
    backgroundColor: "#17413C",
    gap: 14,
  },
  bookRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  cover: { width: 67, height: 98, borderRadius: 8, backgroundColor: "#28564D" },
  coverPlaceholder: { alignItems: "center", justifyContent: "center" },
  bookInfo: { flex: 1, gap: 10 },
  bookTitle: { fontWeight: "700", fontSize: 16, lineHeight: 22 },
  dateRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  dateText: { flex: 1, color: "#C4D0C7", fontSize: 12 },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    paddingVertical: 13,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#315B53",
  },
  statItem: { flex: 1, minWidth: 125, flexDirection: "row", alignItems: "center", gap: 8 },
  statLabel: { color: "#AFC2B7", fontSize: 10 },
  statValue: { fontWeight: "600", fontSize: 13, marginTop: 2 },
  commentBox: { gap: 5 },
  commentLabel: { color: "#D9B8A4", fontWeight: "600", fontSize: 11 },
  commentText: { color: "#D5DED6", fontSize: 13, lineHeight: 21 },
});
