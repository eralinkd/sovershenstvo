import { getOffersRaw } from '../../../utils/offers-store'

export default defineEventHandler(() => {
  return getOffersRaw()?.data ?? { list: [] }
})
