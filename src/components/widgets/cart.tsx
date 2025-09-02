import { useDeleteCartItemMutation, useGetCartItemsQuery } from "api/cart.api"
import { CartItem } from "components/ui/cart-item"
import { useGetLocalized } from "hooks/useGetLocalized"
import { formatNumber } from "lib/formatNumber"
import { ShoppingCart, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { useState } from "react"

export const Cart: React.FC = () => {
  const { t } = useTranslation()
  const { data } = useGetCartItemsQuery()
  const { getLocalized } = useGetLocalized()
  const [deleteCartItem] = useDeleteCartItemMutation()
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const total = data?.reduce((sum, item) => sum + item.product.price * 1, 0)

  const onDelete = async (id: number) => {
    setDeletingId(id)
    try {
      await deleteCartItem(id)
    } catch (e) {
      console.log('Error deleting:', e)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      <div className="z-40 drawer">
        <input id="cart-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="cart-drawer" className="btn btn-primary btn-square drawer-button">
            <ShoppingCart className="w-5 h-5" />
          </label>
        </div>

        <div className="drawer-side">
          <label htmlFor="cart-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="menu bg-base-200 text-base-content min-h-full w-full relative gap-6">
            <label
              htmlFor="cart-drawer"
              aria-label="close sidebar"
              className="absolute right-4 top-4 cursor-pointer btn btn-square btn-soft"
            >
              <X className="w-5 h-5" />
            </label>

            {data?.length === 0 ? (
              <div className="w-full h-screen flex items-center justify-center text-center">
                <p className="text-2xl font-semibold">{t('cart.empty')}</p>
              </div>
            ) : (
              <>
                <div className="mt-16 flex flex-col gap-4">
                  {data?.map((item) => (
                    <CartItem
                      key={item.id}
                      price={item.product.price}
                      image={item.product.image}
                      title={getLocalized(item.product, "name")}
                      onDeleteLoading={deletingId === item.id}
                      onDelete={() => onDelete(item.id)}
                    />
                  ))}
                </div>

                <p className="text-xl font-semibold">
                  {t('cart.summary')}: {formatNumber(String(total))} {t('other.som')}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}