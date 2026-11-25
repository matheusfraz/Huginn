import {
  View,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Screen } from "@/components/Screen";
import { GlobalText } from "@/components/GlobalText";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Book, SearchResponse } from "@/types/Book";
import { BookCard } from "@/components/BookCard";
import { BookCardSkeleton } from "@/components/BookCardSkeleton";
import { DrawerToggleButton } from "expo-router/drawer";

export default function Catalogo() {
  const [books, setBooks] = useState<Book[]>([]);

  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function searchBooks(term: string | undefined): Promise<Book[]> {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(term ?? "")}&limit=20&fields=key,title,author_name,cover_i,first_publish_year`,
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar livros: ${response.status}`);
    }

    const data: SearchResponse = await response.json();

    return data.docs;
  }

  async function loadBooks() {
    const term = search.trim() || "Brasil";
    setLoading(true);
    setError(false);

    try {
      const result = await searchBooks(term);
      setBooks(result);
    } catch {
      setBooks([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(loadBooks, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.header}>
              <View style={styles.menuButton}>
                <DrawerToggleButton tintColor="#F5F0E6" />
              </View>
              <View style={styles.titleContainer}>
                <View style={styles.logo}>
                  <Image
                    source={require("@/assets/images/Huginn.png")}
                    style={styles.logoImg}
                  />
                </View>
                <View style={styles.titleArea}>
                  <GlobalText
                    style={{
                      fontSize: 50,
                      fontWeight: "600",
                      margin: 0,
                    }}
                  >
                    Catálogo
                  </GlobalText>
                  <GlobalText
                    style={{ color: "#9e9a93", fontSize: 17, marginLeft: 3 }}
                  >
                    Encontre seu próximo livro
                  </GlobalText>
                </View>
              </View>
              <View style={styles.searchAreaContainer}>
                <View style={styles.searchBarArea}>
                  <View style={styles.iconArea}>
                    <Ionicons name="search-outline" size={30} color="#103330" />
                  </View>
                  <TextInput
                    onChangeText={setSearch}
                    value={search}
                    style={styles.textInput}
                  ></TextInput>
                </View>
              </View>
              {loading ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator color="#F5F0E6" />
                  <GlobalText style={styles.resultText}>
                    Buscando livros...
                  </GlobalText>
                </View>
              ) : (
                !error &&
                books.length > 0 && (
                  <GlobalText style={styles.resultText}>
                    {search.trim()
                      ? `${books.length} resultados para "${search.trim()}"`
                      : `${books.length} sugestões para você`}
                  </GlobalText>
                )
              )}
            </View>
          }
          showsVerticalScrollIndicator={false}
          data={loading ? [] : books}
          renderItem={({ item }) => <BookCard book={item} />}
          ListEmptyComponent={
            loading ? (
              <View style={styles.skeletonList}>
                <BookCardSkeleton />
                <BookCardSkeleton />
                <BookCardSkeleton />
                <BookCardSkeleton />
              </View>
            ) : error ? (
              <View style={styles.messageArea}>
                <Ionicons name="cloud-offline-outline" size={48} color="#93A69F" />
                <GlobalText style={styles.messageTitle}>
                  Não foi possível carregar os livros
                </GlobalText>
                <GlobalText style={styles.messageText}>
                  Verifique sua conexão e tente novamente.
                </GlobalText>
                <Pressable onPress={loadBooks} style={styles.retryButton}>
                  <GlobalText style={styles.retryText}>Tentar novamente</GlobalText>
                </Pressable>
              </View>
            ) : (
              <View style={styles.messageArea}>
                <Ionicons name="search-outline" size={48} color="#93A69F" />
                <GlobalText style={styles.messageTitle}>
                  Nenhum livro encontrado
                </GlobalText>
                <GlobalText style={styles.messageText}>
                  Tente buscar por outro título ou autor.
                </GlobalText>
              </View>
            )
          }
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listContent: {
    padding: 28,
    paddingBottom: 40,
    gap: 14,
  },

  header: {
    gap: 15,
  },

  loadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  resultText: {
    fontSize: 14,
    color: "#A9B8B3",
  },

  skeletonList: {
    gap: 14,
  },

  messageArea: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 40,
    paddingHorizontal: 10,
  },

  messageTitle: {
    fontWeight: "600",
    fontSize: 26,
    textAlign: "center",
  },

  messageText: {
    fontSize: 15,
    color: "#A9B8B3",
    textAlign: "center",
  },

  retryButton: {
    marginTop: 10,
    height: 48,
    paddingHorizontal: 28,
    borderRadius: 24,
    backgroundColor: "#F5F0E6",
    justifyContent: "center",
  },

  retryText: {
    fontWeight: "700",
    color: "#103330",
    fontSize: 16,
  },

  titleContainer: {
    width: "100%",
    height: 110,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },

  menuButton: {
    height: 44,
    alignSelf: "flex-start",
    justifyContent: "center",
    marginTop: -12,
    marginLeft: -12,
  },

  titleArea: {
    width: "60%",
    height: "100%",
    justifyContent: "center",
  },

  logo: {
    width: "30%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  logoImg: {
    height: 90,
    width: 90,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#F5F0E6",
    resizeMode: "contain",
    shadowColor: "#ffffff",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },

  searchAreaContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  searchBarArea: {
    width: "100%",
    height: 60,
    backgroundColor: "#0a201f",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#F5F0E6",
    flexDirection: "row",
  },

  iconArea: {
    width: "15%",
    height: "100%",
    backgroundColor: "#F5F0E6",
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },

  filtersContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 15,
    marginRight: 10,
  },

  textInput: {
    width: "85%",
    height: "100%",
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    color: "#F5F0E6",
    padding: 10,
    fontWeight: "600",
    fontSize: 23,
  },
});
