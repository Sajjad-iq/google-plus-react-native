import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";


export default function getCurrentLang() {

    const [lang, serLang] = useState("en")
    const getLang = async () => {
        const lang = await AsyncStorage.getItem("language");
        serLang(lang || "en")
    }

    useEffect(() => {
        getLang()
    }, [])

    return lang
}