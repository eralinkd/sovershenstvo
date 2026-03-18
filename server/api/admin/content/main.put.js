import { prisma } from '../../../utils/db'
import { refreshMainFromDb } from '../../../utils/main-store'

export default defineEventHandler(async (event) => {
  // TODO: восстановить проверку авторизации
  const body = await readBody(event)

  const existing = await prisma.main.findFirst({ orderBy: { updatedAt: 'desc' } })

  if (existing) {
    await prisma.main.update({ where: { id: existing.id }, data: { data: body } })
  } else {
    await prisma.main.create({ data: { data: body } })
  }

  await refreshMainFromDb()
  return { ok: true }
})
