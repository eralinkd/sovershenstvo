import { getFaq } from '../../utils/faq-store'

export default defineEventHandler(() => {
  const data = getFaq()
  if (!data) {
    throw createError({
      statusCode: 404,
      message: 'FAQ not found',
    })
  }
  return data
})
