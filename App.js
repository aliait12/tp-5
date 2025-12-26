import { useEffect, useState, useContext } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { initDB } from "./services/database";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import TodoListOfflineScreen from "./screens/TodoListOfflineScreen";

function MainApp() {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={[
      styles.container,
      theme === "dark" ? styles.dark : styles.light
    ]}>
      <TodoListOfflineScreen />
    </View>
  );
}

export default function App() {
  const [dbReady, setDbReady] = useState(false);

  useEffect(() => {
    initDB();
    setDbReady(true);
  }, []);

  if (!dbReady) return <ActivityIndicator size="large" />;

  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40 },
  light: { backgroundColor: "#fff" },
  dark: { backgroundColor: "#121212" },
});
