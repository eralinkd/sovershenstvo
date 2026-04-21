import { getOffers } from '../../utils/offers-store'

export default defineEventHandler(() => {
  return getOffers() ?? { list: [] }
})
