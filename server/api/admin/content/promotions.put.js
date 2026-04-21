import { prisma } from '../../../utils/db'
import { getPromotionsRaw, refreshPromotionsFromDb } from '../../../utils/promotions-store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const existing = getPromotionsRaw()

  if (existing) {
    await prisma.promotions.update({ where: { id: existing.id }, data: { data: body } })
  } else {
    await prisma.promotions.create({ data: { data: body } })
  }

  await refreshPromotionsFromDb()
  return { ok: true }
})
