import { getAbout } from '../../utils/about-store'

export default defineEventHandler(() => {
  return getAbout() ?? {}
})
