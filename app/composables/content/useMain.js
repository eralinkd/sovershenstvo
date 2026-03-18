import { usePriceTable } from '~/composables/usePriceTable'

export const useMain = () => {
  const { data } = useFetch('/api/content/main', { key: 'main' })
  const pricing = usePriceTable()

  return computed(() => ({
    ...(data.value ?? {}),
    pricing: pricing.value,
  }))
}
