import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { API_URL } from "config/constants"
import Cookies from "js-cookie"

export const baseApi = createApi({
  reducerPath: "api",
  tagTypes: ["product", "cartItem", "user"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    headers: {
      'Authorization': `Bearer ${Cookies.get('access_token')}`
    }
  }),
  endpoints: () => ({})
})