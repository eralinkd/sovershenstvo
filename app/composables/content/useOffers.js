export const useOffers = () => {
  const { data } = useFetch('/api/content/offers', { key: 'offers' })
  return computed(() =>
    (data.value?.list ?? []).map((it) => ({
      topic: it?.topic || '',
      text: it?.text || '',
      price: it?.price || '',
      link: it?.link || '/',
    })),
  )
}
