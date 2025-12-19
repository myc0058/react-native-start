import { Platform } from "react-native";
import { AppHeader as Android } from "./AppHeader.android";
import { AppHeader as IOS } from "./AppHeader.ios";

export const AppHeader = Platform.OS === "ios" ? IOS : Android;