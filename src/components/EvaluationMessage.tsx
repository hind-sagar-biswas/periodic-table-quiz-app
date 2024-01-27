import { StyleSheet, Text, View } from "react-native";
import Colors from "../config/Colors";
import BaseStyle from "../config/BaseStyle";

interface Props {
    evaluation: boolean,
    correctAns: string|number|null,
}

export default function EvaluationMessage({ evaluation, correctAns }: Props) {
    return evaluation ? (
        <Text style={[styles.message, styles.correct]}>Correct Answer!</Text>
    ) : (
        <View>
            <Text style={[styles.message, styles.incorrect]}>Incorrect Answer!</Text>
            <Text style={styles.modalText}>Correct Answer: {correctAns}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    message: {
        ...BaseStyle.text,
        fontSize: 24,
        textAlign: "center",
        fontFamily: "JosefinSansMedium",
    },
    correct: {
        color: Colors.success,
    },
    incorrect: {
        color: Colors.danger,
    },
    modalText: {
        textAlign: "center",
        ...BaseStyle.text,
        padding: 0,
        margin: 0,
    },
});
