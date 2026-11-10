import { Screen } from "@/components/Screen";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { GlobalText } from "@/components/GlobalText";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Login() {
  const authorizedLogin: Record<string, string> = {
    email: "vitorvidigal@gmail.com",
    password: "vidigal123",
  };

  const [login, setLogin] = useState<Record<string, string>>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<Boolean>(false);

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
        <View style={styles.line} />
        <GlobalText>
          <Text style={{ fontSize: 23 }}>Apenas o conhecimento liberta.</Text>
        </GlobalText>

        <View style={styles.inputArea}>
          <View style={styles.inputContainer}>
            <View style={styles.symbol}>
              <Ionicons name="mail-outline" size={28} color="#103330" />
            </View>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="email"
              value={login.email}
              onChangeText={(email) => setLogin({ ...login, email: email })}
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.symbol}>
              <Ionicons name="eye-off-outline" size={28} color="#103330" />
            </View>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="senha"
              value={login.password}
              onChangeText={(password) =>
                setLogin({ ...login, password: password })
              }
            ></TextInput>
          </View>
        </View>
        <Pressable style={styles.button}>
          <GlobalText
            style={{
              fontFamily: "Literata_700Bold",
              fontSize: 25,
              color: "#103330",
            }}
          >
            Entrar
          </GlobalText>
        </Pressable>
        {error && (
          <GlobalText>
            <Text style={{ fontSize: 17, color: "red" }}>
              email ou senha incorreto
            </Text>
          </GlobalText>
        )}
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
    shadowColor: "#ffffff",
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
    gap: 30,
  },

  inputContainer: {
    width: "90%",
    height: 50,
    backgroundColor: "#0a201f",
    borderRadius: 12,
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
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    fontFamily: "Literata_400Regular",
    color: "#F5F0E6",
    fontVariant: ["lining-nums"],
  },

  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#F5F0E6",
    width: "40%",
  },

  button: {
    height: "6%",
    width: "72%",
    backgroundColor: "#F5F0E6",
    marginTop: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    color: "#103330",
  },
});
