import { cn } from "lib/cn"

interface FilterItemProps {
  title: string
  isActive?: boolean
  onClick?: () => void
}

export const FilterItem: React.FC<FilterItemProps> = ({ title, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "btn rounded-full",
        isActive ? "btn-primary" : "btn-outline"
      )}
    >
      {title}
    </button>
  )
}