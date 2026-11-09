import { Children } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenProps {
  children: React.ReactNode;
}

export function Screen({ children }: ScreenProps) {
  <SafeAreaView>{children}</SafeAreaView>;
}
