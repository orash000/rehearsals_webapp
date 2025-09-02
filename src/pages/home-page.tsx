
import { useState } from "react"
import { Filters } from "components/widgets/filters"
import { ProductsList } from "components/widgets/products-list"

export function HomePage() {
  const [category, setCategory] = useState<string | null>(null)

  return (
    <>
      <Filters selected={category} onSelect={setCategory} />
      <ProductsList selectedCategory={category} />
    </>
  )
}