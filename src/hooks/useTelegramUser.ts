import WebApp from "@twa-dev/sdk"
import { useEffect, useState } from "react"

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
}

export function useTelegramUser() {
  const [user, setUser] = useState<TelegramUser | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && WebApp) {
      const tgUser = WebApp.initDataUnsafe?.user

      if (tgUser) {
        setUser(tgUser)
      }
    }
  }, [])

  return user
}