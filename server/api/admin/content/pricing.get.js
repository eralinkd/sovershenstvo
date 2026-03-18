import { getPricing } from '../../../utils/pricing-store'

export default defineEventHandler((_event) => {
  // TODO: восстановить проверку авторизации
  return getPricing() ?? { categories: [] }
})
