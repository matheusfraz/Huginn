import { Stack } from "expo-router";
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
import { FavoritesProvider } from "@/contexts/FavoritesContext";

export default function RootLayout() {
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
    <FavoritesProvider>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen name="detalhes" options={{ headerShown: false }} />
      </Stack>
    </FavoritesProvider>
  );
}
