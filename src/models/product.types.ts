export interface IProduct {
  id: number
  name_ru: string,
  name_uz: string,
  category: ProductCategories,
  description_ru: string,
  description_uz: string,
  image: string,
  video: string,
  recipe_text: string,
  recipe_text_uz: string,
  price: number,
  recipe_image: string,
  recipe_video: string,
  recipe_file: string,
  recipe_source_link: string
}

export type ProductCategories = "first" | "second" | "dessert" | "drink"