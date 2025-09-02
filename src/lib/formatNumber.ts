export const formatNumber = (value: string) => {
  const num = Number(value.replace(/\s/g, ""))
  if (isNaN(num)) return value
  if (Math.abs(num) < 10000) return value

  return new Intl.NumberFormat("ru-RU", {
    useGrouping: true,
  })
    .format(num)
    .replace(/\u00A0/g, " ")
}