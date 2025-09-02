export const API_URL = import.meta.env.VITE_API_URL

export const CATEGORIES_NAME = {
  first: "Первые блюда",
  second: "Вторые блюда",
  dessert: "Десерты",
  drink: "Напитки"
} as const

export const LANGS = [
  { code: "uz", label: "UZ", flag: "fi-uz" },
  { code: "ru", label: "RU", flag: "fi-ru" },
] as const