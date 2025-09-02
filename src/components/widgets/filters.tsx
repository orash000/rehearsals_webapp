import { FilterItem } from "components/ui/filter-item"
import { useTranslation } from "react-i18next"

interface FiltersProps {
  selected: string | null
  onSelect: (category: string | null) => void
}

export const Filters: React.FC<FiltersProps> = ({ selected, onSelect }) => {
  const { t } = useTranslation()

  const CATEGORIES_LIST = [
    {
      value: "first",
      title: t('categories.first')
    },
    {
      value: "second",
      title: t('categories.second')
    },
    {
      value: "dessert",
      title: t('categories.dessert')
    },
    {
      value: "drink",
      title: t('categories.drink')
    },
  ]

  return (
    <div className="z-30 sticky top-0 px-4 py-3 -mx-4 flex items-center gap-2 overflow-x-auto backdrop-blur-xl bg-base-100/80">
      <FilterItem
        key="all"
        title={t('categories.all')}
        isActive={selected === null}
        onClick={() => onSelect(null)}
      />
      {CATEGORIES_LIST.map((item) => (
        <FilterItem
          key={item.value}
          title={item.title}
          isActive={selected === item.value}
          onClick={() => onSelect(item.value)}
        />
      ))}
    </div>
  )
}