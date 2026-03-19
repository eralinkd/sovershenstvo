import { prisma } from './db'

const CACHE_KEY = 'content:about'
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

export function getAbout() {
  return data
}

export function getAboutRaw() {
  return rawData
}

export async function refreshAboutFromDb() {
  try {
    const row = await prisma.about.findFirst({ orderBy: { updatedAt: 'desc' } })
    rawData = row ?? null
    data = row?.data ?? null
    log('REFRESH', CACHE_KEY, true, row ? '' : 'no rows')
  } catch (err) {
    log('REFRESH', CACHE_KEY, false, err?.message ?? String(err))
  }
}

export function startAboutRefresh() {
  setInterval(refreshAboutFromDb, INTERVAL_MS)
}
