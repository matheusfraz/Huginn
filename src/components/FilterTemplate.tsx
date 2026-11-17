import { View, StyleSheet } from "react-native";
import { GlobalText } from "./GlobalText";
import { Filter } from "@/app/types/filter";

export function FilterTemplate({ name, isActive }: Filter) {
  return (
    <View
      style={[
        styles.filterContainer,
        isActive && { backgroundColor: "#F5F0E6" },
      ]}
    >
      <GlobalText
        style={{
          fontSize: 22,
          color: isActive ? "#0a201f" : "#F5F0E6",
          fontFamily: "Literata_700Bold",
        }}
      >
        {name}
      </GlobalText>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#F5F0E6",
    justifyContent: "center",
    alignItems: "center",
  },
});
