import { Stack } from "expo-router";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ReadingProvider } from "@/contexts/ReadingContext";

export default function RootLayout() {
  return (
    <ReadingProvider>
      <FavoritesProvider>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="detalhes" options={{ headerShown: false }} />
          <Stack.Screen name="leitura" options={{ headerShown: false }} />
        </Stack>
      </FavoritesProvider>
    </ReadingProvider>
  );
}
