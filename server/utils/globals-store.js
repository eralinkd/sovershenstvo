import { prisma } from './db'

const CACHE_KEY = 'content:globals'
const INTERVAL_MS = parseInt(process.env.MEMORY_TTL_MS ?? '30000', 10)

let data = null
let rawData = null

function log(operation, key, success, message) {
  const now = new Date()
  const timestamp = now.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const status = success ? 'OK' : 'FAIL'
  const msg = message ? ` — ${message}` : ''
  // eslint-disable-next-line no-console
  console.log(`[${timestamp}] DB ${operation} [${key}] ${status}${msg}`)
}

function toResponse(row) {
  return {
    meta: {
      title: row.title,
      seo: {
        description: row.seoDescription ?? '',
        ogTitle: row.seoOgTitle ?? row.title,
        ogDescription: row.seoOgDescription ?? row.seoDescription ?? '',
      },
    },
  }
}

export function getGlobals() {
  return data
}

export function getGlobalsRaw() {
  return rawData
}

export async function refreshGlobalsFromDb() {
  try {
    const row = await prisma.globals.findFirst({
      orderBy: { updatedAt: 'desc' },
    })
    if (!row) {
      data = null
      rawData = null
      log('REFRESH', CACHE_KEY, true, 'no rows')
      return
    }
    data = toResponse(row)
    rawData = {
      title: row.title,
      seoDescription: row.seoDescription ?? '',
      seoOgTitle: row.seoOgTitle ?? '',
      seoOgDescription: row.seoOgDescription ?? '',
    }
    log('REFRESH', CACHE_KEY, true)
  } catch (err) {
    log('REFRESH', CACHE_KEY, false, err?.message ?? String(err))
  }
}

export function startGlobalsRefresh() {
  setInterval(refreshGlobalsFromDb, INTERVAL_MS)
}
