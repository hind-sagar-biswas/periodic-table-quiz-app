import { useCallback } from "react";
import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import { Platform } from "react-native";

import Colors from "./src/config/Colors";
import HomeTabs from "./src/stacks/HomeTabs";
import QuizScreen from "./src/screens/QuizScreen";
import ElementScreen from "./src/screens/ElementScreen";
import { QuizContext, QuizContextInterface } from "./src/contexts/QuizContext";

const questionFields: string[] = [
  "AtomicNumber",
  "Element",
  "Symbol",
  "AtomicMass",
  "Period:Group",
];
const fields: [string, boolean][] = [
  ["AtomicNumber", true],
  ["Element", true],
  ["Symbol", true],
  ["AtomicMass", true],
  ["NumberofNeutrons", false],
  ["NumberofProtons", false],
  ["NumberofElectrons", false],
  ["Period", true],
  ["Group", true],
  ["Phase", false],
  ["Radioactive", false],
  ["Natural", false],
  ["Metal", false],
  ["Nonmetal", false],
  ["Metalloid", false],
  ["Type", false],
  ["AtomicRadius", false],
  ["Electronegativity", false],
  ["FirstIonization", false],
  ["Density", false],
  ["MeltingPoint", false],
  ["BoilingPoint", false],
  ["NumberOfIsotopes", false],
  ["Discoverer", false],
  ["Year", false],
  ["SpecificHeat", false],
  ["NumberofShells", false],
  ["NumberofValence", false],
];

const answerableFields: string[] = fields
  .filter(([_, answerability]) => answerability)
  .map(([element, _]) => element);

const QuizData: QuizContextInterface = {
  answerableFields,
  questionFields,
  optionCount: 4,
};

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    JosefinSans: require("./src/assets/fonts/JosefinSans-Regular.ttf"),
    JosefinSansThin: require("./src/assets/fonts/JosefinSans-Thin.ttf"),
    JosefinSansBold: require("./src/assets/fonts/JosefinSans-Bold.ttf"),
    JosefinSansMedium: require("./src/assets/fonts/JosefinSans-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }


  return (
    <QuizContext.Provider value={{ ...QuizData }}>
      <NavigationContainer theme={theme}>
        <View onLayout={onLayoutRootView} style={styles.wrapper}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={HomeTabs} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
            <Stack.Screen name="Element" component={ElementScreen} />
          </Stack.Navigator>
          <ExpoStatusBar style="auto" />
        </View>
      </NavigationContainer>
    </QuizContext.Provider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.dark.main,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

const theme = {
  dark: true,
  colors: {
    primary: Colors.primary,
    background: Colors.dark.main,
    card: Colors.dark.darker,
    text: Colors.light,
    border: Colors.dark.lightest,
    notification: Colors.secondary,
  },
};
