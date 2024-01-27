import { StyleSheet, View } from "react-native";
import { useState, useContext } from "react";

import { QuizContext, QuizContextInterface } from "../contexts/QuizContext";
import QuestionBox from "../components/QuestionBox";
import ScoreBoard from "../components/ScoreBoard";
import QuizModal from "../components/QuizModal";
import { Question, Score, getPercentage, selectRandomItem, shuffleArray } from "../config/Utils";
import { ElementInterface, Elements } from "../data/Elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";


interface Props {
	navigation: NativeStackNavigationProp<any, any>
};

export default function QuizScreen({ navigation }: Props) {
	const data = useContext<QuizContextInterface>(QuizContext);
	const [elements] = useState(Elements);
	const [currentElement, setCurrentElement] = useState<ElementInterface>(() => selectElement());
	const [modalVisible, setModalVisible] = useState<boolean>(false);
	const [selected, setSelected] = useState<[string | number | null, boolean]>([null, false]);
	const [score, setScore] = useState<Score>({
		total: 0,
		correct: 0,
		percent: 0,
	});

	const [question, setQuestion] = useState(() => generateQuestion());
	console.log(question.question, question.correctAns);

	function next() {
		if (currentElement && Object.keys(currentElement).length > 0) {
			setScore((prev) => {
				const newScore = {
					total: prev.total + 1,
					correct: selected[1] ? prev.correct + 1 : prev.correct,
				};
				return {
					...newScore,
					percent: getPercentage(newScore.total, newScore.correct),
				};
			});
			setSelected([null, false]);
		}
		const newElement = selectElement();
		setCurrentElement(newElement);
		setQuestion(generateQuestion(newElement));
	}

	function selectElement(exclude: unknown[] = [], exclusionParam = "AtomicNumber") {
		let randomItem = selectRandomItem(elements);
		while (exclude.includes(randomItem[exclusionParam])) {
			randomItem = selectRandomItem(elements);
		}
		return randomItem;
	}

	function generateOptions(currentElement: string | number | null, field: string): (string | number | null)[] {
		const options = [currentElement];

		for (let index = 0; index < data.optionCount - 1; index++) {
			options.push(selectElement(options, field)[field]);
		}

		shuffleArray(options);
		return options;
	}

	function generateQuestion(newElement: ElementInterface | null = null): Question {
		const element: ElementInterface = newElement || currentElement;
		const questionField: string[] = selectRandomItem(data.questionFields).split(":");
		const answerField = selectRandomItem(
			data.answerableFields.filter((item) => !questionField.includes(item))
		);
		let question;

		if (questionField.length === 1) {
			question = `What is the ${answerField} of the element whose ${questionField[0]
				} is ${element[questionField[0]]}`;
		} else {
			question = `What is the ${answerField} of the element whose`;
			for (let index = 0; index < questionField.length; index++) {
				const field = questionField[index];
				if (index) question += ` &`;
				question += ` ${field} is ${element[field]}`;
			}
		}

		const correctAns: any = element[answerField];
		const options = generateOptions(element[answerField], answerField);

		return {
			question,
			correctAns,
			options,
		};
	}

	function select(id: number) {
		if (selected[0] !== null) return;
		setSelected([id, question.correctAns == question.options[id]]);
		setModalVisible(true);
	}

	return (
		<View style={styles.container}>
			<QuizModal
				visible={modalVisible}
				setModalVisible={setModalVisible}
				next={next}
				element={currentElement}
				evaluation={selected[1]}
				correctAns={question.correctAns}
			/>
			<ScoreBoard score={score} />
			{question && (
				<QuestionBox
					questionObj={question}
					number={score.total + 1}
					selected={selected}
					select={select}
				/>
			)}
			<View style={{ flex: 2 }}></View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	scoreBoard: {
		flex: 1,
	},
});
