import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Colors from "../config/Colors";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { HomeNavContext } from "../contexts/HomeNavContext";

const Tab = createBottomTabNavigator();

interface Props {
	navigation: NativeStackNavigationProp<any, any>
};

export default function HomeTabs({ navigation }: Props) {
	return (
		<HomeNavContext.Provider value={navigation}>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName: "home" | "home-outline" | "settings" | "settings-outline" = "home";

						if (route.name === "Home") {
							iconName = focused ? "home" : "home-outline";
						} else if (route.name === "Settings") {
							iconName = focused ? "settings" : "settings-outline";
						}

						// You can return any component that you like here!
						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: Colors.primary,
					tabBarInactiveTintColor: "gray",
					headerShown: false,
					labeled: false,
				})}
			>
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Settings" component={SettingsScreen} />
			</Tab.Navigator>
		</HomeNavContext.Provider>
	);
}
