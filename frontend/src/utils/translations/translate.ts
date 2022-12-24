import {translations} from "./translations";

enum Language {
    SL = 'sl',
}

let selectedTranslations = translations[Language.SL];

export const translate = (key: keyof typeof selectedTranslations): string => {
    return selectedTranslations[key as keyof typeof selectedTranslations];
}

export const setLanguage = (newLanguage: Language) => {
    selectedTranslations = translations[newLanguage];
}