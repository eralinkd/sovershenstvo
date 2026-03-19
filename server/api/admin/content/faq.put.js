import { prisma } from '../../../utils/db'
import { refreshFaqFromDb } from '../../../utils/faq-store'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const title = String(body?.title ?? '').trim()
  const items = Array.isArray(body?.items) ? body.items : []

  let faq = await prisma.faq.findFirst({ orderBy: { updatedAt: 'desc' } })

  if (faq) {
    await prisma.faq.update({
      where: { id: faq.id },
      data: { title },
    })
  } else {
    faq = await prisma.faq.create({ data: { title } })
  }

  // Удаляем все старые items и создаём заново
  await prisma.faqItem.deleteMany({ where: { faqId: faq.id } })

  if (items.length > 0) {
    await prisma.faqItem.createMany({
      data: items
        .filter((it) => it.question?.trim() || it.answer?.trim())
        .map((it, idx) => ({
          faqId: faq.id,
          question: String(it.question ?? '').trim(),
          answer: String(it.answer ?? '').trim(),
          sortOrder: idx,
        })),
    })
  }

  await refreshFaqFromDb()
  return { ok: true }
})
