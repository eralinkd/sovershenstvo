import { prisma } from '../../../utils/db'
import { getAboutRaw, refreshAboutFromDb } from '../../../utils/about-store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const existing = getAboutRaw()

  if (existing) {
    await prisma.about.update({ where: { id: existing.id }, data: { data: body } })
  } else {
    await prisma.about.create({ data: { data: body } })
  }

  await refreshAboutFromDb()
  return { ok: true }
})
