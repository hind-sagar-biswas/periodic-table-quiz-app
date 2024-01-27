import { StyleSheet, Text, View } from "react-native";

export default function ElementScreen() {
	return (
		<View style={styles.container}>
			<View style={{ flex: 2 }}></View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	scoreBpard: {
		flex: 1,
	},
});
