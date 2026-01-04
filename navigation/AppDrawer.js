import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import NativeStack from "./NativeStack.js";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Mes tâches" component={HomeScreen} />
      <Drawer.Screen name="Profil" component={ProfileScreen} />
      <Drawer.Screen name="Fonctionnalités natives" component={NativeStack} />
    </Drawer.Navigator>
  );
}
