import { View, Text } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";

export default function ProfileScreen() {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: theme.background }}>
      <Text style={{ fontSize: 22, color: theme.text }}>Profil</Text>
      <Text style={{ color: theme.text }}>{user.email}</Text>
    </View>
  );
}
