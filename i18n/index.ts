import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "./locales/en.json";
import translationAR from "./locales/ar.json";

// Define the translation resources
const resources = {
    en: { translation: translationEn },
    ar: { translation: translationAR },
};

const initI18n = async () => {
    try {
        // Try to get the saved language from AsyncStorage
        let savedLanguage = null

        // If no saved language, use the first preferred language from the device locales
        const locales = Localization.getLocales();
        savedLanguage = locales[0]?.languageCode || 'en';
        // Save the default language in AsyncStorage
        await AsyncStorage.setItem("language", savedLanguage);
        // Initialize i18n
        i18n.use(initReactI18next).init({
            compatibilityJSON: "v3",
            resources,
            lng: savedLanguage,
            fallbackLng: "en", // Use 'en-US' as the default fallback language
            interpolation: {
                escapeValue: false, // React already escapes values by default
            },
        });
    } catch (error) {
        console.error("Error initializing i18n:", error);
    }
};

// Initialize i18n
initI18n();

export default i18n;
