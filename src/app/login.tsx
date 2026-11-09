import { Screen } from "@/components/Screen";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalText } from "@/components/GlobalText";
import { Ionicons } from "@expo/vector-icons";

export default function Login() {
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image
            source={require("@/assets/images/Huginn.png")}
            style={styles.logoImg}
          />
          <GlobalText style={styles.logoText}>Huginn</GlobalText>
        </View>
        <View style={styles.linha} />
        <GlobalText>
          <Text style={{ fontSize: 23 }}>Apenas o conhecimento liberta.</Text>
        </GlobalText>

        <View style={styles.inputArea}>
          <View style={styles.inputContainer}>
            <View style={styles.symbol}>
              <Ionicons name="mail-outline" size={28} color="#103330" />
            </View>
            <TextInput style={styles.input} placeholder="email"></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.symbol}>
              <Ionicons name="eye-off-outline" size={28} color="#103330" />
            </View>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="senha"
            ></TextInput>
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
  },

  logo: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    gap: 10,
  },

  logoImg: {
    width: 160,
    height: 160,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: "#F5F0E6",
    resizeMode: "contain",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },

  logoText: {
    fontFamily: "CormorantGaramond_600SemiBold",
    fontSize: 50,
    color: "#F5F0E6",
  },

  inputArea: {
    alignItems: "center",
    padding: 8,
    width: "85%",
    gap: 25,
  },

  inputContainer: {
    width: "90%",
    height: 50,
    backgroundColor: "#0a201f",
    borderRadius: 12,
    fontFamily: "CormorantGaramond_400Regular",
    borderWidth: 2,
    borderColor: "#F5F0E6",
    flexDirection: "row",
  },

  symbol: {
    width: "14%",
    height: "100%",
    backgroundColor: "#F5F0E6",
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: "CormorantGaramond_400Regular",
    color: "#F5F0E6",
  },

  linha: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#F5F0E6",
    width: "40%",
  },
});
