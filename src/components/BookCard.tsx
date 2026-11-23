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
    </View>
  );
}

const styles = StyleSheet.create({
  bookContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0a201f",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1f4642",
    padding: 12,
    gap: 14,
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
