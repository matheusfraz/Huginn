import { Stack } from "expo-router";
import {
  useFonts,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_400Regular
} from "@expo-google-fonts/cormorant-garamond";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    CormorantGaramond_600SemiBold,
    CormorantGaramond_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
