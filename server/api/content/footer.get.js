import { getFooter } from '../../utils/footer-store'

export default defineEventHandler(() => {
  const data = getFooter()
  if (!data) {
    throw createError({
      statusCode: 404,
      message: 'Footer not found',
    })
  }
  return data
})
