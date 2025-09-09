import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "config/constants"
import Cookies from "js-cookie"

export const baseApi = createApi({
  reducerPath: "api",
  tagTypes: ["product", "cartItem", "user"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get('access_token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    }
  }),
  endpoints: () => ({})
})