import { getReviews } from '../../utils/reviews-store'

export default defineEventHandler(() => {
  return getReviews() ?? { hero: {}, list: [] }
})
