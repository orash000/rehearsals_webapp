import type { CartData } from "models/cart.types"
import { baseApi } from "./baseApi"

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query<CartData[], void>({
      query: () => "/cart-items",
      providesTags: ["cartItem"],
    }),
    addCartItem: builder.mutation<any, any>({
      query: (body) => ({
        method: 'POST',
        url: `/cart-items/`,
        body: body
      }),
      invalidatesTags: ["cartItem", "product"],
    }),
    deleteCartItem: builder.mutation<any, any>({
      query: (id) => ({
        method: 'DELETE',
        url: `/cart-items/${id}/`,
      }),
      invalidatesTags: ["cartItem", "product"],
    }),
  })
})

export const { useGetCartItemsQuery, useAddCartItemMutation, useDeleteCartItemMutation } = cartApi