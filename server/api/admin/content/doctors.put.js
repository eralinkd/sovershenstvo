import { prisma } from '../../../utils/db'
import { getDoctorsRaw, refreshDoctorsFromDb } from '../../../utils/doctors-store'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const existing = getDoctorsRaw()

  if (existing) {
    await prisma.doctors.update({
      where: { id: existing.id },
      data: { data: body },
    })
  } else {
    await prisma.doctors.create({ data: { data: body } })
  }

  await refreshDoctorsFromDb()
  return { ok: true }
})
