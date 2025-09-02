import { baseApi } from "./baseApi"

interface SetTokenBody {
  username: string
  password: string
}

interface SetTokenData {
  access: string
  refresh: string
}

interface RefreshTokenBody {
  refresh: string
}

export const tokenApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setToken: builder.mutation<SetTokenData, SetTokenBody>({
      query: (body) => ({
        method: 'POST',
        url: `/token/`,
        body: body
      }),
      invalidatesTags: ["user"]
    }),
    refreshToken: builder.mutation<any, RefreshTokenBody>({
      query: (body) => ({
        method: 'POST',
        url: `/token/refresh/`,
        body: body
      }),
      invalidatesTags: ["user"]
    })
  })
})

export const { useSetTokenMutation, useRefreshTokenMutation } = tokenApi