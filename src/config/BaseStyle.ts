import Colors from "./Colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    text: {
        color: Colors.light,
        fontFamily: "JosefinSansThin",
    },
    button: {
        gap: 12,
        elevation: 3,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.primary,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowColor: "#fff",
    },
});