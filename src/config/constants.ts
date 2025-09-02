export const API_URL = import.meta.env.VITE_API_URL

export const CATEGORIES_NAME = {
  first: "Первые блюда",
  second: "Вторые блюда",
  dessert: "Десерты",
  drink: "Напитки"
} as const

export const LANGS = [
  { code: "ru", label: "RU", flag: "fi-ru" },
  { code: "uz", label: "UZ", flag: "fi-uz" },
] as const