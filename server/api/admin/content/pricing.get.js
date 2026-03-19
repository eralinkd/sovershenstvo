import { getPricing } from '../../../utils/pricing-store'

export default defineEventHandler((_event) => {

  return getPricing() ?? { categories: [] }
})
