import { prisma } from '../../../utils/db'
import { refreshFooterFromDb } from '../../../utils/footer-store'

export default defineEventHandler(async (event) => {
  // TODO: восстановить проверку авторизации
  const body = await readBody(event)
  const title = String(body?.title ?? '').trim()
  const subtitle = String(body?.subtitle ?? '').trim()
  const city = String(body?.city ?? '').trim()
  const email = String(body?.email ?? '').trim()
  const summaryPhones = String(body?.summaryPhones ?? '').trim()
  const addresses = Array.isArray(body?.addresses) ? body.addresses : []

  let footer = await prisma.footer.findFirst({ orderBy: { updatedAt: 'desc' } })

  if (footer) {
    await prisma.footer.update({
      where: { id: footer.id },
      data: { title, subtitle, city, email, summaryPhones },
    })
  } else {
    footer = await prisma.footer.create({
      data: { title, subtitle, city, email, summaryPhones },
    })
  }

  await prisma.footerAddress.deleteMany({ where: { footerId: footer.id } })

  if (addresses.length > 0) {
    await prisma.footerAddress.createMany({
      data: addresses
        .filter((a) => a.label?.trim())
        .map((a, idx) => ({
          footerId: footer.id,
          label: String(a.label ?? '').trim(),
          phone1: String(a.phone1 ?? '').trim() || null,
          phone2: String(a.phone2 ?? '').trim() || null,
          phone3: String(a.phone3 ?? '').trim() || null,
          sortOrder: idx,
        })),
    })
  }

  await refreshFooterFromDb()
  return { ok: true }
})
