import { useCurrentLang } from "./useCurrentLang"

export const useGetLocalized = () => {
  const { currentLang } = useCurrentLang()

  const getLocalized = (item: any, field: string) => {
    return currentLang.code === "ru" ? item[`${field}_ru`] : item[`${field}_uz`]
  }

  return { getLocalized }
}