import { LangSwitcher } from "components/shared/lang-switcher"
import { Cart } from "./cart"
import { Profile } from "./profile"

export const Header: React.FC = () => {
  return (
    <header className="w-full pb-4 mb-4 flex items-center justify-between gap-6 border-b border-base-300">
      <Cart />

      <div className="flex items-center gap-4">
        <LangSwitcher />
        <Profile />
      </div>
    </header>
  )
}