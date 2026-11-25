import { GlobalText } from "@/components/GlobalText";
import { Screen } from "@/components/Screen";
import { useReading } from "@/contexts/ReadingContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function Leitura() {
  const {
    lastReadBook,
    phase,
    secondsRemaining,
    isRunning,
    readingSeconds,
    completedCycles,
    sessionEnded,
    comments,
    tick,
    skipToRest,
    togglePause,
    startNewCycle,
    endSession,
    addSessionComment,
  } = useReading();
  const [commentDraft, setCommentDraft] = useState("");

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  if (!lastReadBook) {
    return (
      <Screen scroll>
        <View style={styles.emptyPage}>
          <Ionicons name="book-outline" size={48} color="#D9B8A4" />
          <GlobalText style={styles.emptyTitle}>Nenhum livro selecionado</GlobalText>
          <Pressable onPress={() => router.replace("/catalogo")} style={styles.primaryButton}>
            <GlobalText style={styles.primaryButtonText}>Abrir catálogo</GlobalText>
          </Pressable>
        </View>
      </Screen>
    );
  }

  const isRest = phase === "rest";
  const phaseDuration = isRest ? 5 * 60 : 25 * 60;
  const progress = Math.max(0, Math.min(1, secondsRemaining / phaseDuration));
  const phaseTitle = sessionEnded
    ? "Sessão encerrada"
    : phase === "cycleComplete"
      ? "Ciclo concluído"
      : isRest
        ? "Hora de descansar"
        : "Tempo de leitura";

  function saveComment() {
    const text = commentDraft.trim();
    if (!text) return;
    addSessionComment(text);
    setCommentDraft("");
  }

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

        <View style={styles.bookCard}>
          {lastReadBook.cover_i ? (
            <Image
              source={{
                uri: `https://covers.openlibrary.org/b/id/${lastReadBook.cover_i}-M.jpg`,
              }}
              style={styles.cover}
            />
          ) : (
            <View style={[styles.cover, styles.coverPlaceholder]}>
              <Ionicons name="book-outline" size={28} color="#D9B8A4" />
            </View>
          )}
          <View style={styles.bookInfo}>
            <GlobalText style={styles.eyebrow}>LENDO AGORA</GlobalText>
            <GlobalText style={styles.bookTitle} numberOfLines={2}>
              {lastReadBook.title}
            </GlobalText>
            <GlobalText style={styles.author} numberOfLines={1}>
              {lastReadBook.author_name?.[0] ?? "Autor desconhecido"}
            </GlobalText>
          </View>
        </View>

        <View style={[styles.phasePill, isRest && styles.restPill]}>
          <Ionicons
            name={isRest ? "cafe-outline" : "book-outline"}
            size={17}
            color={isRest ? "#F0C49F" : "#B7D6C8"}
          />
          <GlobalText style={styles.phaseLabel}>{phaseTitle}</GlobalText>
        </View>

        <View style={[styles.timerCircle, isRest && styles.restCircle]}>
          <GlobalText style={styles.timerCaption}>
            {isRest ? "DESCANSO" : "POMODORO"}
          </GlobalText>
          <GlobalText style={styles.timer}>{formatTime(secondsRemaining)}</GlobalText>
          <GlobalText style={styles.timerHint}>
            {sessionEnded
              ? "Sessão finalizada"
              : phase === "cycleComplete"
                ? "Pronto para um novo ciclo"
                : isRunning
                  ? "Mantenha o foco"
                  : "Cronômetro pausado"}
          </GlobalText>
        </View>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              isRest && styles.restProgress,
              { width: `${progress * 100}%` },
            ]}
          />
        </View>

        {!sessionEnded && (
          <View style={styles.controls}>
            {phase === "cycleComplete" ? (
              <Pressable onPress={startNewCycle} style={styles.primaryButton}>
                <Ionicons name="refresh" size={20} color="#103330" />
                <GlobalText style={styles.primaryButtonText}>Iniciar novo ciclo</GlobalText>
              </Pressable>
            ) : (
              <Pressable onPress={togglePause} style={styles.primaryButton}>
                <Ionicons
                  name={isRunning ? "pause" : "play"}
                  size={20}
                  color="#103330"
                />
                <GlobalText style={styles.primaryButtonText}>
                  {isRunning ? "Pausar" : "Continuar"}
                </GlobalText>
              </Pressable>
            )}
            <Pressable onPress={endSession} style={styles.endButton}>
              <Ionicons name="stop-outline" size={19} color="#E6B7A9" />
              <GlobalText style={styles.endButtonText}>Encerrar sessão</GlobalText>
            </Pressable>
          </View>
        )}

        {!sessionEnded && phase === "reading" && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Pular para o descanso, atalho de demonstração"
            onPress={skipToRest}
            style={({ pressed }) => [
              styles.skipButton,
              pressed && styles.skipButtonPressed,
            ]}
          >
            <Ionicons name="play-forward-outline" size={18} color="#D9B8A4" />
            <GlobalText style={styles.skipButtonText}>
              Avançar para o descanso (teste)
            </GlobalText>
          </Pressable>
        )}

        {sessionEnded && (
          <View style={styles.summaryCard}>
            <GlobalText style={styles.summaryTitle}>Resumo da sessão</GlobalText>
            <View style={styles.summaryRow}>
              <GlobalText style={styles.summaryLabel}>Tempo dedicado à leitura</GlobalText>
              <GlobalText style={styles.summaryValue}>
                {formatTime(readingSeconds)}
              </GlobalText>
            </View>
            <View style={styles.summaryRow}>
              <GlobalText style={styles.summaryLabel}>Ciclos concluídos</GlobalText>
              <GlobalText style={styles.summaryValue}>{completedCycles}</GlobalText>
            </View>
          </View>
        )}

        {sessionEnded && (
          <View style={styles.commentSection}>
            <GlobalText style={styles.summaryTitle}>Como foi sua leitura?</GlobalText>
            <TextInput
              value={commentDraft}
              onChangeText={setCommentDraft}
              placeholder="Registre sua experiência..."
              placeholderTextColor="#8DA59A"
              multiline
              textAlignVertical="top"
              style={styles.commentInput}
            />
            <Pressable
              disabled={!commentDraft.trim()}
              onPress={saveComment}
              style={[
                styles.commentButton,
                !commentDraft.trim() && styles.disabledButton,
              ]}
            >
              <Ionicons name="chatbubble-outline" size={18} color="#F5F0E6" />
              <GlobalText style={styles.commentButtonText}>Salvar comentário</GlobalText>
            </Pressable>
            {comments.map((comment, index) => (
              <View key={`${index}-${comment}`} style={styles.savedComment}>
                <GlobalText style={styles.savedCommentText}>{comment}</GlobalText>
              </View>
            ))}
          </View>
        )}

        {!sessionEnded && phase === "cycleComplete" && (
          <GlobalText style={styles.cycleMessage}>
            Você concluiu {completedCycles} {completedCycles === 1 ? "ciclo" : "ciclos"}. Faça uma pausa e comece outro quando quiser.
          </GlobalText>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, paddingBottom: 36 },
  backButton: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 8 },
  bookCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginTop: 18,
    padding: 13,
    borderRadius: 16,
    backgroundColor: "#17413C",
    borderWidth: 1,
    borderColor: "#315B53",
  },
  cover: { width: 54, height: 78, borderRadius: 7, backgroundColor: "#28564D" },
  coverPlaceholder: { alignItems: "center", justifyContent: "center" },
  bookInfo: { flex: 1, gap: 4 },
  eyebrow: { color: "#D9B8A4", fontSize: 10, letterSpacing: 1.3 },
  bookTitle: { fontWeight: "700", fontSize: 15, lineHeight: 21 },
  author: { color: "#AFC2B7", fontSize: 12 },
  phasePill: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 26,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#214A40",
  },
  restPill: { backgroundColor: "#59483B" },
  phaseLabel: { fontWeight: "700", fontSize: 13 },
  timerCircle: {
    width: 242,
    height: 242,
    maxWidth: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 121,
    borderWidth: 8,
    borderColor: "#4A7664",
    backgroundColor: "#0A201F",
  },
  restCircle: { borderColor: "#B07B59" },
  timerCaption: { color: "#AFC2B7", fontSize: 10, letterSpacing: 2 },
  timer: {
    fontWeight: "700",
    fontSize: 53,
    lineHeight: 68,
    fontVariant: ["tabular-nums"],
    marginTop: 5,
  },
  timerHint: { color: "#8DA59A", fontSize: 12, marginTop: 3 },
  progressTrack: {
    height: 7,
    overflow: "hidden",
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: "#21423B",
  },
  progressFill: { height: "100%", borderRadius: 5, backgroundColor: "#8DB39D" },
  restProgress: { backgroundColor: "#D7A278" },
  controls: { gap: 11, marginTop: 20 },
  primaryButton: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    borderRadius: 14,
    backgroundColor: "#F5F0E6",
  },
  primaryButtonText: { color: "#103330", fontWeight: "700", fontSize: 15 },
  endButton: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#76584A",
    backgroundColor: "#193A36",
  },
  endButtonText: { color: "#E6B7A9", fontWeight: "700", fontSize: 13 },
  skipButton: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#52756A",
    backgroundColor: "#103330",
  },
  skipButtonPressed: { opacity: 0.72 },
  skipButtonText: { color: "#D9B8A4", fontSize: 12, fontWeight: "600" },
  summaryCard: {
    marginTop: 23,
    padding: 17,
    borderRadius: 16,
    backgroundColor: "#17413C",
    borderWidth: 1,
    borderColor: "#315B53",
    gap: 13,
  },
  summaryTitle: { fontWeight: "700", fontSize: 17 },
  summaryRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  summaryLabel: { color: "#AFC2B7", fontSize: 13, flex: 1 },
  summaryValue: { fontWeight: "700", fontSize: 14 },
  commentSection: { marginTop: 24, gap: 10 },
  commentInput: {
    minHeight: 96,
    padding: 13,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#315B53",
    backgroundColor: "#0A201F",
    color: "#F5F0E6",
    
    fontSize: 14,
  },
  commentButton: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 12,
    backgroundColor: "#28564D",
  },
  disabledButton: { opacity: 0.45 },
  commentButtonText: { fontWeight: "700", fontSize: 14 },
  savedComment: { padding: 13, borderRadius: 12, backgroundColor: "#17413C" },
  savedCommentText: { color: "#D5DED6", fontSize: 13, lineHeight: 21 },
  cycleMessage: { color: "#AFC2B7", fontSize: 13, lineHeight: 21, textAlign: "center", marginTop: 14 },
  emptyPage: { flex: 1, alignItems: "center", justifyContent: "center", padding: 28, gap: 16 },
  emptyTitle: { fontWeight: "700", fontSize: 19, textAlign: "center" },
});
