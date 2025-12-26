import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { useTodoStore } from "../store/useTodoStore";

export default function TodoListScreen({ navigation }) {
  const { todos, addTodo } = useTodoStore();

  useEffect(() => {
    addTodo({ id: 1, title: "Faire les courses" });
    addTodo({ id: 2, title: "Sortir le chien" });
    addTodo({ id: 3, title: "Coder une app RN" });
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Détails", item)}
          >
            <Text style={{ fontSize: 18, padding: 10 }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
