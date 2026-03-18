import { prisma } from './db'

const CACHE_KEY = 'content:faq'
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

  console.log(`[${timestamp}] DB ${operation} [${key}] ${status}${msg}`)
}

function toResponse(faq) {
  if (!faq) return null
  const items = (faq.items || [])
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((it) => ({
      question: it.question || '',
      answer: it.answer || '',
      open: false,
    }))
    .filter((x) => x.question || x.answer)

  return {
    title: faq.title || 'Часто задаваемые <br />вопросы о лечении зубов',
    items,
  }
}

export function getFaq() {
  return data
}

export function getFaqRaw() {
  return rawData
}

export async function refreshFaqFromDb() {
  try {
    const row = await prisma.faq.findFirst({
      orderBy: { updatedAt: 'desc' },
      include: { items: { orderBy: { sortOrder: 'asc' } } },
    })
    data = row ? toResponse(row) : null
    rawData = row
      ? {
          id: row.id,
          title: row.title,
          items: row.items.map((it) => ({
            id: it.id,
            question: it.question,
            answer: it.answer,
            sortOrder: it.sortOrder,
          })),
        }
      : null
    log('REFRESH', CACHE_KEY, true, row ? '' : 'no rows')
  } catch (err) {
    log('REFRESH', CACHE_KEY, false, err?.message ?? String(err))
  }
}

export function startFaqRefresh() {
  setInterval(refreshFaqFromDb, INTERVAL_MS)
}
