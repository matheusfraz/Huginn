import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Screen } from "@/components/Screen";
import { FilterTemplate } from "@/components/FilterTemplate";
import { GlobalText } from "@/components/GlobalText";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Filter } from "../types/filter";

export default function Catalogo() {
  const [filters, setFilters] = useState<Filter[]>([
    { id: 0, name: "Todos", isActive: true },
    { id: 1, name: "Português", isActive: false, language: "portuguese" },
    { id: 2, name: "Inglês", isActive: false, language: "english" },
  ]);

  return (
    <Screen scroll={true}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.logo}>
            <Image
              source={require("@/assets/images/Huginn.png")}
              style={styles.logoImg}
            />
          </View>
          <View style={styles.titleArea}>
            <GlobalText
              style={{
                fontSize: 50,
                fontFamily: "CormorantGaramond_600SemiBold",
                margin: 0,
              }}
            >
              Catálogo
            </GlobalText>
            <GlobalText
              style={{ color: "#9e9a93", fontSize: 17, marginLeft: 3 }}
            >
              Encontre seu próximo livro
            </GlobalText>
          </View>
        </View>
        <View style={styles.searchAreaContainer}>
          <View style={styles.searchBarArea}>
            <View style={styles.iconArea}>
              <Ionicons name="search-outline" size={30} color="#103330" />
            </View>
          </View>
        </View>
        <View style={styles.filtersContainer}>
          {filters.map((filter) => {
            return (
              <Pressable
                onPress={() => {
                  const index: number = filters.findIndex(
                    (f) => f.id === filter.id,
                  );

                  const newArray: Filter[] = filters.map((filter) =>
                    filter.id === index
                      ? { ...filter, isActive: true }
                      : { ...filter, isActive: false },
                  );

                  setFilters(newArray);
                }}
              >
                <FilterTemplate
                  key={filter.id}
                  id={filter.id}
                  name={filter.name}
                  isActive={filter.isActive}
                />
              </Pressable>
            );
          })}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 28,
    gap: 25,
  },

  titleContainer: {
    width: "100%",
    height: "15%",
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
  },

  titleArea: {
    width: "60%",
    height: "100%",
    justifyContent: "center",
  },

  logo: {
    width: "30%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  logoImg: {
    height: 90,
    width: 90,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#F5F0E6",
    resizeMode: "contain",
    shadowColor: "#ffffff",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },

  searchAreaContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  searchBarArea: {
    width: "100%",
    height: 60,
    backgroundColor: "#0a201f",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#F5F0E6",
    flexDirection: "row",
  },

  iconArea: {
    width: "15%",
    height: "100%",
    backgroundColor: "#F5F0E6",
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },

  filtersContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 15,
  },
});
