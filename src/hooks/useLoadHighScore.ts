import { useCallback, useEffect, useState } from "react";
import { Score, retrieveDataObject } from "../config/Utils";

export default function useLoadHighScore(): [boolean, Score, React.Dispatch<React.SetStateAction<Score>>] {
    const [loading, setLoading] = useState(true);
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
        
        setHighScore(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        retrieveDataObject("highScore", onScoreLoad);
    }, []);

    return [loading, highScore, setHighScore];
}
