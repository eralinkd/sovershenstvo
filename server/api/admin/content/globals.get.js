import { getGlobalsRaw } from '../../../utils/globals-store'

export default defineEventHandler((_event) => {
  // TODO: восстановить проверку авторизации
  const data = getGlobalsRaw()
  return data ?? { title: '', seoDescription: '', seoOgTitle: '', seoOgDescription: '' }
})
