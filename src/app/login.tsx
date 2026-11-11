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
import { router } from "expo-router";

const authorizedLogin: Record<string, string> = {
  email: "123",
  password: "123",
};

export default function Login() {
  const [login, setLogin] = useState<Record<string, string>>({
    email: "",
    password: "",
  });

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);

  return (
    <Screen scroll={true}>
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
              autoCapitalize="none"
              value={login.email}
              onChangeText={(email) => setLogin({ ...login, email: email })}
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Pressable
              style={styles.symbol}
              onPress={() => setIsVisible(!isVisible)}
            >
              <Ionicons
                name={isVisible ? "eye-outline" : "eye-off-outline"}
                size={28}
                color="#103330"
              />
            </Pressable>
            <TextInput
              style={styles.input}
              secureTextEntry={isVisible ? false : true}
              placeholder="senha"
              value={login.password}
              onChangeText={(password) =>
                setLogin({ ...login, password: password })
              }
            ></TextInput>
          </View>
          <Pressable
            style={styles.button}
            onPress={() => {
              if (
                login.email === authorizedLogin.email &&
                login.password === authorizedLogin.password
              ) {
                setError(false);
                router.replace("/catalogo");
              } else {
                setError(true);
              }
            }}
          >
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
          <View style={styles.line} />
          {error && (
            <GlobalText style={styles.errorMensage}>
              email ou senha incorreto
            </GlobalText>
          )}
        </View>
        <View></View>
        <Text
          style={{
            marginBottom: 50,
            fontFamily: "Literata_400Regular",
            color: "#F5F0E6",
          }}
        >
          matheusfraz | bentocsf
        </Text>
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
    height: 370,
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
    height: "12%",
    width: "72%",
    backgroundColor: "#F5F0E6",
    marginTop: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    color: "#103330",
  },

  errorMensage: {
    padding: 12,
    backgroundColor: "#cc44445d",
    borderWidth: 3,
    borderRadius: 12,
    borderColor: "#bb351e",
    fontSize: 17,
    color: "red",
  },
});
