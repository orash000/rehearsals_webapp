import { useTelegramUser } from "hooks/useTelegramUser"

export const Profile: React.FC = () => {
  const user = useTelegramUser()

  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary cursor-pointer select-none">
          <span className="text-lg font-bold invert-100">{user?.first_name.slice(0, 1) || "Г"}</span>
        </div>

        <div tabIndex={0} className="dropdown-content menu bg-base-100 rounded-xl z-40 w-52 mt-2 px-4 py-3 border border-base-300 shadow-md">
          <p className="text-lg font-bold">{user?.first_name || "Гость"}</p>
        </div>
      </div>
    </>
  )
}