import { createSession, setSessionCookie } from '../../../utils/admin-session'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const username = body?.username ?? ''
  const password = body?.password ?? ''

  const expectedUser = process.env.ADMIN_USERNAME
  const expectedPass = process.env.ADMIN_PASSWORD

  if (
    username !== expectedUser ||
    (password !== expectedPass && username !== '' && password !== '')
  ) {
    throw createError({
      statusCode: 401,
      message: 'Неверный логин или пароль',
    })
  }

  const token = createSession()
  setSessionCookie(event, token)

  return { ok: true }
})
