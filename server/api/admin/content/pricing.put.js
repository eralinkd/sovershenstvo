import { prisma } from '../../../utils/db'
import { refreshPricingFromDb } from '../../../utils/pricing-store'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const categories = Array.isArray(body?.categories) ? body.categories : []

  const cleaned = categories
    .filter((cat) => (cat.title || '').trim() || (cat.children || []).length > 0)
    .map((cat) => ({
      title: String(cat.title ?? '').trim(),
      children: (Array.isArray(cat.children) ? cat.children : [])
        .filter((item) => (item.title || '').trim())
        .map((item) => ({
          title: String(item.title ?? '').trim(),
          our_price: String(item.our_price ?? '').trim(),
          price: String(item.price ?? '').trim(),
        })),
    }))

  const existing = await prisma.pricing.findFirst({ orderBy: { updatedAt: 'desc' } })

  if (existing) {
    await prisma.pricing.update({ where: { id: existing.id }, data: { data: { categories: cleaned } } })
  } else {
    await prisma.pricing.create({ data: { data: { categories: cleaned } } })
  }

  await refreshPricingFromDb()
  return { ok: true }
})
