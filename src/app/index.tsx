import { Text, View, StyleSheet } from "react-native";
import { Redirect } from "expo-router";

export default function Index() {
  return (
    <Redirect href={"/login"}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
