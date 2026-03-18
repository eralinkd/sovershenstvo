import { getMain } from '../../../utils/main-store'

export default defineEventHandler((_event) => {
  // TODO: восстановить проверку авторизации
  return getMain() ?? {}
})
