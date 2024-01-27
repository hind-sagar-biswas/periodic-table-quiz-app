import { createContext } from "react";

export interface QuizContextInterface {
    answerableFields: string[],
    questionFields: string[],
    optionCount: number,
}

export const QuizContext = createContext<QuizContextInterface>({
    answerableFields: [],
    questionFields: [],
    optionCount: 4,
});
