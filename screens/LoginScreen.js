import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { useContext, useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { ThemeContext } from "../context/ThemeContext";

WebBrowser.maybeCompleteAuthSession();
const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

export default function LoginScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: WEB_CLIENT_ID,
    responseType: "id_token",
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential).catch(() =>
        setError("Erreur Google")
      );
    }
  }, [response]);

  const login = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Email ou mot de passe incorrect");
    }
    setLoading(false);
  };

  const register = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Compte déjà existant");
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 24, backgroundColor: theme.background }}>
      <Text style={{ fontSize: 26, color: theme.text, textAlign: "center" }}>Connexion</Text>

      {error && <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>}

      <TextInput placeholder="Email" value={email} onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }} />

      <TextInput placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 10 }} />

      {loading ? <ActivityIndicator /> : (
        <>
          <TouchableOpacity onPress={login} style={{ backgroundColor: theme.primary, padding: 12, marginTop: 10 }}>
            <Text style={{ color: "#fff", textAlign: "center" }}>Se connecter</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={register} style={{ marginTop: 10 }}>
            <Text style={{ color: theme.primary, textAlign: "center" }}>Créer un compte</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={!request} onPress={() => promptAsync()}
            style={{ backgroundColor: "#DB4437", padding: 12, marginTop: 10 }}>
            <Text style={{ color: "#fff", textAlign: "center" }}>Google</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity onPress={toggleTheme} style={{ marginTop: 20 }}>
        <Text style={{ textAlign: "center", color: theme.primary }}>Changer thème</Text>
      </TouchableOpacity>
    </View>
  );
}
