import { createContext } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const HomeNavContext = createContext<NativeStackNavigationProp<any, any>|undefined>(undefined);