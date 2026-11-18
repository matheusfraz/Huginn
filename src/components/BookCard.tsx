import type { Book } from "@/types/Book";
import { View, StyleSheet, Image } from "react-native";
import { GlobalText } from "./GlobalText";
import { Ionicons } from "@expo/vector-icons";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const coverUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

  return (
    <View style={styles.bookContainer}>
      <View style={styles.coverShadow}>
        {book.cover_i ? (
          <Image source={{ uri: coverUrl }} style={styles.cover} />
        ) : (
          <View style={[styles.cover, styles.noCover]}>
            <Ionicons name="book-outline" size={36} color="#93A69F" />
            <GlobalText style={styles.noCoverText}>Sem capa</GlobalText>
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
    </View>
  );
}

const styles = StyleSheet.create({
  bookContainer: {
    flex: 1,
    maxWidth: "48%",
    backgroundColor: "#0a201f",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#1f4642",
    padding: 10,
    gap: 10,
  },

  coverShadow: {
    borderRadius: 12,
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
    borderRadius: 12,
  },

  noCover: {
    backgroundColor: "#1f4642",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  noCoverText: {
    fontSize: 12,
    color: "#93A69F",
  },

  info: {
    gap: 4,
    paddingHorizontal: 2,
  },

  title: {
    fontFamily: "Literata_700Bold",
    fontSize: 15,
    lineHeight: 20,
    minHeight: 40,
  },

  author: {
    fontSize: 13,
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
