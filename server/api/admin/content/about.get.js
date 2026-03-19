import { getAboutRaw } from '../../../utils/about-store'

export default defineEventHandler(() => {
  return getAboutRaw()?.data ?? {}
})
