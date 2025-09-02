import type { IProduct } from "models/product.types"
import { baseApi } from "./baseApi"

interface ProductParams {
  id: string
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => "/products",
      providesTags: ["product"],
    }),
    getProduct: builder.query<IProduct, ProductParams>({
      query: ({ id }) => `/product/${id}`,
      providesTags: ["product"],
    }),
  })
})

export const { useGetProductsQuery, useGetProductQuery } = productApi