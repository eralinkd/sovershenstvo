export const usePriceTable = () => {
  const { data } = useFetch('/api/content/pricing', { key: 'pricing' })
  return computed(() => data.value?.categories ?? [])
}
