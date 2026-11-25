import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ReadingProvider } from "@/contexts/ReadingContext";
import { ReadingHistoryProvider } from "@/contexts/ReadingHistoryContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ReadingHistoryProvider>
        <ReadingProvider>
          <FavoritesProvider>
            <RootStack />
          </FavoritesProvider>
        </ReadingProvider>
      </ReadingHistoryProvider>
    </AuthProvider>
  );
}

function RootStack() {
  const { isLoggedIn } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" />
      </Stack.Protected>

      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(drawer)" />
        <Stack.Screen name="detalhes" />
        <Stack.Screen name="leitura" />
        <Stack.Screen name="historico-leitura" />
      </Stack.Protected>
    </Stack>
  );
}
