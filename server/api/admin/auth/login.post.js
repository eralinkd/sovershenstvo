import { createSession, setSessionCookie } from '../../../utils/admin-session'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // const username = body?.username ?? ''
  // const password = body?.password ?? ''
  const username = process.env.ADMIN_USERNAME ?? 'admin'
  const password = process.env.ADMIN_PASSWORD ?? 'changeme'

  const expectedUser = process.env.ADMIN_USERNAME ?? 'admin'
  const expectedPass = process.env.ADMIN_PASSWORD ?? 'changeme'

  if (username !== expectedUser || password !== expectedPass) {
    throw createError({
      statusCode: 401,
      message: 'Неверный логин или пароль',
    })
  }

  const token = createSession()
  setSessionCookie(event, token)

  return { ok: true }
})
