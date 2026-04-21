const sessions = new Map()

const COOKIE_NAME = 'admin_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export function createSession() {
  const token = crypto.randomUUID()
  sessions.set(token, { createdAt: Date.now() })
  return token
}

export function validateSession(token) {
  if (!token) return false
  return sessions.has(token)
}

export function destroySession(token) {
  sessions.delete(token)
}

export function getSessionFromEvent(event) {
  const cookieHeader = event.node?.req?.headers?.cookie
  if (!cookieHeader) return null
  const match = String(cookieHeader).match(new RegExp(`${COOKIE_NAME}=([^;]+)`))
  return match ? match[1].trim() : null
}

export function setSessionCookie(event, token) {
  setResponseHeader(event, 'set-cookie', `${COOKIE_NAME}=${token}; Path=/; HttpOnly; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax`)
}

export function clearSessionCookie(event) {
  setResponseHeader(event, 'set-cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; Max-Age=0`)
}
