import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BaseStyle from "../config/BaseStyle";
import { Feather } from "@expo/vector-icons";
import Colors from "../config/Colors";
import { useContext } from "react";
import { HomeNavContext } from "../contexts/HomeNavContext";
import HighScore from "../components/HighScore";

export default function HomeScreen() {
	const navigation = useContext(HomeNavContext);

	return (
		<View style={styles.container}>
			<HighScore />
			<View style={styles.container}>
				<View>
					<Text style={styles.welcome}>Welcome</Text>
					<TouchableOpacity
						style={styles.start}
						onPress={() => {
							navigation?.navigate("Quiz");
						}}
					>
						<Feather name="play" size={24} color={Colors.light} />
						<Text style={styles.startText}>Start</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	welcome: {
		fontSize: 50,
		marginBottom: 50,
		...BaseStyle.text,
	},
	start: {
		// height: 80,
		...BaseStyle.button,
	},
	startText: {
		fontSize: 40,
		paddingTop: 15,
		paddingBottom: 5,
		includeFontPadding: false,
		...BaseStyle.text,
	},
});
