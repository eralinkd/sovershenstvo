import { prisma } from '../../../utils/db'
import { getReviewsRaw, refreshReviewsFromDb } from '../../../utils/reviews-store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const existing = getReviewsRaw()

  if (existing) {
    await prisma.reviews.update({ where: { id: existing.id }, data: { data: body } })
  } else {
    await prisma.reviews.create({ data: { data: body } })
  }

  await refreshReviewsFromDb()
  return { ok: true }
})
