import Cookies from "js-cookie"
import { useEffect, useState, useCallback } from "react"
import { useSetTokenMutation, useRefreshTokenMutation } from "api/token.api"
import { useTelegramUser } from "./useTelegramUser.ts"

const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"

export const useAuth = () => {
  const user = useTelegramUser()
  const [setTokenFunc] = useSetTokenMutation()
  const [refreshTokenFunc] = useRefreshTokenMutation()
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const saveTokens = useCallback((accessToken: string, refreshToken: string) => {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken)
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken)

    setToken(accessToken)
    setIsAuthenticated(true)
  }, [])

  const getTokensFromCookies = useCallback(() => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY)
    const refreshToken = Cookies.get(REFRESH_TOKEN_KEY)

    return { accessToken, refreshToken }
  }, [])

  const clearTokens = useCallback(() => {
    Cookies.remove(ACCESS_TOKEN_KEY)
    Cookies.remove(REFRESH_TOKEN_KEY)

    setToken(null)
    setIsAuthenticated(false)
  }, [])

  const refreshToken = useCallback(async (refreshTokenValue: string) => {
    try {
      const response = await refreshTokenFunc({ refresh: refreshTokenValue })

      if (response.data?.access) {
        const { refreshToken: storedRefreshToken } = getTokensFromCookies()
        saveTokens(response.data.access, storedRefreshToken || refreshTokenValue)
        return true
      }
    } catch (error) {
      console.error("Ошибка при обновлении токена:", error)
      clearTokens()
      return false
    }
    return false
  }, [refreshTokenFunc, getTokensFromCookies, saveTokens, clearTokens])

  const login = useCallback(async () => {
    if (user) {
      try {
        setIsLoading(true)
        const response = await setTokenFunc({
          telegram_id: user.id
        })

        if (response.data?.access && response.data?.refresh) {
          saveTokens(response.data.access, response.data.refresh)
          return true
        }
      } catch (error) {
        console.error("Ошибка при авторизации:", error)
        clearTokens()
        return false
      } finally {
        setIsLoading(false)
      }
    }

    return false
  }, [user, setTokenFunc, saveTokens, clearTokens])

  useEffect(() => {
    const initializeAuth = async () => {
      if (user) {
        setIsLoading(true)
        const loginSuccess = await login()

        if (!loginSuccess) {
          const { refreshToken: refreshTokenValue } = getTokensFromCookies()
          if (refreshTokenValue) {
            await refreshToken(refreshTokenValue)
          }
        }

        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [user])

  return {
    token,
    isAuthenticated,
    isLoading,
    login,
    clearTokens,
    refreshToken: () => {
      const { refreshToken: refreshTokenValue } = getTokensFromCookies()
      if (refreshTokenValue) {
        return refreshToken(refreshTokenValue)
      }
      return Promise.resolve(false)
    }
  }
}