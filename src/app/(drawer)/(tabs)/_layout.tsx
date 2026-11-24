import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_400Regular,
  CormorantGaramond_700Bold,
} from "@expo-google-fonts/cormorant-garamond";
import { Literata_400Regular, Literata_700Bold } from "@expo-google-fonts/literata";

export default function TabsLayout() {
  const [fontsLoaded] = useFonts({
    CormorantGaramond_600SemiBold,
    CormorantGaramond_400Regular,
    CormorantGaramond_700Bold,
    Literata_400Regular,
    Literata_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <Tabs
      initialRouteName="inicio"
      screenOptions={{
        headerStyle: { backgroundColor: "#103330" },
        tabBarStyle: {
          paddingTop: 8,
          backgroundColor: "#041b19",
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: "#F5F0E6",
        tabBarInactiveTintColor: "#7A8F8A",
        tabBarLabelStyle: { fontFamily: "Literata_400Regular", fontSize: 11 },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="inicio"
        options={{
          title: "In\u00EDcio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="catalogo"
        options={{
          title: "Cat\u00E1logo",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
