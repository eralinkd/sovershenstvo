import { getGlobals } from '../../utils/globals-store'

export default defineEventHandler(() => {
  const data = getGlobals()
  if (!data) {
    throw createError({
      statusCode: 404,
      message: 'Globals not found',
    })
  }
  return data
})
