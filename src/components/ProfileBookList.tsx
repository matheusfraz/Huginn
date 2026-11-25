import { View, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalText } from "@/components/GlobalText";
import { BookCard } from "@/components/BookCard";
import type { Book } from "@/types/Book";

interface ProfileBookListProps {
  title: string;
  books: Book[];
  emptyText: string;
}

export function ProfileBookList({ title, books, emptyText }: ProfileBookListProps) {
  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => <BookCard book={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.list}
      ListHeaderComponent={<GlobalText style={styles.title}>{title}</GlobalText>}
      ListEmptyComponent={
        <View style={styles.emptyArea}>
          <Ionicons name="library-outline" size={40} color="#93A69F" />
          <GlobalText style={styles.emptyText}>{emptyText}</GlobalText>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 24,
    paddingBottom: 40,
    gap: 14,
  },
  title: {
    fontWeight: "600",
    fontSize: 24,
  },
  emptyArea: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 30,
  },
  emptyText: {
    fontSize: 15,
    color: "#A9B8B3",
    textAlign: "center",
  },
});
