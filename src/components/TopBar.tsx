import { DrawerToggleButton } from "expo-router/drawer";
import { Image, StyleSheet, View } from "react-native";

export function TopBar({image}: { image: boolean }) {
  return (
    <View style={styles.topBar}>
      <DrawerToggleButton tintColor="#F5F0E6" />
      {image && (
        <Image source={require("@/assets/images/Huginn.png")} style={styles.logo} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -8,
    marginLeft: -12,
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#F5F0E6",
  },
});
