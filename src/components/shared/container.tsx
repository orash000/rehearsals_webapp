import type { WithChildren } from "models/common.types"

export const Container: React.FC<WithChildren> = ({ children }) => {
  return (
    <div className="w-full max-w-[500px] mx-auto p-4 flex flex-col grow">
      {children}
    </div>
  )
}