import {
    StyleSheet,
    ActivityIndicator,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import BaseStyle from "../config/BaseStyle";
import Colors from "../config/Colors";
import { useCallback, useState, useEffect } from "react";
import { Score, retrieveDataObject } from "../config/Utils";


export default function HighScore() {
    const [loading, setLoading] = useState<boolean>(true);
    const [highScore, setHighScore] = useState<Score>({
        total: 0,
        correct: 0,
        percent: 0,
    });

    const onScoreLoad = useCallback(async (data: Score) => {
        if (!data || !data.total) {
            data = {
                total: 0,
                correct: 0,
                percent: 0,
            };
        }

        console.log(data);
        setHighScore(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        retrieveDataObject("highScore", onScoreLoad);
    }, []);

    if (loading)
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    style={{ margin: 0, padding: 0 }}
                    size="small"
                    color={Colors.primary}
                />
                <Text style={BaseStyle.text}>loading data...</Text>
            </View>
        );

    return (
        <View style={styles.container}>
            <View style={[styles.scoreContainer, { width: "100%" }]}>
                <View>
                    <Text style={styles.score}>
                        <Text style={[styles.focus, { color: Colors.success }]}>
                            {highScore.correct.toString().padStart(2, "0")}
                        </Text>
                        /{highScore.total.toString().padStart(2, "0")} -{" "}
                        {highScore.percent.toString().padStart(2, "0")}%
                    </Text>
                    <Text style={BaseStyle.text}>HIGH SCORE</Text>
                </View>
                <TouchableOpacity
                    onPress={() => retrieveDataObject("highScore", onScoreLoad)}
                >
                    <Ionicons name="reload" size={24} color={Colors.light} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "80%",
    },
    scoreContainer: {
        marginTop: 30,
        backgroundColor: Colors.dark.lighter,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 5,
        elevation: 3,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowColor: "#fff",

        flexDirection: "row",
        gap: 12,
        alignItems: "center",
        justifyContent: "space-between",
    },
    score: {
        ...BaseStyle.text,
        fontFamily: "monospace",
        color: "grey",
    },
    focus: {
        fontWeight: "bold",
        fontSize: 25,
        fontFamily: "monospace",
    },
    correct: {
        color: Colors.success,
    },
});
