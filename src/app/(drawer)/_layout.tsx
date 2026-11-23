import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      initialRouteName="(tabs)"
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: "#103330", width: 285 },
        drawerActiveTintColor: "#F5F0E6",
        drawerInactiveTintColor: "#AFC2B7",
        drawerActiveBackgroundColor: "#28564D",
        drawerLabelStyle: { fontFamily: "Literata_400Regular", fontSize: 15 },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Início",
          drawerLabel: "Início",
          drawerIcon: ({ color, size }) => (
            <DrawerIcon name="home-outline" color={'color'} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="sobre"
        options={{
          title: "Sobre",
          drawerLabel: "Sobre",
          drawerIcon: ({ color, size }) => (
            <DrawerIcon name="information-circle-outline" color={'color'} size={size} />
          ),
        }}
      />
    </Drawer>
  );
}

function DrawerIcon({
  name,
  color,
  size,
}: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  size: number;
}) {
  return <Ionicons name={name} color={color} size={size} />;
}
