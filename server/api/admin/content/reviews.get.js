import { getReviewsRaw } from '../../../utils/reviews-store'

export default defineEventHandler(() => {
  return getReviewsRaw()?.data ?? { hero: {}, list: [] }
})
