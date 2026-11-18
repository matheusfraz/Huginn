import {
  View,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import { Screen } from "@/components/Screen";
import { FilterTemplate } from "@/components/FilterTemplate";
import { GlobalText } from "@/components/GlobalText";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Filter } from "@/types/Filter";
import { Book, SearchResponse } from "@/types/Book";
import { BookCard } from "@/components/BookCard";
import { Language } from "@/types/Language";

export default function Catalogo() {
  const [filters, setFilters] = useState<Filter[]>([
    { id: 0, name: "Todos", isActive: true },
    { id: 1, name: "Português", isActive: false, language: "por" },
    { id: 2, name: "Inglês", isActive: false, language: "eng" },
  ]);

  const [books, setBooks] = useState<Book[]>([]);

  const [search, setSearch] = useState<string | undefined>("");

  async function searchBooks(
    term: string,
    language?: Language,
  ): Promise<Book[]> {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${term}&limit=20&fields=key,title,author_name,cover_i,first_publish_year`,
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar livros: ${response.status}`);
    }

    const data: SearchResponse = await response.json();

    return data.docs;
  }

  useEffect(() => {
    async function load() {
      const books = await searchBooks("Tolkien");
      setBooks(books);

      console.log(books);
    }

    load();
  }, []);

  return (
    <Screen scroll={false}>
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={
            <View style={styles.header}>
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
                      fontFamily: "CormorantGaramond_600SemiBold",
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
              <View style={styles.filtersContainer}>
                {filters.map((filter) => {
                  return (
                    <Pressable
                      key={filter.id}
                      onPress={() => {
                        const index: number = filters.findIndex(
                          (f) => f.id === filter.id,
                        );

                        const newArray: Filter[] = filters.map((filter) =>
                          filter.id === index
                            ? { ...filter, isActive: true }
                            : { ...filter, isActive: false },
                        );

                        setFilters(newArray);
                      }}
                    >
                      <FilterTemplate filter={filter} />
                    </Pressable>
                  );
                })}
              </View>
            </View>
          }
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={books}
          renderItem={({ item }) => <BookCard book={item} />}
          keyExtractor={(item) => item.key}
          columnWrapperStyle={{ gap: 40 }}
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
    gap: 40,
  },

  header: {
    gap: 25,
  },

  titleContainer: {
    width: "100%",
    height: 110,
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
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
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 23,
  },
});
