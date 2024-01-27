import { StyleSheet, Text, View } from "react-native";
import BaseStyle from "../config/BaseStyle";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../config/Colors";

export default function SettingsScreen() {
	return (
		<View style={styles.container}>
			<FontAwesome name="cogs" size={44} color={Colors.light} />
			<Text style={styles.item}>Settings coming soon...</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
        ...BaseStyle.text
	},
});
