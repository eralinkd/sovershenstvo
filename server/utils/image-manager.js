import { readdir, stat, mkdir, rename as fsRename, unlink, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

export const IMAGES_ROOT = path.join(process.cwd(), 'public', 'images')

export function toImageUrl(relativePath) {
  return '/images/' + relativePath.replace(/\\/g, '/')
}

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'])

export function isImageFile(filename) {
  return IMAGE_EXTS.has(path.extname(filename).toLowerCase())
}

// Allow Cyrillic, Latin, digits, dots, hyphens, underscores
export function sanitizeName(name) {
  const cleaned = name
    .trim()
    .replace(/[^a-zA-Zа-яёА-ЯЁ0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .replace(/^[._-]+|[._-]+$/g, '')
  return cleaned || 'image'
}

export function ensureSafe(base, ...parts) {
  const resolved = path.resolve(path.join(base, ...parts))
  if (!resolved.startsWith(path.resolve(base))) {
    throw new Error('Path traversal detected')
  }
  return resolved
}

export async function scanDir(folderRel = '') {
  const dir = folderRel ? ensureSafe(IMAGES_ROOT, folderRel) : IMAGES_ROOT
  if (!existsSync(dir)) return { images: [], subfolders: [] }

  const entries = await readdir(dir, { withFileTypes: true })
  const images = []
  const subfolders = []

  for (const e of entries) {
    if (e.name.startsWith('.')) continue
    if (e.isDirectory()) {
      subfolders.push(folderRel ? `${folderRel}/${e.name}` : e.name)
    } else if (isImageFile(e.name)) {
      const full = path.join(dir, e.name)
      const s = await stat(full)
      const relPath = folderRel ? `${folderRel}/${e.name}` : e.name
      images.push({
        id: relPath,
        name: path.parse(e.name).name,
        filename: e.name,
        folder: folderRel,
        url: toImageUrl(relPath),
        size: s.size,
        mtime: s.mtime.toISOString(),
      })
    }
  }

  return { images, subfolders }
}

export async function scanAll() {
  const allImages = []
  const allFolders = []

  async function recurse(folder) {
    const { images, subfolders } = await scanDir(folder)
    allImages.push(...images)
    for (const sub of subfolders) {
      allFolders.push(sub)
      await recurse(sub)
    }
  }

  await recurse('')
  return { images: allImages, folders: allFolders }
}

// Scan all entity JSON data and find where imageUrl is referenced
export async function findUsages(imageUrl, prismaClient) {
  const usages = []

  const main = await prismaClient.main.findFirst({ orderBy: { updatedAt: 'desc' } })
  if (main?.data) {
    const d = main.data
    if (d.hero?.image === imageUrl) {
      usages.push({ entity: 'main', label: 'Главная — Hero' })
    }
    for (let i = 1; i <= 4; i++) {
      if (d.offers?.[`banner${i}`]?.img === imageUrl) {
        usages.push({ entity: 'main', label: `Главная — Баннер ${i}` })
      }
    }
  }

  return usages
}

// Update image URL in all entity JSON data after rename
export async function updateImageReferences(oldUrl, newUrl, prismaClient) {
  const main = await prismaClient.main.findFirst({ orderBy: { updatedAt: 'desc' } })
  if (main?.data) {
    const d = structuredClone(main.data)
    let changed = false

    if (d.hero?.image === oldUrl) {
      d.hero.image = newUrl
      changed = true
    }
    for (let i = 1; i <= 4; i++) {
      if (d.offers?.[`banner${i}`]?.img === oldUrl) {
        d.offers[`banner${i}`].img = newUrl
        changed = true
      }
    }

    if (changed) {
      await prismaClient.main.update({ where: { id: main.id }, data: { data: d } })
    }
  }
}
