import type { Book } from "@/types/Book";
import { View, StyleSheet, Image, Pressable } from "react-native";
import { GlobalText } from "./GlobalText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useFavorites } from "@/contexts/FavoritesContext";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
  const {
    isFavorite,
    isReading,
    isRead,
    toggleFavorite,
    toggleReading,
    toggleRead,
  } = useFavorites();
  const favorite = isFavorite(book.key);
  const reading = isReading(book.key);
  const read = isRead(book.key);

  return (
    <View style={styles.bookContainer}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Ver detalhes de ${book.title}`}
        onPress={() =>
          router.push({
            pathname: "/detalhes",
            params: {
              key: book.key,
              title: book.title,
              author: book.author_name?.[0] ?? "Autor desconhecido",
              coverId: book.cover_i?.toString() ?? "",
              year: book.first_publish_year?.toString() ?? "",
            },
          })
        }
        style={styles.bookContent}
      >
        <View style={styles.coverShadow}>
          {book.cover_i ? (
            <Image source={{ uri: coverUrl }} style={styles.cover} />
          ) : (
            <View style={[styles.cover, styles.noCover]}>
              <Ionicons name="book-outline" size={28} color="#93A69F" />
            </View>
          )}
        </View>

        <View style={styles.info}>
          <GlobalText style={styles.title} numberOfLines={2}>
            {book.title}
          </GlobalText>
          <GlobalText style={styles.author} numberOfLines={1}>
            {book.author_name?.[0] ?? "Autor desconhecido"}
          </GlobalText>
          {book.first_publish_year && (
            <View style={styles.yearBadge}>
              <GlobalText style={styles.yearText}>
                {book.first_publish_year}
              </GlobalText>
            </View>
          )}
        </View>
      </Pressable>

      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            favorite
              ? `Remover ${book.title} dos favoritos`
              : `Adicionar ${book.title} aos favoritos`
          }
          accessibilityState={{ selected: favorite }}
          onPress={() => toggleFavorite(book)}
          style={({ pressed }) => [
            styles.actionButton,
            favorite && styles.actionButtonActive,
            pressed && styles.actionButtonPressed,
          ]}
        >
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={18}
            color={favorite ? "#E58B80" : "#D9B8A4"}
          />
          <GlobalText style={[styles.actionText, favorite && { color: "#E58B80" }]}>
            Favorito
          </GlobalText>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            reading
              ? `Desmarcar ${book.title} como lendo`
              : `Marcar ${book.title} como lendo`
          }
          accessibilityState={{ selected: reading }}
          onPress={() => toggleReading(book)}
          style={({ pressed }) => [
            styles.actionButton,
            reading && styles.actionButtonActive,
            pressed && styles.actionButtonPressed,
          ]}
        >
          <Ionicons
            name={reading ? "book" : "book-outline"}
            size={18}
            color={reading ? "#8EC5E8" : "#D9B8A4"}
          />
          <GlobalText style={[styles.actionText, reading && { color: "#8EC5E8" }]}>
            Lendo
          </GlobalText>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            read
              ? `Desmarcar ${book.title} como lido`
              : `Marcar ${book.title} como lido`
          }
          accessibilityState={{ selected: read }}
          onPress={() => toggleRead(book)}
          style={({ pressed }) => [
            styles.actionButton,
            read && styles.actionButtonActive,
            pressed && styles.actionButtonPressed,
          ]}
        >
          <Ionicons
            name={read ? "checkmark-circle" : "checkmark-circle-outline"}
            size={18}
            color={read ? "#9ED39A" : "#D9B8A4"}
          />
          <GlobalText style={[styles.actionText, read && { color: "#9ED39A" }]}>
            Lido
          </GlobalText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bookContainer: {
    backgroundColor: "#0a201f",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1f4642",
    padding: 14,
    gap: 14,
  },

  bookContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#1f4642",
  },

  actionButton: {
    flex: 1,
    height: 38,
    borderRadius: 19,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#17332F",
    borderWidth: 1,
    borderColor: "#31564F",
  },

  actionButtonActive: {
    backgroundColor: "#1F4642",
    borderColor: "#4A7A70",
  },

  actionButtonPressed: {
    transform: [{ scale: 0.95 }],
  },

  actionText: {
    fontSize: 13,
    color: "#D9B8A4",
  },

  coverShadow: {
    width: 72,
    borderRadius: 8,
    backgroundColor: "#1f4642",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  cover: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 8,
  },

  noCover: {
    backgroundColor: "#1f4642",
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    flex: 1,
    gap: 4,
  },

  title: {
    fontFamily: "Literata_700Bold",
    fontSize: 16,
    lineHeight: 21,
  },

  author: {
    fontSize: 14,
    color: "#A9B8B3",
  },

  yearBadge: {
    alignSelf: "flex-start",
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#1f4642",
  },

  yearText: {
    fontSize: 11,
    color: "#93A69F",
  },
});
