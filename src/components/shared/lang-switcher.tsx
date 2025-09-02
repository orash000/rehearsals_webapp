import { LANGS } from "config/constants"
import { useCurrentLang } from "hooks/useCurrentLang"
import { cn } from "lib/cn"
import { useTranslation } from "react-i18next"

export const LangSwitcher: React.FC = () => {
  const { i18n } = useTranslation()
  const { currentLang } = useCurrentLang()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className="dropdown dropdown-center">
      <div tabIndex={0} role="button" className="btn btn-soft btn-primary">
        <span className={`fi ${currentLang.flag} w-5 h-5`} />
        <span className="font-medium">{currentLang.label}</span>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-xl shadow-md mt-2 w-28 p-2 border border-base-300"
      >
        {LANGS.map((lang) => (
          <li key={lang.code}>
            <button
              role="button"
              onClick={() => {
                changeLanguage(lang.code)
                  ; (document.activeElement as HTMLElement)?.blur()
              }}
              className={cn(
                "btn btn-ghost",
                i18n.language === lang.code && "btn-soft font-semibold"
              )}
            >
              <span className={`fi ${lang.flag} w-5 h-5`} />
              {lang.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}