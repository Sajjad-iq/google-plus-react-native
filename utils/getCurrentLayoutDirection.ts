import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dispatch } from "react";

export const getCurrentLayoutDirection = async (setter: Dispatch<any>) => {
    let savedLanguage = await AsyncStorage.getItem("language");
    if (savedLanguage?.startsWith("ar")) setter("rtl");
    else setter("ltr")
} // getCurrentLayoutDirection.ts