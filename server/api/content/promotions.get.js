import { getPromotions } from '../../utils/promotions-store'

export default defineEventHandler(() => {
  return getPromotions() ?? {}
})
