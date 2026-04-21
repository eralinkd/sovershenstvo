const cache = new Map()

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

export function getCached(key) {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) {
    cache.delete(key)
    return null
  }
  return entry.data
}

export function setCached(key, data, ttlMs) {
  cache.set(key, {
    data,
    expiresAt: Date.now() + ttlMs,
  })
}

export function invalidateCache(key) {
  cache.delete(key)
}

export function withCache(key, fetcher, ttlMs) {
  const cached = getCached(key)
  if (cached !== null) {
    return Promise.resolve(cached)
  }

  return fetcher().then(
    (data) => {
      setCached(key, data, ttlMs)
      log('FETCH', key, true)
      return data
    },
    (err) => {
      log('FETCH', key, false, err?.message ?? String(err))
      throw err
    },
  )
}
