import { offers as offersData } from '~/data/content'

export const useOffers = () => {
  const list = offersData?.list || {}

  const entries = Object.entries(list)
    .filter(([key, val]) => key.startsWith('item') && val)
    .sort((a, b) => {
      const na = parseInt(a[0].replace(/\D/g, '') || '0', 10)
      const nb = parseInt(b[0].replace(/\D/g, '') || '0', 10)
      return na - nb
    })

  return computed(() =>
    entries.map(([, it]) => ({
      topic: it?.topic || '',
      text: it?.text || '',
      price: it?.price || '',
      link: it?.link || '/',
    })),
  )
}
