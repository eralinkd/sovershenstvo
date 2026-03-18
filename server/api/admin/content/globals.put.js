import { prisma } from '../../../utils/db'
import { refreshGlobalsFromDb } from '../../../utils/globals-store'

export default defineEventHandler(async (event) => {
  // TODO: восстановить проверку авторизации
  const body = await readBody(event)
  const title = String(body?.title ?? '').trim()
  const seoDescription = String(body?.seoDescription ?? body?.seo?.description ?? '').trim()
  const seoOgTitle = String(body?.seoOgTitle ?? body?.seo?.ogTitle ?? '').trim()
  const seoOgDescription = String(body?.seoOgDescription ?? body?.seo?.ogDescription ?? '').trim()

  const existing = await prisma.globals.findFirst({ orderBy: { updatedAt: 'desc' } })

  const data = {
    title: title || 'Совершенство',
    seoDescription: seoDescription || null,
    seoOgTitle: seoOgTitle || null,
    seoOgDescription: seoOgDescription || null,
  }

  if (existing) {
    await prisma.globals.update({
      where: { id: existing.id },
      data,
    })
  } else {
    await prisma.globals.create({ data })
  }

  await refreshGlobalsFromDb()
  return { ok: true }
})
