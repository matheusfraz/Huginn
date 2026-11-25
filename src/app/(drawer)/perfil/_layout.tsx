import { GlobalText } from "@/components/GlobalText";
import { Screen } from "@/components/Screen";
import { TopBar } from "@/components/TopBar";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Tabs, router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, TextInput, View } from "react-native";

const PHOTO_KEY = "@huginn/profile-photo";

export const unstable_settings = {
  initialRouteName: "lendo",
};

export default function PerfilLayout() {
  const { favorites, reading, read } = useFavorites();
  const { logout } = useAuth();

  const [name, setName] = useState("Victor Vidigal");
  const [newName, setNewName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    async function loadPhoto() {
      const savedPhoto = await AsyncStorage.getItem(PHOTO_KEY);
      if (savedPhoto) {
        setPhoto(savedPhoto);
      }
    }

    loadPhoto();
  }, []);

  async function choosePhoto() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhoto(uri);
      await AsyncStorage.setItem(PHOTO_KEY, uri);
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

  return (
    <Screen scroll={false}>
      <View style={styles.header}>
        <TopBar image={false} />

        <View style={styles.profileCard}>
          <Pressable onPress={choosePhoto} style={styles.photoButton}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.photo} />
            ) : (
              <View style={[styles.photo, styles.noPhoto]}>
                <Ionicons name="person-outline" size={38} color="#93A69F" />
              </View>
            )}
            <View style={styles.cameraBadge}>
              <Ionicons name="camera-outline" size={14} color="#103330" />
            </View>
          </Pressable>

          <View style={styles.info}>
            {isEditing ? (
              <View style={styles.editArea}>
                <TextInput
                  style={styles.nameInput}
                  value={newName}
                  onChangeText={setNewName}
                  autoFocus
                />
                <Pressable onPress={saveName} style={styles.saveButton}>
                  <Ionicons name="checkmark" size={20} color="#103330" />
                </Pressable>
              </View>
            ) : (
              <Pressable onPress={startEditing} style={styles.nameArea}>
                <GlobalText style={styles.name} numberOfLines={1}>
                  {name}
                </GlobalText>
                <Ionicons name="pencil-outline" size={16} color="#A9B8B3" />
              </Pressable>
            )}
            <GlobalText style={styles.subtitle}>Leitor do Huginn</GlobalText>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/historico-leitura")}
          style={styles.historyButton}
        >
          <View style={styles.historyIcon}>
            <Ionicons name="time-outline" size={20} color="#F5F0E6" />
          </View>
          <GlobalText style={styles.historyLabel}>Histórico de Leitura</GlobalText>
          <Ionicons name="chevron-forward" size={18} color="#AFC2B7" />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={logout}
          style={styles.logoutButton}
        >
          <Ionicons name="log-out-outline" size={18} color="#E58B80" />
          <GlobalText style={styles.logoutText}>Sair da conta</GlobalText>
        </Pressable>
      </View>

      <Tabs
        safeAreaInsets={{ top: 0, bottom: 0 }}
        screenOptions={{
          headerShown: false,
          tabBarPosition: "top",
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabItem,
          tabBarLabelStyle: styles.tabLabel,
          tabBarActiveBackgroundColor: "#F5F0E6",
          tabBarActiveTintColor: "#103330",
          tabBarInactiveTintColor: "#AFC2B7",
          sceneStyle: { backgroundColor: "#103330" },
        }}
      >
        <Tabs.Screen
          name="lendo"
          options={{
            title: `Lendo (${reading.length})`,
            tabBarIcon: ({ focused }) => (
              <Ionicons name="book-outline" color={focused ? "#103330" : "#AFC2B7"} size={20} />
            ),
          }}
        />
        <Tabs.Screen
          name="favoritos"
          options={{
            title: `Favoritos (${favorites.length})`,
            tabBarIcon: ({ focused }) => (
              <Ionicons name="heart-outline" color={focused ? "#103330" : "#AFC2B7"} size={20} />
            ),
          }}
        />
        <Tabs.Screen
          name="lidos"
          options={{
            title: `Lidos (${read.length})`,
            tabBarIcon: ({ focused }) => (
              <Ionicons name="checkmark-circle-outline" color={focused ? "#103330" : "#AFC2B7"} size={20} />
            ),
          }}
        />
      </Tabs>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    gap: 16,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    backgroundColor: "#0a201f",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1f4642",
  },
  photoButton: {
    width: 84,
    height: 84,
  },
  photo: {
    width: 84,
    height: 84,
    borderRadius: 42,
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
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F5F0E6",
    borderWidth: 2,
    borderColor: "#0a201f",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    gap: 4,
  },
  nameArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    flexShrink: 1,
    fontWeight: "600",
    fontSize: 26,
  },
  subtitle: {
    fontSize: 14,
    color: "#A9B8B3",
  },
  editArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  nameInput: {
    flex: 1,
    height: 44,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: "#F5F0E6",
    borderRadius: 12,
    backgroundColor: "#103330",
    color: "#F5F0E6",
    fontSize: 16,
  },
  saveButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F5F0E6",
    justifyContent: "center",
    alignItems: "center",
  },
  historyButton: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1f4642",
    backgroundColor: "#17413C",
  },
  historyIcon: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: "#28564D",
  },
  historyLabel: {
    flex: 1,
    fontWeight: "600",
    fontSize: 14,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: -6,
    paddingVertical: 6,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E58B80",
  },
  tabBar: {
    height: 64,
    marginHorizontal: 24,
    padding: 4,
    backgroundColor: "#0a201f",
    borderRadius: 18,
    borderWidth: 1,
    borderTopWidth: 1,
    borderColor: "#1f4642",
    elevation: 0,
    shadowOpacity: 0,
  },
  tabItem: {
    marginHorizontal: 2,
    paddingVertical: 4,
    borderRadius: 14,
    overflow: "hidden",
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
});
