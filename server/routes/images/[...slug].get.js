import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import path from 'node:path'
import { sendStream, setResponseHeader, createError, getRouterParam } from 'h3'
import { IMAGES_ROOT, ensureSafe, isImageFile } from '../../utils/image-manager'

const MIME_BY_EXT = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
}

/**
 * Раздача загруженных картинок с диска. В production Nitro часто не отдаёт
 * файлы, появившиеся в public после сборки, из-за чего GET /images/... даёт 404.
 */
export default defineEventHandler(async (event) => {
  let slug = getRouterParam(event, 'slug')
  if (Array.isArray(slug)) slug = slug.join('/')
  if (!slug || typeof slug !== 'string') {
    throw createError({ statusCode: 400, message: 'Bad path' })
  }

  const rel = slug.replace(/\\/g, '/').replace(/^\/+/, '')
  if (!rel || rel.includes('..')) {
    throw createError({ statusCode: 400, message: 'Bad path' })
  }

  let filePath
  try {
    filePath = ensureSafe(IMAGES_ROOT, rel)
  } catch {
    throw createError({ statusCode: 400, message: 'Invalid path' })
  }

  if (!isImageFile(filePath)) {
    throw createError({ statusCode: 404, message: 'Not found' })
  }

  try {
    const st = await stat(filePath)
    if (!st.isFile()) throw createError({ statusCode: 404, message: 'Not found' })
  } catch (e) {
    if (e?.statusCode) throw e
    throw createError({ statusCode: 404, message: 'Not found' })
  }

  const ext = path.extname(filePath).toLowerCase()
  const mime = MIME_BY_EXT[ext] ?? 'application/octet-stream'
  setResponseHeader(event, 'Content-Type', mime)
  setResponseHeader(event, 'Cache-Control', 'public, max-age=604800')

  return sendStream(event, createReadStream(filePath))
})
