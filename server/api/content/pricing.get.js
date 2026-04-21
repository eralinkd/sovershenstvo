import { getPricing } from '../../utils/pricing-store'

export default defineEventHandler(() => {
  const data = getPricing()
  if (!data) {
    return { categories: [] }
  }
  return data
})
