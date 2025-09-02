import { formatNumber } from "lib/formatNumber"
import { Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"

interface CartItemProps {
  image: string
  title: string
  price: number
  onDelete?: () => void
  onDeleteLoading?: boolean
}

export const CartItem: React.FC<CartItemProps> = ({ image, title, price, onDelete, onDeleteLoading }) => {
  const { t } = useTranslation()

  return (
    <div className="w-full p-2 flex items-center justify-between gap-6 rounded-xl bg-base-300">
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt={title}
          className="w-12 h-12 rounded-xl object-cover"
        />
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-xs">{formatNumber(String(price))} {t('other.som')}</p>
        </div>
      </div>

      <button
        onClick={onDelete}
        disabled={onDeleteLoading}
        className="btn btn-sm btn-error btn-square"
      >
        {onDeleteLoading ? <span className="loading loading-spinner"></span> : <Trash2 className="w-5 h-5" />}
      </button>
    </div>
  )
}