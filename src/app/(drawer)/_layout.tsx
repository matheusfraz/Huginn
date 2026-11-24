import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";

export const unstable_settings = {
  initialRouteName: "catalogo",
};

export default function DrawerLayout() {
  return (
    <Drawer
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
        name="catalogo"
        options={{
          title: "Catálogo",
          drawerLabel: "Catálogo",
          drawerIcon: ({ color, size }) => (
            <DrawerIcon name="library-outline" color={"white"} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="perfil"
        options={{
          title: "Perfil",
          drawerLabel: "Perfil",
          drawerIcon: ({ color, size }) => (
            <DrawerIcon name="person-outline" color={"white"} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="sobre"
        options={{
          title: "Sobre",
          drawerLabel: "Sobre",
          drawerIcon: ({ color, size }) => (
            <DrawerIcon
              name="information-circle-outline"
              color={"white"}
              size={size}
            />
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
  return <Ionicons name={name} color={"white"} size={size} />;
}
