import { getPromotionsRaw } from '../../../utils/promotions-store'

export default defineEventHandler(() => {
  return getPromotionsRaw()?.data ?? {}
})
