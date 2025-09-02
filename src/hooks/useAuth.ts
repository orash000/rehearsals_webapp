import Cookies from "js-cookie"
import { useEffect, useState, useCallback } from "react"
import { useSetTokenMutation, useRefreshTokenMutation } from "api/token.api"

const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"
const TOKEN_TIMESTAMP_KEY = "token_timestamp"
const TOKEN_EXPIRY_DAYS = 7

export const useAuth = () => {
  const [setTokenFunc] = useSetTokenMutation()
  const [refreshTokenFunc] = useRefreshTokenMutation()
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const saveTokens = useCallback((accessToken: string, refreshToken: string) => {
    const timestamp = Date.now()

    Cookies.set(ACCESS_TOKEN_KEY, accessToken, { expires: TOKEN_EXPIRY_DAYS })
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: TOKEN_EXPIRY_DAYS })
    Cookies.set(TOKEN_TIMESTAMP_KEY, timestamp.toString(), { expires: TOKEN_EXPIRY_DAYS })

    setToken(accessToken)
    setIsAuthenticated(true)
  }, [])

  const getTokensFromCookies = useCallback(() => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY)
    const refreshToken = Cookies.get(REFRESH_TOKEN_KEY)
    const timestamp = Cookies.get(TOKEN_TIMESTAMP_KEY)

    return { accessToken, refreshToken, timestamp }
  }, [])

  const clearTokens = useCallback(() => {
    Cookies.remove(ACCESS_TOKEN_KEY)
    Cookies.remove(REFRESH_TOKEN_KEY)
    Cookies.remove(TOKEN_TIMESTAMP_KEY)

    setToken(null)
    setIsAuthenticated(false)
  }, [])

  const shouldRefreshToken = useCallback((timestamp: string): boolean => {
    const tokenTime = parseInt(timestamp)
    const currentTime = Date.now()
    const daysDiff = (currentTime - tokenTime) / (1000 * 60 * 60 * 24)

    return daysDiff >= TOKEN_EXPIRY_DAYS
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
    try {
      setIsLoading(true)
      const response = await setTokenFunc({
        username: "system_main_admin_rehearsals",
        password: "nikita998pogor1603"
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
    return false
  }, [setTokenFunc, saveTokens, clearTokens])

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true)

      const { accessToken, refreshToken: refreshTokenValue, timestamp } = getTokensFromCookies()

      if (accessToken && refreshTokenValue && timestamp) {
        if (shouldRefreshToken(timestamp)) {
          const refreshSuccess = await refreshToken(refreshTokenValue)
          if (!refreshSuccess) {
            await login()
          }
        } else {
          setToken(accessToken)
          setIsAuthenticated(true)
        }
      } else {
        await login()
      }

      setIsLoading(false)
    }

    initializeAuth()
  }, [getTokensFromCookies, shouldRefreshToken, refreshToken, login])

  useEffect(() => {
    const checkTokenInterval = setInterval(() => {
      const { refreshToken: refreshTokenValue, timestamp } = getTokensFromCookies()

      if (refreshTokenValue && timestamp && shouldRefreshToken(timestamp)) {
        refreshToken(refreshTokenValue)
      }
    }, 24 * 60 * 60 * 1000)

    return () => clearInterval(checkTokenInterval)
  }, [getTokensFromCookies, shouldRefreshToken, refreshToken])

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