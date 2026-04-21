import { prisma } from '../../../utils/db'
import { getOffersRaw, refreshOffersFromDb } from '../../../utils/offers-store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const existing = getOffersRaw()

  if (existing) {
    await prisma.offers.update({ where: { id: existing.id }, data: { data: body } })
  } else {
    await prisma.offers.create({ data: { data: body } })
  }

  await refreshOffersFromDb()
  return { ok: true }
})
