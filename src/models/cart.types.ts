import type { IProduct } from "./product.types"

export interface ICart {
  user: number
  product: IProduct
}

export interface CartData {
  id: number
  product: IProduct
  user: number
}