import { getSessionFromEvent, validateSession } from '../utils/admin-session'

export default defineEventHandler((event) => {
  const url = getRequestURL(event).pathname

  // Only protect /api/admin/** but NOT the auth endpoints themselves
  if (!url.startsWith('/api/admin/')) return
  if (url.startsWith('/api/admin/auth/')) return

  const token = getSessionFromEvent(event)
  if (!token || !validateSession(token)) {
    throw createError({ statusCode: 401, message: 'Unauthorized' })
  }
})
