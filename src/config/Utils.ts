import AsyncStorage from "@react-native-async-storage/async-storage";
import appJson from "./../../app.json";

export interface Score {
    total: number,
    correct: number,
    percent: number
}

export interface Question {
    question: string,
    correctAns: string|number|null,
    options: (string | number | null)[]
}

export function shuffleArray(array: unknown[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function selectRandomItem(array: unknown[]): any {
    const randomIndex: number = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

export function getPercentage(total: number, correct: number): number {
    if (!total) return 0;
    return Math.round(100 * (correct / total));
}

export async function storeDataObject(
    key: string,
    data: any,
    onSuccess = async (data: any) => { },
    onFail = async (error: unknown) => { }
) {
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem(`@${appJson.expo.name}:${key}`, jsonValue);
        return await onSuccess(data);
    } catch (error: unknown) {
        console.error(error);
        await onFail(error);
        return null;
    }
}

export async function retrieveDataObject(
    key: string,
    onSuccess = async (data: any) => { },
    onFail = async (error: unknown) => { }
) {
    try {
        key = `@${appJson.expo.name}:${key}`;
        const jsonValue = await AsyncStorage.getItem(key);
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        await onSuccess(data);
        return data;
    } catch (error) {
        console.error(error);
        return await onFail(error);
    }
}
