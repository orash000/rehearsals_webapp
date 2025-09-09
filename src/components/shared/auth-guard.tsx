import { Loader } from "components/ui/loader"
import { useAuth } from "hooks/useAuth"
import type { WithChildren } from "models/common.types"
import { useTranslation } from "react-i18next"

interface AuthGuardProps extends WithChildren {
  fallback?: React.ReactNode
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, fallback = <Loader /> }) => {
  const { t } = useTranslation()
  const { token, isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return <>{fallback}</>
  }

  if (!isAuthenticated || !token) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center text-center gap-4 bg-white">
        <p className="text-xl font-semibold">{t('other.authError')}</p>
      </div>
    )
  }

  return <>{children}</>
}