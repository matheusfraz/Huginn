import { Tabs } from "expo-router";
import {
  useFonts,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_400Regular,
  CormorantGaramond_700Bold,
} from "@expo-google-fonts/cormorant-garamond";

import {
  Literata_400Regular,
  Literata_700Bold,
} from "@expo-google-fonts/literata";

export default function TabsLayout() {
  const [fontsLoaded] = useFonts({
    CormorantGaramond_600SemiBold,
    CormorantGaramond_400Regular,
    CormorantGaramond_700Bold,
    Literata_400Regular,
    Literata_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#103330" },
        tabBarStyle: {
          paddingTop: 10,
          backgroundColor: "#041b19",
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarActiveTintColor: "#F5F0E6",
        tabBarInactiveTintColor: "#7A8F8A",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="catalogo"
        options={{ title: "Catálogo", headerShown: false }}
      />
      <Tabs.Screen
        name="perfil"
        options={{ title: "Perfil", headerShown: false }}
      />
    </Tabs>
  );
}
