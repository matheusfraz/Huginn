import { useState } from "react";
import { View, StyleSheet, Image, Pressable, TextInput } from "react-native";
import { DrawerToggleButton } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Screen } from "@/components/Screen";
import { GlobalText } from "@/components/GlobalText";
import { BookCard } from "@/components/BookCard";
import { useFavorites } from "@/contexts/FavoritesContext";

type Tab = "lendo" | "favoritos" | "lidos";

export default function Perfil() {
  const { favorites, reading, read } = useFavorites();

  const [name, setName] = useState("Vitor Vidigal");
  const [newName, setNewName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("lendo");

  async function choosePhoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  }

  function startEditing() {
    setNewName(name);
    setIsEditing(true);
  }

  function saveName() {
    if (newName.trim() !== "") {
      setName(newName.trim());
    }
    setIsEditing(false);
  }

  let books = reading;
  let title = "Livros que estou lendo";
  let emptyText = "Você não está lendo nenhum livro no momento.";

  if (tab === "favoritos") {
    books = favorites;
    title = "Meus favoritos";
    emptyText = "Você ainda não favoritou nenhum livro.";
  }

  if (tab === "lidos") {
    books = read;
    title = "Livros que já li";
    emptyText = "Você ainda não marcou nenhum livro como lido.";
  }

  return (
    <Screen scroll={true}>
      <View style={styles.container}>
        <View style={styles.menuButton}>
          <DrawerToggleButton tintColor="#F5F0E6" />
        </View>

        <View style={styles.profileCard}>
          <Pressable onPress={choosePhoto} style={styles.photoButton}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.photo} />
            ) : (
              <View style={[styles.photo, styles.noPhoto]}>
                <Ionicons name="person-outline" size={52} color="#93A69F" />
              </View>
            )}
            <View style={styles.cameraBadge}>
              <Ionicons name="camera-outline" size={17} color="#103330" />
            </View>
          </Pressable>

          {isEditing ? (
            <View style={styles.editArea}>
              <TextInput
                style={styles.nameInput}
                value={newName}
                onChangeText={setNewName}
                autoFocus
              />
              <Pressable onPress={saveName} style={styles.saveButton}>
                <Ionicons name="checkmark" size={22} color="#103330" />
              </Pressable>
            </View>
          ) : (
            <Pressable onPress={startEditing} style={styles.nameArea}>
              <GlobalText style={styles.name}>{name}</GlobalText>
              <Ionicons name="pencil-outline" size={18} color="#A9B8B3" />
            </Pressable>
          )}
        </View>

        <View style={styles.tabs}>
          <TabButton
            label="Lendo"
            count={reading.length}
            icon="book-outline"
            active={tab === "lendo"}
            onPress={() => setTab("lendo")}
          />
          <TabButton
            label="Favoritos"
            count={favorites.length}
            icon="heart-outline"
            active={tab === "favoritos"}
            onPress={() => setTab("favoritos")}
          />
          <TabButton
            label="Lidos"
            count={read.length}
            icon="checkmark-circle-outline"
            active={tab === "lidos"}
            onPress={() => setTab("lidos")}
          />
        </View>

        <GlobalText style={styles.sectionTitle}>{title}</GlobalText>

        {books.length === 0 ? (
          <View style={styles.emptyArea}>
            <Ionicons name="library-outline" size={40} color="#93A69F" />
            <GlobalText style={styles.emptyText}>{emptyText}</GlobalText>
          </View>
        ) : (
          <View style={styles.bookList}>
            {books.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </View>
        )}
      </View>
    </Screen>
  );
}

interface TabButtonProps {
  label: string;
  count: number;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  active: boolean;
  onPress: () => void;
}

function TabButton({ label, count, icon, active, onPress }: TabButtonProps) {
  const color = active ? "#103330" : "#F5F0E6";

  return (
    <Pressable
      onPress={onPress}
      style={[styles.tabButton, active && styles.tabButtonActive]}
    >
      <Ionicons name={icon} size={20} color={color} />
      <GlobalText style={[styles.tabCount, { color }]}>{count}</GlobalText>
      <GlobalText style={[styles.tabLabel, { color }]}>{label}</GlobalText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  menuButton: {
    height: 44,
    alignSelf: "flex-start",
    justifyContent: "center",
    marginTop: -12,
    marginLeft: -12,
  },
  profileCard: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: "#0a201f",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1f4642",
  },
  photoButton: {
    width: 120,
    height: 120,
    marginBottom: 6,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#F5F0E6",
  },
  noPhoto: {
    backgroundColor: "#17332F",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraBadge: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#F5F0E6",
    borderWidth: 2,
    borderColor: "#0a201f",
    justifyContent: "center",
    alignItems: "center",
  },
  nameArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontWeight: "600",
    fontSize: 34,
  },

  editArea: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  
  nameInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: "#F5F0E6",
    borderRadius: 12,
    backgroundColor: "#103330",
    color: "#F5F0E6",
    
    fontSize: 18,
  },
  saveButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#F5F0E6",
    justifyContent: "center",
    alignItems: "center",
  },
  tabs: {
    flexDirection: "row",
    gap: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    gap: 2,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1f4642",
    backgroundColor: "#0a201f",
  },
  tabButtonActive: {
    backgroundColor: "#F5F0E6",
    borderColor: "#F5F0E6",
  },
  tabCount: {
    fontWeight: "700",
    fontSize: 20,
  },
  tabLabel: {
    fontSize: 13,
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: 28,
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
  bookList: {
    gap: 14,
  },
});
