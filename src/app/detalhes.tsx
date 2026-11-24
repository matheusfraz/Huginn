import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GlobalText } from "@/components/GlobalText";
import { Screen } from "@/components/Screen";
import type { Book } from "@/types/Book";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useReading } from "@/contexts/ReadingContext";

type WorkResponse = {
  description?: string | { value?: string };
};

function getParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default function Detalhes() {
  const params = useLocalSearchParams<{
    key?: string | string[];
    title?: string | string[];
    author?: string | string[];
    coverId?: string | string[];
    year?: string | string[];
  }>();
  const bookKey = getParam(params.key) ?? "";
  const title = getParam(params.title) ?? "Livro sem título";
  const author = getParam(params.author) ?? "Autor desconhecido";
  const coverId = getParam(params.coverId);
  const year = getParam(params.year);
  const selectedBook: Book = {
    key: bookKey,
    title,
    author_name: [author],
    cover_i: coverId ? Number(coverId) : undefined,
    first_publish_year: year ? Number(year) : undefined,
  };
  const { isFavorite, toggleFavorite } = useFavorites();
  const { setLastReadBook } = useReading();
  const favorite = isFavorite(bookKey);

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [requestId, setRequestId] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  useEffect(() => {
    let active = true;

    async function loadDescription() {
      setLoading(true);
      setError(false);
      try {
        if (!bookKey) throw new Error("Chave do livro indisponível.");
        const response = await fetch(`https://openlibrary.org${bookKey}.json`);
        if (!response.ok) throw new Error("Não foi possível carregar o livro.");
        const data: WorkResponse = await response.json();
        const text =
          typeof data.description === "string"
            ? data.description
            : data.description?.value ?? "";
        if (active) setDescription(text);
      } catch {
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDescription();
    return () => {
      active = false;
    };
  }, [bookKey, requestId]);

  function addComment() {
    const text = comment.trim();
    if (!text) return;
    setComments((current) => [text, ...current]);
    setComment("");
  }

  return (
    <Screen scroll>
      <View style={styles.container}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar ao catálogo"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={22} color="#F5F0E6" />
          <GlobalText style={styles.backLabel}>Voltar</GlobalText>
        </Pressable>

        <View style={styles.bookHeader}>
          {coverId ? (
            <Image
              source={{ uri: `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` }}
              style={styles.cover}
            />
          ) : (
            <View style={[styles.cover, styles.coverPlaceholder]}>
              <Ionicons name="book-outline" size={40} color="#AFC2B7" />
            </View>
          )}
          <View style={styles.bookInfo}>
            <GlobalText style={styles.title}>{title}</GlobalText>
            <GlobalText style={styles.author}>{author}</GlobalText>
            {!!year && <GlobalText style={styles.year}>{year}</GlobalText>}
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: favorite }}
          onPress={() => toggleFavorite(selectedBook)}
          style={({ pressed }) => [
            styles.favoriteButton,
            favorite && styles.favoriteActive,
            pressed && styles.favoritePressed,
          ]}
        >
          <View style={[styles.favoriteIcon, favorite && styles.favoriteIconActive]}>
            <Ionicons name={favorite ? "heart" : "heart-outline"} size={22} color="#F5F0E6" />
          </View>
          <GlobalText style={styles.favoriteLabel}>
            {favorite ? "Adicionado aos favoritos" : "Adicionar aos favoritos"}
          </GlobalText>
          <View style={[styles.favoriteTag, favorite && styles.favoriteTagActive]}>
            <GlobalText style={styles.favoriteTagText}>{favorite ? "SALVO" : "SALVAR"}</GlobalText>
          </View>
        </Pressable>

        <View style={styles.section}>
          <GlobalText style={styles.sectionTitle}>Sobre este livro</GlobalText>
          {loading ? (
            <View style={styles.feedback}>
              <ActivityIndicator color="#D9B8A4" />
              <GlobalText style={styles.muted}>Carregando descrição...</GlobalText>
            </View>
          ) : error ? (
            <View style={styles.feedback}>
              <GlobalText style={styles.muted}>
                Não foi possível carregar a descrição agora.
              </GlobalText>
              <Pressable onPress={() => setRequestId((id) => id + 1)}>
                <GlobalText style={styles.retry}>Tentar novamente</GlobalText>
              </Pressable>
            </View>
          ) : (
            <GlobalText style={styles.description}>
              {description || "A Open Library não disponibilizou uma descrição para este livro."}
            </GlobalText>
          )}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => {
            setLastReadBook(selectedBook);
            router.push("/leitura");
          }}
          style={styles.readButton}
        >
          <Ionicons name="book" size={20} color="#103330" />
          <GlobalText style={styles.readLabel}>Iniciar leitura</GlobalText>
        </Pressable>

        <View style={styles.section}>
          <GlobalText style={styles.sectionTitle}>Comentários</GlobalText>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Compartilhe sua impressão sobre o livro"
            placeholderTextColor="#8DA59A"
            multiline
            textAlignVertical="top"
            style={styles.commentInput}
          />
          <Pressable
            accessibilityRole="button"
            disabled={!comment.trim()}
            onPress={addComment}
            style={[styles.commentButton, !comment.trim() && styles.disabledButton]}
          >
            <GlobalText style={styles.commentButtonText}>Registrar comentário</GlobalText>
          </Pressable>
          {comments.map((item, index) => (
            <View key={`${index}-${item}`} style={styles.commentCard}>
              <GlobalText style={styles.commentText}>{item}</GlobalText>
            </View>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 24, paddingBottom: 40 },
  backButton: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 8 },
  backLabel: { fontSize: 15 },
  bookHeader: { flexDirection: "row", alignItems: "center", gap: 20, marginTop: 20 },
  cover: { width: 118, height: 176, borderRadius: 10, backgroundColor: "#17413C" },
  coverPlaceholder: { alignItems: "center", justifyContent: "center" },
  bookInfo: { flex: 1, gap: 8 },
  title: { fontFamily: "Literata_700Bold", fontSize: 22, lineHeight: 30 },
  author: { color: "#C4D0C7", fontSize: 15 },
  year: { color: "#AFC2B7", fontSize: 13 },
  favoriteButton: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 24,
    paddingHorizontal: 14,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: "#45675D",
    backgroundColor: "#17413C",
  },
  favoriteActive: { backgroundColor: "#603E3B", borderColor: "#B77269" },
  favoritePressed: { opacity: 0.82, transform: [{ scale: 0.985 }] },
  favoriteIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#31564F",
  },
  favoriteIconActive: { backgroundColor: "#A95751" },
  favoriteLabel: { flex: 1, fontFamily: "Literata_700Bold", fontSize: 13 },
  favoriteTag: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 9,
    backgroundColor: "#28564D",
  },
  favoriteTagActive: { backgroundColor: "#A95751" },
  favoriteTagText: { fontSize: 9, fontFamily: "Literata_700Bold", letterSpacing: 0.6 },
  section: { marginTop: 28 },
  sectionTitle: { fontFamily: "Literata_700Bold", fontSize: 19, marginBottom: 10 },
  description: { color: "#D5DED6", fontSize: 14, lineHeight: 23 },
  feedback: { gap: 10, alignItems: "flex-start", paddingVertical: 8 },
  muted: { color: "#AFC2B7", fontSize: 14, lineHeight: 22 },
  retry: { color: "#E4B99D", fontFamily: "Literata_700Bold", paddingVertical: 5 },
  readButton: {
    minHeight: 54,
    marginTop: 26,
    borderRadius: 14,
    backgroundColor: "#F5F0E6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  readLabel: { color: "#103330", fontFamily: "Literata_700Bold", fontSize: 16 },
  commentInput: {
    minHeight: 100,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#315B53",
    backgroundColor: "#0A201F",
    color: "#F5F0E6",
    fontFamily: "Literata_400Regular",
    fontSize: 14,
  },
  commentButton: {
    minHeight: 46,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#28564D",
  },
  disabledButton: { opacity: 0.5 },
  commentButtonText: { fontFamily: "Literata_700Bold", fontSize: 14 },
  commentCard: {
    marginTop: 10,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#17413C",
  },
  commentText: { color: "#D5DED6", fontSize: 14, lineHeight: 22 },
});
