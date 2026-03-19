import { getMain } from '../../../utils/main-store'

export default defineEventHandler((_event) => {

  return getMain() ?? {}
})
