import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AppBar({ title, back = false }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: 56,
        backgroundColor: "#2f80ed",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
      }}
    >
      {back && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: "#fff", fontSize: 18, marginRight: 15 }}>
            ⬅
          </Text>
        </TouchableOpacity>
      )}

      <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
        {title}
      </Text>
    </View>
  );
}
