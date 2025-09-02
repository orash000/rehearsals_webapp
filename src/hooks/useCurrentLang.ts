import { LANGS } from "config/constants"
import { useTranslation } from "react-i18next"

export const useCurrentLang = () => {
  const { i18n } = useTranslation()
  const currentLang = LANGS.find((l) => l.code === i18n.language) || LANGS[0]

  return { currentLang }
}