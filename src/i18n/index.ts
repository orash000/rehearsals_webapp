import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import ru from "./ru.json"
import uz from "./uz.json"

const resources = {
  ru: { translation: ru },
  uz: { translation: uz },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n