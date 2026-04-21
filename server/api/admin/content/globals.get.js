import { getGlobalsRaw } from '../../../utils/globals-store'

export default defineEventHandler((_event) => {

  const data = getGlobalsRaw()
  return data ?? { title: '', seoDescription: '', seoOgTitle: '', seoOgDescription: '' }
})
