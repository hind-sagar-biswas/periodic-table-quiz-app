import { Modal, Text, Pressable, View, StyleSheet } from "react-native";
import Colors from "../config/Colors";
import BaseStyle from "../config/BaseStyle";
import EvaluationMessage from "./EvaluationMessage";
import ModalElement from "./ModalElement";
import { ElementInterface } from "../data/Elements";

interface Props {
    visible: boolean,
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    next: () => void,
    element: ElementInterface,
    evaluation: boolean,
    correctAns: any,
}

export default function QuizModal({
    visible,
    setModalVisible,
    next,
    element,
    evaluation,
    correctAns,
}: Props) {

    const toggleModal = () => {
        next();
        setModalVisible(!visible);
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={toggleModal}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <EvaluationMessage evaluation={evaluation} correctAns={correctAns} />
                    <ModalElement element={element} />
                    <Pressable style={styles.button} onPress={toggleModal}>
                        <Text style={styles.textStyle}>Next</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        flex: 1,
        width: "90%",
        margin: 0,
        marginBottom: 10,
        backgroundColor: Colors.dark.lighter,
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
        shadowColor: Colors.dark.lightest,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: "space-between",
    },
    button: {
        borderRadius: 10,
        paddingHorizontal: 50,
        paddingVertical: 10,
        elevation: 2,
        backgroundColor: Colors.secondary,
    },
    textStyle: {
        ...BaseStyle.text,
        fontSize: 24,
        textAlign: "center",
    },
    modalText: {
        textAlign: "center",
        ...BaseStyle.text,
        padding: 0,
        margin: 0,
    },
});
