import { getMain } from '../../utils/main-store'

export default defineEventHandler(() => {
  const data = getMain()
  if (!data) {
    throw createError({ statusCode: 404, message: 'Main content not found' })
  }
  return data
})
