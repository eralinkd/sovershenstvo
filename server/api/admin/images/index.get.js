import { scanAll, findUsages } from '../../../utils/image-manager'
import { prisma } from '../../../utils/db'

export default defineEventHandler(async () => {
  // TODO: восстановить проверку авторизации
  const { images, folders } = await scanAll()

  const imagesWithUsages = await Promise.all(
    images.map(async (img) => ({
      ...img,
      usages: await findUsages(img.url, prisma),
    })),
  )

  return { images: imagesWithUsages, folders }
})
