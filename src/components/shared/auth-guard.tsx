import { Loader } from "components/ui/loader"
import { useAuth } from "hooks/useAuth"
import type { WithChildren } from "models/common.types"
import { useEffect } from "react"

interface AuthGuardProps extends WithChildren {
  fallback?: React.ReactNode
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, fallback = <Loader /> }) => {
  const { login, refreshToken, token, isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    login()
      .then(() => { })
      .catch(() => refreshToken())
  }, [])

  if (isLoading) {
    return <>{fallback}</>
  }

  if (!isAuthenticated || !token) {
    return
  }

  return <>{children}</>
}