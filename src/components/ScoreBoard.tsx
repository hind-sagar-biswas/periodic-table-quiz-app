import { StyleSheet, Text, View } from "react-native";
import BaseStyle from "../config/BaseStyle";
import Colors from "../config/Colors";
import { useEffect } from "react";
import { Score, storeDataObject } from "../config/Utils";
import useLoadHighScore from "../hooks/useLoadHighScore";

interface Props {
    score: Score
}

export default function ScoreBoard({ score }: Props) {
    const [loading, highScore, setHighScore] = useLoadHighScore();

    useEffect(() => {
        if (!loading) {
            if (highScore.correct < score.correct) {
                storeDataObject("highScore", score, async (data) => setHighScore(data));
            }
        }
    }, [score, loading, highScore]);

    return (
        <View style={styles.container}>
            <View style={styles.scoreContainer}>
                <Text style={[styles.score, BaseStyle.text]}>
                    {score.total.toString().padStart(2, "0")}
                </Text>
                <Text style={BaseStyle.text}>TOTAL</Text>
            </View>
            <View style={styles.scoreContainer}>
                <Text style={[styles.score, styles.correct]}>
                    {score.correct.toString().padStart(2, "0")}
                </Text>
                <Text style={BaseStyle.text}>RIGHT</Text>
            </View>
            <View style={styles.scoreContainer}>
                <Text style={styles.score}>
                    {score.percent.toString().padStart(2, "0")}%
                </Text>
                <Text style={BaseStyle.text}>PERCENT</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        backgroundColor: Colors.dark.lighter,
        width: "80%",
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 10,
        elevation: 3,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowColor: "#fff",
    },
    scoreContainer: {},
    score: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.primary,
    },
    correct: {
        color: Colors.success,
    },
});
