import { useAddCartItemMutation, useGetCartItemsQuery } from "api/cart.api"
import { useGetProductsQuery } from "api/product.api"
import { ProductCard } from "components/ui/product-card"
import { useGetLocalized } from "hooks/useGetLocalized"
import { useTelegramUser } from "hooks/useTelegramUser.ts"

interface ProductsListProps {
  selectedCategory: string | null
}

export const ProductsList: React.FC<ProductsListProps> = ({ selectedCategory }) => {
  const user = useTelegramUser()
  const { data } = useGetProductsQuery()
  const { data: cartItemsData } = useGetCartItemsQuery()

  const { getLocalized } = useGetLocalized()
  const [addCartItem, { isLoading }] = useAddCartItemMutation()

  const filtered = selectedCategory ? data?.filter((item) => item.category === selectedCategory) : data

  const isOnCart = (productId: number) => {
    return cartItemsData?.some((item: any) => item.product.id === productId)
  }

  const addToCart = async (productId: number) => {
    if (user) {
      try {
        await addCartItem({
          product_id: productId,
          telegram_id: user.id
        })
      } catch (e) {
        console.log('Error adding to cart:', e)
      }
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {filtered?.map((item) => (
        <ProductCard
          key={item.id}
          image={item.image}
          price={item.price}
          category={item.category}
          title={getLocalized(item, "name")}
          description={getLocalized(item, "description")}
          isOnCart={isOnCart(item.id)}
          addToCartLoading={isLoading}
          addToCart={() => addToCart(item.id)}
        />
      ))}
    </div>
  )
}