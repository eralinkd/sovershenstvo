import { prisma } from './db'

const CACHE_KEY = 'content:footer'
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

function toResponse(footer) {
  if (!footer) return null
  const addresses = (footer.addresses || [])
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((a) => ({
      label: a.label,
      phones: [a.phone1, a.phone2, a.phone3].filter(Boolean),
    }))
    .filter((a) => a.label)

  return {
    title: footer.title,
    subtitle: footer.subtitle,
    city: footer.city,
    email: footer.email,
    summaryPhones: footer.summaryPhones,
    addresses,
  }
}

export function getFooter() {
  return data
}

export function getFooterRaw() {
  return rawData
}

export async function refreshFooterFromDb() {
  try {
    const row = await prisma.footer.findFirst({
      orderBy: { updatedAt: 'desc' },
      include: { addresses: { orderBy: { sortOrder: 'asc' } } },
    })
    data = row ? toResponse(row) : null
    rawData = row
      ? {
          id: row.id,
          title: row.title,
          subtitle: row.subtitle,
          city: row.city,
          email: row.email,
          summaryPhones: row.summaryPhones,
          addresses: row.addresses.map((a) => ({
            id: a.id,
            label: a.label,
            phone1: a.phone1,
            phone2: a.phone2,
            phone3: a.phone3,
            sortOrder: a.sortOrder,
          })),
        }
      : null
    log('REFRESH', CACHE_KEY, true, row ? '' : 'no rows')
  } catch (err) {
    log('REFRESH', CACHE_KEY, false, err?.message ?? String(err))
  }
}

export function startFooterRefresh() {
  setInterval(refreshFooterFromDb, INTERVAL_MS)
}
