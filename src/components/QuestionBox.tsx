import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import BaseStyle from "../config/BaseStyle";
import Colors from "../config/Colors";

const { width } = Dimensions.get("window");

interface Props {
    questionObj,
    number,
    selected,
    select
}

export default function QuestionBox({ questionObj, number, selected, select }: Props) {

    function getOptionBox(option, id: number) {
        if (selected[0] === null) return (
            <TouchableOpacity key={id} onPress={() => select(id)}>
                <Text style={styles.option}>{option || 'None'}</Text>
            </TouchableOpacity>
        );

        if (selected[0] == id) return <Text key={id} style={[styles.option, selected[1] ? styles.correct : styles.wrong]} >{option || 'None'}</Text>
        return <Text key={id} style={styles.option} >{option || 'None'}</Text>
    }

    return (
        <View style={styles.container}>
            <View style={styles.questionBox}>
                <Text style={styles.questionNumber}>{number.toString().padStart(2, "0")}</Text>
                <Text style={styles.question}>{questionObj.question}?</Text>
            </View>
            <View style={styles.optionBox}>
                {questionObj.options.map((option, id: number) => getOptionBox(option, id))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 7,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    questionBox: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    questionNumber: {
        color: Colors.secondary,
        fontSize: 200,
        fontWeight: "bold",
        opacity: 0.4,
        position: "absolute",
    },
    question: {
        fontSize: 20,
        textAlign: "center",
        ...BaseStyle.text,
    },
    optionBox: {
        flex: 1,
        alignItems: "strech",
        justifyContent: "space-between",
        gap: 10,
        width: width - 70,
    },
    option: {
        backgroundColor: Colors.dark.lighter,
        textAlign: "center",
        fontSize: 24,
        width: "100%",
        padding: 10,
        borderRadius: 10,
        elevation: 3,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        ...BaseStyle.text,
    },
    correct: {
        backgroundColor: Colors.success,
        color: Colors.dark.main,
        fontFamily: "JosefinSansBold",
    },
    wrong: {
        backgroundColor: Colors.danger,
    },
});
