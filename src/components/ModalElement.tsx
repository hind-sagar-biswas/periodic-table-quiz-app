import { StyleSheet, Text, View } from "react-native";
import { Octicons, MaterialCommunityIcons } from "@expo/vector-icons";

import BaseStyle from "../config/BaseStyle";
import Colors from "../config/Colors";
import { ElementInterface } from "../data/Elements";

interface Props{
    element: ElementInterface
}

export default function ModalElement({ element }: Props) {
    const getProperty = () => {
        const type = element.Nonmetal
            ? "Nonmetal"
            : element.Metalloid
                ? "Metalloid"
                : "Metal";

        return (
            <View style={styles.propertyContainer}>
                <Octicons
                    name="dot-fill"
                    size={20}
                    color={Colors.elementType[element.Type]}
                />
                <Text style={styles.text}>
                    {element.Type} {element.Type !== type && `(${type})`}
                </Text>
            </View>
        );
    };

    const getGroup = () => {
        if (element.Group) return `Group ${element.Group}`;
        switch (element.Type) {
            case "Actinide":
                return `Group [Ac]`;
            case "Lanthanide":
                return `Group [La]`;
            default:
                return "";
        }
    };

    return (
        <View style={styles.contentContainer}>
            <View style={styles.elementContainer}>
                <View style={styles.elementNums}>
                    <Text style={styles.text}>{element.AtomicNumber}</Text>
                    <Text style={styles.text}>{element.AtomicMass}</Text>
                </View>
                <Text style={styles.element}>{element.Symbol}</Text>
                <Text style={styles.text}>
                    {element.Radioactive && (
                        <MaterialCommunityIcons
                            name="radioactive-circle"
                            size={14}
                            color={Colors.success}
                        />
                    )}
                    {element.Name}
                </Text>
            </View>
            {getProperty()}
            <Text style={styles.text}>
                Period {element.Period} {getGroup()}
            </Text>
            {element.Electronegativity && (
                <Text style={styles.text}>
                    Electronegativity: {element.Electronegativity}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    elementContainer: {
        gap: 10,
        borderColor: Colors.light,
        borderWidth: 2,
        aspectRatio: 1,
        padding: 5,
        paddingBottom: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    elementNums: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    element: {
        textAlign: "center",
        fontSize: 50,
        ...BaseStyle.text,
        fontFamily: "JosefinSans",
        margin: 0,
        padding: 0,
    },
    propertyContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingBottom: 10,
        gap: 10,
    },
    contentContainer: {
        alignItems: "center",
    },
    text: {
        ...BaseStyle.text,
        textAlign: "center",
        padding: 0,
        margin: 0,
    },
});
