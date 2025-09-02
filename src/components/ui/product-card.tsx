import { formatNumber } from "lib/formatNumber"
import { ShoppingCart } from "lucide-react"
import type { ProductCategories } from "models/product.types"
import { useTranslation } from "react-i18next"

interface ProductCardProps {
  title: string
  description: string
  price: number
  image: string
  category: ProductCategories
  isOnCart?: boolean
  addToCart?: () => void
  addToCartLoading?: boolean
}

export const ProductCard: React.FC<ProductCardProps> = ({ title, description, price, image, category, isOnCart, addToCart, addToCartLoading }) => {
  const { t } = useTranslation()

  return (
    <div className="card shadow-md bg-base-100">
      <figure>
        <img
          src={image}
          alt={title}
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-2xl">{title}</h3>
        <p>{description}</p>
        <p className="text-xl font-semibold">
          {formatNumber(String(price))} {t('other.som')}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <div className="badge badge-outline badge-primary">
            {t(`categories.${category}`)}
          </div>
        </div>

        <div className="card-actions mt-4">
          {isOnCart ? (
            <button
              disabled
              className="btn w-full"
            >
              {t('buttons.onCart')}
            </button>
          ) : (
            <button
              onClick={addToCart}
              disabled={addToCartLoading}
              className="btn btn-primary w-full"
            >
              {addToCartLoading ? <span className="loading loading-spinner"></span> : <ShoppingCart className="w-5 h-5 mr-1" />}
              {t('buttons.addToCart')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}